import { isStringTemplateField } from '../../../src/parser/templateValues';

describe('template destination types', () => {
  it.each([
    ['events', 'gateway', 'domain', 'certificate_id'],
    ['functions', 'handler', 'domain', 'certificate_id'],
    ['buckets', 'assets', 'domains', 0, 'certificate_id'],
    ['buckets', 'assets', 'domains', 0, 'domain_name'],
    ['functions', 'handler', 'name'],
    ['functions', 'handler', 'environment', 'TOKEN'],
    ['functions', 'handler', 'network', 'subnet_ids', 0],
    ['functions', 'handler', 'iam', 'role', 'statements', 0, 'resource', 0],
    ['stages', 'prod', 'token'],
    ['vars', 'token'],
    ['tags', 'release'],
    ['provider', 'region'],
  ])('preserves strings at %j', (...path) => {
    expect(isStringTemplateField(path)).toBe(true);
  });

  it.each([
    ['functions', 'handler', 'memory'],
    ['functions', 'handler', 'timeout'],
    ['functions', 'handler', 'log'],
    ['functions', 'handler', 'triggers', 'timers', 0, 'enable'],
    ['buckets', 'assets', 'domains', 0, 'www_bind_apex'],
    ['events', 'gateway', 'domain', 'www_bind_apex'],
    ['functions', 'handler', 'unknown'],
    ['functions', 'handler', 'name', 0],
  ])('retains scalar inference or validation for %j', (...path) => {
    expect(isStringTemplateField(path)).toBe(false);
  });
});
