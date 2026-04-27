#!/usr/bin/env node
/**
 * playwright-cli - A CLI tool for running and managing Playwright tests
 * Fork of microsoft/playwright-cli
 */

import { program } from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read version from package.json
const pkg = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
);

program
  .name('playwright-cli')
  .description('CLI tool for running and managing Playwright tests')
  .version(pkg.version, '-v, --version', 'Output the current version');

// Import and register commands
import './commands/run';
import './commands/codegen';
import './commands/show-trace';
import './commands/install';

program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
