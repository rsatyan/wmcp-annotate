import { chromium, type Browser } from 'playwright';
import AjvModule from 'ajv';
import type { ValidationResult, ToolValidation, ValidationIssue } from '../types.js';

const Ajv = AjvModule.default || AjvModule;
const ajv = new Ajv();

class Validator {
  private browser: Browser | null = null;

  async validate(url: string): Promise<ValidationResult> {
    await this.ensureBrowser();
    const page = await this.browser!.newPage();
    
    try {
      // Navigate with WebMCP flag (Chrome 146+)
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Query registered tools
      const tools = await page.evaluate(() => {
        // @ts-ignore - WebMCP API
        if (typeof navigator.modelContext?.getTools === 'function') {
          // @ts-ignore
          return navigator.modelContext.getTools();
        }
        return [];
      });
      
      const validations: ToolValidation[] = [];
      let validCount = 0;
      let warningCount = 0;
      let errorCount = 0;
      
      for (const tool of tools) {
        const validation = this.validateTool(tool);
        validations.push(validation);
        
        if (validation.status === 'valid') validCount++;
        else if (validation.status === 'warning') warningCount++;
        else errorCount++;
      }
      
      return {
        url,
        validatedAt: new Date().toISOString(),
        summary: {
          total: tools.length,
          valid: validCount,
          warnings: warningCount,
          errors: errorCount,
        },
        tools: validations,
      };
    } finally {
      await page.close();
    }
  }

  private validateTool(tool: any): ToolValidation {
    const checks: Record<string, 'pass' | 'fail' | 'warning'> = {};
    const issues: ValidationIssue[] = [];
    
    // Check name format (camelCase)
    if (this.isCamelCase(tool.name)) {
      checks.nameConvention = 'pass';
    } else {
      checks.nameConvention = 'fail';
      issues.push({
        level: 'error',
        code: 'NAME_FORMAT',
        message: 'Tool name must be camelCase',
        suggestion: `Rename to: ${this.toCamelCase(tool.name)}`,
      });
    }
    
    // Check description
    if (!tool.description) {
      checks.descriptionPresent = 'fail';
      issues.push({
        level: 'error',
        code: 'DESCRIPTION_MISSING',
        message: 'Description is required',
      });
    } else if (tool.description.length < 20) {
      checks.descriptionPresent = 'warning';
      issues.push({
        level: 'warning',
        code: 'DESCRIPTION_TOO_SHORT',
        message: 'Description should be at least 20 characters',
        suggestion: 'Add more detail about what this tool does',
      });
    } else {
      checks.descriptionPresent = 'pass';
    }
    
    // Check schema validity
    if (tool.inputSchema) {
      try {
        ajv.compile(tool.inputSchema);
        checks.schemaValid = 'pass';
        
        // Check for property descriptions
        const props = tool.inputSchema.properties || {};
        const missingDesc = Object.entries(props).filter(
          ([_, prop]: [string, any]) => !prop.description
        );
        
        if (missingDesc.length > 0) {
          checks.schemaDescriptions = 'warning';
          issues.push({
            level: 'warning',
            code: 'SCHEMA_NO_DESCRIPTION',
            message: `Properties missing descriptions: ${missingDesc.map(([k]) => k).join(', ')}`,
          });
        } else {
          checks.schemaDescriptions = 'pass';
        }
      } catch (error) {
        checks.schemaValid = 'fail';
        issues.push({
          level: 'error',
          code: 'SCHEMA_INVALID',
          message: `Invalid JSON Schema: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }
    
    // Check handler
    if (typeof tool.execute === 'function') {
      checks.handlerPresent = 'pass';
      
      // Check if async
      if (tool.execute.constructor.name === 'AsyncFunction') {
        checks.handlerAsync = 'pass';
      } else {
        checks.handlerAsync = 'fail';
        issues.push({
          level: 'error',
          code: 'HANDLER_NOT_ASYNC',
          message: 'Execute handler must be an async function',
        });
      }
    } else {
      checks.handlerPresent = 'fail';
      issues.push({
        level: 'error',
        code: 'HANDLER_MISSING',
        message: 'Execute handler is required',
      });
    }
    
    // Determine overall status
    let status: 'valid' | 'warning' | 'error' = 'valid';
    if (issues.some(i => i.level === 'error')) {
      status = 'error';
    } else if (issues.some(i => i.level === 'warning')) {
      status = 'warning';
    }
    
    return {
      name: tool.name,
      status,
      checks,
      issues: issues.length > 0 ? issues : undefined,
    };
  }

  private isCamelCase(str: string): boolean {
    return /^[a-z][a-zA-Z0-9]*$/.test(str);
  }

  private toCamelCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^./, c => c.toLowerCase());
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

export const validator = new Validator();
