import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { execSync } from 'child_process';
import iconv from 'iconv-lite';
import { Writable } from 'stream';

const CODE_PAGE_TO_ENCODING: Record<number, string> = {
  932: 'shift_jis', // Japanese
  936: 'gbk', // Simplified Chinese
  949: 'euc-kr', // Korean
  950: 'big5', // Traditional Chinese
  1250: 'windows-1250', // Central European
  1251: 'windows-1251', // Cyrillic
  1252: 'windows-1252', // Latin I
  1253: 'windows-1253', // Greek
  1254: 'windows-1254', // Turkish
  1255: 'windows-1255', // Hebrew
  1256: 'windows-1256', // Arabic
  1257: 'windows-1257', // Baltic
  1258: 'windows-1258', // Vietnamese
  65001: 'utf8', // UTF-8
  1200: 'utf16le', // UTF-16 LE
  1201: 'utf16be', // UTF-16 BE
  20127: 'ascii', // ASCII
  28591: 'iso-8859-1', // Latin-1
};

const getSystemEncoding = (): string => {
  if (process.platform === 'win32') {
    try {
      const codePageOutput = execSync('chcp', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).toString();
      const codePageMatch = codePageOutput.match(/(\d+)\s*$/m);
      if (codePageMatch) {
        const codePage = parseInt(codePageMatch[1], 10);

        return CODE_PAGE_TO_ENCODING[codePage] || 'utf8';
      }
    } catch {
      // fallback to environment variable detection
    }
  }

  const langEnv = (
    process.env.LANG ||
    process.env.LC_ALL ||
    process.env.LC_CTYPE ||
    ''
  ).toLowerCase();
  if (['utf8', 'utf-8'].find((lang) => langEnv.includes(lang))) {
    return 'utf8';
  }
  if (['gbk', 'gb2312'].find((lang) => langEnv.includes(lang))) {
    return 'gbk';
  }
  if (['shift_jis', 'sjis'].find((lang) => langEnv.includes(lang))) {
    return 'shift_jis';
  }
  if (langEnv.includes('big5')) {
    return 'big5';
  }

  return 'utf8';
};

class EncodingTransformStream extends Writable {
  private encoding: string;
  private formatLog: (inputData: unknown) => string;

  constructor(encoding: string) {
    super();
    this.encoding = encoding;

    this.formatLog = pinoPretty.prettyFactory({
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      messageFormat: '{msg}',
    });
  }

  _write(chunk: string | Buffer, encoding: string, callback: (error?: Error | null) => void): void {
    try {
      const stringChunk = typeof chunk === 'string' ? chunk : chunk.toString();
      const formattedChunk = this.formatLog(stringChunk);

      if (this.encoding !== 'utf8' && iconv.encodingExists(this.encoding)) {
        process.stdout.write(iconv.toEncoding(formattedChunk, 'utf8'));
      } else {
        process.stdout.write(formattedChunk);
      }

      callback();
    } catch (error) {
      callback(error as Error);
    }
  }
}

export const logger = pino(
  {
    name: 'ServerlessInsight',
    level: ['ServerlessInsight', '*'].includes(process.env.DEBUG || '') ? 'debug' : 'info',
  },
  new EncodingTransformStream(getSystemEncoding()),
);
