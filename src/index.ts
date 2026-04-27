#!/usr/bin/env node
/**
 * playwright-cli - A CLI tool for running and managing Playwright tests
 * Fork of microsoft/playwright-cli
 *
 * Personal fork: tweaked help output to show on unknown commands/args
 * rather than only when no args are provided.
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
  .version(pkg.version, '-v, --version', 'Output the current version')
  .addHelpCommand(true); // always enable the built-in help sub-command

// Import and register commands
import './commands/run';
import './commands/codegen';
import './commands/show-trace';
import './commands/install';

// Show help if no command is provided (check before parse so help exits cleanly)
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(0);
}

// Show help and exit with a non-zero code on unrecognised commands
program.on('command:*', () => {
  console.error(`\nError: unknown command '${program.args[0]}'\n`);
  program.outputHelp();
  process.exit(1);
});

program.parse(process.argv);
