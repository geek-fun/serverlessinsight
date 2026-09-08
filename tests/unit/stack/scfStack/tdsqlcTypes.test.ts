import {
  databaseToTdsqlcConfig,
  extractTdsqlcDefinition,
  cloudTdsqlcToDefinition,
  type TdsqlcClusterInfo as ClusterInfo,
} from '../../../../src/stack/scfStack/tdsqlcTypes';
import { remoteDiffersFromDesired } from '../../../../src/common/planCompare';
import type { DatabaseDomain } from '../../../../src/types';

describe('tdsqlcTypes (issue #234 phase 2)', () => {
  const database: DatabaseDomain = {
    key: 'db_main',
    name: 'db-main',
    type: 'TDSQL_C_SERVERLESS' as DatabaseDomain['type'],
    version: 'MYSQL_8.0' as DatabaseDomain['version'],
    cu: { min: 0.5, max: 8 },
    storage: { min: 10 },
    network: { type: 'PRIVATE', ingressRules: [] },
    security: { basicAuth: { username: 'root', password: 'pw' } },
  } as unknown as DatabaseDomain;

  it('maps live cluster attributes and omits non-refreshable keys', () => {
    const info: ClusterInfo = {
      ClusterId: 'c-1',
      ClusterName: 'db-main',
      Region: 'ap-guangzhou',
      DbType: 'MYSQL',
      DbVersion: '8.0',
      DbMode: 'SERVERLESS',
      Status: 'running',
      MinCpu: 0.5,
      MaxCpu: 8,
      StoragePayMode: 0,
      VpcId: 'vpc-1',
      SubnetId: 'subnet-1',
      MinStorageSize: 10,
    };

    const attrs = cloudTdsqlcToDefinition(info);

    expect(attrs).toEqual({
      clusterName: 'db-main',
      dbType: 'MYSQL',
      dbVersion: '8.0',
      dbMode: 'SERVERLESS',
      minCpu: 0.5,
      maxCpu: 8,
      storagePayMode: 0,
      vpcId: 'vpc-1',
      subnetId: 'subnet-1',
      minStorageSize: 10,
      maxStorageSize: null,
    });
    expect(attrs).not.toHaveProperty('autoPause');
    expect(attrs).not.toHaveProperty('autoPauseDelay');
    expect(attrs).not.toHaveProperty('port');
    expect(attrs).not.toHaveProperty('projectId');
  });

  // Deployed-then-untouched must never drift: the cloud side simulates what
  // the executor wrote, with the config values the read API reports back.
  it('never drifts against its own config (roundtrip guard)', () => {
    const config = databaseToTdsqlcConfig(database);
    const desired = extractTdsqlcDefinition(config);

    const cloudInfo: ClusterInfo = {
      ClusterId: 'c-1',
      ClusterName: config.ClusterName,
      Region: 'ap-guangzhou',
      DbType: config.DbType,
      DbVersion: config.DbVersion,
      DbMode: config.DbMode,
      Status: 'running',
      MinCpu: config.MinCpu,
      MaxCpu: config.MaxCpu,
      StoragePayMode: config.StoragePayMode,
      VpcId: config.VpcId,
      SubnetId: config.SubnetId,
      MinStorageSize: config.MinStorageSize,
      MaxStorageSize: config.MaxStorageSize,
    };

    expect(remoteDiffersFromDesired(cloudTdsqlcToDefinition(cloudInfo), desired)).toBe(false);
  });

  it('flags drifted cu bounds', () => {
    const info = {
      ClusterId: 'c-1',
      ClusterName: 'db-main',
      MinCpu: 2,
      MaxCpu: 8,
    } as ClusterInfo;

    expect(
      remoteDiffersFromDesired(cloudTdsqlcToDefinition(info), {
        clusterName: 'db-main',
        minCpu: 0.5,
        maxCpu: 8,
      }),
    ).toBe(true);
  });
});
