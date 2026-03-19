import {
  isNetworkTimeoutError,
  isDomainAlreadyBoundError,
} from '../../../src/common/aliyunClient/apigwOperations';

jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

jest.mock('../../../src/common/stateManager', () => ({
  getResource: jest.fn(),
  setResource: jest.fn((_state, _id, resource) => resource),
  removeResource: jest.fn(),
}));

jest.mock('../../../src/common/sidUtils', () => ({
  buildSid: jest.fn((_provider, _service, _stage, id) => `sid-${id}`),
}));

describe('isNetworkTimeoutError', () => {
  it('should return true for RequestTimeoutError by name', () => {
    const error = { name: 'RequestTimeoutError' };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for ConnectTimeout by name', () => {
    const error = { name: 'ConnectTimeout' };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for RequestTimeoutError by code', () => {
    const error = { code: 'RequestTimeoutError' };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for ConnectTimeout by code', () => {
    const error = { code: 'ConnectTimeout' };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for error message containing ConnectTimeout', () => {
    const error = {
      message: 'ConnectTimeout: Connect HTTPS://apigateway.aliyuncs.com failed',
    };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for error message containing RequestTimeoutError', () => {
    const error = {
      message: 'RequestTimeoutError: Request timed out after 30000ms',
    };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return false for non-timeout errors', () => {
    const error = { code: 'SingleDomainOwnershipCheckFail' };
    expect(isNetworkTimeoutError(error)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isNetworkTimeoutError(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNetworkTimeoutError(undefined)).toBe(false);
  });

  it('should return false for non-object values', () => {
    expect(isNetworkTimeoutError('timeout error')).toBe(false);
    expect(isNetworkTimeoutError(123)).toBe(false);
  });

  it('should return false for generic errors', () => {
    const error = new Error('Some other error');
    expect(isNetworkTimeoutError(error)).toBe(false);
  });
});

describe('isDomainAlreadyBoundError', () => {
  it('should return true for DomainAlreadyBind error code', () => {
    expect(isDomainAlreadyBoundError({ code: 'DomainAlreadyBind' })).toBe(true);
  });

  it('should return true for RepeatedCommit error code', () => {
    expect(isDomainAlreadyBoundError({ code: 'RepeatedCommit' })).toBe(true);
  });

  it('should return true for message containing bindingExists', () => {
    expect(isDomainAlreadyBoundError({ message: 'The domain bindingExists already' })).toBe(true);
  });

  it('should return true for message containing domain bindedbyother (case insensitive)', () => {
    expect(isDomainAlreadyBoundError({ message: 'Domain BindedByOther group' })).toBe(true);
  });

  it('should return false for timeout errors', () => {
    expect(isDomainAlreadyBoundError({ code: 'RequestTimeoutError' })).toBe(false);
  });

  it('should return false for ownership check errors', () => {
    expect(isDomainAlreadyBoundError({ code: 'SingleDomainOwnershipCheckFail' })).toBe(false);
  });

  it('should return false for null/undefined', () => {
    expect(isDomainAlreadyBoundError(null)).toBe(false);
    expect(isDomainAlreadyBoundError(undefined)).toBe(false);
  });

  it('should return false for non-object values', () => {
    expect(isDomainAlreadyBoundError('DomainAlreadyBind')).toBe(false);
    expect(isDomainAlreadyBoundError(42)).toBe(false);
  });

  it('should return false for generic errors', () => {
    expect(isDomainAlreadyBoundError(new Error('Some other error'))).toBe(false);
  });
});
