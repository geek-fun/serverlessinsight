import { readPemContent } from '../../common/certUtils';
import { deriveWwwDomain } from '../../common/domainUtils';
import { assertPlanIdentity } from '../../common/planCapabilities';
import { definitionsDiffer, managedDefinition } from '../../common/planCompare';
import { Context, EventDomain, Plan, PlanItem, StateFile } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { logger } from '../../common/logger';
import {
  buildAliyunApigwApiName,
  buildEventLogSnapshot,
  cloudApigwApiToTriggerAttributes,
  cloudApigwGroupToDefinition,
  cloudGatewayLogToLogConfig,
  inferProtocolConfig,
  eventToApigwGroupConfig,
  extractApigwGroupDefinition,
  extractEventDomainDefinition,
  generateApiKey,
} from './apigwTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { getIacDefinition, isFunctionDomain } from '../../common/iacHelper';
import { mergeLiveBefore, remoteDiffersFromDesired } from '../../common/planCompare';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';
import { lang } from '../../lang';

const DNS_SUB_RESOURCE_SUFFIXES = ['.dns_verification', '.dns_txt_verification'];

const isDnsSubResource = (logicalId: string): boolean =>
  DNS_SUB_RESOURCE_SUFFIXES.some((suffix) => logicalId.endsWith(suffix));

const planEventDeletion = (logicalId: string, definition: Record<string, unknown>): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'ALIYUN_APIGW',
  changes: { before: definition },
});

const buildDesiredTriggerApiName = (
  event: EventDomain,
  trigger: EventDomain['triggers'][number],
  stage: string,
): string =>
  buildAliyunApigwApiName(
    event.name as string,
    stage,
    generateApiKey(trigger.method as string, trigger.path as string),
  );

const resolveTriggerBackend = (iac: Context['iac'], backendRef: string): string => {
  if (!iac) {
    return backendRef;
  }
  const functionDef = getIacDefinition(iac, backendRef);
  if (!functionDef || !isFunctionDomain(functionDef)) {
    return backendRef;
  }
  return functionDef.name;
};

/**
 * Generate plan for API Gateway events
 */
export const generateApigwPlan = async (
  context: Context,
  state: StateFile,
  events: Array<EventDomain> | undefined,
  serviceName: string,
): Promise<Plan> => {
  // If no events, check if we need to delete existing ones
  if (!events || events.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('events.') && !isDnsSubResource(logicalId))
      .map(([logicalId, resourceState]) => planEventDeletion(logicalId, resourceState.definition));
    return { items };
  }

  const desiredLogicalIds = new Set(events.map((e) => `events.${e.key}`));

  const eventItems = await mapWithConcurrency(
    events,
    PLAN_READ_CONCURRENCY,
    async (event): Promise<PlanItem> => {
      const logicalId = `events.${event.key}`;
      const currentState = getResource(state, logicalId);
      const groupConfig = eventToApigwGroupConfig(event, serviceName, context.stage);
      const groupDefinition = extractApigwGroupDefinition(groupConfig);
      const client = createAliyunClient(context);

      // Build desired definition including triggers
      const logSnapshot = buildEventLogSnapshot(event, context);
      const desiredDefinition = {
        ...groupDefinition,
        triggers: event.triggers.map((t) => ({
          method: t.method,
          path: t.path,
          backend: t.backend,
        })),
        domain: extractEventDomainDefinition(event.domain),
        ...(logSnapshot ? { log: logSnapshot } : {}),
      };

      if (currentState)
        assertPlanIdentity(
          logicalId,
          'ALIYUN_APIGW',
          currentState.definition || {},
          desiredDefinition,
        );

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named group already exists WITHOUT our ownership tag it
        // may belong to another project — fail fast in the plan instead of
        // letting the executor discover it mid-deploy.
        const remoteGroup = await cachedRefreshRead(
          context,
          `apigw.findApiGroupByName:${groupConfig.groupName}`,
          () => client.apigw.findApiGroupByName(groupConfig.groupName),
        );
        if (remoteGroup?.groupId) {
          if (!isOwnedByStack(context, logicalId, remoteGroup.tags)) {
            throw new Error(
              lang.__('RESOURCE_EXISTS_NOT_OWNED', {
                resourceType: 'API group',
                resourceName: groupConfig.groupName,
                tagKey: OWNERSHIP_TAG_KEY,
              }),
            );
          }
          if (!currentState) {
            // Resource exists remotely (and is ours) but not in state — drift:
            // import it via update rather than trying to create it again.
            return {
              logicalId,
              action: 'update',
              resourceType: 'ALIYUN_APIGW',
              changes: { after: desiredDefinition },
              drifted: true,
            };
          }
        }

        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_APIGW',
          changes: { after: desiredDefinition },
        };
      }

      // State exists, check for changes
      try {
        const groupInstance = currentState.instances.find((i) => i.type === 'ALIYUN_APIGW_GROUP');

        const currentDefinition = currentState.definition || {};
        const definitionChanged = definitionsDiffer(currentDefinition, desiredDefinition);
        if (context.refresh === false) {
          return definitionChanged
            ? {
                logicalId,
                action: 'update',
                resourceType: 'ALIYUN_APIGW',
                changes: {
                  before: managedDefinition(currentDefinition, desiredDefinition),
                  after: managedDefinition(desiredDefinition),
                },
              }
            : { logicalId, action: 'noop', resourceType: 'ALIYUN_APIGW' };
        }

        let groupRemoteDiffers = false;
        let triggersDiffer = false;
        let domainDiffers = false;
        // Issue #246: live group attributes become the diff baseline when the
        // group was readable; trigger-level drift has no attribute mapping and
        // is surfaced as a drift reason instead.
        let liveGroupAttrs: Record<string, unknown> | undefined;

        if (groupInstance) {
          const remoteGroup = await cachedRefreshRead(
            context,
            `apigw.getApiGroup:${groupInstance.id}`,
            () => client.apigw.getApiGroup(groupInstance.id),
          );

          if (!remoteGroup) {
            // Resource in state but not remotely - needs recreate
            return {
              logicalId,
              action: 'create',
              resourceType: 'ALIYUN_APIGW',
              changes: { before: currentState.definition, after: desiredDefinition },
              drifted: true,
            };
          }

          liveGroupAttrs = cloudApigwGroupToDefinition(remoteGroup);
          if (
            event.domain &&
            desiredDefinition.domain?.cdnEnabled !== true &&
            remoteGroup.customDomains !== undefined
          ) {
            const names = [
              String(event.domain.domain_name),
              ...(event.domain.www_bind_apex === true
                ? [deriveWwwDomain(String(event.domain.domain_name))].filter(
                    (name): name is string => name !== null,
                  )
                : []),
            ];
            const expectedRedirect =
              inferProtocolConfig(event.domain.protocol as string | string[] | undefined)
                .isHttpRedirectToHttps ?? false;
            const desiredCertificate = event.domain.certificate_id
              ? (
                  await cachedRefreshRead(
                    context,
                    `cas.getCertificate:${event.domain.certificate_id}`,
                    () => client.cas.getCertificate(String(event.domain!.certificate_id)),
                  )
                )?.cert
              : event.domain.certificate_body
                ? readPemContent(String(event.domain.certificate_body))
                : undefined;
            if (event.domain.certificate_id && !desiredCertificate)
              throw new Error(
                lang.__('CERT_REFERENCE_NOT_FOUND', {
                  reference: String(event.domain.certificate_id),
                }),
              );
            const certificateValue = (value?: string | null): string =>
              (value ?? '').replace(/\s/g, '');
            for (const name of names) {
              const summary = remoteGroup.customDomains.find(
                (domain) => domain.domainName === name,
              );
              if (!summary) {
                domainDiffers = true;
                continue;
              }
              if (
                expectedRedirect !== undefined &&
                summary.isHttpRedirectToHttps !== undefined &&
                expectedRedirect !== summary.isHttpRedirectToHttps
              )
                domainDiffers = true;
              if (desiredCertificate) {
                const detail = await cachedRefreshRead(
                  context,
                  `apigw.getDomain:${groupInstance.id}:${name}`,
                  () => client.apigw.getDomain(groupInstance.id, name),
                );
                if (
                  !detail ||
                  certificateValue(detail.certificateBody) !== certificateValue(desiredCertificate)
                )
                  domainDiffers = true;
              }
            }
            const cloudDomain = remoteGroup.customDomains.find(
              (domain) => domain.domainName === event.domain!.domain_name,
            );
            liveGroupAttrs.domain = cloudDomain
              ? {
                  ...(currentDefinition.domain as Record<string, unknown> | undefined),
                  domainName: cloudDomain.domainName,
                }
              : null;
          }
          if (event.log) {
            const log = await cachedRefreshRead(context, 'apigw.describeGatewayLogConfig', () =>
              client.apigw.describeGatewayLogConfig(),
            );
            liveGroupAttrs.log = cloudGatewayLogToLogConfig(log) ?? { logEnabled: false };
          }

          {
            groupRemoteDiffers = remoteDiffersFromDesired(liveGroupAttrs, desiredDefinition);

            if (event.triggers.length > 0) {
              const desiredApis = new Map<
                string,
                { method: string; path: string; backend: string }
              >(
                event.triggers.map((trigger) => {
                  const apiName = buildDesiredTriggerApiName(event, trigger, context.stage);
                  return [
                    apiName,
                    {
                      method: trigger.method as string,
                      path: trigger.path as string,
                      backend: resolveTriggerBackend(context.iac, String(trigger.backend)),
                    },
                  ] as [string, { method: string; path: string; backend: string }];
                }),
              );

              const cloudSummaries = ((await cachedRefreshRead(
                context,
                `apigw.listApisByGroup:${groupInstance.id}`,
                () => client.apigw.listApisByGroup(groupInstance.id),
              )) ?? []) as Array<{ apiId: string; apiName: string }>;

              const cloudApis = new Map<
                string,
                { method?: string; path?: string; backend?: string }
              >();
              for (const summary of cloudSummaries) {
                // Only reconcile expected APIs — the executor never touches
                // same-group APIs outside our derived name set (buildCloudInstance
                // in apigwResource), so foreign/console-added APIs are ignored.
                if (!desiredApis.has(summary.apiName)) {
                  continue;
                }
                const apiInfo = await cachedRefreshRead(
                  context,
                  `apigw.getApi:${groupInstance.id}:${summary.apiId}`,
                  () => client.apigw.getApi(groupInstance.id, summary.apiId),
                );
                if (apiInfo) {
                  const attrs = cloudApigwApiToTriggerAttributes(apiInfo);
                  if (attrs.apiName) {
                    cloudApis.set(attrs.apiName, attrs);
                  }
                }
              }

              // A desired API absent from the cloud is recreated by the executor.
              triggersDiffer = [...desiredApis.keys()].sort().some((apiName) => {
                const desired = desiredApis.get(apiName);
                const cloud = cloudApis.get(apiName);
                if (!desired || !cloud) {
                  return true;
                }
                return (
                  desired.method !== cloud.method ||
                  desired.path !== cloud.path ||
                  desired.backend !== cloud.backend
                );
              });
            }
          }
        }

        const effectiveChanged = definitionsDiffer(
          mergeLiveBefore(currentDefinition, liveGroupAttrs ?? {}, desiredDefinition),
          desiredDefinition,
        );
        if (definitionChanged && !effectiveChanged && !triggersDiffer && !domainDiffers) {
          return {
            logicalId,
            action: 'noop',
            resourceType: 'ALIYUN_APIGW',
            stateUpdate: desiredDefinition,
          };
        }
        if (effectiveChanged || groupRemoteDiffers || triggersDiffer || domainDiffers) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'ALIYUN_APIGW',
            changes: {
              before: liveGroupAttrs
                ? mergeLiveBefore(currentDefinition, liveGroupAttrs, desiredDefinition)
                : managedDefinition(currentDefinition, desiredDefinition),
              after: managedDefinition(desiredDefinition),
            },
            ...(remoteDiffersFromDesired(liveGroupAttrs ?? {}, currentDefinition) ||
            (domainDiffers &&
              !definitionsDiffer(
                { domain: currentDefinition.domain },
                { domain: desiredDefinition.domain },
              )) ||
            (triggersDiffer &&
              !definitionsDiffer(currentDefinition, { triggers: desiredDefinition.triggers }))
              ? { drifted: true }
              : {}),
            ...(triggersDiffer || domainDiffers
              ? {
                  driftReasons: [
                    ...(triggersDiffer ? ['PLAN_DRIFT_TRIGGERS'] : []),
                    ...(domainDiffers ? ['PLAN_DRIFT_EVENT_DOMAIN'] : []),
                  ],
                }
              : {}),
          };
        }

        return { logicalId, action: 'noop', resourceType: 'ALIYUN_APIGW' };
      } catch (error: unknown) {
        logger.warn(
          lang.__('PLAN_LIVE_READ_FAILED', {
            logicalId,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
        throw error;
      }
    },
  );

  // Find resources in state that are no longer in config
  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => {
      if (!logicalId.startsWith('events.')) {
        return false;
      }
      if (desiredLogicalIds.has(logicalId)) {
        return false;
      }
      if (isDnsSubResource(logicalId)) {
        return false;
      }
      return true;
    })
    .map(([logicalId, resourceState]) => planEventDeletion(logicalId, resourceState.definition));

  return { items: [...eventItems, ...deletionItems] };
};
