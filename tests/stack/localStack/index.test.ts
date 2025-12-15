import path from 'node:path';
import { startLocalStack, stopLocal } from '../../../src/stack/localStack';
import { setContext, SI_LOCALSTACK_SERVER_PORT } from '../../../src/common';
import { parseYaml } from '../../../src/parser';
import { makeRequest } from '../../autils';

describe('localStack Server', () => {
  const iacLocation = path.resolve(__dirname, '../../fixtures/serverless-insight.yml');
  const iac = parseYaml(iacLocation);

  beforeAll(async () => {
    await setContext({
      stage: 'default',
      location: iacLocation,
      stages: iac.stages,
    });

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
});
