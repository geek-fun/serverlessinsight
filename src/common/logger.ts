import pino from 'pino';

const logger = pino({
  name: 'hostsless',
});

export { logger };
