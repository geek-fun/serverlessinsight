export const CODE_ZIP_SIZE_LIMIT = 300 * 1000; // 300 KB - code package size limit for inline deployment
export const OSS_DEPLOYMENT_TIMEOUT = 3000; // in seconds
export const SI_BOOTSTRAP_FC_PREFIX = 'si-bootstrap-api';
export const SI_BOOTSTRAP_BUCKET_PREFIX = 'si-bootstrap-artifacts';
export const SI_LOCALSTACK_SERVER_PORT = 4567;
export const ALIYUN_FC3_CONNECT_TIMEOUT_MS = 120000;
export const ALIYUN_FC3_READ_TIMEOUT_MS = 600000;
export const FC3_CODE_INLINE_SIZE_LIMIT = 70 * 1024 * 1024; // 70MB threshold for OSS upload

// OSS state backend timeouts
export const OSS_STATE_CONNECT_TIMEOUT_MS = 10000; // 10 seconds
export const OSS_STATE_REQUEST_TIMEOUT_MS = 30000; // 30 seconds

// Lock manager constants
export const LOCK_FILE_SUFFIX = '.si-lock';
export const DEFAULT_LOCK_TIMEOUT = 10 * 60 * 1000; // 10 minutes
export const DEFAULT_LOCK_RETRY_DELAY = 2000; // 2 seconds
export const STALE_LOCK_THRESHOLD = 60 * 60 * 1000; // 1 hour

// Shared domain binding retry configuration (used by API Gateway, OSS, and future resources)
export const DOMAIN_BIND_MAX_RETRIES = 5;
export const DOMAIN_BIND_RETRY_DELAY_MS = 30_000; // 30 seconds

// Shared DNS propagation polling configuration (used by API Gateway, OSS, and future resources)
export const DNS_PROPAGATION_MAX_ATTEMPTS = 10;
export const DNS_PROPAGATION_DELAY_MS = 60_000; // 1 minute

// API Gateway domain binding (aliases for shared constants)
export const APIGW_DOMAIN_BIND_MAX_RETRIES = DOMAIN_BIND_MAX_RETRIES;
export const APIGW_DOMAIN_BIND_RETRY_DELAY_MS = DOMAIN_BIND_RETRY_DELAY_MS;
export const APIGW_DNS_PUBLIC_RESOLUTION_MAX_ATTEMPTS = 10;
export const APIGW_DNS_PUBLIC_RESOLUTION_DELAY_MS = 30_000; // 30 seconds

// RAM role propagation
export const RAM_ROLE_PROPAGATION_DELAY_MS = 5000; // 5 seconds
