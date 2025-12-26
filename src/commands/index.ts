#! /usr/bin/env node

import { Command } from 'commander';
import { clearContext, getContext, getIamInfo, getVersion, logger, setContext } from '../common';
import { validate } from './validate';
import { deploy } from './deploy';
import { template } from './template';
import { destroyStack } from './destroy';
import { runLocal } from './local';
import { plan } from './plan';
import { lang } from '../lang';

// Global error handler
const handleCommandError = (
  error: { message?: string; stack?: string; code?: number },
  commandName: string,
): never => {
  // Log error message as string to preserve newlines
  logger.error(
    lang.__('COMMAND_FAILED', {
      commandName,
      error: error?.message || 'Unknown error occurred',
    }),
  );

  if (error?.stack && process.env.DEBUG) {
    logger.debug(lang.__('STACK_TRACE', { stack: error.stack }));
  }

  let exitCode = 1;

  if (error?.code) {
    if (typeof error.code === 'number') {
      exitCode = error.code;
    } else if (typeof error.code === 'string') {
      const errorCodeMap: Record<string, number> = {
        ENOENT: 2,
        EACCES: 3,
        VALIDATION: 4,
        NETWORK: 5,
      };
      exitCode = errorCodeMap[error.code] || 1;
    }
  }

  process.exit(exitCode);
};

const actionWrapper = <T extends unknown[]>(
  commandName: string,
  handler: (...args: T) => Promise<void>,
) => {
  // Reset context before each command execution
  clearContext();
  return async (...args: T) => {
    try {
      await handler(...args);
    } catch (error) {
      handleCommandError(error as { message?: string; stack?: string; code?: number }, commandName);
    }
  };
};

const program = new Command();

program.name('si').description('CLI for ServerlessInsight').version(getVersion());

program
  .command('show')
  .description('show string')
  .action(
    actionWrapper('show', async (options) => {
      await setContext({ ...options });
      const context = getContext();
      const result = await getIamInfo(context);
      console.log(lang.__('RESULT', { result: JSON.stringify(result) }));
    }),
  );

program
  .command('validate [stackName]')
  .description('validate serverless Iac yaml')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .action(
    actionWrapper('validate', async (stackName, { file, stage }) => {
      logger.debug(lang.__('LOG_COMMAND_INFO'));
      await validate(stackName, { stage, location: file });
    }),
  );

program
  .command('plan <stackName>')
  .description('generate and show deployment plan (Tencent provider only)')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .option('-r, --region <region>', 'specify the region')
  .option('-v, --provider <provider>', 'specify the provider')
  .option('-k, --accessKeyId <accessKeyId>', 'specify the AccessKeyId')
  .option('-x, --accessKeySecret <accessKeySecret>', 'specify the AccessKeySecret')
  .option('-n, --securityToken <securityToken>', 'specify the SecurityToken')
  .action(
    actionWrapper(
      'plan',
      async (
        stackName,
        { stage, file, region, provider, accessKeyId, accessKeySecret, securityToken },
      ) => {
        await plan(stackName, {
          stage,
          location: file,
          region,
          provider,
          accessKeyId,
          accessKeySecret,
          securityToken,
        });
      },
    ),
  );

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
    actionWrapper(
      'deploy',
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
    ),
  );

program
  .command('template <stackName>')
  .description('print platform specific infrastructure as code template')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .option('-t, --format <type>', 'output content type (JSON or YAML)', 'JSON')
  .action(
    actionWrapper('template', async (stackName, { format, file, stage }) => {
      await template(stackName, { format, location: file, stage });
    }),
  );

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
    actionWrapper(
      'destroy',
      async (
        stackName,
        { file, region, provider, accessKeyId, accessKeySecret, securityToken },
      ) => {
        await destroyStack(stackName, {
          location: file,
          region,
          provider,
          accessKeyId,
          accessKeySecret,
          securityToken,
        });
      },
    ),
  );

program
  .command('local <stackName>')
  .description('run Serverless application locally for debugging')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage', 'default')
  .option('-p, --port <port>', 'specify the port', '3000')
  .option('-d, --debug', 'enable debug mode')
  .option('-w, --watch', 'enable file watch', true)
  .action(
    actionWrapper('local', async (stackName, { stage, port, debug, watch, file }) => {
      await runLocal(stackName, {
        stage,
        port: Number(port) || 3000,
        debug: !!debug,
        watch: typeof watch === 'boolean' ? watch : true,
        location: file,
      });
    }),
  );

program.parse();
