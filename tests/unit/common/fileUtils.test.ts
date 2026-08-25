import fs from 'node:fs';

jest.mock('node:fs', () => ({
  __esModule: true,
  default: { readFileSync: jest.fn() },
}));

import { readFile, readFileAsBase64 } from '../../../src/common/fileUtils';

const mockReadFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>;

describe('file utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns file contents as base64', () => {
    const contents = Buffer.from('hello, 世界', 'utf8');
    mockReadFileSync.mockReturnValue(contents);

    expect(readFileAsBase64('/tmp/example.txt')).toBe(contents.toString('base64'));
    expect(mockReadFileSync).toHaveBeenCalledWith('/tmp/example.txt');
  });

  it('returns the original buffer without changing it', () => {
    const contents = Buffer.from([0, 1, 2, 255]);
    mockReadFileSync.mockReturnValue(contents);

    expect(readFile('/tmp/binary.dat')).toBe(contents);
    expect(mockReadFileSync).toHaveBeenCalledWith('/tmp/binary.dat');
  });

  it('propagates filesystem errors', () => {
    const error = new Error('read failed');
    mockReadFileSync.mockImplementation(() => {
      throw error;
    });

    expect(() => readFileAsBase64('/tmp/missing.txt')).toThrow(error);
    expect(() => readFile('/tmp/missing.txt')).toThrow(error);
  });
});
