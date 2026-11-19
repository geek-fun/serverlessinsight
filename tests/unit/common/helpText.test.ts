/**
 * Issue #308: the help value builders are the single source that keeps the
 * `--line` / `--provider` / `--file` help in sync with the accepted values.
 * The spawned-CLI snapshots guard the rendered help; these unit tests pin the
 * builders themselves (and run without a dist build).
 */
import {
  buildFileProbeValues,
  buildLineValues,
  buildProviderValues,
} from '../../../src/common/helpText';
import { CONSOLE_LINES, LINE_NAMES } from '../../../src/common/consoleLines';
import { IMPLEMENTED_PROVIDERS } from '../../../src/common/providerEnum';

describe('help text builders (issue #308)', () => {
  it('lists every registered console line with its origin', () => {
    expect(buildLineValues()).toBe(
      LINE_NAMES.map((name) => `${name} = ${CONSOLE_LINES[name].origin}`).join(' | '),
    );
    expect(buildLineValues()).toContain('international = https://console.serverlessinsight.com');
    expect(buildLineValues()).toContain('china = https://console.serverlessinsight.cn');
  });

  it('lists exactly the implemented providers, hiding stubs', () => {
    expect(buildProviderValues()).toBe(IMPLEMENTED_PROVIDERS.join(' | '));
    expect(buildProviderValues()).toBe('aliyun | tencent | volcengine');
  });

  it('lists the default yaml probe candidates', () => {
    expect(buildFileProbeValues()).toBe(
      'serverlessinsight.yml, serverlessInsight.yml, ServerlessInsight.yml, serverless-insight.yml',
    );
  });
});
