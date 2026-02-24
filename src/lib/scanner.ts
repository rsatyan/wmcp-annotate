import { chromium, type Browser, type Page } from 'playwright';
import type { ScanResult, ScannedElement, ApiCall, InputField } from '../types.js';

interface ScanOptions {
  depth?: number;
  verbose?: boolean;
}

class Scanner {
  private browser: Browser | null = null;

  async scan(url: string, options: ScanOptions = {}): Promise<ScanResult> {
    const { depth = 1, verbose = false } = options;
    
    await this.ensureBrowser();
    const page = await this.browser!.newPage();
    
    try {
      // Navigate and wait for load
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Collect API calls
      const apiCalls: ApiCall[] = [];
      page.on('request', (request) => {
        const reqUrl = request.url();
        if (reqUrl.includes('/api/') || request.resourceType() === 'fetch' || request.resourceType() === 'xhr') {
          apiCalls.push({
            method: request.method(),
            url: reqUrl,
            params: Array.from(new URL(reqUrl).searchParams.keys()),
          });
        }
      });
      
      // Scan for elements
      const elements = await this.scanElements(page);
      
      return {
        url,
        scannedAt: new Date().toISOString(),
        elements,
        apiCalls,
      };
    } finally {
      await page.close();
    }
  }

  private async scanElements(page: Page): Promise<ScannedElement[]> {
    const elements: ScannedElement[] = [];
    
    // Scan forms
    const forms = await page.$$('form');
    for (const form of forms) {
      const id = await form.getAttribute('id');
      const inputs = await this.getFormInputs(form);
      const submitBtn = await form.$('button[type="submit"], input[type="submit"]');
      
      elements.push({
        type: 'form',
        id: id || undefined,
        selector: id ? `#${id}` : 'form',
        label: await this.getLabel(form) || 'Form',
        inputs,
        submitButton: submitBtn ? {
          selector: await this.getSelector(submitBtn),
          label: await submitBtn.textContent() || 'Submit',
        } : undefined,
      });
    }
    
    // Scan buttons (not in forms)
    const buttons = await page.$$('button:not(form button), [role="button"]');
    for (const button of buttons) {
      const label = await button.textContent();
      if (label?.trim()) {
        elements.push({
          type: 'button',
          selector: await this.getSelector(button),
          label: label.trim(),
        });
      }
    }
    
    // Scan links with actions
    const actionLinks = await page.$$('a[href^="#"], a[href^="javascript:"], a[onclick]');
    for (const link of actionLinks) {
      const label = await link.textContent();
      if (label?.trim()) {
        elements.push({
          type: 'link',
          selector: await this.getSelector(link),
          label: label.trim(),
        });
      }
    }
    
    return elements;
  }

  private async getFormInputs(form: any): Promise<InputField[]> {
    const inputs: InputField[] = [];
    const inputElements = await form.$$('input, select, textarea');
    
    for (const input of inputElements) {
      const name = await input.getAttribute('name');
      const type = await input.getAttribute('type') || 'text';
      const required = await input.getAttribute('required') !== null;
      const placeholder = await input.getAttribute('placeholder');
      const label = await this.getInputLabel(input);
      
      if (name && type !== 'hidden' && type !== 'submit') {
        inputs.push({
          name,
          type,
          label: label || undefined,
          required,
          placeholder: placeholder || undefined,
        });
      }
    }
    
    return inputs;
  }

  private async getInputLabel(input: any): Promise<string | null> {
    try {
      const id = await input.getAttribute('id');
      if (id) {
        // Use evaluate to find the label in the DOM
        const labelText = await input.evaluate((el: HTMLElement) => {
          const id = el.getAttribute('id');
          if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            return label?.textContent || null;
          }
          return null;
        });
        return labelText;
      }
    } catch {
      // Ignore errors
    }
    return null;
  }

  private async getLabel(element: any): Promise<string | null> {
    const ariaLabel = await element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;
    
    const title = await element.getAttribute('title');
    if (title) return title;
    
    return null;
  }

  private async getSelector(element: any): Promise<string> {
    const id = await element.getAttribute('id');
    if (id) return `#${id}`;
    
    const className = await element.getAttribute('class');
    if (className) {
      const classes = className.split(' ').filter((c: string) => c && !c.includes(':'));
      if (classes.length > 0) return `.${classes[0]}`;
    }
    
    const tagName = await element.evaluate((el: HTMLElement) => el.tagName.toLowerCase());
    return tagName;
  }

  private async ensureBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export const scanner = new Scanner();
