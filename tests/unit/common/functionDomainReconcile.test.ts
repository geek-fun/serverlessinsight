import {
  aggregateFunctionDomainBindings,
  canonicalFunctionDomains,
  collectStackFunctionNames,
  DEFAULT_FUNCTION_QUALIFIER,
  DEFAULT_FUNCTION_ROUTE_PATH,
  isValidFunctionRoutePath,
  mapFunctionProtocol,
  mergeDomainRoutes,
  normalizeFunctionDomainName,
  normalizeFunctionProtocol,
  routesEqual,
  routesReferenceStackFunctions,
  storedFunctionDomainBindings,
  storedFunctionDomainCertHash,
  toFunctionDomainRoutes,
} from '../../../src/common/functionDomainReconcile';

describe('normalizeFunctionProtocol (issue #286)', () => {
  it('accepts scalar and array forms into a canonical sorted set', () => {
    expect(normalizeFunctionProtocol('HTTPS')).toEqual(['HTTPS']);
    expect(normalizeFunctionProtocol('http')).toEqual(['HTTP']);
    expect(normalizeFunctionProtocol(['HTTPS', 'HTTP'])).toEqual(['HTTP', 'HTTPS']);
    expect(normalizeFunctionProtocol(['HTTP', 'HTTP'])).toEqual(['HTTP']);
  });

  it('restores the documented [HTTPS] default on empty input', () => {
    expect(normalizeFunctionProtocol(undefined)).toEqual(['HTTPS']);
    expect(normalizeFunctionProtocol([])).toEqual(['HTTPS']);
  });
});

describe('mapFunctionProtocol', () => {
  it('emits the combined form per provider for dual protocols', () => {
    expect(mapFunctionProtocol('aliyun', ['HTTP', 'HTTPS'])).toBe('HTTP,HTTPS');
    expect(mapFunctionProtocol('tencent', ['HTTP', 'HTTPS'])).toBe('HTTP&HTTPS');
  });

  it('passes single protocols through unchanged', () => {
    expect(mapFunctionProtocol('aliyun', ['HTTPS'])).toBe('HTTPS');
    expect(mapFunctionProtocol('tencent', ['HTTP'])).toBe('HTTP');
  });
});

describe('isValidFunctionRoutePath', () => {
  it.each([
    ['/', true],
    ['/api', true],
    ['/api/*', true],
    ['/*', true],
    ['api/*', false],
    ['/*/', false],
    ['/api/*/x', false],
    ['/api/*/*', false],
  ])('%j → %j', (path, valid) => {
    expect(isValidFunctionRoutePath(path)).toBe(valid);
  });
});

describe('mergeDomainRoutes (subtractive reconcile, issue #286)', () => {
  const live = [
    { path: '/api/*', functionName: 'fn_api' },
    { path: '/admin/*', functionName: 'fn_admin' },
    { path: '/*', functionName: 'fn_default' },
  ];

  it('replaces only the owning function routes and keeps others', () => {
    const merged = mergeDomainRoutes(live, { functionName: 'fn_api', paths: ['/v2/*'] }, 'apply');
    expect(merged).toEqual([
      { path: '/*', functionName: 'fn_default' },
      { path: '/admin/*', functionName: 'fn_admin' },
      { path: '/v2/*', functionName: 'fn_api' },
    ]);
  });

  it('expands multiple paths of one function into multiple routes', () => {
    const merged = mergeDomainRoutes(
      live,
      { functionName: 'fn_api', paths: ['/a/*', '/b/*'] },
      'apply',
    );
    expect(merged.filter((route) => route.functionName === 'fn_api')).toHaveLength(2);
  });

  it('remove mode drops every route of the owning function only', () => {
    const merged = mergeDomainRoutes(live, { functionName: 'fn_api', paths: [] }, 'remove');
    expect(merged).toEqual([
      { path: '/*', functionName: 'fn_default' },
      { path: '/admin/*', functionName: 'fn_admin' },
    ]);
  });

  it('remove mode with only own routes yields an empty table (domain release)', () => {
    expect(
      mergeDomainRoutes(
        [{ path: '/*', functionName: 'fn_api' }],
        { functionName: 'fn_api', paths: ['/*'] },
        'remove',
      ),
    ).toEqual([]);
  });

  it('is deterministic regardless of live route order', () => {
    const a = mergeDomainRoutes(live, { functionName: 'fn_api', paths: ['/x/*'] }, 'apply');
    const b = mergeDomainRoutes(
      [...live].reverse(),
      { functionName: 'fn_api', paths: ['/x/*'] },
      'apply',
    );
    expect(a).toEqual(b);
  });
});

describe('routesEqual', () => {
  it('compares as normalized sets, ignoring order and qualifier', () => {
    expect(
      routesEqual(
        [
          { path: '/a/*', functionName: 'fn1' },
          { path: '/b/*', functionName: 'fn2', qualifier: DEFAULT_FUNCTION_QUALIFIER },
        ],
        [
          { path: '/b/*', functionName: 'fn2' },
          { path: '/a/*', functionName: 'fn1' },
        ],
      ),
    ).toBe(true);
    expect(
      routesEqual([{ path: '/a/*', functionName: 'fn1' }], [{ path: '/a/*', functionName: 'fn2' }]),
    ).toBe(false);
    expect(routesEqual(undefined, [])).toBe(true);
  });
});

describe('aggregateFunctionDomainBindings', () => {
  it('groups multiple path bindings on one domain, first binding represents', () => {
    const aggregated = aggregateFunctionDomainBindings([
      {
        domain_name: 'API.Example.com',
        path: '/api/*',
        protocol: ['HTTPS'],
        certificate_id: 'cert-1',
      },
      { domain_name: 'api.example.com', path: '/admin/*', protocol: ['HTTPS'] },
    ]);
    const entry = aggregated.get('api.example.com');
    expect(entry?.paths).toEqual(['/api/*', '/admin/*']);
    expect(entry?.representative.certificate_id).toBe('cert-1');
  });

  it('returns an empty map for undefined bindings', () => {
    expect(aggregateFunctionDomainBindings(undefined).size).toBe(0);
  });
});

describe('canonicalFunctionDomains', () => {
  it('sorts by domain and path so YAML reordering never produces a plan change', () => {
    const a = canonicalFunctionDomains([
      { domain_name: 'b.example.com', path: '/z/*', protocol: ['HTTPS'] },
      { domain_name: 'a.example.com', path: '/*', protocol: ['HTTPS'] },
    ]);
    const b = canonicalFunctionDomains([
      { domain_name: 'a.example.com', path: '/*', protocol: ['HTTPS'] },
      { domain_name: 'b.example.com', path: '/z/*', protocol: ['HTTPS'] },
    ]);
    expect(a).toEqual(b);
    expect(a[0].domain_name).toBe('a.example.com');
  });

  it('records certificate_hash for content-change detection (issue #283 pattern)', () => {
    const [entry] = canonicalFunctionDomains([
      {
        domain_name: 'api.example.com',
        path: '/*',
        protocol: ['HTTPS'],
        certificate_id: 'cert-1',
      },
    ]);
    expect(entry.certificate_hash).toBeTruthy();
    expect(entry.certificate_private_key).toBeNull();

    const [inline] = canonicalFunctionDomains([
      {
        domain_name: 'api.example.com',
        path: '/*',
        protocol: ['HTTPS'],
        certificate_body: 'CERT',
        certificate_private_key: 'KEY',
      },
    ]);
    expect(inline.certificate_hash).toBeTruthy();
    expect(inline.certificate_private_key).toBe('(managed)');
  });
});

describe('storedFunctionDomainBindings', () => {
  it('skips instances without a usable domain id and mismatched types', () => {
    const stored = storedFunctionDomainBindings(
      [
        { type: 'ALIYUN_FC3_CUSTOM_DOMAIN', id: '   ' },
        { type: 'ALIYUN_FC3_CUSTOM_DOMAIN' },
        { type: 'ALIYUN_FC3_FUNCTION', id: 'fn' },
      ],
      'ALIYUN_FC3_CUSTOM_DOMAIN',
    );
    expect(stored.size).toBe(0);
  });

  it('reads per-domain paths from instances; pre-#286 instances default to /*', () => {
    const stored = storedFunctionDomainBindings(
      [
        { type: 'ALIYUN_FC3_CUSTOM_DOMAIN', id: 'API.Example.com', paths: ['/api/*', '/x/*'] },
        { type: 'ALIYUN_FC3_CUSTOM_DOMAIN', id: 'legacy.example.com' },
        { type: 'ALIYUN_FC3_FUNCTION', id: 'fn' },
      ],
      'ALIYUN_FC3_CUSTOM_DOMAIN',
    );
    expect(stored.get('api.example.com')?.paths).toEqual(['/api/*', '/x/*']);
    expect(stored.get('legacy.example.com')?.paths).toEqual([DEFAULT_FUNCTION_ROUTE_PATH]);
    expect(stored.size).toBe(2);
  });
});

describe('storedFunctionDomainCertHash', () => {
  it('reads the canonical entry hash and falls back to the legacy domain reference', () => {
    const canonical = storedFunctionDomainCertHash(
      { domains: [{ domain_name: 'api.example.com', certificate_hash: 'hash-1' }] },
      'API.Example.com',
    );
    expect(canonical).toBe('hash-1');

    const legacy = storedFunctionDomainCertHash(
      { domain: { domain_name: 'api.example.com', certificate_id: 'cert-9' } },
      'api.example.com',
    );
    expect(legacy).toBeTruthy();

    expect(storedFunctionDomainCertHash({}, 'api.example.com')).toBeUndefined();
  });
});

describe('route helpers', () => {
  it('toFunctionDomainRoutes maps provider payloads defensively', () => {
    expect(
      toFunctionDomainRoutes({ routes: [{ path: '/a/*', functionName: 'fn', qualifier: '1' }] }),
    ).toEqual([{ path: '/a/*', functionName: 'fn', qualifier: '1' }]);
    expect(toFunctionDomainRoutes(undefined)).toEqual([]);
  });

  it('routesReferenceStackFunctions detects ownership via function names', () => {
    const names = collectStackFunctionNames([{ name: 'fn_a' }, { name: 'fn_b' }], 'fn_c');
    expect(routesReferenceStackFunctions([{ path: '/', functionName: 'fn_b' }], names)).toBe(true);
    expect(routesReferenceStackFunctions([{ path: '/', functionName: 'zzz' }], names)).toBe(false);
  });

  it('normalizeFunctionDomainName lowercases and trims', () => {
    expect(normalizeFunctionDomainName('  API.Example.COM ')).toBe('api.example.com');
  });
});
