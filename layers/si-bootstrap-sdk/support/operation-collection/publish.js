#!/usr/bin/env node
'use strict';

/* eslint-disable @typescript-eslint/no-require-imports */

const FCOpen20210406 = require('@alicloud/fc-open20210406').default;
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');
const Credential = require('@alicloud/credentials').default;
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const value = args[i + 1];
    options[key] = value;
    i++;
  }
}

// Configuration
const config = {
  artifact: options.artifact || process.env.ARTIFACT_PATH,
  layerName: options['layer-name'] || process.env.LAYER_NAME || 'si-bootstrap-sdk',
  regions: (
    options.regions ||
    process.env.ALIYUN_REGIONS ||
    'cn-beijing,cn-hangzhou,cn-chengdu,ap-southeast-1'
  )
    .split(',')
    .map((r) => r.trim()),
  runtimes: (
    options.runtimes ||
    process.env.ALIYUN_COMPATIBLE_RUNTIMES ||
    'nodejs20,nodejs18,nodejs16'
  )
    .split(',')
    .map((r) => r.trim()),
  delay: parseInt(options.delay || process.env.API_DELAY || '2', 10) * 1000,
  accountId: process.env.ALIYUN_ACCOUNT_ID || '1990893136649406',
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
  accessKeySecret:
    process.env.ALIYUN_ACCESS_KEY_SECRET || process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
  securityToken: process.env.ALIYUN_SECURITY_TOKEN || process.env.ALIBABA_CLOUD_SECURITY_TOKEN,
};

// Validate
if (!config.artifact) {
  console.error('Error: --artifact is required');
  process.exit(1);
}

const artifactPath = path.resolve(config.artifact);
if (!fs.existsSync(artifactPath)) {
  console.error(`Error: Artifact not found: ${artifactPath}`);
  process.exit(1);
}

// Initialize credentials once and reuse for all clients
const credential = new Credential({
  type: 'access_key',
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
  securityToken: config.securityToken,
});

// Helper to create FC client for a region
const createFCClient = (region) => {
  const clientConfig = new OpenApi.Config({
    credential: credential,
    endpoint: `${config.accountId}.${region}.fc.aliyuncs.com`,
    regionId: region,
    readTimeout: 60000, // 60 seconds for large layer uploads
    connectTimeout: 60000, // 60 seconds connection timeout
  });

  return new FCOpen20210406(clientConfig);
};

// Get latest layer version for a region
const getLatestLayerVersion = async (client, layerName, region) => {
  try {
    const runtime = new Util.RuntimeOptions({});
    let allVersions = [];
    let startVersion = undefined;

    // Paginate through all layer versions
    do {
      const request = startVersion ? { startVersion } : {};
      const response = await client.listLayerVersions(layerName, request, {}, runtime);

      const versions = response.body.layers || [];
      allVersions = allVersions.concat(versions);

      startVersion = response.body.nextVersion;
    } while (startVersion);

    if (allVersions.length === 0) {
      console.log(`Region ${region}: Layer not found, treating as version 0`);
      return 0;
    }

    // Find the maximum version number across all pages
    const maxVersion = Math.max(...allVersions.map((v) => v.version || 0));
    return maxVersion;
  } catch (error) {
    if (error.code === 'LayerNotFound' || error.statusCode === 404) {
      console.log(`Region ${region}: Layer not found, treating as version 0`);
      return 0;
    }
    console.error(`Region ${region}: Failed to get layer versions:`, error.message);
    if (error.data && error.data['Recommend']) {
      console.error(`Recommend: ${error.data['Recommend']}`);
    }
    throw error;
  }
};

// Publish a layer version
const publishLayerVersion = async (client, layerName, base64Content, region) => {
  try {
    const request = {
      compatibleRuntime: config.runtimes,
      code: { zipFile: base64Content },
      license: 'Apache-2.0',
      description: 'Bootstrap SDK for ServerlessInsight',
    };
    const runtime = new Util.RuntimeOptions({
      readTimeout: 60000, // 60 seconds for large layer uploads
      connectTimeout: 10000, // 10 seconds connection timeout
    });

    await client.createLayerVersion(layerName, request, {}, runtime);
    console.log(`Region ${region}: Layer version published successfully`);
  } catch (error) {
    console.error(`Region ${region}: Failed to publish layer version:`, error.message);
    if (error.data && error.data['Recommend']) {
      console.error(`Recommend: ${error.data['Recommend']}`);
    }
    throw error;
  }
};

// Delay helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Main publish flow
const publish = async () => {
  console.log('Starting layer publication');
  console.log(`Layer: ${config.layerName}`);
  console.log(`Regions: ${config.regions.join(', ')}`);
  console.log(`Runtimes: ${config.runtimes.join(', ')}`);

  // Read and encode artifact
  console.log(`Reading artifact: ${artifactPath}`);
  const zipContent = fs.readFileSync(artifactPath);
  const base64Content = zipContent.toString('base64');
  console.log(
    `Artifact encoded (${zipContent.length} bytes -> ${base64Content.length} base64 chars)`,
  );

  // Step 1: Get current versions for all regions
  console.log('\nStep 1: Checking current versions across regions...');
  const currentVersions = new Map();
  let maxVersion = 0;

  for (const region of config.regions) {
    const client = createFCClient(region);
    const version = await getLatestLayerVersion(client, config.layerName, region);
    currentVersions.set(region, version);
    console.log(`Region ${region}: version ${version}`);

    if (version > maxVersion) {
      maxVersion = version;
    }
  }

  console.log(`\nMaximum version across all regions: ${maxVersion}`);

  // Step 2: Publish to all regions and align versions
  console.log('\nStep 2: Publishing and aligning versions...');
  const targetVersion = maxVersion + 1;

  for (const region of config.regions) {
    const currentVersion = currentVersions.get(region) || 0;
    const versionsToAdd = targetVersion - currentVersion;

    console.log(`\nRegion ${region}: current=${currentVersion}, target=${targetVersion}`);

    if (versionsToAdd === 0) {
      console.log(`Region ${region}: Already at target version, skipping`);
      continue;
    }

    const client = createFCClient(region);

    for (let i = 1; i <= versionsToAdd; i++) {
      console.log(
        `Publishing version ${currentVersion + i} to ${region} (attempt ${i}/${versionsToAdd})`,
      );
      await publishLayerVersion(client, config.layerName, base64Content, region);

      if (i < versionsToAdd) {
        await sleep(config.delay);
      }
    }
  }

  // Step 3: Verify all regions are aligned
  console.log('\nStep 3: Verifying version alignment...');
  let finalVersion = 0;
  const mismatches = [];

  for (const region of config.regions) {
    const client = createFCClient(region);
    const version = await getLatestLayerVersion(client, config.layerName, region);
    console.log(`Region ${region}: final version ${version}`);

    if (finalVersion === 0) {
      finalVersion = version;
    } else if (version !== finalVersion) {
      mismatches.push(`${region}:${version}`);
    }
  }

  if (mismatches.length > 0) {
    console.warn(
      `Warning: Version mismatch detected! Mismatches: ${mismatches.join(', ')}, expected: ${finalVersion}`,
    );
  }

  console.log(`\nAll regions published and aligned to version: ${finalVersion}`);

  // Output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `LAYER_VERSION=${finalVersion}\n`);
  }

  return finalVersion;
};

// Run
publish()
  .then((version) => {
    console.log(`\nSuccess! Layer version: ${version}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nPublish failed:', error.message);
    process.exit(1);
  });
