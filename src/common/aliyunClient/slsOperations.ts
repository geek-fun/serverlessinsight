import SlsClient from '@alicloud/sls20201230';
import * as sls from '@alicloud/sls20201230';
import { SlsProjectInfo, SlsLogstoreInfo, SlsIndexInfo } from './types';
import { logger } from '../logger';
import { pollUntil, PollingTimeoutError } from '../polling';

type SlsSdkClient = SlsClient;

const waitForSlsProject = async (
  getProject: (projectName: string) => Promise<SlsProjectInfo | null>,
  projectName: string,
): Promise<SlsProjectInfo> => {
  try {
    const project = await pollUntil<SlsProjectInfo>({
      description: `SLS project ${projectName} to be ready`,
      fetch: async () => {
        try {
          return await getProject(projectName);
        } catch {
          // Project not ready yet
          return null;
        }
      },
      isDone: (project) => project?.status === 'Normal',
      intervalMs: 3000,
      maxAttempts: 30,
      onProgress: (project) => {
        if (project) {
          logger.info(
            `Waiting for SLS project ${projectName} to be ready (current status: ${
              project.status ?? 'unknown'
            })`,
          );
        }
      },
    });
    return project!;
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      return { projectName };
    }
    throw e;
  }
};

const waitForSlsLogstore = async (
  getLogstore: (projectName: string, logstoreName: string) => Promise<SlsLogstoreInfo | null>,
  projectName: string,
  logstoreName: string,
  ttl: number,
): Promise<SlsLogstoreInfo> => {
  try {
    const logstore = await pollUntil<SlsLogstoreInfo>({
      description: `SLS logstore ${projectName}/${logstoreName} to be ready`,
      fetch: async () => {
        try {
          return await getLogstore(projectName, logstoreName);
        } catch {
          // Logstore not ready yet
          return null;
        }
      },
      isDone: (logstore) => logstore != null,
      intervalMs: 3000,
      maxAttempts: 30,
      onProgress: (logstore) => {
        if (logstore) {
          logger.info(`Waiting for SLS logstore ${projectName}/${logstoreName} to be ready...`);
        }
      },
    });
    return logstore!;
  } catch (e) {
    if (e instanceof PollingTimeoutError) {
      return { logstoreName, projectName, ttl };
    }
    throw e;
  }
};

export const createSlsOperations = (slsClient: SlsSdkClient) => {
  const operations = {
    createProject: async (projectName: string, description?: string): Promise<SlsProjectInfo> => {
      const request = new sls.CreateProjectRequest({
        projectName,
        description: description ?? `ServerlessInsight log project for ${projectName}`,
      });

      await slsClient.createProject(request);

      // Wait for project to be ready
      return await waitForSlsProject(operations.getProject, projectName);
    },

    getProject: async (projectName: string): Promise<SlsProjectInfo | null> => {
      try {
        const response = await slsClient.getProject(projectName, new sls.GetProjectRequest({}));

        if (!response || !response.body) {
          return null;
        }

        return {
          projectName: response.body.name ?? projectName,
          description: response.body.description,
          status: response.body.status,
          createTime: response.body.createTime,
          lastModifyTime: response.body.lastModifyTime,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'ProjectNotExist'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteProject: async (projectName: string): Promise<void> => {
      const request = new sls.DeleteProjectRequest({});
      await slsClient.deleteProject(projectName, request);
    },

    getProjectTags: async (projectName: string): Promise<Array<{ key: string; value: string }>> => {
      const request = new sls.ListTagResourcesRequest({
        resourceId: [projectName],
        resourceType: 'project',
      });
      const response = await slsClient.listTagResources(request);
      return (response.body?.tagResources ?? []).map((tagResource) => ({
        key: tagResource.tagKey ?? '',
        value: tagResource.tagValue ?? '',
      }));
    },

    createLogstore: async (
      projectName: string,
      logstoreName: string,
      ttl: number = 30,
    ): Promise<SlsLogstoreInfo> => {
      const request = new sls.CreateLogStoreRequest({
        logstoreName,
        ttl,
        shardCount: 2,
      });

      await slsClient.createLogStore(projectName, request);

      // Wait for logstore to be ready
      return await waitForSlsLogstore(operations.getLogstore, projectName, logstoreName, ttl);
    },

    getLogstore: async (
      projectName: string,
      logstoreName: string,
    ): Promise<SlsLogstoreInfo | null> => {
      try {
        const response = await slsClient.getLogStore(projectName, logstoreName);

        if (!response || !response.body) {
          return null;
        }

        return {
          logstoreName: response.body.logstoreName ?? logstoreName,
          projectName,
          ttl: response.body.ttl,
          shardCount: response.body.shardCount,
          createTime: response.body.createTime,
          lastModifyTime: response.body.lastModifyTime,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'LogStoreNotExist'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteLogstore: async (projectName: string, logstoreName: string): Promise<void> => {
      await slsClient.deleteLogStore(projectName, logstoreName);
    },

    listLogStores: async (projectName: string): Promise<string[]> => {
      const request = new sls.ListLogStoresRequest({ size: 500 });
      const response = await slsClient.listLogStores(projectName, request);
      return response.body?.logstores ?? [];
    },

    createIndex: async (projectName: string, logstoreName: string): Promise<SlsIndexInfo> => {
      const request = new sls.CreateIndexRequest({
        body: new sls.Index({
          line: new sls.IndexLine({
            token: [
              ',',
              ' ',
              "'",
              '"',
              ';',
              '=',
              '(',
              ')',
              '[',
              ']',
              '{',
              '}',
              '?',
              '@',
              '&',
              '<',
              '>',
              '/',
              ':',
              '\n',
              '\t',
              '\r',
            ],
          }),
        }),
      });

      await slsClient.createIndex(projectName, logstoreName, request);

      return { projectName, logstoreName };
    },

    getIndex: async (projectName: string, logstoreName: string): Promise<SlsIndexInfo | null> => {
      try {
        const response = await slsClient.getIndex(projectName, logstoreName);

        if (!response || !response.body) {
          return null;
        }

        return {
          projectName,
          logstoreName,
          indexMode: response.body.indexMode,
          lastModifyTime: response.body.lastModifyTime,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          error.code === 'IndexConfigNotExist'
        ) {
          return null;
        }
        throw error;
      }
    },

    deleteIndex: async (projectName: string, logstoreName: string): Promise<void> => {
      await slsClient.deleteIndex(projectName, logstoreName);
    },

    waitForProject: async (projectName: string): Promise<SlsProjectInfo> => {
      return waitForSlsProject(operations.getProject, projectName);
    },

    waitForLogstore: async (
      projectName: string,
      logstoreName: string,
      ttl: number = 30,
    ): Promise<SlsLogstoreInfo> => {
      return waitForSlsLogstore(operations.getLogstore, projectName, logstoreName, ttl);
    },

    addTags: async (config: {
      resourceType: 'project' | 'logstore';
      resourceId: string;
      tags: Array<{ key: string; value: string }>;
    }): Promise<void> => {
      const request = new sls.TagResourcesRequest({
        resourceId: [config.resourceId],
        resourceType: config.resourceType,
        tags: config.tags,
      });
      await slsClient.tagResources(request);
    },

    removeTags: async (config: {
      resourceType: 'project' | 'logstore';
      resourceId: string;
      tagKeys: string[];
    }): Promise<void> => {
      const request = new sls.UntagResourcesRequest({
        resourceId: [config.resourceId],
        resourceType: config.resourceType,
        tags: config.tagKeys,
      });
      await slsClient.untagResources(request);
    },
  };

  return operations;
};
