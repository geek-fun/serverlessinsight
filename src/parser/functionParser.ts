import {
  FunctionDomain,
  FunctionDomainConfigParsed,
  FunctionGpuEnum,
  FunctionRaw,
  HttpTrigger,
  HttpTriggerRaw,
  NasStorageClassEnum,
  TimerTrigger,
  TimerTriggerRaw,
} from '../types';
import { isEmpty } from 'lodash';
import {
  parseBoolean,
  parseBooleanWithDefault,
  parseNumber,
  parseNumberWithDefault,
  parseStringWithDefault,
} from './parseUtils';
import { lang } from '../lang';
import { validateSiCron } from '../common/siCron';

const parseHttpTrigger = (
  raw: HttpTriggerRaw | undefined,
  fnKey: string,
): HttpTrigger | undefined => {
  if (!raw) return undefined;
  if (!raw.auth_type) {
    throw new Error(lang.__('HTTP_TRIGGER_AUTH_TYPE_REQUIRED', { functionName: fnKey }));
  }
  const authType = String(raw.auth_type);
  if (authType !== 'public' && authType !== 'iam') {
    throw new Error(lang.__('INVALID_HTTP_TRIGGER_AUTH_TYPE', { authType }));
  }
  return {
    auth_type: authType as 'public' | 'iam',
    access: raw.access?.map(String) as Array<'public' | 'internal'> | undefined,
  };
};

const parseTimerTriggers = (
  raw: Array<TimerTriggerRaw> | undefined,
  fnKey: string,
): Array<TimerTrigger> | undefined => {
  if (!raw || raw.length === 0) {
    return undefined;
  }
  // template refs (${vars.cron}) resolve at runtime — grammar is checked after
  const TEMPLATE_REF_PATTERN = /^\$\{[^}]+\}$/;
  const timers = raw.map((item) => {
    if (item.name === undefined || String(item.name).trim() === '') {
      throw new Error(lang.__('TIMER_TRIGGER_NAME_REQUIRED', { functionName: fnKey }));
    }
    const name = String(item.name);
    if (item.cron === undefined || String(item.cron).trim() === '') {
      throw new Error(lang.__('TIMER_TRIGGER_CRON_REQUIRED', { name }));
    }
    const cron = String(item.cron);
    if (!TEMPLATE_REF_PATTERN.test(cron)) {
      validateSiCron(cron);
    }
    return {
      name,
      cron,
      ...(item.payload !== undefined ? { payload: String(item.payload) } : {}),
      enable: parseBooleanWithDefault(item.enable, true),
      ...(item.description !== undefined ? { description: String(item.description) } : {}),
    };
  });

  const duplicate = timers.find(
    (timer, index) => timers.findIndex((peer) => peer.name === timer.name) !== index,
  );
  if (duplicate) {
    throw new Error(
      lang.__('TIMER_TRIGGER_DUPLICATE_NAME', { name: duplicate.name, functionName: fnKey }),
    );
  }
  return timers;
};

const parseDomain = (
  raw: FunctionRaw['domain'] | undefined,
): FunctionDomainConfigParsed | undefined => {
  if (!raw) return undefined;
  return {
    domain_name: String(raw.domain_name),
    certificate_id: raw.certificate_id ? String(raw.certificate_id) : undefined,
    protocol: parseStringWithDefault(raw.protocol, 'HTTPS'),
  };
};

export const parseFunction = (functions?: {
  [key: string]: FunctionRaw;
}): Array<FunctionDomain> | undefined => {
  if (isEmpty(functions)) {
    return undefined;
  }
  return Object.entries(functions).map(([key, func]) => {
    const httpTrigger = parseHttpTrigger(func.triggers?.http, key);
    const timerTriggers = parseTimerTriggers(func.triggers?.timer, key);
    const domain = parseDomain(func.domain);

    return {
      key,
      name: func.name,
      code: func.code
        ? {
            runtime: String(func.code.runtime),
            handler: func.code.handler,
            path: func.code.path,
          }
        : undefined,
      container: func.container
        ? {
            image: func.container.image,
            cmd: func.container.cmd,
            port: parseNumberWithDefault(func.container.port, 0),
          }
        : undefined,
      memory: parseNumber(func.memory),
      gpu: func.gpu as FunctionGpuEnum,
      timeout: parseNumber(func.timeout),
      iam: func.iam
        ? {
            role:
              func.iam.role !== undefined
                ? typeof func.iam.role === 'string'
                  ? func.iam.role
                  : {
                      ...(func.iam.role.name !== undefined
                        ? { name: String(func.iam.role.name) }
                        : {}),
                      ...(func.iam.role.managed_policies !== undefined
                        ? { managed_policies: func.iam.role.managed_policies.map(String) }
                        : {}),
                      ...(func.iam.role.statements !== undefined
                        ? {
                            statements: func.iam.role.statements.map((s) => {
                              const rawAction = s.action;
                              const rawResource = s.resource;
                              return {
                                sid: s.sid as string | undefined,
                                effect: s.effect as 'Allow' | 'Deny',
                                action: Array.isArray(rawAction)
                                  ? rawAction.map(String)
                                  : [String(rawAction)],
                                resource: Array.isArray(rawResource)
                                  ? rawResource.map(String)
                                  : [String(rawResource)],
                              };
                            }),
                          }
                        : {}),
                    }
                : undefined,
          }
        : undefined,
      environment: func.environment,
      log: parseBoolean(func.log),
      network: func.network,
      storage: {
        disk: parseNumber(func.storage?.disk),
        nas: func.storage?.nas?.map((nasItem) => ({
          mount_path: nasItem.mount_path,
          storage_class: nasItem.storage_class as NasStorageClassEnum,
        })),
      },
      ...(httpTrigger || timerTriggers
        ? {
            triggers: {
              ...(httpTrigger ? { http: httpTrigger } : {}),
              ...(timerTriggers ? { timer: timerTriggers } : {}),
            },
          }
        : {}),
      ...(domain ? { domain } : {}),
    };
  });
};
