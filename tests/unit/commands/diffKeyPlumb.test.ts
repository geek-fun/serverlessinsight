/**
 * Issue #308: `si diff --si-api-key` must reach the state backend like
 * deploy/migrate do — a read-only preview with an explicit key never borrows
 * local credentials (and, since issue #309, never touches the credentials
 * file). Unit test: everything external is mocked; the assertion is pure
 * argument plumbing.
 */
jest.mock('../../../src/common/stateBackend', () => ({
  createStateBackend: jest.fn(),
}));

jest.mock('../../../src/parser', () => ({
  parseYaml: jest.fn(() => ({
    app: 'example-app',
    service: 'example-service',
    provider: { name: 'aliyun' },
    stages: {},
    backend: { type: 'local' },
  })),
  revalYaml: jest.fn(() => ({
    app: 'example-app',
    service: 'example-service',
    provider: { name: 'aliyun' },
    backend: { type: 'local' },
  })),
}));

jest.mock('../../../src/common', () => ({
  getIacLocation: jest.fn(() => 'serverlessinsight.yml'),
  setContext: jest.fn(),
  getContext: jest.fn(() => ({ stage: 'default' })),
  setIac: jest.fn(),
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
  ProviderEnum: {
    HUAWEI: 'huawei',
    ALIYUN: 'aliyun',
    TENCENT: 'tencent',
    AWS: 'aws',
    VOLCENGINE: 'volcengine',
  },
}));

jest.mock('../../../src/common/jsonOutput', () => ({
  buildPlanJson: jest.fn(() => ({})),
  buildPlanSummary: jest.fn(() => ({ create: 0, update: 0, destroy: 0, recreate: 0 })),
  setJsonMode: jest.fn(),
  writeJson: jest.fn(),
}));

jest.mock('../../../src/common/noColor', () => ({ isNoColorEnabled: jest.fn(() => false) }));

jest.mock('../../../src/stack/scfStack', () => ({
  generateTencentPlan: jest.fn(),
  displayPlan: jest.fn(),
}));
jest.mock('../../../src/stack/aliyunStack', () => ({
  generateAliyunPlan: jest.fn(() => ({ items: [] })),
}));
jest.mock('../../../src/stack/volcengineStack', () => ({
  generateVolcenginePlan: jest.fn(),
}));

jest.mock('../../../src/lang', () => ({ lang: { __: (key: string) => key } }));

import { runDiffCommand } from '../../../src/commands/plan';
import { createStateBackend } from '../../../src/common/stateBackend';
import { generateAliyunPlan } from '../../../src/stack/aliyunStack';

const mockedCreateStateBackend = jest.mocked(createStateBackend);

describe('diff --si-api-key plumbing (issue #308)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedCreateStateBackend.mockResolvedValue({} as never);
  });

  it('passes the explicit key to the state backend factory', async () => {
    await runDiffCommand({ siApiKey: 'si_com_abcdef123456_0123456789abcdef0123456789abcdea' });

    expect(mockedCreateStateBackend).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ siApiKey: 'si_com_abcdef123456_0123456789abcdef0123456789abcdea' }),
    );
  });

  it('leaves the key undefined when the flag is omitted', async () => {
    await runDiffCommand({});

    expect(mockedCreateStateBackend).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ siApiKey: undefined }),
    );
    expect(generateAliyunPlan).toHaveBeenCalled();
  });
});
