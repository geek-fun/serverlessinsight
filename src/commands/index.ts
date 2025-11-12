#! /usr/bin/env node

import { Command } from 'commander';
import { getContext, getIamInfo, getVersion, logger, setContext } from '../common';
import { validate } from './validate';
import { deploy } from './deploy';
import { template } from './template';
import { destroyStack } from './destroy';
import { runLocal } from './local';

const program = new Command();

program.name('si').description('CLI for ServerlessInsight').version(getVersion());

program
  .command('show')
  .description('show string')
  .action(async (options) => {
    await setContext({ ...options });
    const context = getContext();
    const result = await getIamInfo(context);
    console.log('result:', JSON.stringify(result));
  });

program
  .command('validate [stackName]')
  .description('validate serverless Iac yaml')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .action(async (stackName, { file, stage }) => {
    logger.debug('log command info');
    await validate(stackName, { stage, location: file });
  });

program
  .command('deploy <stackName>')
  .description('deploy serverless Iac yaml')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .option('-r, --region <region>', 'specify the region')
  .option('-v, --provider <provider>', 'specify the provider')
  .option('-k, --accessKeyId <accessKeyId>', 'specify the AccessKeyId')
  .option('-x, --accessKeySecret <accessKeySecret>', 'specify the AccessKeySecret')
  .option('-n, --securityToken <securityToken>', 'specify the SecurityToken')
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
  .action(
    async (
      stackName,
      { stage, parameter, file, region, provider, accessKeyId, accessKeySecret, securityToken },
    ) => {
      await deploy(stackName, {
        stage,
        parameters: parameter,
        location: file,
        region,
        provider,
        accessKeyId,
        accessKeySecret,
        securityToken,
      });
    },
  );

program
  .command('template <stackName>')
  .description('print platform specific infrastructure as code template')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .option('-t, --format <type>', 'output content type (JSON or YAML)', 'JSON')
  .action(async (stackName, { format, file, stage }) => {
    await template(stackName, { format, location: file, stage });
  });

program
  .command('destroy <stackName>')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-r, --region <region>', 'specify the region')
  .option('-v, --provider <provider>', 'specify the provider')
  .option('-k, --accessKeyId <accessKeyId>', 'specify the AccessKeyId')
  .option('-x, --accessKeySecret <accessKeySecret>', 'specify the AccessKeySecret')
  .option('-n, --securityToken <securityToken>', 'specify the SecurityToken')
  .description('destroy serverless stack')
  .action(
    async (stackName, { file, region, provider, accessKeyId, accessKeySecret, securityToken }) => {
      await destroyStack(stackName, {
        location: file,
        region,
        provider,
        accessKeyId,
        accessKeySecret,
        securityToken,
      });
    },
  );

program
  .command('local <stackName>')
  .description('run Serverless application locally for debugging')
  .option('-s, --stage <stage>', 'specify the stage', 'default')
  .option('-p, --port <port>', 'specify the port', '3000')
  .option('-d, --debug', 'enable debug mode')
  .option('-w, --watch', 'enable file watch', true)
  .action(async (stackName, { stage, port, debug, watch }) => {
    await runLocal(stackName, {
      stage,
      port: Number(port) || 3000,
      debug: !!debug,
      watch: typeof watch === 'boolean' ? watch : true,
    });
  });

program.parse();
