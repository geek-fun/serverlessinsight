import { IncomingMessage } from 'http';
import { ServerlessIac } from '../../types';
import { ParsedRequest } from '../../types/localStack';
import { logger } from '../../common';

export const functionsHandler = (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
) => {
  logger.info(
    `Function request received by local gateway -> ${req.method} ${parsed.identifier ?? '/'} `,
  );
  const fcDef = iac.functions?.find((fn) => fn.key === parsed.identifier);
  if (!fcDef) {
    return { status: 404, body: 'Function not found' };
  }
  // @TODO implement function invocation logic here

  return {
    status: 200,
    body: `Function ${fcDef.key} invoked successfully`,
  };
};
