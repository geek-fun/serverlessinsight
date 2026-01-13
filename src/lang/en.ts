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
  DESTROYING_STACK:
    'Destroying stack: {{stackName}}, provider: {{provider}}, region: {{region}}...',

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
    'run-local starting: stack={{stackName}} stage={{stage}} port={{port}} debug={{debug}} watch={{watch}}',

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
  DEPLOYMENT_PLAN: 'DEPLOYMENT PLAN',
  NO_CHANGES_INFRASTRUCTURE_UP_TO_DATE: 'No changes. Infrastructure is up-to-date.',
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
  APIGW_ATTEMPTING_AUTO_VERIFICATION: 'Attempting automatic DNS verification with token: {{token}}',
  APIGW_RETRYING_DOMAIN_BINDING: 'Retrying domain binding after DNS verification...',
  APIGW_DOMAIN_BOUND_AFTER_VERIFICATION: 'Successfully bound domain after verification: {{domain}}',
  APIGW_AUTO_VERIFICATION_FAILED: 'Automatic verification failed: {{error}}',
  APIGW_NO_VERIFICATION_TOKEN: 'Could not extract verification token from error response',
  APIGW_MANUAL_VERIFICATION_REQUIRED: 'Please manually verify domain ownership in Aliyun console',
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
};
