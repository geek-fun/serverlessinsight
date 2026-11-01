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

describe('local exclusive storage operations', () => {
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

  it('uses exclusive file creation and leaves an existing owner intact', async () => {
    const io = createLocalStateIO();
    (fs.openSync as jest.Mock).mockReturnValueOnce(4);
    await expect(io.putIfAbsent!('dir/lock', { id: 'owner' })).resolves.toBe(true);
    expect(fs.openSync).toHaveBeenCalledWith('dir/lock', 'wx');
    expect(fs.closeSync).toHaveBeenCalledWith(4);
    (fs.openSync as jest.Mock).mockImplementationOnce(() => {
      throw Object.assign(new Error(), { code: 'EEXIST' });
    });
    await expect(io.putIfAbsent!('dir/lock', {})).resolves.toBe(false);
    (fs.openSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('denied');
    });
    await expect(io.putIfAbsent!('dir/lock', {})).rejects.toThrow('denied');
    (fs.openSync as jest.Mock).mockReturnValueOnce(5);
    (fs.writeFileSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('disk full');
    });
    await expect(io.putIfAbsent!('dir/lock', {})).rejects.toThrow('disk full');
    expect(fs.closeSync).toHaveBeenCalledWith(5);
  });

  it('atomically replaces documents and propagates cleanup failures', async () => {
    const io = createLocalStateIO();
    await io.write('dir/state', { serial: 1 });
    expect(writeStateFileAtomically).toHaveBeenCalledWith('dir/state', expect.any(String));
    await io.delete('dir/missing');
    (fs.rmSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('denied');
    });
    await expect(io.delete('dir/state')).rejects.toThrow('denied');
  });
});
