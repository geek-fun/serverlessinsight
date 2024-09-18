import pino from 'pino';

const logger = pino({
  name: 'ServerlessInsight',
});

export { logger };
