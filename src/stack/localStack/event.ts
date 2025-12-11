import { EventTypes, ServerlessIac } from '../../types';
import { isEmpty } from 'lodash';
import { ParsedRequest, RouteHandler } from '../../types/localStack';
import { IncomingMessage } from 'http';
import { getIacDefinition, logger } from '../../common';
import { functionsHandler } from './function';

const servEvent = (req: IncomingMessage, parsed: ParsedRequest, iac: ServerlessIac) => {
  const event = iac.events?.find(
    (event) => event.type === EventTypes.API_GATEWAY && event.key === parsed.identifier,
  );

  if (isEmpty(event)) {
    return;
  }
  logger.info(
    `Event trigger ${JSON.stringify(event.triggers)}, req method: ${req.method}, req url${req.url}`,
  );
  const matchedTrigger = event.triggers.find(
    (trigger) => trigger.method === parsed.method && trigger.path === parsed.url,
  );
  if (!matchedTrigger) {
    return { status: 404, body: 'Event trigger not found' };
  }

  if (matchedTrigger.backend) {
    const backendDef = getIacDefinition(iac, matchedTrigger.backend);
    return functionsHandler(req, { ...parsed, identifier: backendDef?.key as string }, iac);
  }
};

export const eventsHandler: RouteHandler = (req, parsed, iac) => {
  return servEvent(req, parsed, iac);
};
