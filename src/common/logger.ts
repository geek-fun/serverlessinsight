import pino from 'pino';

const logger = pino({
  name: 'ServerlessInsight',
  level: ['ServerlessInsight', '*'].includes(process.env.DEBUG || '') ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
  },
});

export { logger };
