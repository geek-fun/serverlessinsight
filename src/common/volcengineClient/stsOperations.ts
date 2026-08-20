import { Service } from '@volcengine/openapi';

type StsSdkClient = Service;

/* istanbul ignore next */ export const createStsOperations = (client: StsSdkClient | null) => {
  if (!client) {
    return {
      getAccountId: async (): Promise<string | undefined> => undefined,
    };
  }

  return {
    getAccountId: async (): Promise<string | undefined> => {
      try {
        const response = await client.fetchOpenAPI({
          Action: 'GetCallerIdentity',
          Version: '2018-01-01',
          method: 'GET',
          query: {},
        });
        const data = (response.Result || {}) as Record<string, unknown>;
        const accountId = data.AccountId;
        if (typeof accountId === 'number') {
          return String(accountId);
        }
        return (accountId as string | undefined) ?? undefined;
      } catch {
        return undefined;
      }
    },
  };
};
