export const zhCN = {
  // Validation messages
  VALIDATING_YAML: '正在验证 yaml...',
  YAML_VALID: 'Yaml 有效! 🎉',
  INVALID_YAML: '无效的 yaml: {{errors}}',
  LOG_COMMAND_INFO: '记录命令信息',

  // Deploy messages
  DEPLOYING_STACK: '正在部署资源栈...',
  STACK_DEPLOYED: '资源栈部署成功! 🎉',
  DEPLOYING_STACK_PUBLISHING_ASSETS: '正在部署资源栈，发布资源...',
  ASSETS_PUBLISHED: '资源发布成功! 🎉',
  FAILED_TO_DEPLOY_STACK: '部署资源栈失败: {{error}}',
  CLEANING_UP_TEMPORARY_ASSETS: '正在清理临时资源...',
  ASSETS_CLEANED_UP: '资源清理完成!♻️',
  FAILED_TO_CLEANUP_ASSETS:
    '清理资源失败，这不会影响部署结果，但为了避免潜在成本，您可以删除临时存储桶: {{bucketName}}，错误详情:{{error}}',

  // Stack operations
  CREATING_STACK_ID: '创建中，资源栈ID: {{stackId}}',
  UPDATING_STACK_ID: '更新中，资源栈ID: {{stackId}}',
  UPDATE_COMPLETELY_SAME_STACK: '栈完全相同，更新跳过',
  STACK_STATUS: '资源栈状态: {{status}}',
  UPDATE_STACK_DEPLOYING: '更新资源栈: {{stackName}} 部署中... ',
  STACK_UPDATE_SUCCESS: '资源栈更新成功! 栈名称:{{stackName}}, 栈ID:{{stackId}}',
  CREATE_STACK_DEPLOYING: '创建资源栈: {{stackName}} 部署中... ',
  CREATE_STACK_SUCCESS: '资源栈创建成功! 栈名称:{{stackName}}, 栈ID:{{stackId}}',
  STACK_NOT_EXISTS_SKIPPED: '资源栈: {{stackName}} 不存在，已跳过! 🚫',
  STACK_DELETED: '资源栈: {{stackName}} 已删除!🗑 ',
  STACK_DELETE_FAILED: '资源栈: {{stackName}} 删除失败! ❌, 错误: {{error}}',
  DESTROYING_STACK: '正在销毁资源栈: {{stackName}}, 供应商: {{provider}}, 地区: {{region}}...',

  // Asset messages
  FOLDER_COMPRESSED_TO: '文件夹已压缩至: {{zipPath}}',
  FAILED_TO_COMPRESS_FOLDER: '压缩文件夹失败: {{error}}',
  BUCKET_NOT_EXISTS_CREATING: '存储桶: {{bucketName}} 不存在，正在创建...',
  NO_ASSETS_TO_PUBLISH: '没有要发布的资源，已跳过!',
  UPLOAD_FILE_SUCCESS: '上传文件: {{source}} 到存储桶: {{bucketName}} 成功!',
  NO_ASSETS_TO_CLEANUP: '没有要清理的资源，已跳过!',
  CLEANUP_FILE_SUCCESS: '从存储桶: {{bucketName}} 清理文件: {{objectKey}} 成功!',
  CLEANUP_BUCKET_SUCCESS: '清理存储桶: {{bucketName}} 成功!',

  // Variable warnings
  VARIABLE_NOT_FOUND: '变量 "{{key}}" 在 vars 或 parameters 中未找到，使用空字符串',
  STAGE_VARIABLE_NOT_FOUND: '阶段变量 "{{key}}" 在阶段 "{{stage}}" 中未找到，使用空字符串',

  // Local server messages
  LOCAL_SERVER_ALREADY_RUNNING: '本地服务器已在 http://localhost:{{port}} 上运行',
  LOCAL_SERVER_LISTENING: '本地服务器正在监听 http://localhost:{{port}}',
  LOCAL_SERVER_NOT_RUNNING: '本地服务器未运行',
  LOCAL_SERVER_STOPPED: '本地服务器已停止',
  LOCAL_GATEWAY_ERROR: '本地网关错误',
  ERROR_STOPPING_LOCAL_SERVER: '停止本地服务器时出错',
  RUN_LOCAL_STARTING:
    '启动本地运行: stack={{stackName}} stage={{stage}} port={{port}} debug={{debug}} watch={{watch}}',

  // Function execution
  FUNCTION_REQUEST_RECEIVED: '本地服务器收到函数请求 -> {{method}} {{identifier}} ',
  INVOKING_WORKER_WITH_EVENT_TYPE: '使用事件类型调用工作进程: {{eventType}} 和上下文',
  WORKER_CODE_DIR: '工作进程代码目录: {{codeDir}}, 处理器: {{handler}}',
  FUNCTION_EXECUTION_RESULT: '函数执行结果: {{result}}',
  FUNCTION_EXECUTION_ERROR: '函数执行错误: {{error}}',
  INVOKING_FC_FUNCTION_WITH_ALIYUN_EVENT: '使用阿里云事件格式调用 FC 函数',

  // Event trigger
  EVENT_TRIGGER: '事件触发器 {{triggers}}, 请求方法: {{method}}, 请求 url: {{url}}',

  // Bucket operations
  BUCKET_REQUEST_RECEIVED: '本地服务器收到存储桶请求 -> {{method}} {{identifier}} {{url}}',
  ERROR_LISTING_DIRECTORY: '列出目录时出错: {{error}}',
  ERROR_GETTING_ALL_FILES: '获取所有文件时出错: {{error}}',
  ERROR_LISTING_BUCKET_FILES: '列出存储桶文件时出错: {{error}}',
  ERROR_READING_FILE: '读取文件时出错: {{error}}',

  // Bootstrap messages
  ERROR_GENERAL: '错误: {{error}}',
  FAILED_TO_SEND_ERROR_RESPONSE: '发送错误响应失败: {{error}}',
  RESPONSE_SENT_SUCCESSFULLY: '响应发送成功',
  ERROR_SENDING_RESPONSE: '发送响应时出错: {{error}}',

  // Command errors
  COMMAND_FAILED: '命令 "{{commandName}}" 执行失败:\n{{error}}',
  STACK_TRACE: '堆栈跟踪:\n{{stack}}',

  // Debug/Test messages
  RESULT: '结果: {{result}}',

  // Function runner
  FUNCTION_LOG_FORMAT: '{{timestamp}} {{requestId}} [{{level}}] {{message}}',

  // Plan command messages
  PLAN_COMMAND_TENCENT_ONLY: 'Plan 命令目前仅支持腾讯云提供商',
  GENERATING_PLAN_FOR_SCF: '正在为腾讯云 SCF 资源生成计划...',
  DEPLOYMENT_PLAN: '部署计划',
  NO_CHANGES_INFRASTRUCTURE_UP_TO_DATE: '无变更。基础设施已是最新状态。',
  CREATE: '创建',
  UPDATE: '更新',
  DELETE: '删除',
  NO_CHANGE: '无变更',
  RESOURCES_TO_BE_CREATED: '待创建的资源',
  RESOURCES_TO_BE_UPDATED: '待更新的资源',
  RESOURCES_TO_BE_DELETED: '待删除的资源',
  RESOURCES_UNCHANGED: '未变更的资源',
  DRIFTED: '已漂移',
  REMOTE_CONFIG_DIFFERS: '远程配置与状态不同',
  CHANGES: '变更',
  PLAN: '计划',
  TO_CREATE: '待创建',
  TO_UPDATE: '待更新',
  TO_DELETE: '待删除',
  UNCHANGED: '未变更',
  ACTIONS: '个操作',
  GENERATING_PLAN: '正在生成部署计划...',
  PLAN_GENERATED: '计划已生成，共有',
  EXECUTING_PLAN: '正在执行部署计划...',

  // TDSQL-C 数据库消息
  TDSQL_CLUSTER_CREATION_INITIATED: 'TDSQL-C 集群创建已启动',
  TDSQL_CLUSTER_CREATION_FAILED: '创建 TDSQL-C 集群失败',
  TDSQL_CLUSTER_NO_ID_RETURNED: '创建 TDSQL-C 集群失败：未返回集群 ID',
  TDSQL_CLUSTER_READY: 'TDSQL-C 集群已就绪: {{clusterId}}',
  TDSQL_CLUSTER_ERROR_STATE: 'TDSQL-C 集群处于错误状态: {{status}}',
  TDSQL_CLUSTER_WAITING: '等待 TDSQL-C 集群就绪: {{clusterId}} (状态: {{status}})',
  TDSQL_CLUSTER_TIMEOUT_READY: '等待 TDSQL-C 集群就绪超时: {{clusterId}}',
  TDSQL_CLUSTER_NOT_FOUND: '未找到 TDSQL-C 集群: {{clusterId}}',
  TDSQL_CLUSTER_GET_FAILED: '获取 TDSQL-C 集群失败',
  TDSQL_CLUSTER_UPDATED: 'TDSQL-C 集群已更新: {{clusterId}}',
  TDSQL_CLUSTER_UPDATE_FAILED: '更新 TDSQL-C 集群失败',
  TDSQL_CLUSTER_DELETION_INITIATED: 'TDSQL-C 集群删除已启动: {{clusterId}}',
  TDSQL_CLUSTER_DELETED: 'TDSQL-C 集群已删除: {{clusterId}}',
  TDSQL_CLUSTER_DELETE_FAILED: '删除 TDSQL-C 集群失败',
  TDSQL_CLUSTER_BEING_DELETED: 'TDSQL-C 集群正在删除: {{clusterId}}',
  TDSQL_CLUSTER_WAITING_DELETE: '等待 TDSQL-C 集群删除: {{clusterId}} (状态: {{status}})',
  TDSQL_CLUSTER_TIMEOUT_DELETE: '等待 TDSQL-C 集群删除超时: {{clusterId}}',

  // RDS 数据库消息
  RDS_INSTANCE_CREATION_INITIATED: 'RDS 实例创建已启动',
  RDS_INSTANCE_CREATION_FAILED: '创建 RDS 实例失败: {{error}}',
  RDS_INSTANCE_NO_ID_RETURNED: '创建 RDS 实例失败：未返回实例 ID',
  RDS_INSTANCE_READY: 'RDS 实例已就绪: {{instanceId}}',
  RDS_INSTANCE_ERROR_STATE: 'RDS 实例处于错误状态: {{status}}',
  RDS_INSTANCE_WAITING: '等待 RDS 实例就绪: {{instanceId}} (状态: {{status}})',
  RDS_INSTANCE_TIMEOUT_READY: '等待 RDS 实例就绪超时: {{instanceId}}',
  RDS_INSTANCE_NOT_FOUND: '未找到 RDS 实例: {{instanceId}}',
  RDS_INSTANCE_GET_FAILED: '获取 RDS 实例失败: {{error}}',
  RDS_INSTANCE_UPDATED: 'RDS 实例已更新: {{instanceId}}',
  RDS_INSTANCE_UPDATE_FAILED: '更新 RDS 实例失败: {{error}}',
  RDS_INSTANCE_DELETION_INITIATED: 'RDS 实例删除已启动: {{instanceId}}',
  RDS_INSTANCE_DELETED: 'RDS 实例已删除: {{instanceId}}',
  RDS_INSTANCE_DELETE_FAILED: '删除 RDS 实例失败: {{error}}',
  RDS_INSTANCE_WAITING_DELETE: '等待 RDS 实例删除: {{instanceId}}',
  RDS_INSTANCE_TIMEOUT_DELETE: '等待 RDS 实例删除超时: {{instanceId}}',

  // Elasticsearch Serverless 消息
  ES_APP_CREATION_INITIATED: 'Elasticsearch Serverless 应用创建已启动',
  ES_APP_CREATION_FAILED: '创建 Elasticsearch Serverless 应用失败: {{error}}',
  ES_APP_NO_ID_RETURNED: '创建 Elasticsearch Serverless 应用失败：未返回应用 ID',
  ES_APP_READY: 'Elasticsearch Serverless 应用已就绪: {{appId}}',
  ES_APP_ERROR_STATE: 'Elasticsearch Serverless 应用处于错误状态: {{status}}',
  ES_APP_WAITING: '等待 Elasticsearch Serverless 应用就绪: {{appId}} (状态: {{status}})',
  ES_APP_TIMEOUT_READY: '等待 Elasticsearch Serverless 应用就绪超时: {{appId}}',
  ES_APP_NOT_FOUND: '未找到 Elasticsearch Serverless 应用: {{appId}}',
  ES_APP_GET_FAILED: '获取 Elasticsearch Serverless 应用失败: {{error}}',
  ES_APP_UPDATED: 'Elasticsearch Serverless 应用已更新: {{appName}}',
  ES_APP_UPDATE_FAILED: '更新 Elasticsearch Serverless 应用失败: {{error}}',
  ES_APP_DELETION_INITIATED: 'Elasticsearch Serverless 应用删除已启动: {{appName}}',
  ES_APP_DELETED: 'Elasticsearch Serverless 应用已删除: {{appName}}',
  ES_APP_DELETE_FAILED: '删除 Elasticsearch Serverless 应用失败: {{error}}',
  ES_APP_WAITING_DELETE: '等待 Elasticsearch Serverless 应用删除: {{appName}}',
  ES_APP_TIMEOUT_DELETE: '等待 Elasticsearch Serverless 应用删除超时: {{appName}}',
};
