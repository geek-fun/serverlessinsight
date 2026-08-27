import { TlsService } from '@volcengine/openapi/lib/services/tls';
import type {
  TlsProjectConfig,
  TlsProjectInfo,
  TlsTopicConfig,
  TlsTopicInfo,
  TlsIndexConfig,
  TlsTagConfig,
  TlsRemoveTagsConfig,
} from './types';
import { logger } from '../logger';
import { lang } from '../../lang';
import { pollUntil, PollingTimeoutError } from '../polling';

type TlsSdkClient = TlsService;

const WAIT_INTERVAL_MS = 5000;
const MAX_WAIT_ATTEMPTS = 30;

const waitForProjectReady = async (
  getProject: (projectName: string) => Promise<TlsProjectInfo | null>,
  projectName: string,
): Promise<void> => {
  try {
    await pollUntil({
      description: `TLS project ${projectName} to be ready`,
      fetch: async () => {
        const project = await getProject(projectName);
        if (!project) {
          throw new Error(lang.__('TLS_PROJECT_NOT_FOUND', { projectName }));
        }
        if (project.status === 'Failed' || project.status === 'Error') {
          throw new Error(lang.__('TLS_PROJECT_FAILED', { projectName }));
        }
        return project;
      },
      isDone: (project) => project?.status === 'Active',
      intervalMs: WAIT_INTERVAL_MS,
      maxAttempts: MAX_WAIT_ATTEMPTS,
    });
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      throw new Error(lang.__('TLS_PROJECT_TIMEOUT', { projectName }), { cause: e });
    }
    throw e;
  }
};

const waitForTopicReady = async (
  getTopic: (projectName: string, topicName: string) => Promise<TlsTopicInfo | null>,
  projectName: string,
  topicName: string,
): Promise<void> => {
  try {
    await pollUntil({
      description: `TLS topic ${topicName} to be ready`,
      fetch: async () => {
        const topic = await getTopic(projectName, topicName);
        if (!topic) {
          throw new Error(lang.__('TLS_TOPIC_NOT_FOUND', { topicName }));
        }
        return topic;
      },
      isDone: (topic) => !!topic?.topicId,
      intervalMs: WAIT_INTERVAL_MS,
      maxAttempts: MAX_WAIT_ATTEMPTS,
    });
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      throw new Error(lang.__('TLS_TOPIC_TIMEOUT', { topicName }), { cause: e });
    }
    throw e;
  }
};

const extractErrorCode = (error: unknown): string | undefined => {
  if (error && typeof error === 'object') {
    const candidate = error as {
      code?: string;
      response?: { data?: { Error?: { Code?: string } } };
    };
    if (candidate.code) return candidate.code;
    const nestedCode = candidate.response?.data?.Error?.Code;
    if (nestedCode) return nestedCode;
  }
  return undefined;
};

const isAlreadyExistsError = (error: unknown): boolean => {
  const code = extractErrorCode(error);
  return (
    code === 'ProjectAlreadyExists' ||
    code === 'TopicAlreadyExists' ||
    code === 'IndexAlreadyExists' ||
    code === 'ResourceAlreadyExists' ||
    code === 'AlreadyExists' ||
    code === 'Conflict' ||
    code === 'Duplicated'
  );
};

const isNotFoundError = (error: unknown): boolean => {
  const code = extractErrorCode(error);
  return (
    code === 'ProjectNotFound' ||
    code === 'TopicNotFound' ||
    code === 'IndexNotFound' ||
    code === 'ResourceNotFound' ||
    code === 'NotFound'
  );
};

const listTagsForResource = async (
  tlsClient: TlsSdkClient,
  resourceType: 'project' | 'topic',
  resourceId: string,
): Promise<Array<{ Key?: string; Value?: string }>> => {
  try {
    const response = await tlsClient.ListTagsForResources({
      ResourceType: resourceType,
      ResourcesIds: [resourceId],
      MaxResults: 50,
    });
    return (response.ResourceTags ?? []).map((rt) => ({ Key: rt.TagKey, Value: rt.TagValue }));
  } catch (error: unknown) {
    if (isNotFoundError(error)) {
      return [];
    }
    throw error;
  }
};

export const createTlsOperations = (tlsClient: TlsSdkClient) => {
  const operations = {
    createProject: async (config: TlsProjectConfig): Promise<TlsProjectInfo> => {
      try {
        const response = await tlsClient.CreateProject({
          ProjectName: config.projectName,
          Description: config.description,
          Region: config.region ?? '',
        });

        logger.info(lang.__('TLS_PROJECT_CREATED', { projectName: config.projectName }));

        return {
          projectId: response.ProjectId,
          projectName: config.projectName,
          description: config.description,
          region: config.region,
          status: 'Active',
          created: true,
        };
      } catch (error: unknown) {
        if (isAlreadyExistsError(error)) {
          logger.warn(lang.__('TLS_PROJECT_ALREADY_EXISTS', { projectName: config.projectName }));
          const existing = await operations.getProject(config.projectName);
          if (existing) {
            return { ...existing, created: false };
          }
          return {
            projectName: config.projectName,
            description: config.description,
            region: config.region,
            status: 'Active',
            created: false,
          };
        }
        throw error;
      }
    },

    getProject: async (projectName: string): Promise<TlsProjectInfo | null> => {
      try {
        const response = await tlsClient.DescribeProjects({ ProjectName: projectName });

        const project = response.Projects?.find((p) => p.ProjectName === projectName);
        if (!project) {
          return null;
        }

        return {
          projectId: project.ProjectId,
          projectName: project.ProjectName,
          description: project.Description,
          region: undefined,
          createTime: project.CreateTime,
          status: 'Active',
        };
      } catch (error: unknown) {
        if (isNotFoundError(error)) {
          return null;
        }
        throw error;
      }
    },

    getProjectTags: async (
      projectName: string,
    ): Promise<Array<{ Key?: string; Value?: string }>> => {
      const project = await operations.getProject(projectName);
      if (!project?.projectId) {
        return [];
      }
      return listTagsForResource(tlsClient, 'project', project.projectId);
    },

    deleteProject: async (projectName: string): Promise<void> => {
      try {
        const existing = await operations.getProject(projectName);
        if (!existing?.projectId) {
          logger.warn(lang.__('TLS_PROJECT_NOT_FOUND', { projectName }));
          return;
        }

        await tlsClient.DeleteProject({ ProjectId: existing.projectId });
        logger.info(lang.__('TLS_PROJECT_DELETED', { projectName }));
      } catch (error: unknown) {
        if (isNotFoundError(error)) {
          logger.warn(lang.__('TLS_PROJECT_NOT_FOUND', { projectName }));
          return;
        }
        throw error;
      }
    },

    createTopic: async (config: TlsTopicConfig): Promise<TlsTopicInfo> => {
      try {
        const project = await operations.getProject(config.projectName);
        if (!project?.projectId) {
          throw new Error(lang.__('TLS_PROJECT_NOT_FOUND', { projectName: config.projectName }));
        }

        const response = await tlsClient.CreateTopic({
          ProjectId: project.projectId,
          TopicName: config.topicName,
          Description: config.description,
          Ttl: config.ttl ?? 30,
          ShardCount: 1,
        });

        logger.info(lang.__('TLS_TOPIC_CREATED', { topicName: config.topicName }));

        return {
          topicId: response.TopicId,
          topicName: config.topicName,
          projectName: config.projectName,
          description: config.description,
          ttl: config.ttl ?? 30,
          status: 'Active',
        };
      } catch (error: unknown) {
        if (isAlreadyExistsError(error)) {
          logger.warn(lang.__('TLS_TOPIC_ALREADY_EXISTS', { topicName: config.topicName }));
          const existing = await operations.getTopic(config.projectName, config.topicName);
          if (existing) {
            return existing;
          }
          return {
            topicName: config.topicName,
            projectName: config.projectName,
            description: config.description,
            ttl: config.ttl ?? 30,
            status: 'Active',
          };
        }
        throw error;
      }
    },

    getTopic: async (projectName: string, topicName: string): Promise<TlsTopicInfo | null> => {
      try {
        const project = await operations.getProject(projectName);
        if (!project?.projectId) {
          return null;
        }

        const response = await tlsClient.DescribeTopics({
          ProjectId: project.projectId,
          TopicName: topicName,
        });

        const topic = response.Topics?.find((t) => t.TopicName === topicName);
        if (!topic) {
          return null;
        }

        const tags = await listTagsForResource(tlsClient, 'topic', topic.TopicId);

        return {
          topicId: topic.TopicId,
          topicName: topic.TopicName,
          projectName,
          description: topic.Description,
          ttl: topic.Ttl,
          createTime: topic.CreateTime,
          status: 'Active',
          tags,
        };
      } catch (error: unknown) {
        if (isNotFoundError(error)) {
          return null;
        }
        throw error;
      }
    },

    listTopics: async (projectName: string): Promise<TlsTopicInfo[]> => {
      try {
        const project = await operations.getProject(projectName);
        if (!project?.projectId) {
          return [];
        }

        const response = await tlsClient.DescribeTopics({ ProjectId: project.projectId });

        return (response.Topics ?? []).map((topic) => ({
          topicId: topic.TopicId,
          topicName: topic.TopicName,
          projectName,
          description: topic.Description,
          ttl: topic.Ttl,
          createTime: topic.CreateTime,
          status: 'Active',
        }));
      } catch (error: unknown) {
        if (isNotFoundError(error)) {
          return [];
        }
        throw error;
      }
    },

    deleteTopic: async (projectName: string, topicName: string): Promise<void> => {
      try {
        const existing = await operations.getTopic(projectName, topicName);
        if (!existing?.topicId) {
          logger.warn(lang.__('TLS_TOPIC_NOT_FOUND', { topicName }));
          return;
        }

        await tlsClient.DeleteTopic({ TopicId: existing.topicId });
        logger.info(lang.__('TLS_TOPIC_DELETED', { topicName }));
      } catch (error: unknown) {
        if (isNotFoundError(error)) {
          logger.warn(lang.__('TLS_TOPIC_NOT_FOUND', { topicName }));
          return;
        }
        throw error;
      }
    },

    createIndex: async (config: TlsIndexConfig): Promise<void> => {
      try {
        const topic = await operations.getTopic(config.projectName, config.topicName);
        if (!topic?.topicId) {
          throw new Error(lang.__('TLS_TOPIC_NOT_FOUND', { topicName: config.topicName }));
        }

        await tlsClient.CreateIndex({
          TopicId: topic.topicId,
          FullText: config.fullTextIndex
            ? {
                Delimiter: config.fullTextIndex.delimiter ?? ' ,.?;!\n\t',
                CaseSensitive: config.fullTextIndex.caseSensitive ?? false,
              }
            : undefined,
          KeyValue: config.keyValueIndex?.map((kv) => ({
            Key: kv.key,
            Value: { ValueType: kv.type, SqlFlag: true },
          })),
        });

        logger.info(lang.__('TLS_INDEX_CREATED', { topicName: config.topicName }));
      } catch (error: unknown) {
        if (isAlreadyExistsError(error)) {
          logger.warn(lang.__('TLS_INDEX_ALREADY_EXISTS', { topicName: config.topicName }));
          return;
        }
        throw error;
      }
    },

    deleteIndex: async (projectName: string, topicName: string): Promise<void> => {
      try {
        const topic = await operations.getTopic(projectName, topicName);
        if (!topic?.topicId) {
          return;
        }

        await tlsClient.DeleteIndex({ TopicId: topic.topicId });
        logger.info(lang.__('TLS_INDEX_DELETED', { topicName }));
      } catch (error: unknown) {
        if (isNotFoundError(error)) {
          return;
        }
        throw error;
      }
    },

    waitForProject: async (projectName: string): Promise<void> => {
      await waitForProjectReady(operations.getProject, projectName);
    },

    waitForTopic: async (projectName: string, topicName: string): Promise<void> => {
      await waitForTopicReady(operations.getTopic, projectName, topicName);
    },

    addTags: async (config: TlsTagConfig): Promise<void> => {
      try {
        await tlsClient.AddTagsToResource({
          ResourceType: config.resourceType,
          ResourcesList: config.resourcesList,
          Tags: config.tags.map((tag) => ({ Key: tag.key, Value: tag.value })),
        });
      } catch (error: unknown) {
        if (isNotFoundError(error)) {
          logger.warn(lang.__('TLS_TAG_TARGET_NOT_FOUND', { resourceType: config.resourceType }));
          return;
        }
        throw error;
      }
    },

    removeTags: async (config: TlsRemoveTagsConfig): Promise<void> => {
      try {
        await tlsClient.RemoveTagsFromResource({
          ResourceType: config.resourceType,
          ResourcesList: config.resourcesList,
          TagKeyList: config.tagKeys,
        });
      } catch (error: unknown) {
        if (isNotFoundError(error)) {
          logger.warn(lang.__('TLS_TAG_TARGET_NOT_FOUND', { resourceType: config.resourceType }));
          return;
        }
        throw error;
      }
    },
  };

  return operations;
};
