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
  DESTROYING_STACK: '正在销毁资源栈: 供应商: {{provider}}, 地区: {{region}}...',

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
  RUN_LOCAL_STARTING: '启动本地运行: stage={{stage}} port={{port}} debug={{debug}} watch={{watch}}',

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
  DEPLOY_CONFIRMATION: '是否执行这些操作？(yes/no): ',
  DEPLOY_CANCELLED: '部署已取消。',
  PLAN_WILL_CREATE: '将被创建',
  PLAN_WILL_UPDATE: '将就地更新',
  PLAN_WILL_DESTROY: '将被销毁',
  PLAN_WILL_REFRESH: '将被刷新',
  PLAN_NO_CHANGES: '无变更',
  PLAN_HEADER: 'ServerlessInsight 将执行以下操作:',
  PLAN_LEGEND_CREATE: '  + 创建',
  PLAN_LEGEND_UPDATE: '  ~ 就地更新',
  PLAN_LEGEND_DESTROY: '  - 销毁',
  PLAN_SUMMARY: '计划: 新增 {{createCount}} 个，变更 {{updateCount}} 个，销毁 {{deleteCount}} 个。',
  PLAN_UNCHANGED_ATTRS: '({{count}} 个未变更属性已隐藏)',
  PLAN_COMPUTED_VALUE: '(部署后可知)',

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

  // 腾讯云 Elasticsearch Serverless 消息
  TENCENT_ES_SPACE_CREATION_INITIATED: '腾讯云 ES Serverless 空间创建已启动',
  TENCENT_ES_SPACE_CREATION_FAILED: '创建腾讯云 ES Serverless 空间失败: {{error}}',
  TENCENT_ES_SPACE_NO_ID_RETURNED: '创建腾讯云 ES Serverless 空间失败：未返回空间 ID',
  TENCENT_ES_SPACE_READY: '腾讯云 ES Serverless 空间已就绪: {{spaceId}}',
  TENCENT_ES_SPACE_ERROR_STATE: '腾讯云 ES Serverless 空间处于错误状态: {{status}}',
  TENCENT_ES_SPACE_WAITING: '等待腾讯云 ES Serverless 空间就绪: {{spaceId}} (状态: {{status}})',
  TENCENT_ES_SPACE_TIMEOUT_READY: '等待腾讯云 ES Serverless 空间就绪超时: {{spaceId}}',
  TENCENT_ES_SPACE_NOT_FOUND: '未找到腾讯云 ES Serverless 空间: {{spaceId}}',
  TENCENT_ES_SPACE_GET_FAILED: '获取腾讯云 ES Serverless 空间失败: {{error}}',
  TENCENT_ES_SPACE_UPDATED: '腾讯云 ES Serverless 空间已更新: {{spaceId}}',
  TENCENT_ES_SPACE_UPDATE_FAILED: '更新腾讯云 ES Serverless 空间失败: {{error}}',
  TENCENT_ES_SPACE_DELETION_INITIATED: '腾讯云 ES Serverless 空间删除已启动: {{spaceId}}',
  TENCENT_ES_SPACE_DELETED: '腾讯云 ES Serverless 空间已删除: {{spaceId}}',
  TENCENT_ES_SPACE_DELETE_FAILED: '删除腾讯云 ES Serverless 空间失败: {{error}}',
  TENCENT_ES_SPACE_WAITING_DELETE: '等待腾讯云 ES Serverless 空间删除: {{spaceId}}',
  TENCENT_ES_SPACE_TIMEOUT_DELETE: '等待腾讯云 ES Serverless 空间删除超时: {{spaceId}}',

  // Partial failure messages
  PARTIAL_DEPLOYMENT_FAILURE:
    '⚠️  部署部分失败: {{successCount}} 个资源成功，但 {{failedResource}} 失败。',
  PARTIAL_FAILURE_STATE_SAVED: '已成功部署的资源状态已保存。再次运行 deploy 以重试失败的资源。',
  PARTIAL_FAILURE_NEXT_STEPS:
    '后续步骤: 1) 查看上面的错误, 2) 修复配置问题, 3) 再次运行 deploy 继续。',
  FAILED_TO_EXECUTE_ACTION: '执行 {{action}} 失败: {{logicalId}}: {{error}}',
  STATE_PERSISTED_AFTER_OPERATION: '{{action}} {{resourceId}} 后状态已持久化',

  // Lock messages
  ACQUIRING_LOCK: '正在获取状态锁...',
  LOCK_ACQUIRED: '锁已获取',
  LOCK_RELEASED: '✓ 锁已释放',
  LOCK_WAITING: '状态被 {{user}} 锁定（{{timeAgo}}）。等待获取锁...（第 {{attempt}} 次尝试）',
  LOCK_AUTO_RELEASED_DEAD_PROCESS:
    '自动释放已终止进程持有的过期锁（PID {{processId}}，主机 {{hostname}}）。锁由 {{user}} 于 {{acquiredAt}} 获取。',
  FAILED_TO_RELEASE_LOCK: '释放锁失败',
  NO_LOCK_FOUND: '未找到锁',
  LOCK_ID_MISMATCH: '锁 ID 不匹配。当前锁 ID 为 {{actualId}}，但您提供了 {{providedId}}',
  CURRENT_LOCK_INFO: '当前锁信息:',
  FORCE_UNLOCK_WARNING: '\n⚠️  警告: 强制解锁可能会导致状态损坏，如果另一个操作仍在运行！',
  FORCE_UNLOCK_CONFIRM: '您确定吗？(yes/no): ',
  FORCE_UNLOCK_CANCELLED: '强制解锁已取消',
  PLAN_COMMAND_NOT_SUPPORTED: '此提供商不支持 Plan 命令',

  // Lock info formatting
  LOCK_INFO_HEADER: '锁信息:',
  LOCK_INFO_ID: '  ID:        {{id}}',
  LOCK_INFO_HELD_BY: '  持有者:   {{user}}',
  LOCK_INFO_PROCESS: '  进程:     si {{operation}} (PID {{processId}})',
  LOCK_INFO_HOST: '  主机:     {{hostname}}',
  LOCK_INFO_ACQUIRED: '  获取时间:  {{acquiredAt}} ({{timeAgo}})',
  LOCK_INFO_OPERATION: '  操作:     {{operation}}',
  LOCK_TIME_AGO_LESS_THAN_MINUTE: '不到一分钟前',
  LOCK_TIME_AGO_ONE_MINUTE: '1 分钟前',
  LOCK_TIME_AGO_MINUTES: '{{minutes}} 分钟前',
  LOCK_TIME_AGO_ONE_HOUR: '1 小时前',
  LOCK_TIME_AGO_HOURS: '{{hours}} 小时前',

  // API Gateway messages
  APIGW_GROUP_FOUND_REUSING: '找到现有 API 分组: {{groupName}}，将复用它',
  APIGW_DOMAIN_BINDING_FAILED: '绑定自定义域名失败: {{error}}',
  APIGW_GROUP_APIS_CREATED_DOMAIN_FAILED: 'API 网关分组和 API 创建成功，但域名绑定失败',
  APIGW_STATE_SAVED_RETRY: '状态已保存。您可以修复域名验证问题后重新部署',
  APIGW_DOMAIN_VERIFICATION_REQUIRED:
    '域名 {{domainName}} 需要所有权验证。请按照上面的说明添加 DNS 记录。',
  APIGW_DNS_RECORD_ADDED:
    'DNS 验证记录添加成功: 记录名={{record}}, 记录类型={{type}}, 记录值={{value}}',
  APIGW_DNS_PROPAGATION_WAITING: '等待 DNS 传播...',
  APIGW_DNS_PROPAGATION_CHECK: '检查 DNS 传播（第 {{attempt}}/{{max}} 次尝试，等待 1 分钟）...',
  APIGW_DNS_VERIFIED: 'DNS 记录验证成功，耗时 {{minutes}} 分钟',
  APIGW_DNS_CHECK_FAILED: 'DNS 检查第 {{attempt}} 次尝试失败: {{error}}',
  APIGW_DNS_PROPAGATION_TIMEOUT: 'DNS 记录已添加，但 10 分钟后无法验证传播。继续执行...',
  APIGW_DNS_VERIFICATION_FAILED: '为 {{domain}} 添加 DNS 验证记录失败: {{error}}',
  APIGW_DNS_CHECKING_STATUS: '检查 DNS 记录状态...',
  APIGW_DNS_RECORD_EXISTS_POLLING: 'DNS 验证记录已存在（创建于 {{minutes}} 分钟前），等待传播...',
  APIGW_DNS_RECORD_EXISTS_CHECKING: 'DNS 验证记录已存在（创建于 {{minutes}} 分钟前），检查状态...',
  APIGW_DNS_RECORD_ACTIVE: 'DNS 记录已激活并验证',
  APIGW_DNS_RECORD_MAY_NOT_PROPAGATED: 'DNS 记录存在但可能尚未完全传播',
  APIGW_DNS_ADDING_RECORD: '为域名添加 DNS 验证记录: {{domain}}',
  APIGW_DNS_RECORD_ALREADY_EXISTS: 'DNS 验证记录已存在于 {{domain}}',
  APIGW_BINDING_DOMAIN: '绑定自定义域名: {{domain}}',
  APIGW_DOMAIN_BOUND_SUCCESS: '成功绑定域名: {{domain}}',
  APIGW_DOMAIN_OWNERSHIP_FAILED: '域名所有权验证失败: {{domain}}',
  APIGW_ENSURING_CNAME: '确保域名 CNAME 记录存在: {{domain}}',
  APIGW_PUBLIC_DNS_CHECKING: '检查公共 DNS 解析: {{domain}}',
  APIGW_PUBLIC_DNS_CHECK_ATTEMPT: '公共 DNS 解析检查（第 {{attempt}}/{{max}} 次尝试）...',
  APIGW_PUBLIC_DNS_RESOLVED: '已确认公共 DNS 解析: {{domain}}',
  APIGW_PUBLIC_DNS_TIMEOUT: '无法验证 {{domain}} 的公共 DNS 解析。继续执行...',
  APIGW_TXT_FALLBACK: 'CNAME 验证不足以绑定 {{domain}}，添加 TXT 验证记录作为备选...',
  APIGW_TXT_ADDING_RECORD: '添加 TXT 验证记录: RR={{rr}}, 值={{value}}',
  APIGW_TXT_RECORD_ALREADY_EXISTS: 'TXT 验证记录已存在: {{rr}}',
  APIGW_TXT_ADD_FAILED: '添加 TXT 验证记录失败: {{error}}',
  APIGW_DOMAIN_BIND_RETRY: '重试域名绑定（第 {{attempt}}/{{max}} 次尝试，等待 DNS 传播）...',
  APIGW_DOMAIN_BIND_RETRY_FAILED: '域名绑定第 {{attempt}} 次重试失败: {{error}}',
  APIGW_DOMAIN_BOUND_AFTER_VERIFICATION: '验证后成功绑定域名: {{domain}}',
  APIGW_DOMAIN_BIND_TIMEOUT_RETRY: '域名绑定请求超时，正在重试（第 {{attempt}}/{{max}} 次尝试）...',
  APIGW_DOMAIN_BIND_TIMEOUT_RETRY_FAILED: '域名绑定超时重试第 {{attempt}} 次失败: {{error}}',
  APIGW_DOMAIN_BIND_TIMEOUT_ALL_FAILED: '域名绑定在 {{max}} 次超时重试后失败: {{error}}',
  APIGW_DOMAIN_BIND_ALREADY_BOUND: '域名 {{domain}} 已绑定（之前的请求可能已成功），继续配置证书',
  APIGW_VERIFICATION_HEADER: '需要域名所有权验证',
  APIGW_VERIFICATION_DOMAIN: '域名: {{domain}}',
  APIGW_VERIFICATION_INSTRUCTIONS: '要验证域名所有权，请添加以下 DNS 记录之一：',
  APIGW_VERIFICATION_OPTION1: '选项 1: CNAME 验证',
  APIGW_VERIFICATION_OPTION2: '选项 2: TXT 验证（推荐）',
  APIGW_VERIFICATION_RECORD_NAME: '  记录名: {{name}}',
  APIGW_VERIFICATION_RECORD_TYPE: '  记录类型: {{type}}',
  APIGW_VERIFICATION_RECORD_VALUE: '  记录值: {{value}}',
  APIGW_VERIFICATION_NEXT_STEPS: '添加 DNS 记录后：',
  APIGW_VERIFICATION_STEP1: '1. 等待 5-10 分钟让 DNS 传播',
  APIGW_VERIFICATION_STEP2: '2. 再次运行 deploy 命令',

  // Function resource messages
  FC3_DEPENDENT_RESOURCES_TRACKED: '依赖资源（SLS、RAM、安全组、NAS）已在状态中跟踪',
  FC3_CAN_RETRY_DEPLOYMENT: '您可以重试部署 - 系统将复用现有的依赖资源',

  // Bucket resource messages
  OSS_BUCKET_TRACKED_CAN_RETRY: '存储桶已在状态中跟踪，您可以重试部署以上传文件',
  OSS_DNS_CNAME_CREATED: '已创建 DNS CNAME 记录: {{domain}} -> {{cname}}',
  OSS_DNS_CNAME_EXISTS: 'DNS CNAME 记录已存在: {{domain}} -> {{cname}}',
  OSS_DNS_CNAME_DELETED: '已删除 DNS CNAME 记录: {{domain}}',
  OSS_DNS_CNAME_DELETE_FAILED: '删除 DNS CNAME 记录失败: {{domain}}: {{error}}',
  OSS_DNS_DOMAIN_NOT_MANAGED:
    '域名 {{domain}} 不在当前阿里云账号下管理。' + '请手动配置 CNAME: {{domain}} -> {{cname}}',
  OSS_DNS_MANUAL_CONFIG_REQUIRED: 'DNS 操作不可用。请手动配置 CNAME: {{domain}} -> {{cname}}',
  OSS_BUCKET_CNAME_NOT_SUPPORTED:
    '存储桶级 CNAME 绑定需要在阿里云控制台完成。' +
    'DNS CNAME 配置后，请在 OSS 控制台注册 {{domain}}: ' +
    'https://oss.console.aliyun.com/bucket/oss-{{region}}/{{bucket}}/domain/cname',
  OSS_BUCKET_CNAME_BOUND: '已绑定自定义域名到存储桶: {{domain}}',
  OSS_BUCKET_CNAME_EXISTS: '自定义域名已绑定到存储桶: {{domain}}',
  OSS_BUCKET_CNAME_UNBOUND: '已解绑存储桶自定义域名: {{domain}}',
  OSS_BUCKET_CNAME_BIND_FAILED: '绑定存储桶 CNAME 失败: {{error}}',
  OSS_BUCKET_CNAME_UNBIND_FAILED: '解绑存储桶 CNAME 失败: {{error}}',
  OSS_BUCKET_CNAME_NEED_VERIFY: '需要验证域名所有权。请在 DNS 控制台添加 TXT 记录后重试。',
  OSS_CNAME_TOKEN_CREATE_FAILED: '创建域名所有权验证 CnameToken 失败: {{domain}}',
  OSS_CNAME_CREATING_VERIFICATION_TOKEN: '正在为域名创建验证令牌: {{domain}}',
  OSS_CNAME_VERIFICATION_TOKEN_CREATED:
    '已为域名 {{domain}} 创建验证令牌。TXT 记录: {{txtRecord}}, 令牌: {{token}}',
  OSS_CNAME_TXT_RECORD_CREATED: '已创建域名所有权验证 TXT 记录: {{txtRecord}}',
  OSS_CNAME_TXT_RECORD_ALREADY_EXISTS: 'TXT 验证记录已存在: {{txtRecord}}',
  OSS_CNAME_TXT_RECORD_CREATE_FAILED: '创建 TXT 记录 {{txtRecord}} 失败: {{error}}。请手动添加。',
  OSS_CNAME_WAITING_FOR_VERIFICATION: '等待域名所有权验证生效: {{domain}}',
  OSS_CNAME_DNS_PROPAGATION_WAITING: '等待域名 TXT 记录 DNS 生效: {{domain}}',
  OSS_CNAME_DNS_PROPAGATION_CHECK:
    '正在检查 TXT 记录 DNS 生效状态（第 {{attempt}}/{{max}} 次，等待 1 分钟）...',
  OSS_CNAME_DNS_PROPAGATION_VERIFIED: '域名 TXT 记录 DNS 已生效: {{domain}}，耗时 {{minutes}} 分钟',
  OSS_CNAME_DNS_PROPAGATION_TIMEOUT:
    'TXT 记录 DNS 在 {{max}} 次尝试后仍未验证生效。继续尝试绑定...',
  OSS_CNAME_DNS_CHECK_FAILED: 'TXT 记录 DNS 生效检查失败: {{error}}',
  OSS_CNAME_VERIFICATION_RETRY_FAILED:
    '域名所有权验证中。请添加 TXT 记录: {{txtRecord}} 后重新部署。',
  OSS_CNAME_MANUAL_VERIFICATION_REQUIRED:
    '域名 {{domain}} 需要手动验证所有权。' +
    '请添加 TXT 记录: {{txtRecord}}，值为: {{token}}，然后重新部署。',
  OSS_VERIFICATION_HEADER: 'OSS 域名所有权验证',
  OSS_VERIFICATION_DOMAIN: '域名: {{domain}}',
  OSS_VERIFICATION_INSTRUCTIONS: '请添加以下 TXT DNS 记录以验证域名所有权:',
  OSS_VERIFICATION_RECORD_NAME: '  记录名称: {{name}}',
  OSS_VERIFICATION_RECORD_TYPE: '  记录类型: TXT',
  OSS_VERIFICATION_RECORD_VALUE: '  记录值: {{value}}',
  OSS_VERIFICATION_NEXT_STEPS: '添加 TXT 记录后:',
  OSS_VERIFICATION_STEP1: '1. 等待 5-10 分钟 DNS 生效',
  OSS_VERIFICATION_STEP2: '2. 重新运行部署命令',
  OSS_DNS_TXT_RECORD_DELETED: '已删除域名所有权验证 TXT 记录: {{domain}}',
  OSS_DNS_TXT_RECORD_DELETE_FAILED: '删除域名 TXT 记录失败: {{domain}}: {{error}}',
  OSS_BUCKET_CERT_BINDING: '正在为存储桶 {{bucketName}} 的自定义域名 {{domain}} 绑定 SSL 证书',
  OSS_BUCKET_CERT_BOUND: '已为自定义域名绑定 SSL 证书: {{domain}}',
  OSS_CORS_RULE_ADDED: '已为自定义域名添加 CORS 规则: {{domain}}',
  OSS_CORS_RULE_EXISTS: '自定义域名的 CORS 规则已存在: {{domain}}',
  OSS_CORS_RULE_ADD_FAILED: '为 {{domain}} 添加 CORS 规则失败: {{error}}',
  OSS_CORS_RULE_REMOVED: '已移除自定义域名的 CORS 规则: {{domain}}',
  OSS_CORS_RULE_REMOVE_FAILED: '移除 {{domain}} 的 CORS 规则失败: {{error}}',
  OSS_BUCKET_PUBLIC_ACCESS_BLOCK_DISABLED: '已为存储桶禁用公共访问阻止: {{bucketName}}',
  OSS_BUCKET_PUBLIC_ACCESS_BLOCK_DISABLE_FAILED:
    '禁用存储桶 {{bucketName}} 的公共访问阻止失败: {{error}}。您可能需要在阿里云 OSS 控制台手动禁用公共访问阻止。',

  // Tencent COS DNS messages
  COS_DNS_CNAME_CREATED: '已创建 DNS CNAME 记录: {{domain}} -> {{cname}}',
  COS_DNS_CNAME_EXISTS: 'DNS CNAME 记录已存在: {{domain}} -> {{cname}}',
  COS_DNS_CNAME_DELETED: '已删除 DNS CNAME 记录: {{domain}}',
  COS_DNS_CNAME_DELETE_FAILED: '删除 DNS CNAME 记录失败: {{domain}}: {{error}}',
  COS_DNS_DOMAIN_NOT_MANAGED:
    '域名 {{domain}} 不在当前腾讯云账号下管理。' + '请手动配置 CNAME: {{domain}} -> {{cname}}',
  COS_DNS_MANUAL_CONFIG_REQUIRED: 'DNS 操作不可用。请手动配置 CNAME: {{domain}} -> {{cname}}',
  COS_BUCKET_DOMAIN_BOUND: '已绑定自定义域名到存储桶: {{domain}}',
  COS_BUCKET_DOMAIN_BIND_FAILED: '绑定存储桶域名失败: {{error}}',
  COS_BUCKET_DOMAIN_UNBOUND: '已解绑存储桶自定义域名: {{domain}}',
  COS_BUCKET_DOMAIN_UNBIND_FAILED: '解绑存储桶域名失败: {{error}}',
  COS_CORS_RULE_ADDED: '已为自定义域名添加 CORS 规则: {{domain}}',
  COS_CORS_RULE_EXISTS: '自定义域名的 CORS 规则已存在: {{domain}}',
  COS_CORS_RULE_ADD_FAILED: '为 {{domain}} 添加 CORS 规则失败: {{error}}',
  COS_CORS_RULE_REMOVED: '已移除自定义域名的 CORS 规则: {{domain}}',
  COS_CORS_RULE_REMOVE_FAILED: '移除 {{domain}} 的 CORS 规则失败: {{error}}',

  // Dependency graph messages
  DEPENDENCY_GRAPH_GENERATED: '依赖图已生成',
  EXECUTION_ORDER: '执行顺序',
  DOT_GRAPH_OUTPUT: 'DOT 图形输出',
  CYCLE_DETECTED: '检测到循环依赖',

  // Generic executor messages
  CREATING_RESOURCE: '正在创建 {{resourceType}}: {{name}}',
  RESOURCE_CREATED: '成功创建 {{resourceType}}: {{name}}',
  UPDATING_RESOURCE: '正在更新 {{resourceType}}: {{name}}',
  RESOURCE_UPDATED: '成功更新 {{resourceType}}: {{name}}',
  DELETING_RESOURCE: '正在删除 {{resourceType}}: {{name}}',
  RESOURCE_DELETED: '成功删除 {{resourceType}}: {{name}}',
  NO_CHANGESForResource: '{{logicalId}} 无变更',
  STATE_NOT_FOUND_SKIPPING: '未找到 {{logicalId}} 的状态，跳过删除',
  UNKNOWN_ACTION_FOR_RESOURCE: '{{logicalId}} 的未知操作: {{action}}',
  RESOURCE_NOT_FOUND_PROVIDER: '提供商中未找到 {{resourceType}} {{name}}，跳过删除',

  // FC3 Resource bootstrap messages
  CREATING_BOOTSTRAP_BUCKET: '正在创建引导 OSS 存储桶: {{bucketName}}',
  UPLOADED_CODE_TO_OSS: '代码已上传至 oss://{{bucketName}}/{{objectName}}',
  CREATING_SLS_PROJECT: '正在创建 SLS 项目: {{projectName}}',
  CREATING_SLS_LOGSTORE: '正在创建 SLS 日志库: {{logstoreName}}',
  CREATING_SLS_INDEX: '正在为 SLS 日志库创建索引: {{logstoreName}}',
  CREATING_RAM_ROLE: '正在创建 RAM 角色: {{roleName}}',
  CREATING_SECURITY_GROUP: '正在创建安全组: {{sgName}}',
  CREATING_NAS_ACCESS_GROUP: '正在创建 NAS 权限组: {{accessGroupName}}',
  CREATING_NAS_ACCESS_RULE: '正在为 NAS 权限组创建访问规则: {{accessGroupName}}',
  CREATING_NAS_FILE_SYSTEM: '正在为 {{name}} 创建 NAS 文件系统',
  CREATING_NAS_MOUNT_TARGET: '正在为 NAS 文件系统创建挂载点: {{fileSystemId}}',
  DELETING_NAS_MOUNT_TARGET: '正在删除 NAS 挂载点: {{id}}',
  DELETING_NAS_FILE_SYSTEM: '正在删除 NAS 文件系统: {{id}}',
  DELETING_NAS_ACCESS_GROUP: '正在删除 NAS 权限组: {{id}}',
  DELETING_SECURITY_GROUP: '正在删除安全组: {{id}}',
  DELETING_RAM_ROLE: '正在删除 RAM 角色: {{id}}',
  DELETING_SLS_INDEX: '正在删除 SLS 索引: {{id}}',
  DELETING_SLS_LOGSTORE: '正在删除 SLS 日志库: {{id}}',
  DELETING_SLS_PROJECT: '正在删除 SLS 项目: {{id}}',
  UNKNOWN_RESOURCE_TYPE: '未知资源类型: {{type}}',
  FAILED_TO_DELETE_RESOURCE: '删除资源 {{type}}:{{id}} 失败: {{error}}',

  // OSS Resource messages
  BINDING_CUSTOM_DOMAIN_TO_BUCKET: '正在绑定自定义域名 {{domain}} 到存储桶 {{bucketName}}',

  // API Gateway Resource messages
  COULD_NOT_FIND_GROUP_CREATING: '未找到现有分组，正在创建新分组: {{error}}',
  DELETING_DNS_RECORD: '正在删除 DNS 记录: {{recordId}}',
  DNS_RECORD_DELETED: '成功删除 DNS 记录: {{recordId}}',
  FAILED_TO_DELETE_DNS_RECORD: '删除 DNS 记录 {{recordId}} 失败: {{error}}',

  // API Gateway Types messages
  CANNOT_RESOLVE_FUNCTION_REF: '无法解析函数引用 {{backendRef}}: 上下文中无 IAC',
  FUNCTION_REF_NOT_RESOLVED: '无法从 IAC 解析函数引用 {{backendRef}}',
  RESOLVED_FUNCTION_REF: '已将函数引用 {{backendRef}} 解析为函数名: {{functionName}}',

  // Show command messages
  LOADING_STATE_FOR: '正在加载应用 {{app}}、服务 {{service}}、阶段 {{stage}} 的状态...',
  NO_RESOURCES_FOUND: '状态中未找到资源。',
  STATE_LOCATION: '状态位置: {{location}}',
  BACKEND_REMOTE: '后端: 远程',
  DEPLOYED_RESOURCES: '已部署资源',
  SUMMARY: '摘要',
  PROVIDER_LABEL: '提供商',
  APP_LABEL: '应用',
  SERVICE_LABEL: '服务',
  STAGE_LABEL: '阶段',
  RESOURCES_LABEL: '资源',
  LAST_UPDATED_LABEL: '最后更新',
  LOCK_STATUS_LOCKED: '锁状态: 被 {{user}} 锁定',
  LOCK_STATUS_UNLOCKED: '锁状态: 未锁定',
  TO_DEPLOY_RESOURCES: '要部署资源，请运行: si deploy',
  REMOTE_BACKEND_FALLBACK: '已配置远程后端但凭证不可用。回退到本地状态。',
  FAILED_TO_LOAD_REMOTE_STATE: '从远程后端加载状态失败，回退到本地状态: {{error}}',

  // Show command category labels
  FUNCTIONS_LABEL: '函数',
  API_GATEWAY_LABEL: 'API 网关',
  STORAGE_LABEL: '存储',
  DATABASES_LABEL: '数据库',
  DNS_RECORDS_LABEL: 'DNS 记录',
  OTHER_RESOURCES_LABEL: '其他资源',

  // Show command resource output labels
  RUNTIME_LABEL: '运行时',
  HANDLER_LABEL: '处理器',
  MEMORY_TIMEOUT_LABEL: '内存: {{memory}}MB, 超时: {{timeout}}s',
  INTERNET_ACCESS_LABEL: '公网访问: {{value}}',
  API_GROUP_LABEL: 'API 分组',
  SUB_DOMAIN_LABEL: '子域名',
  BASE_PATH_LABEL: '基础路径',
  API_LABEL: 'API',
  GROUP_ID_LABEL: '分组 ID',
  BUCKET_LABEL: '存储桶',
  REGION_LABEL: '区域',
  ENDPOINT_LABEL: '端点',
  CUSTOM_DOMAIN_LABEL: '自定义域名',
  CNAME_TARGET_LABEL: 'CNAME 目标',
  ENGINE_LABEL: '引擎',
  STATUS_LABEL: '状态',
  CNAME_LABEL: 'CNAME',

  // Time ago format
  TIME_DAYS_AGO: '{{count}} 天前',
  TIME_HOURS_AGO: '{{count}} 小时前',
  TIME_MINUTES_AGO: '{{count}} 分钟前',
  TIME_JUST_NOW: '刚刚',

  // Deployer/Destroyer execution plan
  EXECUTION_PLAN_ITEM: '  - {{action}}: {{logicalId}} ({{resourceType}})',
  EXECUTION_ORDER_ITEM: '    {{index}}. {{logicalId}} ({{resourceType}}) - {{action}}',

  // Tablestore operations
  TABLE_IS_READY: '表 {{tableName}} 已就绪',
  FAILED_TO_CREATE_TABLE: '创建表 {{tableName}} 失败: {{error}}',
  TABLE_CREATED_SUCCESS: '成功创建表 {{tableName}}',
  FAILED_TO_DESCRIBE_TABLE: '描述表 {{tableName}} 失败: {{error}}',
  FAILED_TO_UPDATE_TABLE: '更新表 {{tableName}} 失败: {{error}}',
  TABLE_UPDATED_SUCCESS: '成功更新表 {{tableName}}',
  TABLE_ALREADY_DELETED: '表 {{tableName}} 已删除或不存在',
  FAILED_TO_DELETE_TABLE: '删除表 {{tableName}} 失败: {{error}}',
  TABLE_DELETED_SUCCESS: '成功删除表 {{tableName}}',

  // ECS operations
  SKIPPING_INVALID_INGRESS_RULE: '跳过无效的入站规则: {{rule}}。{{error}}',
  INGRESS_RULE_EXISTS_SKIPPING: '入站规则已存在，跳过: {{rule}}',
  FAILED_TO_ADD_INGRESS_RULE: '添加入站规则失败: {{rule}}。{{error}}',
  SKIPPING_INVALID_EGRESS_RULE: '跳过无效的出站规则: {{rule}}。{{error}}',
  EGRESS_RULE_EXISTS_SKIPPING: '出站规则已存在，跳过: {{rule}}',
  FAILED_TO_ADD_EGRESS_RULE: '添加出站规则失败: {{rule}}。{{error}}',

  // DNS error
  DNS_ERROR: 'DNS 错误: {{error}}',

  // RAM operations
  RAM_ROLE_ALREADY_EXISTS:
    'RAM 角色 "{{roleName}}" 在云端已存在（检测到状态漂移）。' + '正在更新信任策略并复用现有角色。',
  RAM_ROLE_NOT_FOUND_IN_CLOUD:
    '云提供商中不存在 RAM 角色 "{{roleName}}"。' +
    '该角色可能已被手动删除。' +
    '修复方法：从状态中移除该角色并重新部署。',
  RAM_ROLE_DRIFT_RECOVERY_FAILED:
    'RAM 角色 "{{roleName}}" 状态漂移恢复失败：{{error}}。' +
    '角色在云端存在但恢复操作失败。' +
    '修复方法：在云控制台手动确认角色状态，从状态中移除该角色并重新部署。',

  // 证书消息
  CERT_INVALID_CONFIGURATION:
    '证书 "{{name}}" 必须具有 (certificate_body + private_key) 或 certificate_id，但不能同时存在',
  CERT_FILE_NOT_FOUND: '未找到证书文件: {{filePath}}',
  CERT_READING_FILE: '正在读取证书文件: {{filePath}}',
  CERT_PARSING_CERTIFICATES: '正在解析证书配置',
  CERT_RESOLVING_REFERENCE: '正在解析域名 "{{domain}}" 的证书引用 "{{reference}}"',
  CERT_REFERENCE_NOT_FOUND: '无法解析证书引用 "{{reference}}"。',
  CERT_USING_SUBSCRIPTION_ID:
    '证书 "{{provided}}" 看起来是订阅实例ID。请使用数字格式的证书ID（如 "24019487"）。可在阿里云 CAS 控制台 → 证书详情 中找到。',
  CERT_RESOLVED_UPLOAD: '证书 "{{name}}" 解析为上传模式（提供了 PEM 文件）',
  CERT_RESOLVED_REFERENCE: '证书 "{{name}}" 解析为引用模式（certificate_id: {{certId}}）',
  CERT_READING_PEM_FILES: '正在读取证书 "{{name}}" 的 PEM 文件',

  CERT_INLINE_PEM_WARNING:
    '安全警告：certificate_private_key 似乎包含内联 PEM 内容。建议使用文件路径（例如 ./certs/server.key）以提高安全性。',

  // CAS（证书授权服务）消息
  CAS_UPLOADING_CERT: '正在上传证书 "{{name}}" 到 CAS',
  CAS_CERT_UPLOADED: '证书 "{{name}}" 已上传到 CAS（certId: {{certId}}）',
  CAS_UPLOAD_NO_CERT_ID: 'CAS 上传成功但未返回证书 "{{name}}" 的 ID',
  CAS_FETCHING_CERT: '正在从 CAS 获取证书详情（certId: {{certId}}）',
  CAS_CERT_NOT_FOUND: '在 CAS 中未找到证书（certId: {{certId}}）',
  CAS_CERT_FETCH_FAILED: '从 CAS 获取证书失败（certId: {{certId}}）：{{error}}',
  CAS_DELETING_CERT: '正在从 CAS 删除证书（certId: {{certId}}）',
  CAS_CERT_DELETED: '已从 CAS 删除证书（certId: {{certId}}）',

  // 腾讯云 SSL 证书消息
  SSL_UPLOADING_CERT: '正在上传证书到腾讯云 SSL（别名: {{alias}}）',
  SSL_CERT_UPLOADED: '证书已上传到腾讯云 SSL（别名: {{alias}}, 证书ID: {{certificateId}}）',
  SSL_UPLOAD_NO_CERT_ID: 'SSL 上传成功但未返回证书 "{{alias}}" 的 ID',
  SSL_DELETING_CERT: '正在从腾讯云 SSL 删除证书（证书ID: {{certificateId}}）',
  SSL_CERT_DELETED: '已从腾讯云 SSL 删除证书（证书ID: {{certificateId}}）',
  SSL_CERT_NOT_FOUND: '在腾讯云 SSL 中未找到证书（证书ID: {{certificateId}}）',
  SSL_DELETE_FAILED: '从腾讯云 SSL 删除证书失败（证书ID: {{certificateId}}）',
  SSL_DEPLOYING_CERT:
    '正在部署证书到 {{resourceType}}（证书ID: {{certificateId}}, 实例: {{instances}}）',
  SSL_CERT_DEPLOY_SUBMITTED:
    '证书部署任务已提交到 {{resourceType}}（证书ID: {{certificateId}}, 部署记录ID: {{deployRecordId}}）',
  SSL_CERT_DEPLOY_EXISTING_TASK:
    '证书部署任务已在 {{resourceType}} 上运行中（证书ID: {{certificateId}}）',
  SSL_CERT_DEPLOYED:
    '证书已部署到 {{resourceType}}（证书ID: {{certificateId}}, 部署记录ID: {{deployRecordId}}）',
  SSL_CERT_DEPLOY_FAILED:
    '部署证书到 {{resourceType}} 失败（证书ID: {{certificateId}}）：{{error}}',
  COS_BUCKET_CERT_DEPLOYING:
    '正在为 COS 存储桶域名部署 SSL 证书: {{domain}}（存储桶: {{bucketName}}）',
  COS_BUCKET_CERT_DEPLOYED: 'SSL 证书已部署到 COS 存储桶域名: {{domain}}',
  BUCKET_DOMAIN_REQUIRED_FOR_CERT:
    '存储桶 "{{name}}" 已配置证书信息，但未设置域名。提供证书信息时必须设置域名。',

  // 协议消息
  PROTOCOL_INFERRED_REDIRECT: '协议 "{{protocol}}" 推断 HTTP 到 HTTPS 重定向：{{redirect}}',

  // 重试工具消息
  RETRY_ATTEMPT: '正在重试 {{operation}}（第 {{attempt}}/{{max}} 次）...',
  RETRY_ATTEMPT_FAILED: '{{operation}} 第 {{attempt}}/{{max}} 次尝试失败：{{error}}。正在重试...',
  RETRY_ALL_ATTEMPTS_FAILED: '{{operation}} 在 {{max}} 次尝试后失败：{{error}}',
  RETRY_UNEXPECTED_FAILURE: '{{operation}} 意外失败',
};
