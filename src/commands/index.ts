#! /usr/bin/env node

import { Command } from 'commander';
import { constructActionContext, getVersion, logger } from '../common';
import { validate } from './validate';
import { deploy } from './deploy';
import { template } from './template';
import { destroyStack } from './destroy';
import { getIamInfo } from '../common';

const program = new Command();

program.name('si').description('CLI for ServerlessInsight').version(getVersion());

program
  .command('show')
  .description('show string')
  .action(async (options) => {
    const context = constructActionContext({ ...options });
    const result = await getIamInfo(context);
    console.log('result:', JSON.stringify(result));
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
