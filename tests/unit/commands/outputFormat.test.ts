/**
 * Issue #315: report-style output prints as one raw block per report, not a
 * stream of pino lines. These snapshots guard each block's exact shape against
 * the real i18n catalogs — same approach as the catalog key parity test.
 */
jest.mock('../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

// ESM-only dependency of login.ts — mocked before import like login.test.ts.
jest.mock('open', () => jest.fn());

const mockLoadCredentialsFile = jest.fn();

jest.mock('../../../src/common/credentialStore', () => ({
  loadCredentialsFile: (...args: unknown[]) => mockLoadCredentialsFile(...args),
}));

import { whoami } from '../../../src/commands/whoami';
import { linePickerMenu, methodChooserMenu } from '../../../src/commands/login';
import { profilePromptMenu } from '../../../src/common/lineContext';
import { formatPlan } from '../../../src/common/planFormatter';
import type { PlanItem } from '../../../src/types';
import { lang } from '../../../src/lang';

const chinaProfile = {
  apiKey: 'si_cn_abcdef123456_0123456789abcdef0123456789abcdef',
  orgId: 'org-cn',
  orgName: 'Example Org',
  orgSlug: 'example-org',
  userEmail: 'owner@example.com',
};

const intlProfile = {
  apiKey: 'si_com_abcdef123456_0123456789abcdef0123456789abcdef',
  orgId: 'org-com',
  orgName: 'Acme Corp',
  orgSlug: 'acme',
  userEmail: 'owner@example.com',
};

describe('report output format (issue #315)', () => {
  let logSpy: jest.SpyInstance;

  beforeAll(() => {
    lang.setLocale('en-US');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadCredentialsFile.mockReturnValue(null);
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('whoami prints the profile report as one block', async () => {
    mockLoadCredentialsFile.mockReturnValue({
      active: 'international/acme',
      profiles: { 'china/example-org': chinaProfile, 'international/acme': intlProfile },
    });

    await whoami();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatchSnapshot();
  });

  it('whoami prints the not-logged-in report as one block', async () => {
    await whoami();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatchSnapshot();
  });

  it('login line picker prints as one block', () => {
    expect(linePickerMenu()).toMatchSnapshot();
  });

  it('login method chooser prints as one block', () => {
    expect(methodChooserMenu()).toMatchSnapshot();
  });

  it('state-command profile prompt prints as one block', () => {
    expect(
      profilePromptMenu(['china/example-org', 'international/acme'], 'deploy'),
    ).toMatchSnapshot();
  });

  it('plan preview prints as one block', () => {
    const items: PlanItem[] = [
      {
        logicalId: 'functions.hello',
        action: 'create',
        resourceType: 'ALIYUN_FC3_FUNCTION',
        changes: {
          after: { name: 'hello-fn', memory: 512, timeout: 10 },
        },
      },
      {
        logicalId: 'functions.api',
        action: 'noop',
        resourceType: 'ALIYUN_FC3_FUNCTION',
        changes: {},
      },
    ];

    expect(
      formatPlan(items, { colorize: false, indentSize: 4, keyAlignWidth: 12 }),
    ).toMatchSnapshot();
  });

  it('empty plan preview prints as one block', () => {
    expect(formatPlan([], { colorize: false, indentSize: 4, keyAlignWidth: 12 })).toMatchSnapshot();
  });
});
