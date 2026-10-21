import { buildSid } from '../../common/sidUtils';
import { deriveWwwDomain } from '../../common/domainUtils';
import { remoteDiffersFromDesired } from '../../common/planCompare';
import type { VolcengineClient, ApigwDomainConfig } from '../../common/volcengineClient/types';
import type { Context, EventDomain, ResourceInstance } from '../../types';

export const desiredGatewayDomains = (
  event: EventDomain,
  serviceId: string,
): ApigwDomainConfig[] => {
  if (!event.domain) return [];
  const name = String(event.domain.domain_name);
  const www = event.domain.www_bind_apex === true ? deriveWwwDomain(name) : null;
  return [name, ...(www ? [www] : [])].map((domainName) => ({
    serviceId,
    domainName,
    certificateId: String(event.domain!.certificate_id ?? ''),
    protocol: Array.isArray(event.domain!.protocol)
      ? event.domain!.protocol.map(String)
      : [String(event.domain!.protocol ?? 'HTTP')],
    sslRedirect: event.domain!.protocol === 'HTTPS',
  }));
};

export const reconcileGatewayDomains = async (
  context: Context,
  event: EventDomain,
  serviceId: string,
  existing: ResourceInstance[],
  client: VolcengineClient,
  onRecord?: (instance: ResourceInstance) => void,
): Promise<ResourceInstance[]> => {
  const desired = desiredGatewayDomains(event, serviceId);
  const owned = existing.filter((instance) => instance.type === 'VOLCENGINE_APIGW_DOMAIN');
  const remove = async (id: string): Promise<void> => {
    try {
      await client.apigw.deleteCustomDomain(id);
    } catch (error) {
      if (!['NotFound', 'DomainNotFound'].includes((error as { code: string }).code)) throw error;
    }
  };
  const reads = await Promise.all(
    desired.map(async (config) => {
      const recorded = owned.find((instance) => instance.domainName === config.domainName);
      return {
        config,
        recorded,
        live: recorded ? await client.apigw.getCustomDomain(recorded.id) : null,
      };
    }),
  );
  const retained = await reads.reduce(
    async (pending, { config, recorded, live }) => {
      const previous = await pending;
      const id = live ? recorded!.id : await client.apigw.createCustomDomain(config);
      if (
        live &&
        remoteDiffersFromDesired({ ...live, certificateId: live.certificateId ?? '' }, config)
      ) {
        await client.apigw.updateCustomDomain(id, config);
      }
      const instance = {
        type: 'VOLCENGINE_APIGW_DOMAIN',
        id,
        sid: buildSid('volcengine', 'apigw', context.stage, id),
        ...config,
      };
      onRecord?.(instance);
      return [...previous, instance];
    },
    Promise.resolve([] as ResourceInstance[]),
  );
  await Promise.all(
    owned
      .filter((instance) => !desired.some((config) => config.domainName === instance.domainName))
      .map((instance) => remove(instance.id)),
  );
  return retained;
};
