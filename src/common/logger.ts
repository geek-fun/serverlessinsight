import pino from 'pino';

const logger = pino({
  name: 'ServerlessInsight',
  level: ['ServerlessInsight', '*'].includes(process.env.DEBUG || '') ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      messageFormat: '{msg}',
    },
  },
});

export { logger };
