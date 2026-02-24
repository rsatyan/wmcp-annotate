import type { ScanResult } from '../types.js';
interface ScanOptions {
    depth?: number;
    verbose?: boolean;
    browser?: boolean;
}
declare class Scanner {
    scan(url: string, options?: ScanOptions): Promise<ScanResult>;
    /**
     * Default: Fast, lightweight HTML scanning with Cheerio
     * Works for static HTML sites (80%+ of websites)
     */
    private scanWithCheerio;
    /**
     * Optional: Full browser scanning with Playwright
     * Required for SPAs and JavaScript-heavy sites
     */
    private scanWithBrowser;
    private scanElementsWithPlaywright;
    private getFormInputsPlaywright;
    private getLabelPlaywright;
    private getSelectorPlaywright;
    private getSelector;
}
export declare const scanner: Scanner;
export {};
//# sourceMappingURL=scanner.d.ts.map