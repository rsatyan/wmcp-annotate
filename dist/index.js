#!/usr/bin/env node
import { Command } from 'commander';
import { scanCommand } from './commands/scan.js';
import { suggestCommand } from './commands/suggest.js';
import { generateCommand } from './commands/generate.js';
import { validateCommand } from './commands/validate.js';
const program = new Command();
program
    .name('wmcp-annotate')
    .description('Make any website AI-agent ready with WebMCP annotations')
    .version('1.0.0');
program
    .command('scan <url>')
    .description('Analyze a website for WebMCP opportunities')
    .option('-d, --depth <number>', 'How many pages deep to crawl', '1')
    .option('-o, --output <file>', 'Output file')
    .option('-f, --format <format>', 'Output format: json, table, markdown', 'json')
    .option('-v, --verbose', 'Show detailed progress')
    .action(scanCommand);
program
    .command('suggest [url]')
    .description('Generate AI-powered WebMCP tool suggestions')
    .option('-s, --scan-file <file>', 'Use existing scan output')
    .option('-o, --output <file>', 'Output file')
    .option('-f, --format <format>', 'Output format: json, yaml', 'json')
    .action(suggestCommand);
program
    .command('generate [url]')
    .description('Generate WebMCP registration code')
    .option('-s, --suggest-file <file>', 'Use existing suggestions')
    .option('-o, --output <file>', 'Output file')
    .option('-f, --format <format>', 'Output format: js, ts, react, vue', 'js')
    .option('-m, --module <type>', 'Module format: esm, cjs', 'esm')
    .action(generateCommand);
program
    .command('validate <url>')
    .description('Validate WebMCP implementation')
    .option('-o, --output <file>', 'Output file')
    .option('-f, --format <format>', 'Output format: json, table, markdown', 'json')
    .option('--strict', 'Fail on warnings')
    .option('--ci', 'Exit code 1 on any issues')
    .action(validateCommand);
program.parse();
//# sourceMappingURL=index.js.map