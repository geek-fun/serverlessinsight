import { validate } from '../../../src/commands/validate';
import { setJsonMode } from '../../../src/common/jsonOutput';

jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({
    accountId: '123456789012',
    displayName: 'Test User',
    userId: 'test-user-id',
  }),
}));

describe('validate command (issue #250 --json)', () => {
  afterEach(() => {
    setJsonMode(false);
    delete process.exitCode;
  });

  describe('human output', () => {
    it('resolves valid for a well-formed yaml', async () => {
      const result = await validate({
        location: 'tests/fixtures/serverless-insight.yml',
        stage: 'dev',
      });

      expect(result).toEqual({ valid: true });
    });

    it('throws IacSchemaErrors for an invalid yaml', async () => {
      await expect(
        validate({ location: 'tests/fixtures/invalid-serverless-insight.yml', stage: 'dev' }),
      ).rejects.toThrow();
    });
  });

  describe('--json output', () => {
    it('emits a valid envelope for a well-formed yaml', async () => {
      const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

      const result = await validate({
        location: 'tests/fixtures/serverless-insight.yml',
        stage: 'dev',
        json: true,
      });

      expect(result).toEqual({ valid: true });
      expect(stdoutSpy).toHaveBeenCalledTimes(1);
      const payload = JSON.parse(stdoutSpy.mock.calls[0][0] as string);
      expect(payload).toEqual({ validateVersion: 1, valid: true, errors: [] });
      stdoutSpy.mockRestore();
    });

    it('emits structured errors for an invalid yaml without throwing', async () => {
      const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

      const result = await validate({
        location: 'tests/fixtures/invalid-serverless-insight.yml',
        stage: 'dev',
        json: true,
      });

      expect(result).toEqual({ valid: false });
      const payload = JSON.parse(stdoutSpy.mock.calls[0][0] as string);
      expect(payload.validateVersion).toBe(1);
      expect(payload.valid).toBe(false);
      expect(payload.errors.length).toBeGreaterThan(0);
      payload.errors.forEach(
        (error: { path: string; keyword: string; message: string; allowedValues?: string[] }) => {
          expect(typeof error.path).toBe('string');
          expect(typeof error.keyword).toBe('string');
          expect(typeof error.message).toBe('string');
        },
      );
      const memoryError = payload.errors.find((error: { path: string }) =>
        error.path.includes('memory'),
      );
      expect(memoryError).toBeDefined();
      stdoutSpy.mockRestore();
    });

    it('re-throws non-schema errors (e.g. missing file) for the CLI error handler', async () => {
      await expect(
        validate({ location: 'tests/fixtures/does-not-exist.yml', stage: 'dev', json: true }),
      ).rejects.toThrow();
    });
  });
});
