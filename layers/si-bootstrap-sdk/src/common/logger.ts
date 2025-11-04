import pino from 'pino';

const logger = pino({
  name: 'SIBootstrapSDK',
  level: ['SIBootstrapSDK', '*'].includes(process.env.DEBUG || '') ? 'debug' : 'info',
  transport: { target: 'pino-pretty' },
});

export { logger };
