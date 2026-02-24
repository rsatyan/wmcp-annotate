import type { ValidationResult } from '../types.js';
declare class Validator {
    private browser;
    validate(url: string): Promise<ValidationResult>;
    private validateTool;
    private isCamelCase;
    private toCamelCase;
    private ensureBrowser;
    close(): Promise<void>;
}
export declare const validator: Validator;
export {};
//# sourceMappingURL=validator.d.ts.map