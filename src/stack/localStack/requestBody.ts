import { IncomingMessage } from 'node:http';
import { buffer } from 'node:stream/consumers';
import { TextDecoder } from 'node:util';
import { lang } from '../../lang';
import { createLocalHttpError } from './httpError';

/**
 * Read a request body as UTF-8 text, refusing bytes that are not valid UTF-8.
 *
 * The providers simulated here hand the handler a string body, so a binary
 * request has no representable event. `messageKey` selects the provider's
 * "binary requests are not simulated" message.
 */
export const readUtf8Body = async (req: IncomingMessage, messageKey: string): Promise<string> => {
  const body = await buffer(req);
  try {
    return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(body);
  } catch {
    throw createLocalHttpError(415, lang.__(messageKey));
  }
};
