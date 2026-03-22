const MULTI_LEVEL_TLDS: ReadonlySet<string> = new Set([
  // United Kingdom
  'co.uk',
  'org.uk',
  'me.uk',
  'net.uk',
  'ltd.uk',
  'plc.uk',
  'gov.uk',
  'nhs.uk',
  'police.uk',
  'mod.uk',
  'sch.uk',
  'ac.uk',
  // China
  'com.cn',
  'net.cn',
  'org.cn',
  'gov.cn',
  'edu.cn',
  'ac.cn',
  'mil.cn',
  // Australia
  'com.au',
  'net.au',
  'org.au',
  'gov.au',
  'edu.au',
  'asn.au',
  'id.au',
  // Brazil
  'com.br',
  'net.br',
  'org.br',
  'gov.br',
  'edu.br',
  // Argentina
  'com.ar',
  'net.ar',
  'org.ar',
  'gov.ar',
  // Japan
  'co.jp',
  'ne.jp',
  'or.jp',
  'go.jp',
  'ac.jp',
  'ad.jp',
  // South Korea
  'co.kr',
  'or.kr',
  'go.kr',
  'ac.kr',
  'ne.kr',
  // India
  'co.in',
  'net.in',
  'org.in',
  'gov.in',
  'edu.in',
  'nic.in',
  // New Zealand
  'co.nz',
  'net.nz',
  'org.nz',
  'govt.nz',
  'ac.nz',
  // South Africa
  'co.za',
  'net.za',
  'org.za',
  'gov.za',
  'ac.za',
  // Hong Kong
  'com.hk',
  'net.hk',
  'org.hk',
  'gov.hk',
  'edu.hk',
  // Taiwan
  'com.tw',
  'net.tw',
  'org.tw',
  'gov.tw',
  'edu.tw',
  // Singapore
  'com.sg',
  'net.sg',
  'org.sg',
  'gov.sg',
  'edu.sg',
]);

export const extractMainDomain = (domainName: string): string => {
  const parts = domainName.split('.');

  if (parts.length <= 2) {
    return domainName;
  }

  const potentialTld = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
  if (MULTI_LEVEL_TLDS.has(potentialTld)) {
    if (parts.length <= 3) {
      return domainName;
    }
    return parts.slice(-3).join('.');
  }

  return parts.slice(-2).join('.');
};

export const extractHostRecord = (fullDomain: string, mainDomain: string): string => {
  if (fullDomain === mainDomain) {
    return '@';
  }
  const suffix = `.${mainDomain}`;
  if (fullDomain.endsWith(suffix)) {
    return fullDomain.slice(0, -suffix.length);
  }
  return fullDomain;
};

/**
 * Derive the www variant of a domain by prepending "www."
 *
 * @example deriveWwwDomain("example.com") // "www.example.com"
 * @example deriveWwwDomain("www.example.com") // null (already has www prefix)
 * @example deriveWwwDomain("api.example.com") // "www.api.example.com" (subdomains also get www prepended)
 *
 * Note: This function prepends "www." to any domain that doesn't already start with "www.",
 * including subdomains. For example, "api.example.com" becomes "www.api.example.com".
 * Users should ensure the domain is appropriate for www binding before calling this function.
 */
export const deriveWwwDomain = (domain: string): string | null => {
  if (domain.startsWith('www.')) {
    return null;
  }
  return `www.${domain}`;
};
