#!/bin/bash -eu
set -o pipefail

cd "$(dirname "$0")/.." || exit

# Thin wrapper around the Node.js operation-collection publish script

LAYER_NAME="si-bootstrap-sdk"
ARTIFACT_PATH="./artifacts/${LAYER_NAME}.zip"
OPS_DIR="./support/operation-collection"

# Execute the Node.js publish script (validation happens in Node.js)
exec node "$OPS_DIR/publish.js" \
  --artifact "$ARTIFACT_PATH" \
  --layer-name "$LAYER_NAME"
