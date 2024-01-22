#! /usr/bin/env node

import { Command } from 'commander';
import { lang } from '../lang';
import { logger } from '../common/logger';
import { getVersion } from '../common/getVersion';
const program = new Command();

program.name('hls').description('CLI for hostsless').version(getVersion());

program
  .command('show')
  .description('show string')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    logger.debug({ limit, first: options.first, separator: options.separator }, 'log command info');
    console.log(`${str} ${options.first} ${options.separator} ${lang.__('hello')}`);
  });

program.parse();
