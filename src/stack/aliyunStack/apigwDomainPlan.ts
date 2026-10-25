import { createHash } from 'node:crypto';

import { readPemContent } from '../../common/certUtils';
import { deriveWwwDomain } from '../../common/domainUtils';
import { cachedRefreshRead } from '../../common/refreshCache';
import type { ApigwGroupInfo, createAliyunClient } from '../../common/aliyunClient';
import type { Context, EventDomain, GatewayDomainUpdate, ResourceAttributes } from '../../types';
import { lang } from '../../lang';
import { inferProtocolConfig } from './apigwTypes';

type DomainSnapshot = Record<string, ResourceAttributes>;

export type ApigwDomainPlan = {
  before: DomainSnapshot;
  after: DomainSnapshot;
  updates: Record<string, GatewayDomainUpdate>;
  certificateVerified: boolean;
};

const fingerprint = (value: string | null): string | null =>
  value ? createHash('sha256').update(value.replace(/\s/g, '')).digest('hex') : null;

/** Compare readable binding fields without exposing certificate contents or private keys. */
export const planApigwDomains = async (
  context: Context,
  client: ReturnType<typeof createAliyunClient>,
  groupId: string,
  domain: NonNullable<EventDomain['domain']>,
  summaries: ApigwGroupInfo['customDomains'],
  removeCertificate = false,
): Promise<ApigwDomainPlan> => {
  const primary = String(domain.domain_name);
  const www = domain.www_bind_apex === true ? deriveWwwDomain(primary) : null;
  const names = [primary, ...(www ? [www] : [])];
  const redirect =
    inferProtocolConfig(domain.protocol as string | string[] | undefined).isHttpRedirectToHttps ??
    false;
  const certificate = domain.certificate_id
    ? (
        await cachedRefreshRead(context, `cas.getCertificate:${domain.certificate_id}`, () =>
          client.cas.getCertificate(String(domain.certificate_id)),
        )
      )?.cert
    : domain.certificate_body
      ? readPemContent(String(domain.certificate_body))
      : undefined;
  if (domain.certificate_id && !certificate)
    throw new Error(
      lang.__('CERT_REFERENCE_NOT_FOUND', { reference: String(domain.certificate_id) }),
    );
  const desiredFingerprint = certificate
    ? fingerprint(certificate)
    : removeCertificate
      ? null
      : undefined;
  const entries = await Promise.all(
    names.map(async (name) => {
      const summary = summaries?.find((entry) => entry.domainName === name);
      // An omitted summary entry is not proof of absence. Confirm against the detail API.
      const detail =
        !summary || certificate || removeCertificate
          ? await cachedRefreshRead(context, `apigw.getDomain:${groupId}:${name}`, () =>
              client.apigw.getDomain(groupId, name),
            )
          : undefined;
      const exists = detail === null ? false : detail || summary ? true : undefined;
      const actualFingerprint =
        detail?.certificateBody !== undefined ? fingerprint(detail.certificateBody) : undefined;
      const before: ResourceAttributes = {
        ...(exists !== undefined ? { exists } : {}),
        ...(summary?.isHttpRedirectToHttps !== undefined && exists !== false
          ? { redirectToHttps: summary.isHttpRedirectToHttps }
          : {}),
        ...(desiredFingerprint !== undefined && actualFingerprint !== undefined
          ? { certificateFingerprint: actualFingerprint }
          : {}),
      };
      const after: ResourceAttributes = {
        ...(exists !== undefined ? { exists: true } : {}),
        ...(summary?.isHttpRedirectToHttps !== undefined || exists === false
          ? { redirectToHttps: redirect }
          : {}),
        ...(desiredFingerprint !== undefined &&
        (actualFingerprint !== undefined || exists === false)
          ? { certificateFingerprint: desiredFingerprint }
          : {}),
      };
      const binding =
        exists === false ||
        (summary?.isHttpRedirectToHttps !== undefined &&
          summary.isHttpRedirectToHttps !== redirect);
      const certificateChanged =
        desiredFingerprint !== undefined &&
        (exists === false ||
          (actualFingerprint !== undefined && actualFingerprint !== desiredFingerprint));
      return {
        name,
        before,
        after,
        verified:
          exists === true &&
          desiredFingerprint !== undefined &&
          actualFingerprint === desiredFingerprint,
        update:
          binding || certificateChanged
            ? { exists: exists === true, binding, certificate: certificateChanged }
            : undefined,
      };
    }),
  );
  return {
    before: Object.fromEntries(entries.map((entry) => [entry.name, entry.before])),
    after: Object.fromEntries(entries.map((entry) => [entry.name, entry.after])),
    updates: Object.fromEntries(
      entries.flatMap((entry) => (entry.update ? [[entry.name, entry.update]] : [])),
    ),
    certificateVerified: entries.every((entry) => entry.verified),
  };
};
