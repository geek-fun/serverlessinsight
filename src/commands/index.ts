#! /usr/bin/env node

import { Command } from 'commander';
import { lang } from '../lang';
import { logger, getVersion } from '../common';
import { validate } from './validate';
import { deploy } from './deploy';

const program = new Command();

program.name('si').description('CLI for ServerlessInsight').version(getVersion());

program
  .command('show')
  .description('show string')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    logger.debug({ limit, first: options.first, separator: options.separator }, 'log command info');
    console.log(`${str} ${options.first} ${options.separator} ${lang.__('hello')}`);
  });

program
  .command('validate [location]')
  .description('validate serverless Iac yaml')
  .action((location) => {
    logger.debug('log command info');
    validate(location);
  });

program
  .command('deploy [location]')
  .description('deploy serverless Iac yaml')
  .action((location) => {
    logger.debug('log command info');
    deploy(location);
  });

program.parse();
