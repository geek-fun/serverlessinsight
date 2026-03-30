export const en = {
  // Validation messages
  VALIDATING_YAML: 'Validating yaml...',
  YAML_VALID: 'Yaml is valid! 🎉',
  INVALID_YAML: 'Invalid yaml: {{errors}}',
  LOG_COMMAND_INFO: 'log command info',

  // Deploy messages
  DEPLOYING_STACK: 'Deploying stack...',
  STACK_DEPLOYED: 'Stack deployed! 🎉',
  DEPLOYING_STACK_PUBLISHING_ASSETS: 'Deploying stack, publishing assets...',
  ASSETS_PUBLISHED: 'Assets published! 🎉',
  FAILED_TO_DEPLOY_STACK: 'Failed to deploy stack: {{error}}',
  CLEANING_UP_TEMPORARY_ASSETS: 'Cleaning up temporary Assets...',
  ASSETS_CLEANED_UP: 'Assets cleaned up!♻️',
  FAILED_TO_CLEANUP_ASSETS:
    "Failed to cleanup assets, it won't affect the deployment result, but to avoid potential cost, you can delete the temporary bucket : {{bucketName}}, error details:{{error}}",

  // Stack operations
  CREATING_STACK_ID: 'Creating, Stack ID: {{stackId}}',
  UPDATING_STACK_ID: 'Updating, Stack ID: {{stackId}}',
  UPDATE_COMPLETELY_SAME_STACK: 'The stack is completely the same, update SKIPPED',
  STACK_STATUS: 'stack status: {{status}}',
  UPDATE_STACK_DEPLOYING: 'Update stack: {{stackName}} deploying... ',
  STACK_UPDATE_SUCCESS: 'stackUpdate success! stackName:{{stackName}}, stackId:{{stackId}}',
  CREATE_STACK_DEPLOYING: 'Create stack: {{stackName}} deploying... ',
  CREATE_STACK_SUCCESS: 'createStack success! stackName:{{stackName}}, stackId:{{stackId}}',
  STACK_NOT_EXISTS_SKIPPED: 'Stack: {{stackName}} not exists, skipped! 🚫',
  STACK_DELETED: 'Stack: {{stackName}} deleted!🗑 ',
  STACK_DELETE_FAILED: 'Stack: {{stackName}} delete failed! ❌, error: {{error}}',
  DESTROYING_STACK: 'Destroying stack: provider: {{provider}}, region: {{region}}...',

  // Asset messages
  FOLDER_COMPRESSED_TO: 'Folder compressed to: {{zipPath}}',
  FAILED_TO_COMPRESS_FOLDER: 'Failed to compress folder: {{error}}',
  BUCKET_NOT_EXISTS_CREATING: 'Bucket: {{bucketName}} not exists, creating...',
  NO_ASSETS_TO_PUBLISH: 'No assets to publish, skipped!',
  UPLOAD_FILE_SUCCESS: 'Upload file: {{source}} to bucket: {{bucketName}} successfully!',
  NO_ASSETS_TO_CLEANUP: 'No assets to cleanup, skipped!',
  CLEANUP_FILE_SUCCESS: 'Cleanup file: {{objectKey}} from bucket: {{bucketName}} successfully!',
  CLEANUP_BUCKET_SUCCESS: 'Cleanup bucket: {{bucketName}} successfully!',

  // Variable warnings
  VARIABLE_NOT_FOUND: "Variable '{{key}}' not found in vars or parameters, using empty string",
  STAGE_VARIABLE_NOT_FOUND:
    "Stage variable '{{key}}' not found in stage '{{stage}}', using empty string",

  // Local server messages
  LOCAL_SERVER_ALREADY_RUNNING: 'localServer already running on http://localhost:{{port}}',
  LOCAL_SERVER_LISTENING: 'Local Server listening on http://localhost:{{port}}',
  LOCAL_SERVER_NOT_RUNNING: 'localServer is not running',
  LOCAL_SERVER_STOPPED: 'localServer stopped',
  LOCAL_GATEWAY_ERROR: 'Local gateway error',
  ERROR_STOPPING_LOCAL_SERVER: 'Error stopping localServer',
  RUN_LOCAL_STARTING:
    'run-local starting: stage={{stage}} port={{port}} debug={{debug}} watch={{watch}}',

  // Function execution
  FUNCTION_REQUEST_RECEIVED:
    'Function request received by local server -> {{method}} {{identifier}} ',
  INVOKING_WORKER_WITH_EVENT_TYPE: 'Invoking worker with event type: {{eventType}} and context',
  WORKER_CODE_DIR: 'Worker codeDir: {{codeDir}}, handler: {{handler}}',
  FUNCTION_EXECUTION_RESULT: 'Function execution result: {{result}}',
  FUNCTION_EXECUTION_ERROR: 'Function execution error: {{error}}',
  INVOKING_FC_FUNCTION_WITH_ALIYUN_EVENT: 'Invoking FC function with Aliyun event format',

  // Event trigger
  EVENT_TRIGGER: 'Event trigger {{triggers}}, req method: {{method}}, req url{{url}}',

  // Bucket operations
  BUCKET_REQUEST_RECEIVED:
    'Bucket request received by local server -> {{method}} {{identifier}} {{url}}',
  ERROR_LISTING_DIRECTORY: 'Error listing directory: {{error}}',
  ERROR_GETTING_ALL_FILES: 'Error getting all files: {{error}}',
  ERROR_LISTING_BUCKET_FILES: 'Error listing bucket files: {{error}}',
  ERROR_READING_FILE: 'Error reading file: {{error}}',

  // Bootstrap messages
  ERROR_GENERAL: 'Error: {{error}}',
  FAILED_TO_SEND_ERROR_RESPONSE: 'Failed to send error response: {{error}}',
  RESPONSE_SENT_SUCCESSFULLY: 'Response sent successfully',
  ERROR_SENDING_RESPONSE: 'Error sending response: {{error}}',

  // Command errors
  COMMAND_FAILED: "Command '{{commandName}}' failed with error:\n{{error}}",
  STACK_TRACE: 'Stack trace:\n{{stack}}',

  // Debug/Test messages
  RESULT: 'result: {{result}}',

  // Function runner
  FUNCTION_LOG_FORMAT: '{{timestamp}} {{requestId}} [{{level}}] {{message}}',

  // Plan command messages
  PLAN_COMMAND_TENCENT_ONLY: 'Plan command is currently only supported for Tencent provider',
  GENERATING_PLAN_FOR_SCF: 'Generating plan for Tencent SCF resources...',
  GENERATING_PLAN_FOR_PROVIDER: 'Generating plan for {{provider}} resources...',
  PROVIDER_ALIYUN: 'Alibaba Cloud',
  PROVIDER_TENCENT: 'Tencent Cloud',
  DEPLOYMENT_PLAN: 'DEPLOYMENT PLAN',
  NO_CHANGES_INFRASTRUCTURE_UP_TO_DATE: 'No changes. Infrastructure is up to date.',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  NO_CHANGE: 'NO CHANGE',
  RESOURCES_TO_BE_CREATED: 'Resources to be created',
  RESOURCES_TO_BE_UPDATED: 'Resources to be updated',
  RESOURCES_TO_BE_DELETED: 'Resources to be deleted',
  RESOURCES_UNCHANGED: 'Resources unchanged',
  DRIFTED: 'DRIFTED',
  REMOTE_CONFIG_DIFFERS: 'Remote configuration differs from state',
  CHANGES: 'Changes',
  PLAN: 'Plan',
  TO_CREATE: 'to create',
  TO_UPDATE: 'to update',
  TO_DELETE: 'to delete',
  UNCHANGED: 'unchanged',
  ACTIONS: 'action(s)',
  GENERATING_PLAN: 'Generating deployment plan...',
  PLAN_GENERATED: 'Plan generated with',
  EXECUTING_PLAN: 'Executing deployment plan...',
  DEPLOY_CONFIRMATION: 'Do you want to perform these actions? (yes/no): ',
  DEPLOY_CANCELLED: 'Deployment cancelled.',
  PLAN_WILL_CREATE: 'will be created',
  PLAN_WILL_UPDATE: 'will be updated in-place',
  PLAN_WILL_DESTROY: 'will be destroyed',
  PLAN_WILL_REFRESH: 'will be refreshed',
  PLAN_NO_CHANGES: 'no changes',
  PLAN_HEADER: 'ServerlessInsight will perform the following actions:',
  PLAN_LEGEND_CREATE: '  + create',
  PLAN_LEGEND_UPDATE: '  ~ update in-place',
  PLAN_LEGEND_DESTROY: '  - destroy',
  PLAN_SUMMARY:
    'Plan: {{createCount}} to add, {{updateCount}} to change, {{deleteCount}} to destroy.',
  PLAN_UNCHANGED_ATTRS: '({{count}} unchanged attributes hidden)',
  PLAN_COMPUTED_VALUE: '(known after deploy)',

  // TDSQL-C database messages
  TDSQL_CLUSTER_CREATION_INITIATED: 'TDSQL-C cluster creation initiated',
  TDSQL_CLUSTER_CREATION_FAILED: 'Failed to create TDSQL-C cluster',
  TDSQL_CLUSTER_NO_ID_RETURNED: 'Failed to create TDSQL-C cluster: No cluster ID returned',
  TDSQL_CLUSTER_READY: 'TDSQL-C cluster is ready: {{clusterId}}',
  TDSQL_CLUSTER_ERROR_STATE: 'TDSQL-C cluster is in error state: {{status}}',
  TDSQL_CLUSTER_WAITING:
    'Waiting for TDSQL-C cluster to be ready: {{clusterId}} (status: {{status}})',
  TDSQL_CLUSTER_TIMEOUT_READY: 'Timeout waiting for TDSQL-C cluster to be ready: {{clusterId}}',
  TDSQL_CLUSTER_NOT_FOUND: 'TDSQL-C cluster not found: {{clusterId}}',
  TDSQL_CLUSTER_GET_FAILED: 'Failed to get TDSQL-C cluster',
  TDSQL_CLUSTER_UPDATED: 'TDSQL-C cluster updated: {{clusterId}}',
  TDSQL_CLUSTER_UPDATE_FAILED: 'Failed to update TDSQL-C cluster',
  TDSQL_CLUSTER_DELETION_INITIATED: 'TDSQL-C cluster deletion initiated: {{clusterId}}',
  TDSQL_CLUSTER_DELETED: 'TDSQL-C cluster deleted: {{clusterId}}',
  TDSQL_CLUSTER_DELETE_FAILED: 'Failed to delete TDSQL-C cluster',
  TDSQL_CLUSTER_BEING_DELETED: 'TDSQL-C cluster is being deleted: {{clusterId}}',
  TDSQL_CLUSTER_WAITING_DELETE:
    'Waiting for TDSQL-C cluster to be deleted: {{clusterId}} (status: {{status}})',
  TDSQL_CLUSTER_TIMEOUT_DELETE: 'Timeout waiting for TDSQL-C cluster to be deleted: {{clusterId}}',

  // RDS database messages
  RDS_INSTANCE_CREATION_INITIATED: 'RDS instance creation initiated',
  RDS_INSTANCE_CREATION_FAILED: 'Failed to create RDS instance: {{error}}',
  RDS_INSTANCE_NO_ID_RETURNED: 'Failed to create RDS instance: No instance ID returned',
  RDS_INSTANCE_READY: 'RDS instance is ready: {{instanceId}}',
  RDS_INSTANCE_ERROR_STATE: 'RDS instance is in error state: {{status}}',
  RDS_INSTANCE_WAITING: 'Waiting for RDS instance to be ready: {{instanceId}} (status: {{status}})',
  RDS_INSTANCE_TIMEOUT_READY: 'Timeout waiting for RDS instance to be ready: {{instanceId}}',
  RDS_INSTANCE_NOT_FOUND: 'RDS instance not found: {{instanceId}}',
  RDS_INSTANCE_GET_FAILED: 'Failed to get RDS instance: {{error}}',
  RDS_INSTANCE_UPDATED: 'RDS instance updated: {{instanceId}}',
  RDS_INSTANCE_UPDATE_FAILED: 'Failed to update RDS instance: {{error}}',
  RDS_INSTANCE_DELETION_INITIATED: 'RDS instance deletion initiated: {{instanceId}}',
  RDS_INSTANCE_DELETED: 'RDS instance deleted: {{instanceId}}',
  RDS_INSTANCE_DELETE_FAILED: 'Failed to delete RDS instance: {{error}}',
  RDS_INSTANCE_WAITING_DELETE: 'Waiting for RDS instance to be deleted: {{instanceId}}',
  RDS_INSTANCE_TIMEOUT_DELETE: 'Timeout waiting for RDS instance to be deleted: {{instanceId}}',

  // Elasticsearch Serverless messages
  ES_APP_CREATION_INITIATED: 'Elasticsearch serverless app creation initiated',
  ES_APP_CREATION_FAILED: 'Failed to create Elasticsearch serverless app: {{error}}',
  ES_APP_NO_ID_RETURNED: 'Failed to create Elasticsearch serverless app: No app ID returned',
  ES_APP_READY: 'Elasticsearch serverless app is ready: {{appId}}',
  ES_APP_ERROR_STATE: 'Elasticsearch serverless app is in error state: {{status}}',
  ES_APP_WAITING:
    'Waiting for Elasticsearch serverless app to be ready: {{appId}} (status: {{status}})',
  ES_APP_TIMEOUT_READY: 'Timeout waiting for Elasticsearch serverless app to be ready: {{appId}}',
  ES_APP_NOT_FOUND: 'Elasticsearch serverless app not found: {{appId}}',
  ES_APP_GET_FAILED: 'Failed to get Elasticsearch serverless app: {{error}}',
  ES_APP_UPDATED: 'Elasticsearch serverless app updated: {{appName}}',
  ES_APP_UPDATE_FAILED: 'Failed to update Elasticsearch serverless app: {{error}}',
  ES_APP_DELETION_INITIATED: 'Elasticsearch serverless app deletion initiated: {{appName}}',
  ES_APP_DELETED: 'Elasticsearch serverless app deleted: {{appName}}',
  ES_APP_DELETE_FAILED: 'Failed to delete Elasticsearch serverless app: {{error}}',
  ES_APP_WAITING_DELETE: 'Waiting for Elasticsearch serverless app to be deleted: {{appName}}',
  ES_APP_TIMEOUT_DELETE:
    'Timeout waiting for Elasticsearch serverless app to be deleted: {{appName}}',

  // Tencent Elasticsearch Serverless messages
  TENCENT_ES_SPACE_CREATION_INITIATED: 'Tencent ES serverless space creation initiated',
  TENCENT_ES_SPACE_CREATION_FAILED: 'Failed to create Tencent ES serverless space: {{error}}',
  TENCENT_ES_SPACE_NO_ID_RETURNED:
    'Failed to create Tencent ES serverless space: No space ID returned',
  TENCENT_ES_SPACE_READY: 'Tencent ES serverless space is ready: {{spaceId}}',
  TENCENT_ES_SPACE_ERROR_STATE: 'Tencent ES serverless space is in error state: {{status}}',
  TENCENT_ES_SPACE_WAITING:
    'Waiting for Tencent ES serverless space to be ready: {{spaceId}} (status: {{status}})',
  TENCENT_ES_SPACE_TIMEOUT_READY:
    'Timeout waiting for Tencent ES serverless space to be ready: {{spaceId}}',
  TENCENT_ES_SPACE_NOT_FOUND: 'Tencent ES serverless space not found: {{spaceId}}',
  TENCENT_ES_SPACE_GET_FAILED: 'Failed to get Tencent ES serverless space: {{error}}',
  TENCENT_ES_SPACE_UPDATED: 'Tencent ES serverless space updated: {{spaceId}}',
  TENCENT_ES_SPACE_UPDATE_FAILED: 'Failed to update Tencent ES serverless space: {{error}}',
  TENCENT_ES_SPACE_DELETION_INITIATED:
    'Tencent ES serverless space deletion initiated: {{spaceId}}',
  TENCENT_ES_SPACE_DELETED: 'Tencent ES serverless space deleted: {{spaceId}}',
  TENCENT_ES_SPACE_DELETE_FAILED: 'Failed to delete Tencent ES serverless space: {{error}}',
  TENCENT_ES_SPACE_WAITING_DELETE:
    'Waiting for Tencent ES serverless space to be deleted: {{spaceId}}',
  TENCENT_ES_SPACE_TIMEOUT_DELETE:
    'Timeout waiting for Tencent ES serverless space to be deleted: {{spaceId}}',

  // Partial failure messages
  PARTIAL_DEPLOYMENT_FAILURE:
    '⚠️  PARTIAL DEPLOYMENT FAILURE: {{successCount}} resource(s) succeeded, but {{failedResource}} failed.',
  PARTIAL_FAILURE_STATE_SAVED:
    'State has been saved for successfully deployed resources. Run deploy again to retry failed resources.',
  PARTIAL_FAILURE_NEXT_STEPS:
    'Next steps: 1) Review the error above, 2) Fix any configuration issues, 3) Run deploy again to continue.',
  FAILED_TO_EXECUTE_ACTION: 'Failed to execute {{action}} for {{logicalId}}: {{error}}',
  STATE_PERSISTED_AFTER_OPERATION: 'State persisted after {{action}} of {{resourceId}}',

  // Lock messages
  ACQUIRING_LOCK: 'Acquiring state lock...',
  LOCK_ACQUIRED: 'Lock acquired',
  LOCK_RELEASED: '✓ Lock released',
  LOCK_WAITING:
    'State is locked by {{user}} ({{timeAgo}}). Waiting to acquire lock... (attempt {{attempt}})',
  LOCK_AUTO_RELEASED_DEAD_PROCESS:
    'Auto-releasing stale lock held by dead process (PID {{processId}} on {{hostname}}). Lock was held by {{user}} since {{acquiredAt}}.',
  FAILED_TO_RELEASE_LOCK: 'Failed to release lock',
  NO_LOCK_FOUND: 'No lock found',
  LOCK_ID_MISMATCH:
    'Lock ID mismatch. Current lock ID is {{actualId}}, but you provided {{providedId}}',
  CURRENT_LOCK_INFO: 'Current lock information:',
  FORCE_UNLOCK_WARNING:
    '\n⚠️  WARNING: Force unlocking can cause state corruption if another\noperation is still running!',
  FORCE_UNLOCK_CONFIRM: 'Are you absolutely sure? (yes/no): ',
  FORCE_UNLOCK_CANCELLED: 'Force unlock cancelled',
  PLAN_COMMAND_NOT_SUPPORTED: 'Plan command is not supported for this provider',

  // Lock info formatting
  LOCK_INFO_HEADER: 'Lock Info:',
  LOCK_INFO_ID: '  ID:        {{id}}',
  LOCK_INFO_HELD_BY: '  Held by:   {{user}}',
  LOCK_INFO_PROCESS: '  Process:   si {{operation}} (PID {{processId}})',
  LOCK_INFO_HOST: '  Host:      {{hostname}}',
  LOCK_INFO_ACQUIRED: '  Acquired:  {{acquiredAt}} ({{timeAgo}})',
  LOCK_INFO_OPERATION: '  Operation: {{operation}}',
  LOCK_TIME_AGO_LESS_THAN_MINUTE: 'less than a minute ago',
  LOCK_TIME_AGO_ONE_MINUTE: '1 minute ago',
  LOCK_TIME_AGO_MINUTES: '{{minutes}} minutes ago',
  LOCK_TIME_AGO_ONE_HOUR: '1 hour ago',
  LOCK_TIME_AGO_HOURS: '{{hours}} hours ago',

  // API Gateway messages
  APIGW_GROUP_FOUND_REUSING: 'Found existing API Group: {{groupName}}, will reuse it',
  APIGW_DOMAIN_BINDING_FAILED: 'Failed to bind custom domain: {{error}}',
  APIGW_DOMAIN_UNBIND_FAILED: 'Failed to unbind domain {{domain}}: {{error}}',
  APIGW_WWW_DOMAIN_UNBIND_FAILED: 'Failed to unbind www domain {{domain}}: {{error}}',
  APIGW_GROUP_APIS_CREATED_DOMAIN_FAILED:
    'API Gateway group and APIs created successfully, but domain binding failed',
  APIGW_STATE_SAVED_RETRY:
    'State has been saved. You can fix domain verification and retry deployment',
  APIGW_DOMAIN_VERIFICATION_REQUIRED:
    'Domain {{domainName}} requires ownership verification. Add DNS records as instructed above.',
  APIGW_DNS_RECORD_ADDED:
    'DNS verification record added successfully: Record={{record}}, Type={{type}}, Value={{value}}',
  APIGW_DNS_PROPAGATION_WAITING: 'Waiting for DNS propagation...',
  APIGW_DNS_PROPAGATION_CHECK:
    'Checking DNS propagation (attempt {{attempt}}/{{max}}, waiting 1 minute)...',
  APIGW_DNS_VERIFIED: 'DNS record verified successfully after {{minutes}} minute(s)',
  APIGW_DNS_CHECK_FAILED: 'DNS check attempt {{attempt}} failed: {{error}}',
  APIGW_DNS_PROPAGATION_TIMEOUT:
    'DNS record added but propagation could not be verified after 10 minutes. Proceeding anyway...',
  APIGW_DNS_VERIFICATION_FAILED: 'Failed to add DNS verification record for {{domain}}: {{error}}',
  APIGW_DNS_CHECKING_STATUS: 'Checking DNS record status...',
  APIGW_DNS_RECORD_EXISTS_POLLING:
    'DNS verification record exists (created {{minutes}} minutes ago), waiting for propagation...',
  APIGW_DNS_RECORD_EXISTS_CHECKING:
    'DNS verification record exists (created {{minutes}} minutes ago), checking status...',
  APIGW_DNS_RECORD_ACTIVE: 'DNS record is active and verified',
  APIGW_DNS_RECORD_MAY_NOT_PROPAGATED: 'DNS record exists but may not be fully propagated yet',
  APIGW_DNS_ADDING_RECORD: 'Adding DNS verification record for domain: {{domain}}',
  APIGW_DNS_RECORD_ALREADY_EXISTS: 'DNS verification record already exists for {{domain}}',
  APIGW_BINDING_DOMAIN: 'Binding custom domain: {{domain}}',
  APIGW_DOMAIN_BOUND_SUCCESS: 'Successfully bound domain: {{domain}}',
  APIGW_DOMAIN_OWNERSHIP_FAILED: 'Domain ownership verification failed for: {{domain}}',
  APIGW_ENSURING_CNAME: 'Ensuring CNAME record exists for domain: {{domain}}',
  APIGW_PUBLIC_DNS_CHECKING: 'Checking public DNS resolution for: {{domain}}',
  APIGW_PUBLIC_DNS_CHECK_ATTEMPT: 'Public DNS resolution check (attempt {{attempt}}/{{max}})...',
  APIGW_PUBLIC_DNS_RESOLVED: 'Public DNS resolution confirmed for: {{domain}}',
  APIGW_PUBLIC_DNS_TIMEOUT:
    'Public DNS resolution could not be verified for {{domain}}. Proceeding anyway...',
  APIGW_TXT_FALLBACK:
    'CNAME verification insufficient for {{domain}}, adding TXT verification record as fallback...',
  APIGW_TXT_ADDING_RECORD: 'Adding TXT verification record: RR={{rr}}, Value={{value}}',
  APIGW_TXT_RECORD_ALREADY_EXISTS: 'TXT verification record already exists: {{rr}}',
  APIGW_TXT_ADD_FAILED: 'Failed to add TXT verification record: {{error}}',
  APIGW_DOMAIN_BIND_RETRY:
    'Retrying domain binding (attempt {{attempt}}/{{max}}, waiting for DNS propagation)...',
  APIGW_DOMAIN_BIND_RETRY_FAILED: 'Domain binding retry {{attempt}} failed: {{error}}',
  APIGW_DOMAIN_BOUND_AFTER_VERIFICATION: 'Successfully bound domain after verification: {{domain}}',
  APIGW_DOMAIN_BIND_TIMEOUT_RETRY:
    'Domain binding request timed out, retrying (attempt {{attempt}}/{{max}})...',
  APIGW_DOMAIN_BIND_TIMEOUT_RETRY_FAILED:
    'Domain binding timeout retry {{attempt}} failed: {{error}}',
  APIGW_DOMAIN_BIND_TIMEOUT_ALL_FAILED:
    'Domain binding failed after {{max}} timeout retries: {{error}}',
  APIGW_DOMAIN_BIND_ALREADY_BOUND:
    'Domain {{domain}} is already bound (previous request likely succeeded), proceeding with certificate setup',
  APIGW_VERIFICATION_HEADER: 'Domain Ownership Verification Required',
  APIGW_VERIFICATION_DOMAIN: 'Domain: {{domain}}',
  APIGW_VERIFICATION_INSTRUCTIONS:
    'To verify domain ownership, add ONE of the following DNS records:',
  APIGW_VERIFICATION_OPTION1: 'Option 1: CNAME Verification',
  APIGW_VERIFICATION_OPTION2: 'Option 2: TXT Verification (Recommended)',
  APIGW_VERIFICATION_RECORD_NAME: '  Record Name: {{name}}',
  APIGW_VERIFICATION_RECORD_TYPE: '  Record Type: {{type}}',
  APIGW_VERIFICATION_RECORD_VALUE: '  Record Value: {{value}}',
  APIGW_VERIFICATION_NEXT_STEPS: 'After adding the DNS record:',
  APIGW_VERIFICATION_STEP1: '1. Wait 5-10 minutes for DNS propagation',
  APIGW_VERIFICATION_STEP2: '2. Run the deploy command again',

  // Function resource messages
  FC3_DEPENDENT_RESOURCES_TRACKED:
    'Dependent resources (SLS, RAM, Security Group, NAS) are tracked in state',
  FC3_CAN_RETRY_DEPLOYMENT:
    'You can retry deployment - the system will reuse existing dependent resources',

  // Bucket resource messages
  OSS_BUCKET_TRACKED_CAN_RETRY:
    'Bucket is tracked in state, you can retry deployment to upload files',
  OSS_DNS_CNAME_CREATED: 'Created DNS CNAME record: {{domain}} -> {{cname}}',
  OSS_DNS_CNAME_EXISTS: 'DNS CNAME record already exists: {{domain}} -> {{cname}}',
  OSS_DNS_CNAME_DELETED: 'Deleted DNS CNAME record for {{domain}}',
  OSS_DNS_CNAME_DELETE_FAILED: 'Failed to delete DNS CNAME record for {{domain}}: {{error}}',
  OSS_DNS_DOMAIN_NOT_MANAGED:
    'The domain {{domain}} is not managed by this Aliyun account. ' +
    'Please manually configure CNAME: {{domain}} -> {{cname}}',
  OSS_DNS_MANUAL_CONFIG_REQUIRED:
    'DNS operations not available. Please manually configure CNAME: {{domain}} -> {{cname}}',
  OSS_BUCKET_CNAME_NOT_SUPPORTED:
    'Bucket-level CNAME registration requires Aliyun console. ' +
    'After DNS CNAME is configured, register {{domain}} in OSS console: ' +
    'https://oss.console.aliyun.com/bucket/oss-{{region}}/{{bucket}}/domain/cname',
  OSS_BUCKET_CNAME_BOUND: 'Bound custom domain to bucket: {{domain}}',
  OSS_BUCKET_CNAME_EXISTS: 'Custom domain already bound to bucket: {{domain}}',
  OSS_BUCKET_CNAME_UNBOUND: 'Unbound custom domain from bucket: {{domain}}',
  OSS_BUCKET_CNAME_BIND_FAILED: 'Failed to bind bucket CNAME: {{error}}',
  OSS_BUCKET_CNAME_UNBIND_FAILED: 'Failed to unbind bucket CNAME: {{error}}',
  OSS_BUCKET_CNAME_NEED_VERIFY:
    'Domain ownership verification required. Please add TXT record in DNS console, then retry.',
  OSS_CNAME_TOKEN_CREATE_FAILED:
    'Failed to create CnameToken for domain ownership verification: {{domain}}',
  OSS_CNAME_CREATING_VERIFICATION_TOKEN: 'Creating verification token for domain: {{domain}}',
  OSS_CNAME_VERIFICATION_TOKEN_CREATED:
    'Verification token created for domain {{domain}}. TXT record: {{txtRecord}}, Token: {{token}}',
  OSS_CNAME_TXT_RECORD_CREATED:
    'Created TXT record for domain ownership verification: {{txtRecord}}',
  OSS_CNAME_TXT_RECORD_ALREADY_EXISTS: 'TXT verification record already exists: {{txtRecord}}',
  OSS_CNAME_TXT_RECORD_CREATE_FAILED:
    'Failed to create TXT record {{txtRecord}}: {{error}}. Please add manually.',
  OSS_CNAME_WAITING_FOR_VERIFICATION:
    'Waiting for domain ownership verification to propagate for: {{domain}}',
  OSS_CNAME_DNS_PROPAGATION_WAITING:
    'Waiting for TXT record DNS propagation for domain: {{domain}}',
  OSS_CNAME_DNS_PROPAGATION_CHECK:
    'Checking TXT record DNS propagation (attempt {{attempt}}/{{max}}, waiting 1 minute)...',
  OSS_CNAME_DNS_PROPAGATION_VERIFIED:
    'TXT record DNS propagation verified for domain: {{domain}} after {{minutes}} minute(s)',
  OSS_CNAME_DNS_PROPAGATION_TIMEOUT:
    'TXT record DNS propagation could not be verified after {{max}} attempts. Proceeding with binding retry anyway...',
  OSS_CNAME_DNS_CHECK_FAILED: 'TXT record DNS propagation check failed: {{error}}',
  OSS_CNAME_VERIFICATION_RETRY_FAILED:
    'Domain ownership verification pending. Please add TXT record: {{txtRecord}} and retry deployment.',
  OSS_CNAME_MANUAL_VERIFICATION_REQUIRED:
    'Manual domain ownership verification required for {{domain}}. ' +
    'Please add TXT record: {{txtRecord}} with value: {{token}}, then retry deployment.',
  OSS_VERIFICATION_HEADER: 'OSS Domain Ownership Verification Required',
  OSS_VERIFICATION_DOMAIN: 'Domain: {{domain}}',
  OSS_VERIFICATION_INSTRUCTIONS: 'To verify domain ownership, add the following TXT DNS record:',
  OSS_VERIFICATION_RECORD_NAME: '  Record Name: {{name}}',
  OSS_VERIFICATION_RECORD_TYPE: '  Record Type: TXT',
  OSS_VERIFICATION_RECORD_VALUE: '  Record Value: {{value}}',
  OSS_VERIFICATION_NEXT_STEPS: 'After adding the TXT record:',
  OSS_VERIFICATION_STEP1: '1. Wait 5-10 minutes for DNS propagation',
  OSS_VERIFICATION_STEP2: '2. Run the deploy command again',
  OSS_DNS_TXT_RECORD_DELETED: 'Deleted DNS TXT verification record for domain: {{domain}}',
  OSS_DNS_TXT_RECORD_DELETE_FAILED: 'Failed to delete DNS TXT record for {{domain}}: {{error}}',
  OSS_BUCKET_CERT_BINDING:
    'Binding SSL certificate to custom domain {{domain}} on bucket {{bucketName}}',
  OSS_BUCKET_CERT_BOUND: 'SSL certificate bound to custom domain: {{domain}}',
  OSS_CORS_RULE_ADDED: 'Added CORS rule for custom domain: {{domain}}',
  OSS_CORS_RULE_EXISTS: 'CORS rule already exists for custom domain: {{domain}}',
  OSS_CORS_RULE_ADD_FAILED: 'Failed to add CORS rule for {{domain}}: {{error}}',
  OSS_CORS_RULE_REMOVED: 'Removed CORS rule for custom domain: {{domain}}',
  OSS_CORS_RULE_REMOVE_FAILED: 'Failed to remove CORS rule for {{domain}}: {{error}}',
  OSS_BUCKET_PUBLIC_ACCESS_BLOCK_DISABLED:
    'Disabled Block Public Access for bucket: {{bucketName}}',
  OSS_BUCKET_PUBLIC_ACCESS_BLOCK_DISABLE_FAILED:
    'Failed to disable Block Public Access for bucket {{bucketName}}: {{error}}. ' +
    'You may need to manually disable Block Public Access in the Alibaba Cloud OSS Console.',
  OSS_BUCKET_EXTRANET_ENDPOINT_NOT_FOUND:
    'ExtranetEndpoint not found for bucket: {{bucketName}}. The bucket may not have public access enabled.',
  OSS_BUCKET_LOCATION_NOT_FOUND: 'Location not found for bucket: {{bucketName}}',

  // Tencent COS DNS messages
  COS_DNS_CNAME_CREATED: 'Created DNS CNAME record: {{domain}} -> {{cname}}',
  COS_DNS_CNAME_EXISTS: 'DNS CNAME record already exists: {{domain}} -> {{cname}}',
  COS_DNS_CNAME_DELETED: 'Deleted DNS CNAME record for {{domain}}',
  COS_DNS_CNAME_DELETE_FAILED: 'Failed to delete DNS CNAME record for {{domain}}: {{error}}',
  COS_DNS_DOMAIN_NOT_MANAGED:
    'The domain {{domain}} is not managed by this Tencent Cloud account. ' +
    'Please manually configure CNAME: {{domain}} -> {{cname}}',
  COS_DNS_MANUAL_CONFIG_REQUIRED:
    'DNS operations not available. Please manually configure CNAME: {{domain}} -> {{cname}}',
  COS_BUCKET_DOMAIN_BOUND: 'Bound custom domain to bucket: {{domain}}',
  COS_BUCKET_DOMAIN_BIND_FAILED: 'Failed to bind bucket domain: {{error}}',
  COS_BUCKET_DOMAIN_UNBOUND: 'Unbound custom domain from bucket: {{domain}}',
  COS_BUCKET_DOMAIN_UNBIND_FAILED: 'Failed to unbind bucket domain: {{error}}',
  COS_CORS_RULE_ADDED: 'Added CORS rule for custom domain: {{domain}}',
  COS_CORS_RULE_EXISTS: 'CORS rule already exists for custom domain: {{domain}}',
  COS_CORS_RULE_ADD_FAILED: 'Failed to add CORS rule for {{domain}}: {{error}}',
  COS_CORS_RULE_REMOVED: 'Removed CORS rule for custom domain: {{domain}}',
  COS_CORS_RULE_REMOVE_FAILED: 'Failed to remove CORS rule for {{domain}}: {{error}}',

  // Dependency graph messages
  DEPENDENCY_GRAPH_GENERATED: 'Dependency graph generated',
  EXECUTION_ORDER: 'Execution order',
  DOT_GRAPH_OUTPUT: 'DOT graph output',
  CYCLE_DETECTED: 'Circular dependency detected',

  // Generic executor messages
  CREATING_RESOURCE: 'Creating {{resourceType}}: {{name}}',
  RESOURCE_CREATED: 'Successfully created {{resourceType}}: {{name}}',
  UPDATING_RESOURCE: 'Updating {{resourceType}}: {{name}}',
  RESOURCE_UPDATED: 'Successfully updated {{resourceType}}: {{name}}',
  DELETING_RESOURCE: 'Deleting {{resourceType}}: {{name}}',
  RESOURCE_DELETED: 'Successfully deleted {{resourceType}}: {{name}}',
  NO_CHANGESForResource: 'No changes for {{logicalId}}',
  STATE_NOT_FOUND_SKIPPING: 'State not found for {{logicalId}}, skipping deletion',
  UNKNOWN_ACTION_FOR_RESOURCE: 'Unknown action: {{action}} for {{logicalId}}',
  RESOURCE_NOT_FOUND_PROVIDER: '{{resourceType}} {{name}} not found in provider, skipping deletion',

  // FC3 Resource bootstrap messages
  CREATING_BOOTSTRAP_BUCKET: 'Creating bootstrap OSS bucket: {{bucketName}}',
  UPLOADED_CODE_TO_OSS: 'Uploaded code to oss://{{bucketName}}/{{objectName}}',
  CREATING_SLS_PROJECT: 'Creating SLS project: {{projectName}}',
  CREATING_SLS_LOGSTORE: 'Creating SLS logstore: {{logstoreName}}',
  CREATING_SLS_INDEX: 'Creating SLS index for: {{logstoreName}}',
  CREATING_RAM_ROLE: 'Creating RAM role: {{roleName}}',
  CREATING_SECURITY_GROUP: 'Creating security group: {{sgName}}',
  SECURITY_GROUP_NOT_FOUND: 'Security group "{{sgName}}" not found in VPC "{{vpcId}}"',
  CREATING_NAS_ACCESS_GROUP: 'Creating NAS access group: {{accessGroupName}}',
  CREATING_NAS_ACCESS_RULE: 'Creating NAS access rule for: {{accessGroupName}}',
  CREATING_NAS_FILE_SYSTEM: 'Creating NAS file system for: {{name}}',
  CREATING_NAS_MOUNT_TARGET: 'Creating NAS mount target for: {{fileSystemId}}',
  DELETING_NAS_MOUNT_TARGET: 'Deleting NAS mount target: {{id}}',
  DELETING_NAS_FILE_SYSTEM: 'Deleting NAS file system: {{id}}',
  DELETING_NAS_ACCESS_GROUP: 'Deleting NAS access group: {{id}}',
  DELETING_SECURITY_GROUP: 'Deleting security group: {{id}}',
  DELETING_RAM_ROLE: 'Deleting RAM role: {{id}}',
  DELETING_SLS_INDEX: 'Deleting SLS index: {{id}}',
  DELETING_SLS_LOGSTORE: 'Deleting SLS logstore: {{id}}',
  DELETING_SLS_PROJECT: 'Deleting SLS project: {{id}}',
  UNKNOWN_RESOURCE_TYPE: 'Unknown resource type: {{type}}',
  FAILED_TO_DELETE_RESOURCE: 'Failed to delete resource {{type}}:{{id}}: {{error}}',

  // OSS Resource messages
  BINDING_CUSTOM_DOMAIN_TO_BUCKET: 'Binding custom domain {{domain}} to bucket {{bucketName}}',

  // API Gateway Resource messages
  COULD_NOT_FIND_GROUP_CREATING: 'Could not find existing group, creating new: {{error}}',
  DELETING_DNS_RECORD: 'Deleting DNS record: {{recordId}}',
  DNS_RECORD_DELETED: 'Successfully deleted DNS record: {{recordId}}',
  FAILED_TO_DELETE_DNS_RECORD: 'Failed to delete DNS record {{recordId}}: {{error}}',

  // API Gateway Types messages
  CANNOT_RESOLVE_FUNCTION_REF:
    'Cannot resolve function reference {{backendRef}}: IAC not available in context',
  FUNCTION_REF_NOT_RESOLVED: 'Function reference {{backendRef}} could not be resolved from IAC',
  RESOLVED_FUNCTION_REF:
    'Resolved function reference {{backendRef}} to function name: {{functionName}}',

  // Show command messages
  LOADING_STATE_FOR: 'Loading state for app: {{app}}, service: {{service}}, stage: {{stage}}...',
  NO_RESOURCES_FOUND: 'No resources found in state.',
  STATE_LOCATION: 'State location: {{location}}',
  BACKEND_REMOTE: 'Backend: Remote',
  DEPLOYED_RESOURCES: 'DEPLOYED RESOURCES',
  SUMMARY: 'SUMMARY',
  PROVIDER_LABEL: 'Provider',
  APP_LABEL: 'App',
  SERVICE_LABEL: 'Service',
  STAGE_LABEL: 'Stage',
  RESOURCES_LABEL: 'Resources',
  LAST_UPDATED_LABEL: 'Last Updated',
  LOCK_STATUS_LOCKED: 'Lock Status: LOCKED by {{user}}',
  LOCK_STATUS_UNLOCKED: 'Lock Status: UNLOCKED',
  TO_DEPLOY_RESOURCES: 'To deploy resources, run: si deploy',
  REMOTE_BACKEND_FALLBACK:
    'Remote backend configured but credentials not available. Falling back to local state.',
  FAILED_TO_LOAD_REMOTE_STATE:
    'Failed to load state from remote backend, falling back to local state: {{error}}',

  // Show command category labels
  FUNCTIONS_LABEL: 'Functions',
  API_GATEWAY_LABEL: 'API Gateway',
  STORAGE_LABEL: 'Storage',
  DATABASES_LABEL: 'Databases',
  DNS_RECORDS_LABEL: 'DNS Records',
  OTHER_RESOURCES_LABEL: 'Other Resources',

  // Show command resource output labels
  RUNTIME_LABEL: 'Runtime',
  HANDLER_LABEL: 'Handler',
  MEMORY_TIMEOUT_LABEL: 'Memory: {{memory}}MB, Timeout: {{timeout}}s',
  INTERNET_ACCESS_LABEL: 'Internet Access: {{value}}',
  API_GROUP_LABEL: 'API Group',
  SUB_DOMAIN_LABEL: 'Sub-domain',
  BASE_PATH_LABEL: 'Base Path',
  API_LABEL: 'API',
  GROUP_ID_LABEL: 'Group ID',
  BUCKET_LABEL: 'Bucket',
  REGION_LABEL: 'Region',
  ENDPOINT_LABEL: 'Endpoint',
  CUSTOM_DOMAIN_LABEL: 'Custom Domain',
  CNAME_TARGET_LABEL: 'CNAME Target',
  ENGINE_LABEL: 'Engine',
  STATUS_LABEL: 'Status',
  CNAME_LABEL: 'CNAME',

  // Time ago format
  TIME_DAYS_AGO: '{{count}} day(s) ago',
  TIME_HOURS_AGO: '{{count}} hour(s) ago',
  TIME_MINUTES_AGO: '{{count}} minute(s) ago',
  TIME_JUST_NOW: 'just now',

  // Deployer/Destroyer execution plan
  EXECUTION_PLAN_ITEM: '  - {{action}}: {{logicalId}} ({{resourceType}})',
  EXECUTION_ORDER_ITEM: '    {{index}}. {{logicalId}} ({{resourceType}}) - {{action}}',

  // Tablestore operations
  TABLE_IS_READY: 'Table {{tableName}} is ready',
  FAILED_TO_CREATE_TABLE: 'Failed to create table {{tableName}}: {{error}}',
  TABLE_CREATED_SUCCESS: 'Successfully created table {{tableName}}',
  FAILED_TO_DESCRIBE_TABLE: 'Failed to describe table {{tableName}}: {{error}}',
  FAILED_TO_UPDATE_TABLE: 'Failed to update table {{tableName}}: {{error}}',
  TABLE_UPDATED_SUCCESS: 'Successfully updated table {{tableName}}',
  TABLE_ALREADY_DELETED: 'Table {{tableName}} already deleted or does not exist',
  FAILED_TO_DELETE_TABLE: 'Failed to delete table {{tableName}}: {{error}}',
  TABLE_DELETED_SUCCESS: 'Successfully deleted table {{tableName}}',

  // ECS operations
  SKIPPING_INVALID_INGRESS_RULE: 'Skipping invalid ingress rule: {{rule}}. {{error}}',
  INGRESS_RULE_EXISTS_SKIPPING: 'Ingress rule already exists, skipping: {{rule}}',
  FAILED_TO_ADD_INGRESS_RULE: 'Failed to add ingress rule: {{rule}}. {{error}}',
  SKIPPING_INVALID_EGRESS_RULE: 'Skipping invalid egress rule: {{rule}}. {{error}}',
  EGRESS_RULE_EXISTS_SKIPPING: 'Egress rule already exists, skipping: {{rule}}',
  FAILED_TO_ADD_EGRESS_RULE: 'Failed to add egress rule: {{rule}}. {{error}}',

  // DNS error
  DNS_ERROR: 'DNS error: {{error}}',

  // RAM operations
  RAM_ROLE_ALREADY_EXISTS:
    'RAM role "{{roleName}}" already exists in cloud (state drift detected). ' +
    'Updating trust policy and reusing existing role.',
  RAM_ROLE_NOT_FOUND_IN_CLOUD:
    'RAM role "{{roleName}}" does not exist in the cloud provider. ' +
    'The role may have been deleted manually. ' +
    'To fix: remove the role from state and redeploy.',
  RAM_ROLE_DRIFT_RECOVERY_FAILED:
    'Failed to recover from RAM role state drift for "{{roleName}}": {{error}}. ' +
    'The role existed in the cloud but recovery operations failed. ' +
    'To fix: manually verify the role in the cloud console, remove it from state, and redeploy.',

  // Certificate messages
  CERT_INVALID_CONFIGURATION:
    'Certificate "{{name}}" must have either (certificate_body + private_key) or certificate_id, but not both',
  CERT_FILE_NOT_FOUND: 'Certificate file not found: {{filePath}}',
  CERT_READING_FILE: 'Reading certificate file: {{filePath}}',
  CERT_PARSING_CERTIFICATES: 'Parsing certificates configuration',
  CERT_RESOLVING_REFERENCE:
    'Resolving certificate reference "{{reference}}" for domain "{{domain}}"',
  CERT_REFERENCE_NOT_FOUND: 'Certificate reference "{{reference}}" could not be resolved.',
  CERT_USING_SUBSCRIPTION_ID:
    'Certificate "{{provided}}" appears to be a Subscription Instance ID (订阅实例ID). Use the numeric Certificate ID (证书ID) instead, e.g., "24019487". Find it in Aliyun CAS console → Certificate Details.',
  CERT_RESOLVED_UPLOAD: 'Certificate "{{name}}" resolved as upload mode (PEM files provided)',
  CERT_RESOLVED_REFERENCE:
    'Certificate "{{name}}" resolved as reference mode (certificate_id: {{certId}})',
  CERT_READING_PEM_FILES: 'Reading PEM files for certificate "{{name}}"',

  // Certificate inline PEM warning
  CERT_INLINE_PEM_WARNING:
    'Security warning: certificate_private_key appears to contain inline PEM content. Consider using a file path (e.g., ./certs/server.key) instead for better security.',

  // CAS (Certificate Authority Service) messages
  CAS_UPLOADING_CERT: 'Uploading certificate "{{name}}" to CAS',
  CAS_CERT_UPLOADED: 'Certificate "{{name}}" uploaded to CAS (certId: {{certId}})',
  CAS_UPLOAD_NO_CERT_ID: 'CAS upload succeeded but no certificate ID returned for "{{name}}"',
  CAS_FETCHING_CERT: 'Fetching certificate details from CAS (certId: {{certId}})',
  CAS_CERT_NOT_FOUND: 'Certificate not found in CAS (certId: {{certId}})',
  CAS_CERT_FETCH_FAILED: 'Failed to fetch certificate from CAS (certId: {{certId}}): {{error}}',
  CAS_DELETING_CERT: 'Deleting certificate from CAS (certId: {{certId}})',
  CAS_CERT_DELETED: 'Certificate deleted from CAS (certId: {{certId}})',

  // Tencent SSL certificate messages
  SSL_UPLOADING_CERT: 'Uploading certificate to Tencent SSL (alias: {{alias}})',
  SSL_CERT_UPLOADED:
    'Certificate uploaded to Tencent SSL (alias: {{alias}}, certificateId: {{certificateId}})',
  SSL_UPLOAD_NO_CERT_ID: 'SSL upload succeeded but no certificate ID returned for "{{alias}}"',
  SSL_DELETING_CERT: 'Deleting certificate from Tencent SSL (certificateId: {{certificateId}})',
  SSL_CERT_DELETED: 'Certificate deleted from Tencent SSL (certificateId: {{certificateId}})',
  SSL_CERT_NOT_FOUND: 'Certificate not found in Tencent SSL (certificateId: {{certificateId}})',
  SSL_DELETE_FAILED:
    'Failed to delete certificate from Tencent SSL (certificateId: {{certificateId}})',
  SSL_DEPLOYING_CERT:
    'Deploying certificate to {{resourceType}} (certificateId: {{certificateId}}, instances: {{instances}})',
  SSL_CERT_DEPLOY_SUBMITTED:
    'Certificate deploy task submitted to {{resourceType}} (certificateId: {{certificateId}}, deployRecordId: {{deployRecordId}})',
  SSL_CERT_DEPLOY_EXISTING_TASK:
    'Certificate deploy task already in progress for {{resourceType}} (certificateId: {{certificateId}})',
  SSL_CERT_DEPLOYED:
    'Certificate deployed to {{resourceType}} (certificateId: {{certificateId}}, deployRecordId: {{deployRecordId}})',
  SSL_CERT_DEPLOY_FAILED:
    'Failed to deploy certificate to {{resourceType}} (certificateId: {{certificateId}}): {{error}}',
  COS_BUCKET_CERT_DEPLOYING:
    'Deploying SSL certificate to COS bucket domain: {{domain}} (bucket: {{bucketName}})',
  COS_BUCKET_CERT_DEPLOYED: 'SSL certificate deployed to COS bucket domain: {{domain}}',
  BUCKET_DOMAIN_REQUIRED_FOR_CERT:
    'Bucket "{{name}}" has certificate configuration but no domain is set. A domain is required when providing certificate information.',

  // Protocol messages
  PROTOCOL_INFERRED_REDIRECT:
    'Protocol "{{protocol}}" inferred HTTP-to-HTTPS redirect: {{redirect}}',

  // Retry utility messages
  RETRY_ATTEMPT: 'Retrying {{operation}} (attempt {{attempt}}/{{max}})...',
  RETRY_ATTEMPT_FAILED: '{{operation}} attempt {{attempt}}/{{max}} failed: {{error}}. Retrying...',
  RETRY_ALL_ATTEMPTS_FAILED: '{{operation}} failed after {{max}} attempts: {{error}}',
  RETRY_UNEXPECTED_FAILURE: '{{operation}} failed unexpectedly',

  // Rate Limit messages
  RATE_LIMIT_CREATING: 'Creating traffic control policy: {{policyName}}',
  RATE_LIMIT_CREATED: 'Traffic control policy created: {{policyName}} (ID: {{policyId}})',
  RATE_LIMIT_UPDATING: 'Updating traffic control policy: {{policyName}}',
  RATE_LIMIT_UPDATED: 'Traffic control policy updated: {{policyName}}',
  RATE_LIMIT_DELETING: 'Deleting traffic control policy: {{policyId}}',
  RATE_LIMIT_DELETED: 'Traffic control policy deleted: {{policyId}}',
  RATE_LIMIT_BINDING: 'Binding traffic control {{policyId}} to APIs in group {{groupId}}',
  RATE_LIMIT_BOUND: 'Traffic control {{policyId}} bound to {{apiCount}} API(s)',
  RATE_LIMIT_UNBINDING: 'Unbinding traffic control from APIs in group {{groupId}}',
  RATE_LIMIT_UNBOUND: 'Traffic control unbound from APIs in group {{groupId}}',
  RATE_LIMIT_NOT_FOUND: 'Traffic control policy not found: {{policyId}}',
  RATE_LIMIT_CREATE_FAILED: 'Failed to create traffic control policy: {{error}}',
  RATE_LIMIT_UPDATE_FAILED: 'Failed to update traffic control policy: {{error}}',
  RATE_LIMIT_DELETE_FAILED: 'Failed to delete traffic control policy: {{error}}',
  RATE_LIMIT_BIND_FAILED: 'Failed to bind traffic control to APIs: {{error}}',
  RATE_LIMIT_UNBIND_FAILED: 'Failed to unbind traffic control from APIs: {{error}}',
  RATE_LIMIT_CONFIG_INVALID: 'Invalid rate_limit configuration: must specify either qps or scopes',
  RATE_LIMIT_SCOPE_INVALID:
    'Rate limit scope "{{scope}}" is not supported by provider "{{provider}}"',
  RATE_LIMIT_LIMITBY_REQUIRES_NAME:
    'Rate limit limit_by type "{{type}}" requires a "name" parameter',
  RATE_LIMIT_SKIPPED_WARNING:
    'Rate limit creation failed but API deployment succeeded. You can retry by running deploy again.',

  // Volcengine provider messages
  PROVIDER_VOLCENGINE: 'Volcengine',
  VOLCENGINE_DEPLOYING_STACK: 'Deploying stack to Volcengine...',
  VOLCENGINE_CREATING_FUNCTION: 'Creating Volcengine function {{functionName}}',
  VOLCENGINE_UPDATING_FUNCTION: 'Updating Volcengine function {{functionName}}',
  VOLCENGINE_DELETING_FUNCTION: 'Deleting Volcengine function {{functionName}}',
  VOLCENGINE_FUNCTION_NOT_FOUND: 'Volcengine function {{functionName}} not found',
  VOLCENGINE_FUNCTION_READY: 'Volcengine function {{functionName}} is ready',
  VOLCENGINE_CREATING_BUCKET: 'Creating Volcengine TOS bucket {{bucketName}}',
  VOLCENGINE_DELETING_BUCKET: 'Deleting Volcengine TOS bucket {{bucketName}}',
  VOLCENGINE_BUCKET_NOT_FOUND: 'Volcengine TOS bucket {{bucketName}} not found',
  VOLCENGINE_CREATING_ROLE: 'Creating Volcengine IAM role {{roleName}}',
  VOLCENGINE_DELETING_ROLE: 'Deleting Volcengine IAM role {{roleName}}',
  VOLCENGINE_ROLE_NOT_FOUND: 'Volcengine IAM role {{roleName}} not found',
  VOLCENGINE_CREATING_APIGW: 'Creating Volcengine API Gateway {{gatewayName}}',
  VOLCENGINE_DELETING_APIGW: 'Deleting Volcengine API Gateway {{gatewayName}}',
  VOLCENGINE_APIGW_NOT_FOUND: 'Volcengine API Gateway {{gatewayName}} not found',

  // Additional Volcengine-specific messages
  RESOURCE_STATE_NOT_FOUND: 'Resource state not found for logical ID: {{logicalId}}',
  RESOURCE_INSTANCE_NOT_FOUND: 'Resource instance not found for logical ID: {{logicalId}}',
  UPDATING_RESOURCE_WITH_NO_CHANGES: 'No changes detected for {{resourceType}}: {{name}}',
};
