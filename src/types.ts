// Core types for wmcp-annotate

export interface ScannedElement {
  type: 'form' | 'button' | 'link' | 'api';
  id?: string;
  selector: string;
  label: string;
  inputs?: InputField[];
  submitButton?: {
    selector: string;
    label: string;
  };
  context?: string;
}

export interface InputField {
  name: string;
  type: string;
  label?: string;
  required: boolean;
  placeholder?: string;
  options?: string[]; // for select/radio
}

export interface ApiCall {
  method: string;
  url: string;
  params?: string[];
  body?: Record<string, unknown>;
}

export interface ScanResult {
  url: string;
  scannedAt: string;
  elements: ScannedElement[];
  apiCalls: ApiCall[];
}

export interface ToolSuggestion {
  name: string;
  description: string;
  readOnly: boolean;
  inputSchema: JsonSchema;
  sourceElement: {
    type: string;
    selector: string;
  };
}

export interface JsonSchema {
  type: string;
  properties?: Record<string, JsonSchemaProperty>;
  required?: string[];
}

export interface JsonSchemaProperty {
  type: string;
  description?: string;
  enum?: string[];
  default?: unknown;
  minimum?: number;
  maximum?: number;
  pattern?: string;
}

export interface SuggestResult {
  version: string;
  url: string;
  suggestedAt: string;
  tools: ToolSuggestion[];
}

export interface ValidationIssue {
  level: 'error' | 'warning';
  code: string;
  message: string;
  suggestion?: string;
}

export interface ToolValidation {
  name: string;
  status: 'valid' | 'warning' | 'error';
  checks: Record<string, 'pass' | 'fail' | 'warning'>;
  issues?: ValidationIssue[];
}

export interface ValidationResult {
  url: string;
  validatedAt: string;
  summary: {
    total: number;
    valid: number;
    warnings: number;
    errors: number;
  };
  tools: ToolValidation[];
}

export interface ScanOptions {
  depth: string;
  output?: string;
  format: string;
  verbose?: boolean;
}

export interface SuggestOptions {
  scanFile?: string;
  output?: string;
  format: string;
}

export interface GenerateOptions {
  suggestFile?: string;
  output?: string;
  format: string;
  module: string;
}

export interface ValidateOptions {
  output?: string;
  format: string;
  strict?: boolean;
  ci?: boolean;
}
