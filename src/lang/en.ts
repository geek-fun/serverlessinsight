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
};
