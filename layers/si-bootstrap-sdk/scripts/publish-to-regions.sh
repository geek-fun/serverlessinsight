#!/bin/bash -eu
set -o pipefail

cd "$(dirname "$0")/.." || exit

# This script publishes the layer to multiple Aliyun regions and aligns versions

# Read regions from environment variable or use defaults
IFS=',' read -ra REGIONS <<< "${ALIYUN_REGIONS:-cn-beijing,cn-hangzhou,cn-chengdu,ap-southeast-1}"
LAYER_NAME="si-bootstrap-sdk"
ARTIFACT_PATH="./artifacts/${LAYER_NAME}.zip"
API_DELAY=${API_DELAY:-2}  # Configurable delay between API calls (default 2 seconds)

if [ ! -f "$ARTIFACT_PATH" ]; then
  echo "Error: Artifact not found at $ARTIFACT_PATH"
  exit 1
fi

# Encode the artifact to base64
SOURCE_CODE_BASE64=$(base64 -w 0 "$ARTIFACT_PATH")

# Function to get the latest layer version for a region
get_latest_version() {
  local region=$1
  ALIYUN_REGION="$region" ./scripts/aliyuncli.sh fc GET /2023-03-30/layers/${LAYER_NAME}/versions \
    --header "Content-Type=application/json" 2>/dev/null | jq -r '.versions[0].version // 0'
}

# Function to publish a new layer version to a region
publish_layer() {
  local region=$1
  echo "Publishing layer to region: $region"
  
  ALIYUN_REGION="$region" ./scripts/aliyuncli.sh fc POST /2023-03-30/layers/${LAYER_NAME}/versions \
    --header "Content-Type=application/json" \
    --body "{\"compatibleRuntime\":[\"nodejs20\",\"nodejs18\",\"nodejs16\"],\"code\":{\"zipFile\":\"${SOURCE_CODE_BASE64}\"},\"license\":\"Apache-2.0\",\"description\":\"Bootstrap SDK for ServerlessInsight\"}"
  
  echo "Published layer to region: $region"
}

# Step 1: Get current versions for all regions
echo "Checking current versions across regions..."
declare -A current_versions
max_version=0

for region in "${REGIONS[@]}"; do
  version=$(get_latest_version "$region")
  current_versions[$region]=$version
  echo "Region $region: version $version"
  
  if [ "$version" -gt "$max_version" ]; then
    max_version=$version
  fi
done

echo "Maximum version across all regions: $max_version"

# Step 2: Publish to all regions and align versions
echo "Publishing and aligning versions..."
for region in "${REGIONS[@]}"; do
  current_version=${current_versions[$region]}
  target_version=$((max_version + 1))
  
  echo "Region $region: current=$current_version, target=$target_version"
  
  # Publish the layer to reach the target version
  versions_to_add=$((target_version - current_version))
  
  for ((i=1; i<=versions_to_add; i++)); do
    echo "Publishing version $((current_version + i)) to $region (attempt $i/$versions_to_add)"
    publish_layer "$region"
    sleep "$API_DELAY"  # Configurable delay between API calls
  done
done

# Step 3: Verify all regions are aligned
echo "Verifying version alignment..."
final_version=0
for region in "${REGIONS[@]}"; do
  version=$(get_latest_version "$region")
  echo "Region $region: final version $version"
  
  if [ "$final_version" -eq 0 ]; then
    final_version=$version
  elif [ "$version" -ne "$final_version" ]; then
    echo "Warning: Version mismatch detected! Region $region has version $version, expected $final_version"
  fi
done

echo "All regions published and aligned to version: $final_version"

# Output for GitHub Actions
if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "LAYER_VERSION=$final_version" >> "$GITHUB_OUTPUT"
else
  echo "LAYER_VERSION=$final_version"
fi
