import type { SuggestOptions, SuggestResult, ScanResult } from '../types.js';
import { analyzer } from '../lib/analyzer.js';
import { scanner } from '../lib/scanner.js';
import { writeOutput, readInput } from '../lib/output.js';
import ora from 'ora';
import chalk from 'chalk';

export async function suggestCommand(url: string | undefined, options: SuggestOptions): Promise<void> {
  const spinner = ora('Analyzing...').start();
  
  try {
    // Get scan results (from file or live scan)
    let scanResult: ScanResult;
    if (options.scanFile) {
      spinner.text = 'Loading scan file...';
      scanResult = await readInput<ScanResult>(options.scanFile);
    } else if (url) {
      spinner.text = `Scanning ${url}...`;
      scanResult = await scanner.scan(url, { depth: 1 });
    } else {
      throw new Error('Either URL or --scan-file is required');
    }
    
    spinner.text = 'Generating tool suggestions with AI...';
    const result = await analyzer.suggest(scanResult);
    
    spinner.succeed(`Generated ${result.tools.length} tool suggestions`);
    
    await writeOutput(result, options);
    
    if (!options.output) {
      console.log(chalk.dim('\\nUse --output to save results to a file'));
    }
  } catch (error) {
    spinner.fail('Suggestion failed');
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}
