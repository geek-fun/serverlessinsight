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

type HttpMethod = 'get' | 'post' | 'patch' | 'delete';

const handleHttpError = (response: Response): never => {
  const status = response.status;
  if (status === 401) throw new Error(lang.__('API_ERROR_401'));
  if (status === 403) throw new Error(lang.__('API_ERROR_403'));
  if (status === 409) {
    throw new Error(lang.__('API_ERROR_409', { message: `HTTP Error ${status}` }));
  }
  throw new Error(
    lang.__('API_ERROR_UNKNOWN', { status: String(status), message: `HTTP Error ${status}` }),
  );
};

const buildRequestInit = (
  method: HttpMethod,
  headers: Record<string, string>,
  body?: unknown,
): RequestInit => ({
  method: method.toUpperCase(),
  headers,
  ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
});

export const createApiClient = (options: ApiClientOptions): ApiClient => {
  const { apiKey, baseUrl, orgId } = options;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  if (orgId) {
    headers['X-Org-Id'] = orgId;
  }

  const request = async <T>(method: HttpMethod, path: string, body?: unknown): Promise<T> => {
    let response: Response;
    try {
      response = await fetch(`${baseUrl}${path}`, buildRequestInit(method, headers, body));
    } catch {
      // Network-level failures (DNS, connection refused, timeout) surface as fetch rejections
      throw new Error(lang.__('CREDENTIAL_NETWORK_ERROR'));
    }

    if (!response.ok) {
      handleHttpError(response);
    }

    try {
      return (await response.json()) as T;
    } catch {
      return undefined as T;
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
