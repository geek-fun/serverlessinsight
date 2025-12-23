#!/bin/bash -eEu
set -o pipefail

cd "$(dirname "$0")/.." || exit

ALIYUN_REGION=${ALIYUN_REGION:-cn-hangzhou}

trap 'rc=$?; echo "aliyuncli.sh failed (exit=$rc)" >&2' ERR

TTY_ARGS=()
if [ -t 1 ]; then
    TTY_ARGS=(-t)
fi

echo "Building aliyuncli Docker image..." >&2
if ! docker build -t aliyuncli -f Dockerfile-aliyuncli .; then
    echo "Error: failed to build aliyuncli image" >&2
    exit 1
fi

echo "Running aliyuncli (region=$ALIYUN_REGION)..." >&2
if ! docker run -i "${TTY_ARGS[@]}" --rm \
    --name aliyuncli \
    aliyuncli \
    aliyun \
    --region "$ALIYUN_REGION" \
    --access-key-id "$ALIYUN_ACCESS_KEY_ID" \
    --access-key-secret "$ALIYUN_ACCESS_KEY_SECRET" \
    "$@"; then
    echo "Error: aliyuncli command failed (region=$ALIYUN_REGION, args=$*)" >&2
    exit 1
fi
