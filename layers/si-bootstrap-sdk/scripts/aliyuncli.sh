#!/bin/bash -eu
set -o pipefail

cd "$(dirname "$0")/.." || exit

ALIYUN_REGION=${ALIYUN_REGION:-cn-hangzhou}


docker build -t aliyuncli -f Dockerfile-aliyuncli .\
 && docker run -it --rm \
 --name aliyuncli aliyuncli aliyun \
 --region $ALIYUN_REGION \
 --access-key-id $ALIYUN_ACCESS_KEY_ID \
  --access-key-secret $ALIYUN_ACCESS_KEY_SECRET \
  "$@"
