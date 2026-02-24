import { scanner } from '../lib/scanner.js';
import { writeOutput } from '../lib/output.js';
import ora from 'ora';
import chalk from 'chalk';
export async function scanCommand(url, options) {
    const spinner = ora(`Scanning ${url}...`).start();
    try {
        const result = await scanner.scan(url, {
            depth: parseInt(options.depth, 10),
            verbose: options.verbose,
        });
        spinner.succeed(`Found ${result.elements.length} elements and ${result.apiCalls.length} API calls`);
        await writeOutput(result, options);
        if (!options.output) {
            console.log(chalk.dim('\\nUse --output to save results to a file'));
        }
    }
    catch (error) {
        spinner.fail('Scan failed');
        console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
        process.exit(1);
    }
}
//# sourceMappingURL=scan.js.map