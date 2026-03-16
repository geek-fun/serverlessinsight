#! /usr/bin/env node
import { Command } from 'commander';
import {
  clearContext,
  getContext,
  getIacLocation,
  getIamInfo,
  getVersion,
  logger,
  setContext,
} from '../common';
import { validate } from './validate';
import { deploy } from './deploy';
import { template } from './template';
import { destroyStack } from './destroy';
import { runLocal } from './local';
import { plan } from './plan';
import { forceUnlockCommand } from './forceUnlock';
import { lang } from '../lang';
import { parseYaml } from '../parser';

// Global error handler
const handleCommandError = (
  error: { message?: string; stack?: string; code?: number; isPartialFailure?: boolean },
  commandName: string,
): never => {
  // Skip logging if already logged by handlePartialFailure
  if (!error?.isPartialFailure) {
    // Log error message as string to preserve newlines
    logger.error(
      lang.__('COMMAND_FAILED', {
        commandName,
        error: error?.message || 'Unknown error occurred',
      }),
    );
  }

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
  .option('-f, --file <path>', 'specify the yaml file')
  .action(
    actionWrapper('show', async (options) => {
      const iacLocation = getIacLocation(options.file);
      const rawIac = parseYaml(iacLocation);
      await setContext({ ...options, app: rawIac.app, service: rawIac.service });
      const context = getContext();
      const result = await getIamInfo(context);
      console.log(lang.__('RESULT', { result: JSON.stringify(result) }));
    }),
  );

program
  .command('validate')
  .description('validate serverless Iac yaml')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .action(
    actionWrapper('validate', async ({ file, stage }) => {
      logger.debug(lang.__('LOG_COMMAND_INFO'));
      await validate({ stage, location: file });
    }),
  );

program
  .command('plan')
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
      async ({ stage, file, region, provider, accessKeyId, accessKeySecret, securityToken }) => {
        await plan({
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
  .command('deploy')
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
      async ({
        stage,
        parameter,
        file,
        region,
        provider,
        accessKeyId,
        accessKeySecret,
        securityToken,
      }) => {
        await deploy({
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
  .command('template')
  .description('print platform specific infrastructure as code template')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .option('-t, --format <type>', 'output content type (JSON or YAML)', 'JSON')
  .action(
    actionWrapper('template', async ({ format, file, stage }) => {
      await template({ format, location: file, stage });
    }),
  );

program
  .command('destroy')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage')
  .option('-r, --region <region>', 'specify the region')
  .option('-v, --provider <provider>', 'specify the provider')
  .option('-k, --accessKeyId <accessKeyId>', 'specify the AccessKeyId')
  .option('-x, --accessKeySecret <accessKeySecret>', 'specify the AccessKeySecret')
  .option('-n, --securityToken <securityToken>', 'specify the SecurityToken')
  .description('destroy serverless stack')
  .action(
    actionWrapper(
      'destroy',
      async ({ file, stage, region, provider, accessKeyId, accessKeySecret, securityToken }) => {
        await destroyStack({
          location: file,
          stage,
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
  .command('local')
  .description('run Serverless application locally for debugging')
  .option('-f, --file <path>', 'specify the yaml file')
  .option('-s, --stage <stage>', 'specify the stage', 'default')
  .option('-p, --port <port>', 'specify the port', '3000')
  .option('-d, --debug', 'enable debug mode')
  .option('-w, --watch', 'enable file watch', true)
  .action(
    actionWrapper('local', async ({ stage, port, debug, watch, file }) => {
      await runLocal({
        stage,
        port: Number(port) || 3000,
        debug: !!debug,
        watch: typeof watch === 'boolean' ? watch : true,
        location: file,
      });
    }),
  );

program
  .command('force-unlock <lockId>')
  .description('manually remove a stuck lock (use with caution)')
  .option('-f, --file <path>', 'specify the yaml file (required for remote backends)')
  .option('-s, --stage <stage>', 'specify the stage')
  .option('-r, --region <region>', 'specify the region')
  .option('-v, --provider <provider>', 'specify the provider')
  .option('-k, --accessKeyId <accessKeyId>', 'specify the AccessKeyId')
  .option('-x, --accessKeySecret <accessKeySecret>', 'specify the AccessKeySecret')
  .option('-n, --securityToken <securityToken>', 'specify the SecurityToken')
  .action(
    actionWrapper(
      'force-unlock',
      async (
        lockId,
        { file, stage, region, provider, accessKeyId, accessKeySecret, securityToken },
      ) => {
        await forceUnlockCommand(lockId, {
          location: file,
          stage,
          region,
          provider,
          accessKeyId,
          accessKeySecret,
          securityToken,
        });
      },
    ),
  );

program.parse();
