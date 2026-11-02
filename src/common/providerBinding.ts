import type { KeyValueIO, ProviderBinding } from './regionalMigration';
import { lang } from '../lang';
import { ConditionalPutUnsupportedError } from './stateBackend/types';

export const claimProviderBinding = async (
  io: Pick<KeyValueIO, 'read' | 'putIfAbsent'>,
  key: string,
  provider: string,
): Promise<void> => {
  let binding = await io.read<ProviderBinding>(key);
  if (!binding) {
    if (!io.putIfAbsent) {
      throw new Error(lang.__('STATE_ATOMIC_CREATE_REQUIRED'));
    }
    try {
      await io.putIfAbsent(key, { provider, recordedAt: new Date().toISOString() });
    } catch (error) {
      if (error instanceof ConditionalPutUnsupportedError) {
        throw new Error(lang.__('STATE_ATOMIC_CREATE_REQUIRED'), { cause: error });
      }
      throw error;
    }
    binding = await io.read<ProviderBinding>(key);
  }
  if (!binding || binding.provider !== provider) {
    throw new Error(
      lang.__('STATE_PROVIDER_BINDING_MISMATCH', {
        stored: binding?.provider ?? 'unknown',
        requested: provider,
      }),
    );
  }
};
