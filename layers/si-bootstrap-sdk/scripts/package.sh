#!/bin/bash -eux
set -o pipefail

cd "$(dirname "$0")/.." || exit

PACKAGE_NAME=$(jq -r '.name' package.json)


rm -rf ./dist ./artifacts/*

mkdir -p "artifacts"
mkdir -p "dist/nodejs/node_modules/${PACKAGE_NAME}"

IMAGE_NAME="si-bootstrap-sdk"
docker build -t "${IMAGE_NAME}" .

docker run --rm \
 -v "$(pwd)"/dist:/dist \
 --name "${IMAGE_NAME}-package" "${IMAGE_NAME}:latest" \
 sh -c "cp -r /app/. /dist/nodejs/node_modules/${PACKAGE_NAME}"

cd dist && zip -r -D "../artifacts/${IMAGE_NAME}.zip" ./*
