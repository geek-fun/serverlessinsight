import { Service } from '@volcengine/openapi';
import type {
  TlsProjectConfig,
  TlsProjectInfo,
  TlsTopicConfig,
  TlsTopicInfo,
  TlsIndexConfig,
} from './types';
import { logger } from '../logger';
import { lang } from '../../lang';
import { pollUntil, PollingTimeoutError } from '../polling';

type TlsSdkClient = Service;

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
        if (topic.status === 'Failed' || topic.status === 'Error') {
          throw new Error(lang.__('TLS_TOPIC_FAILED', { topicName }));
        }
        return topic;
      },
      isDone: (topic) => topic?.status === 'Active',
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

export const createTlsOperations = (tlsClient: TlsSdkClient) => {
  const operations = {
    createProject: async (config: TlsProjectConfig): Promise<TlsProjectInfo> => {
      const response = await tlsClient.fetchOpenAPI({
        Action: 'CreateProject',
        Version: '2024-01-01',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          ProjectName: config.projectName,
          Description: config.description,
          Region: config.region,
        },
      });

      const data = (response.Result || {}) as Record<string, unknown>;

      logger.info(lang.__('TLS_PROJECT_CREATED', { projectName: config.projectName }));

      return {
        projectId: data.ProjectId as string | undefined,
        projectName: config.projectName,
        description: config.description,
        region: config.region,
        createTime: data.CreateTime as string | undefined,
        status: data.Status as string | undefined,
      };
    },

    getProject: async (projectName: string): Promise<TlsProjectInfo | null> => {
      try {
        const response = await tlsClient.fetchOpenAPI({
          Action: 'GetProject',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { ProjectName: projectName },
        });

        const data = (response.Result || {}) as Record<string, unknown>;

        return {
          projectId: data.ProjectId as string | undefined,
          projectName: data.ProjectName as string | undefined,
          description: data.Description as string | undefined,
          region: data.Region as string | undefined,
          createTime: data.CreateTime as string | undefined,
          status: data.Status as string | undefined,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ProjectNotFound' || error.code === 'ResourceNotFound') {
            return null;
          }
        }
        throw error;
      }
    },

    deleteProject: async (projectName: string): Promise<void> => {
      try {
        await tlsClient.fetchOpenAPI({
          Action: 'DeleteProject',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: { ProjectName: projectName },
        });

        logger.info(lang.__('TLS_PROJECT_DELETED', { projectName }));
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'ProjectNotFound' || error.code === 'ResourceNotFound') {
            logger.warn(lang.__('TLS_PROJECT_NOT_FOUND', { projectName }));
            return;
          }
        }
        throw error;
      }
    },

    createTopic: async (config: TlsTopicConfig): Promise<TlsTopicInfo> => {
      const response = await tlsClient.fetchOpenAPI({
        Action: 'CreateTopic',
        Version: '2024-01-01',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          ProjectName: config.projectName,
          TopicName: config.topicName,
          Description: config.description,
          TTL: config.ttl ?? 30,
        },
      });

      const data = (response.Result || {}) as Record<string, unknown>;

      logger.info(lang.__('TLS_TOPIC_CREATED', { topicName: config.topicName }));

      return {
        topicId: data.TopicId as string | undefined,
        topicName: config.topicName,
        projectName: config.projectName,
        description: config.description,
        ttl: config.ttl,
        createTime: data.CreateTime as string | undefined,
        status: data.Status as string | undefined,
      };
    },

    getTopic: async (projectName: string, topicName: string): Promise<TlsTopicInfo | null> => {
      try {
        const response = await tlsClient.fetchOpenAPI({
          Action: 'GetTopic',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: {
            ProjectName: projectName,
            TopicName: topicName,
          },
        });

        const data = (response.Result || {}) as Record<string, unknown>;

        return {
          topicId: data.TopicId as string | undefined,
          topicName: data.TopicName as string | undefined,
          projectName: data.ProjectName as string | undefined,
          description: data.Description as string | undefined,
          ttl: data.TTL as number | undefined,
          createTime: data.CreateTime as string | undefined,
          status: data.Status as string | undefined,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'TopicNotFound' || error.code === 'ResourceNotFound') {
            return null;
          }
        }
        throw error;
      }
    },

    deleteTopic: async (projectName: string, topicName: string): Promise<void> => {
      try {
        await tlsClient.fetchOpenAPI({
          Action: 'DeleteTopic',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: {
            ProjectName: projectName,
            TopicName: topicName,
          },
        });

        logger.info(lang.__('TLS_TOPIC_DELETED', { topicName }));
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'TopicNotFound' || error.code === 'ResourceNotFound') {
            logger.warn(lang.__('TLS_TOPIC_NOT_FOUND', { topicName }));
            return;
          }
        }
        throw error;
      }
    },

    createIndex: async (config: TlsIndexConfig): Promise<void> => {
      await tlsClient.fetchOpenAPI({
        Action: 'CreateIndex',
        Version: '2024-01-01',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          ProjectName: config.projectName,
          TopicName: config.topicName,
          FullTextIndex: config.fullTextIndex
            ? {
                Delimiter: config.fullTextIndex.delimiter ?? ' ,.?;!\n\t',
                CaseSensitive: config.fullTextIndex.caseSensitive ?? false,
              }
            : undefined,
          KeyValueIndex: config.keyValueIndex,
        },
      });

      logger.info(lang.__('TLS_INDEX_CREATED', { topicName: config.topicName }));
    },

    deleteIndex: async (projectName: string, topicName: string): Promise<void> => {
      try {
        await tlsClient.fetchOpenAPI({
          Action: 'DeleteIndex',
          Version: '2024-01-01',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: {
            ProjectName: projectName,
            TopicName: topicName,
          },
        });

        logger.info(lang.__('TLS_INDEX_DELETED', { topicName }));
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error) {
          if (error.code === 'IndexNotFound' || error.code === 'ResourceNotFound') {
            return;
          }
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
  };

  return operations;
};
