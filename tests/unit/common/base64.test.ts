import { encodeBase64, encodeBase64ForRosId } from '../../../src/common/base64';

describe('base64 utilities', () => {
  it('encodes empty and unicode strings as UTF-8 base64', () => {
    expect(encodeBase64('')).toBe('');
    expect(encodeBase64('你好, 🌍')).toBe('5L2g5aW9LCDwn4yN');
  });

  it('preserves standard base64 padding', () => {
    expect(encodeBase64('f')).toBe('Zg==');
    expect(encodeBase64('fo')).toBe('Zm8=');
    expect(encodeBase64('foo')).toBe('Zm9v');
  });

  it('removes trailing padding for ROS resource ids', () => {
    expect(encodeBase64ForRosId('f')).toBe('Zg');
    expect(encodeBase64ForRosId('fo')).toBe('Zm8');
    expect(encodeBase64ForRosId('foo')).toBe('Zm9v');
    expect(encodeBase64ForRosId('')).toBe('');
  });
});
