import { logger, setContext } from '../common';
import { startLocalStack } from '../stack/localStack';

export interface RunLocalOptions {
  stage: string;
  port: number;
  debug: boolean;
  watch: boolean;
}

export const runLocal = async (stackName: string, opts: RunLocalOptions) => {
  const { stage, port, debug, watch } = opts;

  await setContext({ stage });

  logger.info(
    `run-local starting: stack=${stackName} stage=${stage} port=${port} debug=${debug} watch=${watch}`,
  );

  await startLocalStack();

  // if (watch) {
  //   const cwd = process.cwd();
  //   try {
  //     fs.watch(cwd, { recursive: true }, (eventType, filename) => {
  //       if (!filename) return;
  //       const filePath = path.join(cwd, filename);
  //       logger.info(`file change detected: ${eventType} ${filePath}`);
  //     });
  //     logger.info(`watching files under ${process.cwd()}`);
  //   } catch (err) {
  //     logger.warn(`file watch not available: ${String(err)}`);
  //   }
  // }
  //
  // const shutdown = () => {
  //   logger.info('shutting down run-local server');
  //   server.close(() => process.exit(0));
  // };
  // process.on('SIGINT', shutdown);
  // process.on('SIGTERM', shutdown);
  //
  // // return server for tests if needed
  // return { server, port, stage, debug, watch };
};
