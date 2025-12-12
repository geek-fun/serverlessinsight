import { IncomingMessage } from 'http';
import { ServerlessIac } from '../../types';
import { ParsedRequest, RouteResponse } from '../../types/localStack';
import { logger } from '../../common';

export const functionsHandler = (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
): RouteResponse => {
  logger.info(
    `Function request received by local gateway -> ${req.method} ${parsed.identifier ?? '/'} `,
  );
  const fcDef = iac.functions?.find((fn) => fn.key === parsed.identifier);
  if (!fcDef) {
    return {
      statusCode: 404,
      body: { error: 'Function not found', functionKey: parsed.identifier },
    };
  }
  // TODO: add actual invocation support (exec container/lambda runtime)

  return {
    statusCode: 200,
    body: {
      message: `Function ${fcDef.name} invoked successfully`,
      functionKey: fcDef.key,
      method: req.method,
      path: parsed.url,
    },
  };
};
