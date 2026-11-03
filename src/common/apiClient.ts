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
  /** Stable unique org identifier — what yamls declare as top-level `org:` (D-6). */
  readonly orgSlug?: string;
  readonly userEmail: string;
  readonly scopes: readonly string[];
};

const HTTP_ERROR_KEYS: Record<number, string> = {
  401: 'API_ERROR_401',
  403: 'API_ERROR_403',
  404: 'API_ERROR_404',
  409: 'API_ERROR_409',
};

/**
 * API error carrying the HTTP status so callers can distinguish "not found"
 * (legitimate empty state on first deploy) from network/5xx failures, which
 * must never be mistaken for an empty state.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = HTTP_ERROR_KEYS[status] ?? 'API_ERROR_UNKNOWN';
  }
}

type HttpMethod = 'get' | 'post' | 'patch' | 'delete';

// Opaque JSONB payloads from the Console API — their internal keys must NOT be case-converted
const SKIP_CASE_CONVERT = new Set([
  'spec',
  'result',
  'details',
  'condition',
  'notifications',
  'stateJson',
  'state_json',
]);

const camelize = (key: string): string =>
  key.replace(/_([a-z0-9])/g, (_m, c: string) => c.toUpperCase());

const camelizeKeys = (value: unknown): unknown => {
  if (value === null || value === undefined || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(camelizeKeys);
  const obj = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const camelKey = camelize(key);
    result[camelKey] = SKIP_CASE_CONVERT.has(key) ? obj[key] : camelizeKeys(obj[key]);
  }
  return result;
};

const readErrorMessages = async (response: Response): Promise<string | undefined> => {
  try {
    const body: unknown = await response.json();
    if (!body || typeof body !== 'object' || !('messages' in body) || !Array.isArray(body.messages))
      return undefined;
    return (
      body.messages
        .filter((message): message is string => typeof message === 'string' && !!message.trim())
        .map((message) => message.trim())
        .join('\n') || undefined
    );
  } catch {
    return undefined;
  }
};

const formatHttpError = (status: number, details?: string): string => {
  const key = HTTP_ERROR_KEYS[status] ?? 'API_ERROR_UNKNOWN';
  const message = details ?? `HTTP Error ${status}`;
  if (key === 'API_ERROR_UNKNOWN') {
    return lang.__(key, { status: String(status), message });
  }
  if (key === 'API_ERROR_409') return lang.__(key, { message });
  return [lang.__(key), details].filter(Boolean).join('\n');
};

const handleHttpError = async (response: Response): Promise<never> => {
  const details = await readErrorMessages(response);
  throw new ApiError(formatHttpError(response.status, details), response.status);
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

// The Console API wraps every response in { code, messages, data } and serializes
// payload keys as snake_case. Unwrap the envelope and camelCase the payload so
// callers consume camelCase data directly. Only unwrap when the `code` field is
// present — plain non-envelope payloads pass through untouched.
const unwrapResponse = (json: unknown): unknown => {
  if (json && typeof json === 'object' && 'code' in (json as Record<string, unknown>)) {
    const envelope = json as { data?: unknown };
    return camelizeKeys(envelope.data);
  }
  return json;
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

  const request = async <T>(method: HttpMethod, path: string, body?: unknown): Promise<T> => {
    let response: Response;
    try {
      response = await fetch(`${baseUrl}${path}`, buildRequestInit(method, headers, body));
    } catch {
      // Network-level failures (DNS, connection refused, timeout) surface as fetch rejections
      throw new Error(lang.__('CREDENTIAL_NETWORK_ERROR'));
    }

    if (!response.ok) {
      await handleHttpError(response);
    }

    try {
      return unwrapResponse(await response.json()) as T;
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
    orgSlug?: string;
    userEmail?: string;
    user?: { email?: string };
    scopes: string[];
  }>('/api/v1/auth/api-keys/validate');
  return {
    orgId: result.orgId ?? '',
    orgName: result.orgName ?? '',
    orgSlug: result.orgSlug,
    userEmail: result.userEmail ?? result.user?.email ?? '',
    scopes: result.scopes ?? [],
  };
};
