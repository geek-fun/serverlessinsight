import SlsClient from '@alicloud/sls20201230';
import * as sls from '@alicloud/sls20201230';
import { SlsProjectInfo, SlsLogstoreInfo, SlsIndexInfo } from './types';

type SlsSdkClient = SlsClient;

// Helper for SLS operations
const waitForSlsProject = async (
  getProject: (projectName: string) => Promise<SlsProjectInfo | null>,
  projectName: string,
): Promise<SlsProjectInfo> => {
  let retries = 0;
  while (retries < 10) {
    try {
      const project = await getProject(projectName);
      if (project) {
        return project;
      }
    } catch {
      // Project not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    retries++;
  }
  return { projectName };
};

const waitForSlsLogstore = async (
  getLogstore: (projectName: string, logstoreName: string) => Promise<SlsLogstoreInfo | null>,
  projectName: string,
  logstoreName: string,
  ttl: number,
): Promise<SlsLogstoreInfo> => {
  let retries = 0;
  while (retries < 10) {
    try {
      const logstore = await getLogstore(projectName, logstoreName);
      if (logstore) {
        return logstore;
      }
    } catch {
      // Logstore not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    retries++;
  }
  return { logstoreName, projectName, ttl };
};

// SLS operations
const createSlsOperations = (slsClient: SlsSdkClient) => {
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
        const response = await slsClient.getProject(projectName);

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

    createLogstore: async (
      projectName: string,
      logstoreName: string,
      ttl: number = 7,
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
  };

  return operations;

};