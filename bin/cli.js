#!/usr/bin/env node

const { Command } = require('commander');
const { setupProject } = require('../lib/setup');
const chalk = require('chalk');

const program = new Command();

program
  .name('mung-dal')
  .description('Generate a MERN stack boilerplate')
  .version('1.0.0')
  .argument('[project-name]', 'name of the project')
  .action(async (projectName) => {
    try {
      await setupProject(projectName);
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();