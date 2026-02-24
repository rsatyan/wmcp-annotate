import { generator } from '../lib/generator.js';
import { analyzer } from '../lib/analyzer.js';
import { scanner } from '../lib/scanner.js';
import { readInput } from '../lib/output.js';
import ora from 'ora';
import chalk from 'chalk';
export async function generateCommand(url, options) {
    const spinner = ora('Generating...').start();
    try {
        // Get suggestions (from file or live analysis)
        let suggestions;
        if (options.suggestFile) {
            spinner.text = 'Loading suggestions file...';
            suggestions = await readInput(options.suggestFile);
        }
        else if (url) {
            spinner.text = `Scanning ${url}...`;
            const scanResult = await scanner.scan(url, { depth: 1 });
            spinner.text = 'Generating tool suggestions...';
            suggestions = await analyzer.suggest(scanResult);
        }
        else {
            throw new Error('Either URL or --suggest-file is required');
        }
        spinner.text = `Generating ${options.format.toUpperCase()} code...`;
        const code = await generator.generate(suggestions, {
            format: options.format,
            module: options.module,
        });
        spinner.succeed(`Generated code for ${suggestions.tools.length} tools`);
        if (options.output) {
            const fs = await import('fs/promises');
            await fs.writeFile(options.output, code, 'utf-8');
            console.log(chalk.green(`\\nSaved to ${options.output}`));
        }
        else {
            console.log('\\n' + code);
        }
    }
    catch (error) {
        spinner.fail('Generation failed');
        console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
        process.exit(1);
    }
}
//# sourceMappingURL=generate.js.map