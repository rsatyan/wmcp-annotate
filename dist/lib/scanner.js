import * as cheerio from 'cheerio';
class Scanner {
    async scan(url, options = {}) {
        const { browser = false } = options;
        if (browser) {
            return this.scanWithBrowser(url, options);
        }
        return this.scanWithCheerio(url, options);
    }
    /**
     * Default: Fast, lightweight HTML scanning with Cheerio
     * Works for static HTML sites (80%+ of websites)
     */
    async scanWithCheerio(url, options) {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; wmcp-annotate/1.0)',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        const elements = [];
        // Scan forms
        $('form').each((_, form) => {
            const $form = $(form);
            const id = $form.attr('id');
            const action = $form.attr('action');
            const method = $form.attr('method') || 'GET';
            const inputs = [];
            $form.find('input, select, textarea').each((_, input) => {
                const $input = $(input);
                const name = $input.attr('name');
                const type = $input.attr('type') || 'text';
                const required = $input.attr('required') !== undefined;
                const placeholder = $input.attr('placeholder');
                // Get label
                const inputId = $input.attr('id');
                let label;
                if (inputId) {
                    label = $(`label[for="${inputId}"]`).text().trim() || undefined;
                }
                if (name && type !== 'hidden' && type !== 'submit') {
                    inputs.push({
                        name,
                        type,
                        label,
                        required,
                        placeholder: placeholder || undefined,
                    });
                }
            });
            // Get submit button text
            const submitBtn = $form.find('button[type="submit"], input[type="submit"]').first();
            const submitLabel = submitBtn.attr('value') || submitBtn.text().trim() || 'Submit';
            elements.push({
                type: 'form',
                id: id || undefined,
                selector: id ? `#${id}` : 'form',
                label: $form.attr('aria-label') || $form.attr('title') || 'Form',
                inputs,
                action: action || undefined,
                method,
                submitButton: {
                    selector: id ? `#${id} [type="submit"]` : 'form [type="submit"]',
                    label: submitLabel,
                },
            });
        });
        // Scan standalone buttons (not in forms)
        $('button:not(form button), [role="button"]').each((_, button) => {
            const $button = $(button);
            const label = $button.text().trim();
            const id = $button.attr('id');
            if (label) {
                elements.push({
                    type: 'button',
                    id: id || undefined,
                    selector: id ? `#${id}` : this.getSelector($button),
                    label,
                });
            }
        });
        // Scan action links (anchors with JS behavior)
        $('a[href^="#"], a[href^="javascript:"], a[onclick]').each((_, link) => {
            const $link = $(link);
            const label = $link.text().trim();
            const id = $link.attr('id');
            if (label) {
                elements.push({
                    type: 'link',
                    id: id || undefined,
                    selector: id ? `#${id}` : this.getSelector($link),
                    label,
                });
            }
        });
        // Scan search inputs (common pattern)
        $('input[type="search"], input[name*="search"], input[name*="query"], input[name="q"]').each((_, input) => {
            const $input = $(input);
            const $form = $input.closest('form');
            // Skip if already captured as form
            if ($form.length > 0)
                return;
            const name = $input.attr('name') || 'search';
            const placeholder = $input.attr('placeholder');
            elements.push({
                type: 'search',
                selector: this.getSelector($input),
                label: placeholder || 'Search',
                inputs: [{
                        name,
                        type: 'search',
                        placeholder: placeholder || undefined,
                        required: false,
                    }],
            });
        });
        return {
            url,
            scannedAt: new Date().toISOString(),
            elements,
            apiCalls: [], // Can't detect API calls without JS execution
            meta: {
                scanner: 'cheerio',
                note: 'Static HTML scan. Use --browser flag for JavaScript-rendered content.',
            },
        };
    }
    /**
     * Optional: Full browser scanning with Playwright
     * Required for SPAs and JavaScript-heavy sites
     */
    async scanWithBrowser(url, options) {
        let playwright;
        try {
            playwright = await import('playwright');
        }
        catch {
            throw new Error('Playwright is required for --browser mode but not installed.\n\n' +
                'Install it with:\n' +
                '  npm install playwright\n' +
                '  npx playwright install chromium\n\n' +
                'Or use the default mode (without --browser) for static HTML sites.');
        }
        const browser = await playwright.chromium.launch({ headless: true });
        const page = await browser.newPage();
        try {
            const apiCalls = [];
            // Capture API calls
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
            await page.goto(url, { waitUntil: 'networkidle' });
            // Scan elements using Playwright
            const elements = await this.scanElementsWithPlaywright(page);
            return {
                url,
                scannedAt: new Date().toISOString(),
                elements,
                apiCalls,
                meta: {
                    scanner: 'playwright',
                    note: 'Full browser scan with JavaScript execution.',
                },
            };
        }
        finally {
            await browser.close();
        }
    }
    async scanElementsWithPlaywright(page) {
        const elements = [];
        // Scan forms
        const forms = await page.$$('form');
        for (const form of forms) {
            const id = await form.getAttribute('id');
            const inputs = await this.getFormInputsPlaywright(form, page);
            const submitBtn = await form.$('button[type="submit"], input[type="submit"]');
            elements.push({
                type: 'form',
                id: id || undefined,
                selector: id ? `#${id}` : 'form',
                label: await this.getLabelPlaywright(form) || 'Form',
                inputs,
                submitButton: submitBtn ? {
                    selector: await this.getSelectorPlaywright(submitBtn),
                    label: await submitBtn.textContent() || 'Submit',
                } : undefined,
            });
        }
        // Scan buttons
        const buttons = await page.$$('button:not(form button), [role="button"]');
        for (const button of buttons) {
            const label = await button.textContent();
            if (label?.trim()) {
                elements.push({
                    type: 'button',
                    selector: await this.getSelectorPlaywright(button),
                    label: label.trim(),
                });
            }
        }
        return elements;
    }
    async getFormInputsPlaywright(form, page) {
        const inputs = [];
        const inputElements = await form.$$('input, select, textarea');
        for (const input of inputElements) {
            const name = await input.getAttribute('name');
            const type = await input.getAttribute('type') || 'text';
            const required = await input.getAttribute('required') !== null;
            const placeholder = await input.getAttribute('placeholder');
            if (name && type !== 'hidden' && type !== 'submit') {
                inputs.push({
                    name,
                    type,
                    required,
                    placeholder: placeholder || undefined,
                });
            }
        }
        return inputs;
    }
    async getLabelPlaywright(element) {
        const ariaLabel = await element.getAttribute('aria-label');
        if (ariaLabel)
            return ariaLabel;
        const title = await element.getAttribute('title');
        if (title)
            return title;
        return null;
    }
    async getSelectorPlaywright(element) {
        const id = await element.getAttribute('id');
        if (id)
            return `#${id}`;
        const className = await element.getAttribute('class');
        if (className) {
            const classes = className.split(' ').filter((c) => c && !c.includes(':'));
            if (classes.length > 0)
                return `.${classes[0]}`;
        }
        return 'element';
    }
    getSelector($el) {
        const id = $el.attr('id');
        if (id)
            return `#${id}`;
        const className = $el.attr('class');
        if (className) {
            const classes = className.split(' ').filter(c => c && !c.includes(':'));
            if (classes.length > 0)
                return `.${classes[0]}`;
        }
        const tagName = $el.prop('tagName')?.toLowerCase();
        return tagName || 'element';
    }
}
export const scanner = new Scanner();
//# sourceMappingURL=scanner.js.map