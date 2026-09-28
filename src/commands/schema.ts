import { writeFileSync } from 'node:fs';
import { exportIacJsonSchema } from '../validator';
import { logger } from '../common/logger';
import { lang } from '../lang';

/**
 * Issue #250: export the JSON Schema the validator compiles against as a
 * self-contained, standard draft-07 document — the anchor agents use for
 * structured YAML generation, editors use for completion, and `si validate`
 * loops use for pre-flight checks.
 */
export const schema = async (options: { output?: string }): Promise<void> => {
  const exported = exportIacJsonSchema();
  const payload = `${JSON.stringify(exported, null, 2)}\n`;

  if (options.output) {
    writeFileSync(options.output, payload, 'utf8');
    logger.info(lang.__('SCHEMA_WRITTEN_TO', { path: options.output }));
    return;
  }

  process.stdout.write(payload);
};
