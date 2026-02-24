import type { ScanResult } from '../types.js';
interface ScanOptions {
    depth?: number;
    verbose?: boolean;
}
declare class Scanner {
    private browser;
    scan(url: string, options?: ScanOptions): Promise<ScanResult>;
    private scanElements;
    private getFormInputs;
    private getInputLabel;
    private getLabel;
    private getSelector;
    private ensureBrowser;
    close(): Promise<void>;
}
export declare const scanner: Scanner;
export {};
//# sourceMappingURL=scanner.d.ts.map