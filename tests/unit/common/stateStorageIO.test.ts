import fs from 'node:fs';
import { createLocalStateIO } from '../../../src/common/stateStorageIO';
import { writeStateFileAtomically } from '../../../src/common/stateManager';

jest.mock('node:fs', () => ({
  readFileSync: jest.fn(),
  mkdirSync: jest.fn(),
  openSync: jest.fn(),
  writeFileSync: jest.fn(),
  fsyncSync: jest.fn(),
  closeSync: jest.fn(),
  rmSync: jest.fn(),
}));
jest.mock('../../../src/common/stateManager', () => ({ writeStateFileAtomically: jest.fn() }));

describe('local state storage operations', () => {
  beforeEach(() => jest.resetAllMocks());

  it('distinguishes confirmed absence from malformed and inaccessible data', async () => {
    const io = createLocalStateIO();
    (fs.readFileSync as jest.Mock).mockReturnValueOnce('{"serial":1}');
    await expect(io.read('state')).resolves.toEqual({ serial: 1 });
    (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
      throw Object.assign(new Error(), { code: 'ENOENT' });
    });
    await expect(io.read('missing')).resolves.toBeNull();
    (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('denied');
    });
    await expect(io.read('denied')).rejects.toThrow('denied');
    (fs.readFileSync as jest.Mock).mockReturnValueOnce('{broken');
    await expect(io.read('corrupt')).rejects.toThrow();
  });

  it('atomically replaces documents', async () => {
    const io = createLocalStateIO();
    await io.write('dir/state', { serial: 1 });
    expect(writeStateFileAtomically).toHaveBeenCalledWith('dir/state', expect.any(String));
  });
});
