export const CODE_ZIP_SIZE_LIMIT = 300 * 1000; // 300 KB ROS TemplateBody size limit 512 KB
export const OSS_DEPLOYMENT_TIMEOUT = 3000; // in seconds
export const ROS_STACK_OPERATION_TIMEOUT = 3600; // in seconds
export const SI_BOOTSTRAP_FC_PREFIX = 'si-bootstrap-api';
export const SI_BOOTSTRAP_BUCKET_PREFIX = 'si-bootstrap-artifacts';
export const SI_LOCALSTACK_SERVER_PORT = 4567;

// Lock manager constants
export const LOCK_FILE_SUFFIX = '.si-lock';
export const DEFAULT_LOCK_TIMEOUT = 10 * 60 * 1000; // 10 minutes
export const DEFAULT_LOCK_RETRY_DELAY = 2000; // 2 seconds
export const STALE_LOCK_THRESHOLD = 60 * 60 * 1000; // 1 hour
