export const splitDomain = (domain: string) => {
  const parts = domain.split('.');
  const rr = parts.length > 2 ? parts[0] : '@';
  const domainName = parts.length > 2 ? parts.slice(1).join('.') : domain;

  return { rr, domainName };
};
