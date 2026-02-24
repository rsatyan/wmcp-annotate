import { analyzer } from '../lib/analyzer.js';
import { scanner } from '../lib/scanner.js';
import { writeOutput, readInput } from '../lib/output.js';
import ora from 'ora';
import chalk from 'chalk';
export async function suggestCommand(url, options) {
    const spinner = ora('Analyzing...').start();
    try {
        // Get scan results (from file or live scan)
        let scanResult;
        if (options.scanFile) {
            spinner.text = 'Loading scan file...';
            scanResult = await readInput(options.scanFile);
        }
        else if (url) {
            const mode = options.browser ? 'browser' : 'static HTML';
            spinner.text = `Scanning ${url} (${mode})...`;
            scanResult = await scanner.scan(url, { depth: 1, browser: options.browser });
        }
        else {
            throw new Error('Either URL or --scan-file is required');
        }
        spinner.text = 'Generating tool suggestions with AI...';
        const result = await analyzer.suggest(scanResult);
        spinner.succeed(`Generated ${result.tools.length} tool suggestions`);
        await writeOutput(result, options);
        if (!options.output) {
            console.log(chalk.dim('\\nUse --output to save results to a file'));
        }
    }
    catch (error) {
        spinner.fail('Suggestion failed');
        console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
        process.exit(1);
    }
}
//# sourceMappingURL=suggest.js.map