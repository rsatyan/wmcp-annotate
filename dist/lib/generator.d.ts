import type { SuggestResult } from '../types.js';
interface GenerateOptions {
    format: 'js' | 'ts' | 'react' | 'vue';
    module: 'esm' | 'cjs';
}
declare class Generator {
    generate(suggestions: SuggestResult, options: GenerateOptions): Promise<string>;
    private prepareToolData;
}
export declare const generator: Generator;
export {};
//# sourceMappingURL=generator.d.ts.map