import ky, { HTTPError, TimeoutError } from 'ky';
import { lang } from '../lang';

export type ApiClientOptions = {
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly orgId?: string;
};

export type ApiClient = {
  readonly get: <T = unknown>(path: string) => Promise<T>;
  readonly post: <T = unknown>(path: string, body?: unknown) => Promise<T>;
  readonly patch: <T = unknown>(path: string, body?: unknown) => Promise<T>;
  readonly delete: <T = unknown>(path: string) => Promise<T>;
};

export type ValidateResult = {
  readonly orgId: string;
  readonly orgName: string;
  readonly userEmail: string;
  readonly scopes: readonly string[];
};

const handleError = (error: unknown): never => {
  if (error instanceof HTTPError) {
    const status = error.response.status;
    if (status === 401) throw new Error(lang.__('API_ERROR_401'));
    if (status === 403) throw new Error(lang.__('API_ERROR_403'));
    if (status === 409) {
      throw new Error(lang.__('API_ERROR_409', { message: error.message }));
    }
    throw new Error(
      lang.__('API_ERROR_UNKNOWN', { status: String(status), message: error.message }),
    );
  }
  if (error instanceof TimeoutError || error instanceof TypeError) {
    throw new Error(lang.__('CREDENTIAL_NETWORK_ERROR'));
  }
  // Generic Error from fetch/ky (network failures, DNS errors, etc.)
  if (error instanceof Error) {
    throw new Error(lang.__('CREDENTIAL_NETWORK_ERROR'));
  }
  throw error;
};

export const createApiClient = (options: ApiClientOptions): ApiClient => {
  const { apiKey, baseUrl, orgId } = options;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  if (orgId) {
    headers['X-Org-Id'] = orgId;
  }

  const instance = ky.extend({
    prefixUrl: baseUrl,
    headers,
    retry: 0,
  });

  const request = async <T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    path: string,
    body?: unknown,
  ): Promise<T> => {
    try {
      const response = await (body !== undefined
        ? instance[method](path, { json: body })
        : instance[method](path));
      try {
        return (await response.json()) as T;
      } catch {
        return undefined as T;
      }
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    get: <T = unknown>(path: string) => request<T>('get', path),
    post: <T = unknown>(path: string, body?: unknown) => request<T>('post', path, body),
    patch: <T = unknown>(path: string, body?: unknown) => request<T>('patch', path, body),
    delete: <T = unknown>(path: string) => request<T>('delete', path),
  };
};

export const validateApiKey = async (apiKey: string, baseUrl: string): Promise<ValidateResult> => {
  const client = createApiClient({ apiKey, baseUrl });
  const result = await client.get<{
    valid: boolean;
    orgId: string;
    orgName: string;
    userEmail: string;
    scopes: string[];
  }>('/api/v1/auth/api-keys/validate');
  return {
    orgId: result.orgId,
    orgName: result.orgName,
    userEmail: result.userEmail,
    scopes: result.scopes,
  };
};
