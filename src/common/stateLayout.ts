import fs from 'node:fs';

import { getPreviousScopedLocations } from './stateScope';
import { lang } from '../lang';

const layoutError = (previous: string, current: string): Error =>
  new Error(lang.__('STATE_PREVIOUS_LAYOUT_FOUND', { previous, current }));

export const assertLocalStateLayout = (current: string): void => {
  if (fs.existsSync(current)) return;
  const previous = getPreviousScopedLocations(current).find((key) => fs.existsSync(key));
  if (previous) throw layoutError(previous, current);
};

export const assertNoPreviousStateLayout = async (
  io: { read: <T>(key: string) => Promise<T | null> },
  current: string,
): Promise<void> => {
  const locations = await Promise.all(
    getPreviousScopedLocations(current).map(async (key) =>
      (await io.read(key)) === null ? undefined : key,
    ),
  );
  const previous = locations.find((key) => key !== undefined);
  if (previous) throw layoutError(previous, current);
};
