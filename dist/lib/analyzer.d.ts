import type { ScanResult, SuggestResult } from '../types.js';
declare class Analyzer {
    private config;
    private getConfig;
    suggest(scanResult: ScanResult): Promise<SuggestResult>;
    private analyzeElement;
    private callAI;
    private callAnthropic;
    private callOpenAI;
    private callOllama;
}
export declare const analyzer: Analyzer;
export {};
//# sourceMappingURL=analyzer.d.ts.map