import {
  reconcileScfHttpTrigger,
  ownedScfHttpTrigger,
  SCF_HTTP_TRIGGER_TYPE,
} from '../../../../src/stack/scfStack/scfHttpTrigger';
import { ProviderEnum } from '../../../../src/common/providerEnum';
import type { Context, FunctionDomain } from '../../../../src/types';

describe('SCF HTTP ownership', () => {
  const context = { provider: ProviderEnum.TENCENT, stage: 'dev' } as Context;
  const fn = {
    key: 'api',
    name: 'handler',
    triggers: { http: { auth_type: 'public' } },
  } as FunctionDomain;
  const desc = JSON.stringify({ AuthType: 'NONE', NetConfig: { EnableExtranet: true } });
  const trigger = { Type: 'http', TriggerName: 'assigned-id', TriggerDesc: desc };
  const owned = [{ id: 'assigned-id', sid: 'sid', type: SCF_HTTP_TRIGGER_TYPE, triggerDesc: desc }];
  const makeClient = () => ({
    scf: {
      getFunction: jest.fn().mockResolvedValue({ Triggers: [] }),
      createTrigger: jest.fn().mockResolvedValue(trigger),
      deleteTrigger: jest.fn(),
    },
  });
  const run = (
    client: ReturnType<typeof makeClient>,
    instances = [] as Array<Record<string, unknown>>,
    desired = fn,
    definition = {},
    repair = false,
  ) => reconcileScfHttpTrigger(context, desired, instances, definition, client as never, repair);

  it('records the assigned identity from CreateTrigger even before a subsequent read sees it', async () => {
    const client = makeClient();
    expect(await run(client)).toEqual([
      expect.objectContaining({ id: 'assigned-id', type: SCF_HTTP_TRIGGER_TYPE }),
    ]);
    expect(client.scf.getFunction).toHaveBeenCalledTimes(1);
  });
  it('uses the read response when CreateTrigger omits its identity', async () => {
    const client = makeClient();
    client.scf.createTrigger.mockResolvedValueOnce(undefined);
    client.scf.getFunction
      .mockResolvedValueOnce({ Triggers: [] })
      .mockResolvedValueOnce({ Triggers: [trigger] });
    expect(await run(client)).toEqual([expect.objectContaining({ id: 'assigned-id' })]);
  });
  it('rejects a successful create without an observable identity', async () => {
    const client = makeClient();
    client.scf.createTrigger.mockResolvedValueOnce(undefined);
    await expect(run(client)).rejects.toThrow();
  });
  it('removes only the recorded trigger on omission', async () => {
    const client = makeClient();
    expect(await run(client, owned, { ...fn, triggers: undefined })).toEqual([]);
    expect(client.scf.deleteTrigger).toHaveBeenCalledWith({
      FunctionName: 'handler',
      TriggerName: 'assigned-id',
      Type: 'http',
    });
    expect(client.scf.getFunction).not.toHaveBeenCalled();
  });
  it.each(['ResourceNotFound', 'ResourceNotFound.TriggerName'])(
    'tolerates already-absent owned trigger: %s',
    async (code) => {
      const client = makeClient();
      client.scf.deleteTrigger.mockRejectedValueOnce({ code });
      await expect(run(client, owned, { ...fn, triggers: undefined })).resolves.toEqual([]);
    },
  );
  it('propagates failed deletion and read errors', async () => {
    const client = makeClient();
    const error = new Error('AccessDenied');
    client.scf.deleteTrigger.mockRejectedValueOnce(error);
    await expect(run(client, owned, { ...fn, triggers: undefined })).rejects.toBe(error);
    client.scf.getFunction.mockRejectedValueOnce(error);
    await expect(run(client, owned)).rejects.toBe(error);
  });
  it('does not adopt or delete an untracked trigger observed in cloud state', async () => {
    const client = makeClient();
    client.scf.getFunction.mockResolvedValue({ Triggers: [trigger] });
    await expect(run(client)).resolves.toEqual([]);
    expect(client.scf.createTrigger).not.toHaveBeenCalled();
    expect(
      ownedScfHttpTrigger(
        [
          {
            functionName: fn.name,
            triggers: [{ type: 'http', triggerName: 'foreign', triggerDesc: desc }],
          },
        ],
        {},
      ),
    ).toBeUndefined();
  });
  it('migrates declared legacy intent and preserves unchanged owned triggers', async () => {
    const client = makeClient();
    client.scf.getFunction.mockResolvedValue({ Triggers: [trigger] });
    const legacy = [
      {
        functionName: fn.name,
        triggers: [{ type: 'http', triggerName: 'assigned-id', triggerDesc: desc }],
      },
    ];
    expect(await run(client, legacy, fn, { http: fn.triggers!.http })).toEqual([
      expect.objectContaining({ id: 'assigned-id' }),
    ]);
    expect(client.scf.createTrigger).not.toHaveBeenCalled();
  });
  it('recreates an owned drifted trigger and replaces its recorded ID', async () => {
    const client = makeClient();
    client.scf.getFunction.mockResolvedValue({ Triggers: [trigger] });
    client.scf.createTrigger.mockResolvedValueOnce({ ...trigger, TriggerName: 'new-id' });
    expect(await run(client, owned, fn, {}, true)).toEqual([
      expect.objectContaining({ id: 'new-id' }),
    ]);
    expect(client.scf.deleteTrigger).toHaveBeenCalledTimes(1);
  });
  it('does not migrate a newly observed unowned trigger as legacy ownership', () => {
    const instances = [
      {
        functionName: fn.name,
        triggers: [{ type: 'http', triggerName: 'foreign', triggerDesc: desc, owned: false }],
      },
    ];
    expect(ownedScfHttpTrigger(instances, { http: fn.triggers!.http })).toBeUndefined();
  });
  it('recovers a matching assigned identity after a tainted create lost its response', async () => {
    const client = makeClient();
    client.scf.getFunction.mockResolvedValue({ Triggers: [trigger] });
    const records = await reconcileScfHttpTrigger(
      context,
      fn,
      [],
      { http: fn.triggers!.http },
      client as never,
      false,
      true,
    );
    expect(records).toEqual([expect.objectContaining({ id: 'assigned-id' })]);
    expect(client.scf.createTrigger).not.toHaveBeenCalled();
  });
});
