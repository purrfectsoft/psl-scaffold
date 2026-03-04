#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { updateCommand } from './commands/update';

const program = new Command();

program
  .name('psl-scaffold')
  .description('The Purrfect Soft PSL monorepo CLI scaffolder')
  .version('1.0.0');

program.addCommand(initCommand);
program.addCommand(updateCommand);

program.parse(process.argv);
