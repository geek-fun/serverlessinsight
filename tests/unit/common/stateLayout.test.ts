import fs from 'node:fs';

import {
  assertLocalStateLayout,
  assertNoPreviousStateLayout,
} from '../../../src/common/stateLayout';
import { getPreviousScopedLocations } from '../../../src/common/stateScope';

jest.mock('node:fs', () => ({ existsSync: jest.fn() }));
jest.mock('../../../src/lang', () => ({ lang: { __: (key: string) => key } }));

const current = '/states/app/svc_prod_cn-hangzhou_state.json';
const previous = getPreviousScopedLocations(current);

beforeEach(() => jest.resetAllMocks());

describe('previous preview state layout guard', () => {
  it('accepts an existing flat file and a confirmed empty local scope', () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    expect(() => assertLocalStateLayout(current)).not.toThrow();
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    expect(() => assertLocalStateLayout(current)).not.toThrow();
  });

  it.each(previous)('refuses a missing flat file when %s exists locally', (key) => {
    (fs.existsSync as jest.Mock).mockImplementation((candidate) => candidate === key);
    expect(() => assertLocalStateLayout(current)).toThrow('STATE_PREVIOUS_LAYOUT_FOUND');
  });

  it.each(previous)('refuses old bucket data at %s', async (key) => {
    const read = async <T>(candidate: string): Promise<T | null> =>
      candidate === key ? ({} as T) : null;
    await expect(assertNoPreviousStateLayout({ read }, current)).rejects.toThrow(
      'STATE_PREVIOUS_LAYOUT_FOUND',
    );
  });

  it('accepts confirmed absence and preserves storage failures', async () => {
    const read = jest.fn().mockResolvedValue(null);
    await expect(assertNoPreviousStateLayout({ read }, current)).resolves.toBeUndefined();
    const failure = new Error('AccessDenied');
    read.mockRejectedValue(failure);
    await expect(assertNoPreviousStateLayout({ read }, current)).rejects.toBe(failure);
  });
});
