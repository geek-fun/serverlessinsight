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
  .command('validate [stackName]')
  .description('validate serverless Iac yaml')
  .option('-f, --file <path>', 'specify the yaml file')
  .action((stackName, options) => {
    logger.debug('log command info');
    validate(options.file);
  });

program
  .command('deploy <stackName>')
  .description('deploy serverless Iac yaml')
  .option('-f, --file <path>', 'specify the yaml file')
  .option(
    '-p, --parameter <key=value>',
    'override parameters',
    (value, previous: { [key: string]: string }) => {
      const [key, val] = value.split('=');
      previous[key] = val;
      return previous;
    },
    {},
  )
  .action(async (stackName, options) => {
    logger.debug('log command info');
    await deploy(stackName, { location: options.file, parameters: options.parameter });
  });

program.parse();
