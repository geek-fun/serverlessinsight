import { redactAttributeDiffs } from '../../../src/common/planRedaction';
import { formatPlanItem } from '../../../src/common/planFormatter';
import { buildPlanChange } from '../../../src/common/jsonOutput';
import type { PlanItem } from '../../../src/types';

describe('plan credential redaction', () => {
  const item: PlanItem = {
    logicalId: 'databases.es',
    resourceType: 'ALIYUN_ES_SERVERLESS',
    action: 'update',
    revertKeys: ['authentication'],
    changes: {
      before: { authentication: { fingerprint: 'old-secret-marker' } },
      after: { authentication: { fingerprint: 'new-secret-marker' } },
    },
  };
  it('preserves the change but hides credentials and markers in human and JSON output', () => {
    const output =
      JSON.stringify(buildPlanChange(item)) +
      formatPlanItem(item, { colorize: false, indentSize: 4, keyAlignWidth: 12 });
    expect(output).toContain('(sensitive)');
    expect(output).not.toContain('secret-marker');
    expect(buildPlanChange(item)).toMatchObject({
      revertKeys: ['authentication'],
      attributes: [{ key: 'authentication', action: 'change' }],
    });
  });
  it('redacts nested sensitive additions/removals and preserves ordinary values', () => {
    expect(
      redactAttributeDiffs([
        {
          key: 'nested',
          action: 'change',
          children: [
            { key: 'certificatePrivateKey', action: 'remove', before: 'secret' },
            { key: 'authentication', action: 'add', after: 'secret' },
            { key: 'timeout', action: 'change', before: 1, after: 2 },
          ],
        },
      ]),
    ).toEqual([
      {
        key: 'nested',
        action: 'change',
        children: [
          { key: 'certificatePrivateKey', action: 'remove', before: '(sensitive)' },
          { key: 'authentication', action: 'add', after: '(sensitive)' },
          { key: 'timeout', action: 'change', before: 1, after: 2 },
        ],
      },
    ]);
  });
});
