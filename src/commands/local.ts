import { getIacLocation, logger, setContext, getContext } from '../common';
import { startLocalStack } from '../stack/localStack';
import { revalYaml } from '../parser';
import { lang } from '../lang';

export type RunLocalOptions = {
  stage: string;
  port: number;
  debug: boolean;
  watch: boolean;
  location: string | undefined;
};

export const runLocal = async (stackName: string, opts: RunLocalOptions) => {
  const { stage, port, debug, watch, location } = opts;

  await setContext({ stage, location });
  const ctx = getContext();

  const iac = revalYaml(getIacLocation(location), ctx);

  logger.info(
    lang.__('RUN_LOCAL_STARTING', {
      stackName,
      stage,
      port: String(port),
      debug: String(debug),
      watch: String(watch),
    }),
  );

  await startLocalStack(iac);

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
