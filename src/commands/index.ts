#! /usr/bin/env node

import { Command } from 'commander';
import { lang } from '../lang';
import { logger, getVersion } from '../common';
import { validate } from './validate';
import { deploy } from './deploy';
import { template } from './template';
import { destroyStack } from './destroy';

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
  .option('-s, --stage <stage>', 'specify the stage')
  .action((stackName, { file, stage }) => {
    logger.debug('log command info');
    validate(file, stage);
  });

program
  .command('deploy <stackName>')
  .description('deploy serverless Iac yaml')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
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
  .action(async (stackName, { file, parameter, stage }) => {
    await deploy(stackName, { location: file, parameters: parameter, stage });
  });

program
  .command('template <stackName>')
  .description('print ROS template')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .option('-t, --format <type>', 'output content type (JSON or YAML)', 'JSON')
  .action((stackName, { format, file, stage }) => {
    template(stackName, { format, location: file, stage });
  });

program
  .command('destroy <stackName>')
  .description('destroy serverless stack')
  .action(async (stackName) => {
    await destroyStack(stackName);
  });

program.parse();
