import { parseTag } from '../../../src/parser/tagParser';

describe('parseTag', () => {
  it('should parse tags with all parameters', () => {
    const result = parseTag({ env: 'production', team: 'backend' }, 'myapp', 'myservice', 'prod');

    expect(result).toEqual([
      { key: 'iac-provider', value: 'ServerlessInsight' },
      { key: 'app', value: 'myapp' },
      { key: 'service', value: 'myservice' },
      { key: 'stage', value: 'prod' },
      { key: 'env', value: 'production' },
      { key: 'team', value: 'backend' },
    ]);
  });

  it('should use default empty strings when optional parameters are omitted', () => {
    const result = parseTag({ env: 'development' });

    expect(result).toEqual([
      { key: 'iac-provider', value: 'ServerlessInsight' },
      { key: 'app', value: '' },
      { key: 'service', value: '' },
      { key: 'stage', value: '' },
      { key: 'env', value: 'development' },
    ]);
  });

  it('should handle undefined tags', () => {
    const result = parseTag(undefined, 'myapp', 'myservice', 'dev');

    expect(result).toEqual([
      { key: 'iac-provider', value: 'ServerlessInsight' },
      { key: 'app', value: 'myapp' },
      { key: 'service', value: 'myservice' },
      { key: 'stage', value: 'dev' },
    ]);
  });

  it('should handle empty tags object', () => {
    const result = parseTag({}, 'myapp', 'myservice', 'dev');

    expect(result).toEqual([
      { key: 'iac-provider', value: 'ServerlessInsight' },
      { key: 'app', value: 'myapp' },
      { key: 'service', value: 'myservice' },
      { key: 'stage', value: 'dev' },
    ]);
  });

  it('should handle tags with all defaults', () => {
    const result = parseTag(undefined);

    expect(result).toEqual([
      { key: 'iac-provider', value: 'ServerlessInsight' },
      { key: 'app', value: '' },
      { key: 'service', value: '' },
      { key: 'stage', value: '' },
    ]);
  });

  it('should handle tags with single custom tag', () => {
    const result = parseTag({ version: 'v1.0.0' }, 'app', 'svc', 'stage');

    expect(result).toEqual([
      { key: 'iac-provider', value: 'ServerlessInsight' },
      { key: 'app', value: 'app' },
      { key: 'service', value: 'svc' },
      { key: 'stage', value: 'stage' },
      { key: 'version', value: 'v1.0.0' },
    ]);
  });
});
