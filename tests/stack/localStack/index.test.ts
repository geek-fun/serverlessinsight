import path from 'node:path';
import { startLocalStack, stopLocal } from '../../../src/stack/localStack';
import { setContext, SI_LOCALSTACK_SERVER_PORT, getContext } from '../../../src/common';
import { revalYaml } from '../../../src/parser';
import { makeRequest } from '../../autils';

describe('localStack Server', () => {
  const iacLocation = path.resolve(__dirname, '../../fixtures/serverless-insight.yml');

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      location: iacLocation,
    });

    const ctx = getContext();
    const iac = revalYaml(iacLocation, ctx);
    await startLocalStack(iac);
  });

  afterAll(async () => {
    await stopLocal();
  });

  it('should handle API Gateway request for valid trigger', async () => {
    const response = await makeRequest(
      `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_events/gateway_event/api/hello`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.data).toBe('"ServerlessInsight Hello World"');
  });

  it('should return 404 for non-matching path', async () => {
    const response = await makeRequest(
      `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_events/gateway_event/api/invalid`,
    );

    expect(response.statusCode).toBe(404);
    const json = JSON.parse(response.data);
    expect(json.error).toBe('No matching trigger found');
  });

  it('should return 404 for non-existing event', async () => {
    const response = await makeRequest(
      `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_events/non_gateway_event/api/hello`,
    );

    expect(response.statusCode).toBe(404);
    const json = JSON.parse(response.data);
    expect(json.error).toBe('API Gateway event not found');
  });

  it('should not match events with similar but different names', async () => {
    const response = await makeRequest(
      `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_events/1-insight-poc-cn-hangzhou/api/hello`,
    );

    expect(response.statusCode).toBe(404);
    const json = JSON.parse(response.data);
    expect(json.error).toBe('API Gateway event not found');
    expect(json.event).toBe('1-insight-poc-cn-hangzhou');
  });

  describe('Bucket operations', () => {
    it('should list all files in bucket', async () => {
      const response = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_buckets/test_bucket/`,
      );

      expect(response.statusCode).toBe(200);
      const json = JSON.parse(response.data);
      expect(json.bucket).toBe('test-bucket');
      expect(json.files).toBeDefined();
      expect(json.files.length).toBeGreaterThan(0);
      expect(json.files.some((f: { name: string }) => f.name === 'index.html')).toBe(true);
    });

    it('should serve a file from bucket', async () => {
      const response = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_buckets/test_bucket/index.html`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.data).toContain('Hello from test bucket');
    });

    it('should serve a JSON file from bucket', async () => {
      const response = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_buckets/test_bucket/data.json`,
      );

      expect(response.statusCode).toBe(200);
      const json = JSON.parse(response.data);
      expect(json.message).toBe('test json file');
    });

    it('should return 404 for non-existent bucket', async () => {
      const response = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_buckets/non_existent/`,
      );

      expect(response.statusCode).toBe(404);
      const json = JSON.parse(response.data);
      expect(json.error).toBe('Bucket not found');
    });

    it('should return 404 for non-existent file in bucket', async () => {
      const response = await makeRequest(
        `http://localhost:${SI_LOCALSTACK_SERVER_PORT}/si_buckets/test_bucket/non-existent.txt`,
      );

      expect(response.statusCode).toBe(404);
      const json = JSON.parse(response.data);
      expect(json.error).toBe('File not found');
    });
  });
});
