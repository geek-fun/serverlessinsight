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
};
