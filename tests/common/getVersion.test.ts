import { getVersion } from '../../src/common';

jest.mock('../../package.json', () => ({
  version: '1.0.0',
}));

describe('getVersion', () => {
  it('should return the version from package.json', () => {
    expect(getVersion()).toBe('1.0.0');
  });
});
