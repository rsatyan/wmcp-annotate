import type { ValidateOptions, ValidationResult } from '../types.js';
import { validator } from '../lib/validator.js';
import { writeOutput } from '../lib/output.js';
import ora from 'ora';
import chalk from 'chalk';

export async function validateCommand(url: string, options: ValidateOptions): Promise<void> {
  const spinner = ora(`Validating ${url}...`).start();
  
  try {
    const result = await validator.validate(url);
    
    const { summary } = result;
    
    if (summary.errors > 0) {
      spinner.fail(`Validation failed: ${summary.errors} errors, ${summary.warnings} warnings`);
    } else if (summary.warnings > 0) {
      spinner.warn(`Validation passed with ${summary.warnings} warnings`);
    } else {
      spinner.succeed(`Validation passed: ${summary.total} tools validated`);
    }
    
    await writeOutput(result, options);
    
    // Handle CI mode
    if (options.ci) {
      if (summary.errors > 0 || (options.strict && summary.warnings > 0)) {
        process.exit(1);
      }
    }
    
    // Print summary
    console.log('\\n' + chalk.bold('Summary:'));
    console.log(`  Total tools: ${summary.total}`);
    console.log(`  Valid: ${chalk.green(summary.valid)}`);
    console.log(`  Warnings: ${chalk.yellow(summary.warnings)}`);
    console.log(`  Errors: ${chalk.red(summary.errors)}`);
    
  } catch (error) {
    spinner.fail('Validation failed');
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}
