import { claimProviderBinding } from '../../../src/common/providerBinding';

describe('immutable provider reservations', () => {
  it('allows only one provider to reserve an initially empty service', async () => {
    const values = new Map<string, unknown>();
    const io = {
      read: async <T>(key: string): Promise<T | null> => (values.get(key) as T) ?? null,
      putIfAbsent: async (key: string, data: unknown) => {
        if (values.has(key)) return false;
        values.set(key, data);
        return true;
      },
    };
    const results = await Promise.allSettled([
      claimProviderBinding(io, 'provider', 'aliyun'),
      claimProviderBinding(io, 'provider', 'tencent'),
    ]);
    expect(results.filter((value) => value.status === 'fulfilled')).toHaveLength(1);
    await expect(claimProviderBinding(io, 'provider', 'aliyun')).resolves.toBeUndefined();
    await expect(claimProviderBinding(io, 'provider', 'tencent')).rejects.toThrow(
      'Provider mismatch',
    );
  });

  it('refuses an unreserved service without atomic creation or a readable winner', async () => {
    const io = { read: async <T>(): Promise<T | null> => null };
    await expect(claimProviderBinding(io, 'key', 'aliyun')).rejects.toThrow('cannot atomically');
    await expect(
      claimProviderBinding({ ...io, putIfAbsent: async () => false }, 'key', 'aliyun'),
    ).rejects.toThrow('Provider mismatch');
  });
});
