describe('SI_LOCALSTACK_SERVER_PORT', () => {
  const originalWorkerId = process.env.JEST_WORKER_ID;

  afterEach(() => {
    if (originalWorkerId === undefined) {
      delete process.env.JEST_WORKER_ID;
    } else {
      process.env.JEST_WORKER_ID = originalWorkerId;
    }
    delete process.env.SI_LOCALSTACK_SERVER_PORT;
    jest.resetModules();
  });

  it('falls back to 4567 outside jest workers', async () => {
    jest.resetModules();
    delete process.env.JEST_WORKER_ID;
    delete process.env.SI_LOCALSTACK_SERVER_PORT;

    const { SI_LOCALSTACK_SERVER_PORT } = await import('../../../src/common/constants');

    expect(SI_LOCALSTACK_SERVER_PORT).toBe(4567);
  });

  it('shifts the base port per jest worker', async () => {
    jest.resetModules();
    process.env.JEST_WORKER_ID = '3';
    delete process.env.SI_LOCALSTACK_SERVER_PORT;

    const { SI_LOCALSTACK_SERVER_PORT } = await import('../../../src/common/constants');

    expect(SI_LOCALSTACK_SERVER_PORT).toBe(4573);
  });

  it('honors an explicit env override over the worker shift', async () => {
    jest.resetModules();
    process.env.SI_LOCALSTACK_SERVER_PORT = '5000';

    const { SI_LOCALSTACK_SERVER_PORT } = await import('../../../src/common/constants');

    expect(SI_LOCALSTACK_SERVER_PORT).toBe(5000);
  });
});
