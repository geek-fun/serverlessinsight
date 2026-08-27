import * as tencentCls from 'tencentcloud-sdk-nodejs-cls';
import { pollUntil } from '../polling';
import { CLS_TOPIC_POLL_INTERVAL_MS, CLS_TOPIC_POLL_MAX_ATTEMPTS } from '../constants';

type ClsSdkClient = InstanceType<typeof tencentCls.cls.v20201016.Client>;

// CLS reports missing resources with `ResourceNotFound.<Kind>NotExist` codes —
// match by suffix so get/delete operations stay idempotent.
const isResourceNotFound = (error: unknown): boolean => {
  if (!error || typeof error !== 'object' || !('code' in error)) {
    return false;
  }
  const code = (error as { code?: unknown }).code;
  return typeof code === 'string' && code.includes('NotExist');
};

const isAlreadyExists = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }
  const rec = error as { code?: unknown; message?: unknown };
  const code = typeof rec.code === 'string' ? rec.code : '';
  const message = typeof rec.message === 'string' ? rec.message.toLowerCase() : '';
  return (
    code.includes('AlreadyExists') ||
    code.includes('ResourceExists') ||
    message.includes('already exist')
  );
};

export type ClsTag = { key: string; value: string };

export const createClsOperations = (clsClient: ClsSdkClient) => {
  const operations = {
    createLogset: async (
      logsetName: string,
      tags: Array<ClsTag>,
    ): Promise<{ logsetId: string }> => {
      const response = await clsClient.CreateLogset({
        LogsetName: logsetName,
        Tags: tags.map((t) => ({ Key: t.key, Value: t.value })),
      });
      return { logsetId: response?.LogsetId ?? '' };
    },

    getLogsetByName: async (
      logsetName: string,
    ): Promise<{
      LogsetId?: string;
      LogsetName?: string;
      Tags?: Array<{ Key?: string; Value?: string }>;
    } | null> => {
      const response = await clsClient.DescribeLogsets({
        Filters: [{ Key: 'logsetName', Values: [logsetName] }],
      });
      // Preserve Tags so adopters can verify app-scope ownership of the logset.
      const found = response?.Logsets?.find((l) => l.LogsetName === logsetName) ?? null;
      if (!found) {
        return null;
      }
      return {
        LogsetId: found.LogsetId,
        LogsetName: found.LogsetName,
        Tags: found.Tags,
      };
    },

    listTopicsByLogset: async (
      logsetId: string,
    ): Promise<Array<{ TopicId?: string; TopicName?: string }>> => {
      const response = await clsClient.DescribeTopics({
        Filters: [{ Key: 'logsetId', Values: [logsetId] }],
        Limit: 500,
      });
      return response?.Topics ?? [];
    },

    getTopicByName: async (
      logsetId: string,
      topicName: string,
    ): Promise<{
      TopicId?: string;
      TopicName?: string;
      Tags?: Array<{ Key?: string; Value?: string }>;
    } | null> => {
      const response = await clsClient.DescribeTopics({
        Filters: [
          { Key: 'topicName', Values: [topicName] },
          { Key: 'logsetId', Values: [logsetId] },
        ],
        PreciseSearch: 3,
      });
      return response?.Topics?.find((t) => t.TopicName === topicName) ?? null;
    },

    waitForTopic: async (
      logsetId: string,
      topicName: string,
    ): Promise<{ TopicId?: string; TopicName?: string } | null> =>
      pollUntil({
        description: `CLS topic ${topicName} to become visible`,
        fetch: () => operations.getTopicByName(logsetId, topicName),
        isDone: (topic) => topic !== null,
        intervalMs: CLS_TOPIC_POLL_INTERVAL_MS,
        maxAttempts: CLS_TOPIC_POLL_MAX_ATTEMPTS,
      }),

    // Topic creation is async on Tencent CLS — CreateTopic returns before the
    // topic is queryable, so poll until DescribeTopics sees it.
    createTopic: async (
      logsetId: string,
      topicName: string,
      opts: { period?: number; storageType?: string; tags: Array<ClsTag> },
    ): Promise<{ topicId: string }> => {
      await clsClient.CreateTopic({
        LogsetId: logsetId,
        TopicName: topicName,
        StorageType: opts.storageType ?? 'hot',
        Period: opts.period ?? 30,
        Tags: opts.tags.map((t) => ({ Key: t.key, Value: t.value })),
      });
      const topic = await operations.waitForTopic(logsetId, topicName);
      return { topicId: topic?.TopicId ?? '' };
    },

    deleteTopic: async (topicId: string): Promise<void> => {
      try {
        await clsClient.DeleteTopic({ TopicId: topicId });
      } catch (error) {
        if (isResourceNotFound(error)) {
          return;
        }
        throw error;
      }
    },

    deleteLogset: async (logsetId: string): Promise<void> => {
      try {
        await clsClient.DeleteLogset({ LogsetId: logsetId });
      } catch (error) {
        if (isResourceNotFound(error)) {
          return;
        }
        throw error;
      }
    },

    createFulltextIndex: async (topicId: string): Promise<void> => {
      try {
        await clsClient.CreateIndex({
          TopicId: topicId,
          Rule: { FullText: { CaseSensitive: false, Tokenizer: ' ,.?;!\n\t' } },
        });
      } catch (error) {
        if (isResourceNotFound(error) || isAlreadyExists(error)) {
          return;
        }
        throw error;
      }
    },

    deleteIndex: async (topicId: string): Promise<void> => {
      try {
        await clsClient.DeleteIndex({ TopicId: topicId });
      } catch (error) {
        if (isResourceNotFound(error)) {
          return;
        }
        throw error;
      }
    },
  };

  return operations;
};
