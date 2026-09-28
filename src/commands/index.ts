#! /usr/bin/env node
import { Command } from 'commander';
import {
  clearContext,
  getIacLocation,
  getVersion,
  logger,
  setContext,
  setIac,
  getContext,
} from '../common';
import { validate } from './validate';
import { deploy } from './deploy';
import { destroyStack } from './destroy';
import { runLocal } from './local';
import { plan } from './plan';
import { forceUnlockCommand } from './forceUnlock';
import { show } from './show';
import { schema } from './schema';
import { login } from './login';
import { logout } from './logout';
import { whoami } from './whoami';
import { migrate } from './migrate';
import { lang, hasLangKey, lookupErrorCode } from '../lang';
import { isJsonMode, setJsonMode, writeJson } from '../common/jsonOutput';
import { parseYaml, revalYaml } from '../parser';

const MAX_ERROR_MESSAGE_LENGTH = 2000;
const truncateErrorMessage = (message: string | undefined): string => {
  if (!message) return '';
  return message.length > MAX_ERROR_MESSAGE_LENGTH
    ? `${message.slice(0, MAX_ERROR_MESSAGE_LENGTH)}… (truncated ${message.length} chars)`
    : message;
};

/**
 * Issue #250: a thrown error's stable machine code is the i18n key behind its
 * message. Errors may already carry a `code` (an i18n key); otherwise the
 * message is mapped back through the catalogs — locale-independent, so the
 * code is identical under LANG=zh_CN and LANG=en_US.
 */
const resolveErrorCode = (error: { code?: unknown; message?: string }): string | undefined => {
  if (typeof error?.code === 'string' && hasLangKey(error.code)) {
    return error.code;
  }
  const fromMessage = lookupErrorCode(error?.message);
  if (fromMessage) {
    return fromMessage;
  }
  return typeof error?.code === 'string' ? error.code : undefined;
};

// Let queued stdout writes flush (async on macOS pipes) before the process
// ends, so a piped `si ... --json | jq` never sees a truncated document.
const flushStdoutAndExit = (exitCode: number): void => {
  process.stdout.write('', () => process.exit(exitCode));
};

// Global error handler
const handleCommandError = (
  error: { message?: string; stack?: string; code?: number; isPartialFailure?: boolean },
  commandName: string,
): void => {
  // Skip logging if already logged by handlePartialFailure
  if (!error?.isPartialFailure) {
    // Log error message as string to preserve newlines
    logger.error(
      lang.__('COMMAND_FAILED', {
        commandName,
        error: truncateErrorMessage(error?.message) || 'Unknown error occurred',
      }),
    );
  }

  const errorCode = resolveErrorCode(error);
  if (errorCode) {
    logger.error(lang.__('ERROR_CODE', { code: errorCode }));
  }

  if (error?.stack && process.env.DEBUG) {
    logger.debug(lang.__('STACK_TRACE', { stack: error.stack }));
  }

  if (isJsonMode()) {
    writeJson({
      error: {
        code: errorCode ?? 'UNKNOWN',
        message: truncateErrorMessage(error?.message) || 'Unknown error occurred',
      },
    });
  }

  flushStdoutAndExit(1);
};

const actionWrapper = <T extends unknown[]>(
  commandName: string,
  handler: (...args: T) => Promise<void>,
) => {
  // Reset context before each command execution
  clearContext();
  return async (...args: T) => {
    setJsonMode(false);
    try {
      await handler(...args);
    } catch (error) {
      handleCommandError(error as { message?: string; stack?: string; code?: number }, commandName);
    }
  };
};

const program = new Command();

program.name('si').description(lang.__('CMD_ROOT_DESC')).version(getVersion());

program
  .command('login')
  .description(lang.__('CMD_LOGIN_DESC'))
  .option('--si-api-key <key>', lang.__('OPT_SI_API_KEY_EXISTING'))
  .action(
    actionWrapper('login', async ({ siApiKey }) => {
      await login({ siApiKey });
    }),
  );

program
  .command('logout')
  .description(lang.__('CMD_LOGOUT_DESC'))
  .action(
    actionWrapper('logout', async () => {
      await logout();
    }),
  );

program
  .command('whoami')
  .description(lang.__('CMD_WHOAMI_DESC'))
  .action(
    actionWrapper('whoami', async () => {
      await whoami();
    }),
  );

program
  .command('schema')
  .description(lang.__('CMD_SCHEMA_DESC'))
  .option('-o, --output <path>', lang.__('OPT_SCHEMA_OUTPUT'))
  .action(
    actionWrapper('schema', async ({ output }) => {
      await schema({ output });
    }),
  );

program
  .command('show')
  .description(lang.__('CMD_SHOW_DESC'))
  .option('-f, --file <path>', lang.__('OPT_FILE'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'))
  .option('--json', lang.__('OPT_JSON'))
  .action(
    actionWrapper('show', async ({ file, stage, json }) => {
      setJsonMode(!!json);
      const iacLocation = getIacLocation(file);
      const rawIac = parseYaml(iacLocation);
      await setContext({
        location: file,
        stage,
        app: rawIac.app,
        service: rawIac.service,
        iacProvider: rawIac.provider,
        stages: rawIac.stages,
      });
      const context = getContext();
      const iac = revalYaml(iacLocation, context);
      setIac(iac);
      await show({ stage, location: file, iac, json: !!json });
    }),
  );

program
  .command('validate')
  .description(lang.__('CMD_VALIDATE_DESC'))
  .option('-f, --file <path>', lang.__('OPT_FILE'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'))
  .option('--json', lang.__('OPT_JSON'))
  .action(
    actionWrapper('validate', async ({ file, stage, json }) => {
      setJsonMode(!!json);
      logger.debug(lang.__('LOG_COMMAND_INFO'));
      const result = await validate({ stage, location: file, json: !!json });
      // Issue #250 exit-code convention: 0 = valid, 1 = validation failed.
      if (!result.valid) {
        process.exitCode = 1;
      }
    }),
  );

program
  .command('plan')
  .description(lang.__('CMD_PLAN_DESC'))
  .option('-f, --file <path>', lang.__('OPT_FILE'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'))
  .option('-r, --region <region>', lang.__('OPT_REGION'))
  .option('-v, --provider <provider>', lang.__('OPT_PROVIDER'))
  .option('-k, --accessKeyId <accessKeyId>', lang.__('OPT_ACCESS_KEY_ID'))
  .option('-x, --accessKeySecret <accessKeySecret>', lang.__('OPT_ACCESS_KEY_SECRET'))
  .option('-n, --securityToken <securityToken>', lang.__('OPT_SECURITY_TOKEN'))
  .option('--no-refresh', lang.__('OPT_NO_REFRESH'))
  .option('--json', lang.__('OPT_JSON'))
  .option('--no-color', lang.__('OPT_NO_COLOR'))
  .action(
    actionWrapper(
      'plan',
      async ({
        stage,
        file,
        region,
        provider,
        accessKeyId,
        accessKeySecret,
        securityToken,
        refresh,
        json,
        color,
      }) => {
        const result = await plan({
          stage,
          location: file,
          region,
          provider,
          accessKeyId,
          accessKeySecret,
          securityToken,
          refresh,
          json: !!json,
          noColor: color === false,
        });
        // Issue #250 exit-code convention (terraform-compatible):
        // 0 = no changes, 2 = changes present, 1 = execution error (handler).
        if (result.hasChanges) {
          process.exitCode = 2;
        }
      },
    ),
  );

// Issue #246: `diff` is the primary verb users say — it runs the same plan
// flow; `plan` stays for compatibility.
program
  .command('diff')
  .description(lang.__('CMD_DIFF_DESC'))
  .option('-f, --file <path>', lang.__('OPT_FILE'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'))
  .option('-r, --region <region>', lang.__('OPT_REGION'))
  .option('-v, --provider <provider>', lang.__('OPT_PROVIDER'))
  .option('-k, --accessKeyId <accessKeyId>', lang.__('OPT_ACCESS_KEY_ID'))
  .option('-x, --accessKeySecret <accessKeySecret>', lang.__('OPT_ACCESS_KEY_SECRET'))
  .option('-n, --securityToken <securityToken>', lang.__('OPT_SECURITY_TOKEN'))
  .option('--no-refresh', lang.__('OPT_NO_REFRESH'))
  .option('--json', lang.__('OPT_JSON'))
  .option('--no-color', lang.__('OPT_NO_COLOR'))
  .action(
    actionWrapper(
      'diff',
      async ({
        stage,
        file,
        region,
        provider,
        accessKeyId,
        accessKeySecret,
        securityToken,
        refresh,
        json,
        color,
      }) => {
        const result = await plan({
          stage,
          location: file,
          region,
          provider,
          accessKeyId,
          accessKeySecret,
          securityToken,
          refresh,
          json: !!json,
          noColor: color === false,
        });
        if (result.hasChanges) {
          process.exitCode = 2;
        }
      },
    ),
  );

program
  .command('deploy')
  .description(lang.__('CMD_DEPLOY_DESC'))
  .option('-f, --file <path>', lang.__('OPT_FILE'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'))
  .option('-r, --region <region>', lang.__('OPT_REGION'))
  .option('-v, --provider <provider>', lang.__('OPT_PROVIDER'))
  .option('-k, --accessKeyId <accessKeyId>', lang.__('OPT_ACCESS_KEY_ID'))
  .option('-x, --accessKeySecret <accessKeySecret>', lang.__('OPT_ACCESS_KEY_SECRET'))
  .option('-n, --securityToken <securityToken>', lang.__('OPT_SECURITY_TOKEN'))
  .option('--si-api-key <key>', lang.__('OPT_SI_API_KEY'))
  .option('-y, --auto-approve', lang.__('OPT_AUTO_APPROVE'))
  .option('--no-refresh', lang.__('OPT_NO_REFRESH'))
  .option(
    '-p, --parameter <key=value>',
    lang.__('OPT_PARAMETER'),
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
        siApiKey,
        autoApprove,
        refresh,
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
          siApiKey,
          autoApprove,
          refresh,
        });
      },
    ),
  );

program
  .command('migrate')
  .description(lang.__('CMD_MIGRATE_DESC'))
  .option('-f, --file <path>', lang.__('OPT_FILE'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'))
  .option('-r, --region <region>', lang.__('OPT_REGION'))
  .option('-v, --provider <provider>', lang.__('OPT_PROVIDER'))
  .option('-k, --accessKeyId <accessKeyId>', lang.__('OPT_ACCESS_KEY_ID'))
  .option('-x, --accessKeySecret <accessKeySecret>', lang.__('OPT_ACCESS_KEY_SECRET'))
  .option('-n, --securityToken <securityToken>', lang.__('OPT_SECURITY_TOKEN'))
  .option('--si-api-key <key>', lang.__('OPT_SI_API_KEY'))
  .option('-y, --auto-approve', lang.__('OPT_AUTO_APPROVE'))
  .option('--force', lang.__('OPT_FORCE'))
  .option('--no-marker', lang.__('OPT_NO_MARKER'))
  .option('--dry-run', lang.__('OPT_DRY_RUN'))
  .option('--rollback', lang.__('OPT_ROLLBACK'))
  .action(
    actionWrapper(
      'migrate',
      async ({
        stage,
        file,
        region,
        provider,
        accessKeyId,
        accessKeySecret,
        securityToken,
        siApiKey,
        autoApprove,
        force,
        marker,
        dryRun,
        rollback,
      }) => {
        await migrate({
          stage,
          location: file,
          region,
          provider,
          accessKeyId,
          accessKeySecret,
          securityToken,
          siApiKey,
          autoApprove,
          force,
          // Commander models `--no-marker` as the negation of an implicit
          // `marker` boolean (default true).
          noMarker: marker === false,
          dryRun,
          rollback,
        });
      },
    ),
  );

program
  .command('destroy')
  .option('-f, --file <path>', lang.__('OPT_FILE'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'))
  .option('-r, --region <region>', lang.__('OPT_REGION'))
  .option('-v, --provider <provider>', lang.__('OPT_PROVIDER'))
  .option('-k, --accessKeyId <accessKeyId>', lang.__('OPT_ACCESS_KEY_ID'))
  .option('-x, --accessKeySecret <accessKeySecret>', lang.__('OPT_ACCESS_KEY_SECRET'))
  .option('-n, --securityToken <securityToken>', lang.__('OPT_SECURITY_TOKEN'))
  .description(lang.__('CMD_DESTROY_DESC'))
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
  .description(lang.__('CMD_LOCAL_DESC'))
  .option('-f, --file <path>', lang.__('OPT_FILE'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'), 'default')
  .option('-d, --debug', lang.__('OPT_DEBUG'))
  .option('-w, --watch', lang.__('OPT_WATCH'), true)
  .action(
    actionWrapper('local', async ({ stage, debug, watch, file }) => {
      await runLocal({
        stage,
        debug: !!debug,
        watch: typeof watch === 'boolean' ? watch : true,
        location: file,
      });
    }),
  );

program
  .command('force-unlock <lockId>')
  .description(lang.__('CMD_FORCE_UNLOCK_DESC'))
  .option('-f, --file <path>', lang.__('OPT_FILE_REMOTE_REQUIRED'))
  .option('-s, --stage <stage>', lang.__('OPT_STAGE'))
  .option('-r, --region <region>', lang.__('OPT_REGION'))
  .option('-v, --provider <provider>', lang.__('OPT_PROVIDER'))
  .option('-k, --accessKeyId <accessKeyId>', lang.__('OPT_ACCESS_KEY_ID'))
  .option('-x, --accessKeySecret <accessKeySecret>', lang.__('OPT_ACCESS_KEY_SECRET'))
  .option('-n, --securityToken <securityToken>', lang.__('OPT_SECURITY_TOKEN'))
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
