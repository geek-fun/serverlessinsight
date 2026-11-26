import { redactAttributeDiffs, redactPlanItems } from '../../../src/common/planRedaction';
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

describe('config-ref provenance in plan diffs (epic #53 P1)', () => {
  it('shows ref@vBefore → vAfter for changed secret-ref environment entries', () => {
    const diffs = [
      {
        key: 'environment',
        action: 'change' as const,
        before: { DB_PASSWORD: 'cfgref:config_sets.db.password@v3' },
        after: { DB_PASSWORD: 'cfgref:config_sets.db.password@v5' },
        children: [
          {
            key: 'DB_PASSWORD',
            action: 'change' as const,
            before: 'cfgref:config_sets.db.password@v3',
            after: 'cfgref:config_sets.db.password@v5',
          },
        ],
      },
    ];
    const redacted = redactAttributeDiffs(diffs)[0]!;
    // Top-level before/after keep the bare markers (they feed the drift mask
    // substitution); provenance shows on the child diff entries.
    expect(redacted.before).toEqual({ DB_PASSWORD: 'cfgref:config_sets.db.password@v3' });
    expect(redacted.after).toEqual({ DB_PASSWORD: 'cfgref:config_sets.db.password@v5' });
    expect(redacted.children![0]!.before).toBe('*** (config_sets.db.password@v3)');
    expect(redacted.children![0]!.after).toBe('*** (config_sets.db.password@v3 → v5)');
  });

  it('maps a live session secret value to its cfgref provenance in plan diffs', async () => {
    const { beginConfigSession, applyConfigResolution, endConfigSession } =
      await import('../../../src/common/configSession');
    const session = beginConfigSession();
    session.placeholderOf('db.password');
    session.resolved.set('db.password', {
      value: 'sup3r-s3cret',
      versionNumber: 7,
      secret: true,
      scope: 'stage',
      configSet: 'db',
    });
    applyConfigResolution({
      functions: [{ key: 'fn', environment: { PW: '⟦si-cfg:0⟧' } }],
      databases: [],
    });

    const diffs = [
      {
        key: 'environment',
        action: 'change' as const,
        before: { PW: 'cfgref:config_sets.db.password@v3' },
        after: { PW: 'sup3r-s3cret' },
        children: [
          {
            key: 'PW',
            action: 'change' as const,
            before: 'cfgref:config_sets.db.password@v3',
            after: 'sup3r-s3cret',
          },
        ],
      },
    ];
    const redacted = redactAttributeDiffs(diffs)[0]!;
    expect(redacted.after).toEqual({ PW: 'cfgref:config_sets.db.password@v7' });
    expect(redacted.children![0]!.after).toBe('*** (config_sets.db.password@v3 → v7)');
    endConfigSession();
  });

  it('redactPlanItems masks sensitive environment values in state updates', async () => {
    // Self-contained session — this test must not depend on execution order.
    const { beginConfigSession, applyConfigResolution, endConfigSession } =
      await import('../../../src/common/configSession');
    const session = beginConfigSession();
    session.placeholderOf('db.password');
    session.resolved.set('db.password', {
      value: 'sup3r-s3cret',
      versionNumber: 7,
      secret: true,
      scope: 'stage',
      configSet: 'db',
    });
    applyConfigResolution({
      functions: [{ key: 'fn', environment: { PW: '⟦si-cfg:0⟧' } }],
      databases: [],
    });
    const items = [
      {
        logicalId: 'functions.fn',
        resourceType: 'ALIYUN_FC3_FUNCTION',
        action: 'update' as const,
        stateUpdate: {
          environment: { DB_PASSWORD: 'sup3r-s3cret', PLAIN: 'visible' },
        },
      },
    ];
    const [redacted] = redactPlanItems(items as unknown as PlanItem[]);
    // Session secrets become cfgref markers; state never carries plaintexts.
    expect(redacted.stateUpdate).toEqual({
      environment: { DB_PASSWORD: 'cfgref:config_sets.db.password@v7', PLAIN: 'visible' },
    });
    endConfigSession();
  });

  it('falls back to the generic mask for non-marker sensitive values', () => {
    const diffs = [
      {
        key: 'environment',
        action: 'change' as const,
        before: { API_KEY: 'plain-old' },
        after: { API_KEY: 'plain-new' },
        children: [
          { key: 'API_KEY', action: 'change' as const, before: 'plain-old', after: 'plain-new' },
        ],
      },
    ];
    const redacted = redactAttributeDiffs(diffs)[0]!;
    // lang is real here — PLAN_SENSITIVE_VALUE translates to '(sensitive)'.
    expect(redacted.children![0]!.after).toBe('(sensitive)');
  });

  it('masks non-secret-named env vars holding a session secret on create and refreshed update', async () => {
    const { beginConfigSession, applyConfigResolution, endConfigSession, setAppliedConfigMeta } =
      await import('../../../src/common/configSession');
    const session = beginConfigSession();
    session.placeholderOf('stripe.signing_val');
    session.resolved.set('stripe.signing_val', {
      value: 'whsec_live_999',
      versionNumber: 4,
      secret: true,
      scope: 'stage',
      configSet: 'stripe',
    });
    applyConfigResolution({
      functions: [{ key: 'fn', environment: { STRIPE_HOOK: '⟦si-cfg:0⟧' } }],
      databases: [],
    });

    try {
      // Create path (before is undefined, key name does not match SECRET_ENV_KEY)
      const createDiffs = redactAttributeDiffs([
        {
          key: 'environment',
          action: 'add' as const,
          after: { STRIPE_HOOK: 'whsec_live_999', PLAIN: 'ok' },
          children: [
            { key: 'STRIPE_HOOK', action: 'add' as const, after: 'whsec_live_999' },
            { key: 'PLAIN', action: 'add' as const, after: 'ok' },
          ],
        },
      ])[0]!;
      expect(createDiffs.after).toEqual({
        STRIPE_HOOK: 'cfgref:config_sets.stripe.signing_val@v4',
        PLAIN: 'ok',
      });
      expect(createDiffs.children![0]!.after).toBe('*** (config_sets.stripe.signing_val@v4)');
      expect(createDiffs.children![1]!.after).toBe('ok');

      // Refreshed update path (before is live plaintext from cloud, not a cfgref marker)
      const updateDiffs = redactAttributeDiffs([
        {
          key: 'environment',
          action: 'change' as const,
          before: { STRIPE_HOOK: 'whsec_old_111' },
          after: { STRIPE_HOOK: 'whsec_live_999' },
          children: [
            {
              key: 'STRIPE_HOOK',
              action: 'change' as const,
              before: 'whsec_old_111',
              after: 'whsec_live_999',
            },
          ],
        },
      ])[0]!;
      expect(updateDiffs.before).toEqual({ STRIPE_HOOK: '[REDACTED]' });
      expect(updateDiffs.after).toEqual({
        STRIPE_HOOK: 'cfgref:config_sets.stripe.signing_val@v4',
      });
      expect(updateDiffs.children![0]!.before).toBe('(sensitive)');
      expect(updateDiffs.children![0]!.after).toBe('*** (config_sets.stripe.signing_val@v4)');

      const [redactedPlanItem] = redactPlanItems([
        {
          logicalId: 'functions.fn',
          resourceType: 'ALIYUN_FC3',
          action: 'update',
          changes: {
            before: { environment: { STRIPE_HOOK: 'whsec_old_111' } },
            after: { environment: { STRIPE_HOOK: 'whsec_live_999' } },
          },
        } as unknown as PlanItem,
      ]);
      expect(redactedPlanItem.changes?.before).toEqual({
        environment: { STRIPE_HOOK: '[REDACTED]' },
      });
      expect(redactedPlanItem.changes?.after).toEqual({
        environment: { STRIPE_HOOK: '*** (config_sets.stripe.signing_val@v4)' },
      });
    } finally {
      endConfigSession();
      setAppliedConfigMeta(null);
    }
  });
});
