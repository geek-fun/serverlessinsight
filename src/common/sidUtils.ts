/**
 * ServerlessInsight ID (SID) — logical resource identifier.
 *
 * Format:  si:<provider>:<service>:<stage>:<id>
 * Example: si:aliyun:rds:default:rm-abc123
 *
 * SID is a tool-generated identifier that uniquely locates a resource
 * within a ServerlessInsight deployment.  It is NOT a cloud-provider
 * identifier — the provider-returned physical ID is stored separately
 * in the `id` field of ResourceInstance.
 */

/**
 * Build a ServerlessInsight ID (SID).
 *
 * @param provider - Cloud provider name (e.g. 'aliyun', 'tencent')
 * @param service  - Cloud service name (e.g. 'fc3', 'oss', 'rds', 'scf')
 * @param stage    - Deployment stage (e.g. 'default', 'dev', 'prod')
 * @param id       - Provider-returned physical resource identifier
 */
export const buildSid = (provider: string, service: string, stage: string, id: string): string =>
  `si:${provider}:${service}:${stage}:${id}`;
