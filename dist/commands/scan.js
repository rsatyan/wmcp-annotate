import { scanner } from '../lib/scanner.js';
import { writeOutput } from '../lib/output.js';
import ora from 'ora';
import chalk from 'chalk';
export async function scanCommand(url, options) {
    const mode = options.browser ? 'browser' : 'static HTML';
    const spinner = ora(`Scanning ${url} (${mode})...`).start();
    try {
        const result = await scanner.scan(url, {
            depth: parseInt(options.depth, 10),
            verbose: options.verbose,
            browser: options.browser,
        });
        spinner.succeed(`Found ${result.elements.length} elements${result.apiCalls.length ? ` and ${result.apiCalls.length} API calls` : ''}`);
        await writeOutput(result, options);
        if (!options.output) {
            console.log(chalk.dim('\nUse --output to save results to a file'));
        }
        if (!options.browser && result.elements.length === 0) {
            console.log(chalk.yellow('\nTip: If this site uses JavaScript rendering, try: --browser'));
        }
    }
    catch (error) {
        spinner.fail('Scan failed');
        console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
        process.exit(1);
    }
}
//# sourceMappingURL=scan.js.map