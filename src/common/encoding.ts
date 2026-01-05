import { execSync } from 'node:child_process';
import iconv from 'iconv-lite';

/**
 * Encoding mapping from Windows code page to iconv encoding name
 */
const CODE_PAGE_TO_ENCODING: Record<number, string> = {
  936: 'gbk', // Simplified Chinese GBK
  950: 'big5', // Traditional Chinese Big5
  932: 'shift_jis', // Japanese Shift_JIS
  949: 'euc-kr', // Korean
  65001: 'utf8', // UTF-8
  1200: 'utf16le', // UTF-16 LE
  1201: 'utf16be', // UTF-16 BE
  20127: 'ascii', // ASCII
  28591: 'iso-8859-1', // Latin-1
};

/**
 * Detects the terminal encoding.
 * On Windows, uses `chcp` command to detect code page.
 * On Unix-like systems, checks environment variables.
 * Returns 'utf8' as the default.
 */
export const detectTerminalEncoding = (): string => {
  // On Windows, check the code page
  if (process.platform === 'win32') {
    try {
      const output = execSync('chcp', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
      // Output format: "Active code page: 936" or Chinese "活动代码页: 936"
      // Match the last number in the output which is the code page
      const match = output.match(/(\d+)\s*$/m);
      if (match) {
        const codePage = parseInt(match[1], 10);
        return CODE_PAGE_TO_ENCODING[codePage] || 'utf8';
      }
    } catch {
      // Fall through to default
    }
    return 'utf8';
  }

  // On Unix-like systems, check LANG/LC_ALL environment variables
  const langEnv = process.env.LANG || process.env.LC_ALL || process.env.LC_CTYPE || '';
  if (langEnv.toLowerCase().includes('utf-8') || langEnv.toLowerCase().includes('utf8')) {
    return 'utf8';
  }

  // Check for specific encodings in LANG
  if (langEnv.toLowerCase().includes('gbk') || langEnv.toLowerCase().includes('gb2312')) {
    return 'gbk';
  }

  if (langEnv.toLowerCase().includes('big5')) {
    return 'big5';
  }

  // Default to UTF-8 for modern Unix systems
  return 'utf8';
};

/**
 * Flag to track if encoding has been applied
 */
let encodingApplied = false;

/**
 * Creates a write method override for encoding transcoding.
 * @param originalWrite The original write method to wrap
 * @param encoding The target encoding for transcoding
 * @returns The wrapped write method
 */
const createEncodedWriteMethod = (
  originalWrite: typeof process.stdout.write,
  encoding: string,
): typeof process.stdout.write => {
  return function (
    chunk: string | Uint8Array,
    encodingOrCallback?: BufferEncoding | ((err?: Error | null) => void),
    callback?: (err?: Error | null) => void,
  ): boolean {
    if (typeof encodingOrCallback === 'function') {
      callback = encodingOrCallback;
      encodingOrCallback = undefined;
    }

    try {
      const utf8String = typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8');
      const encoded = iconv.encode(utf8String, encoding);
      return originalWrite(encoded, callback);
    } catch {
      return originalWrite(chunk, encodingOrCallback as BufferEncoding, callback);
    }
  } as typeof process.stdout.write;
};

/**
 * Applies terminal encoding transcoding to stdout and stderr.
 * Only applies when the terminal encoding is not UTF-8.
 * This function should be called before any logging is initialized.
 *
 * @returns The detected encoding name
 */
export const applyTerminalEncoding = (): string => {
  if (encodingApplied) {
    return detectTerminalEncoding();
  }

  const encoding = detectTerminalEncoding();

  // Skip if already UTF-8 or in non-TTY environment
  if (encoding === 'utf8' || !process.stdout.isTTY) {
    encodingApplied = true;
    return encoding;
  }

  // Check if the encoding is supported by iconv-lite
  if (!iconv.encodingExists(encoding)) {
    encodingApplied = true;
    return 'utf8';
  }

  // Store original write methods and create encoded versions
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  const originalStderrWrite = process.stderr.write.bind(process.stderr);

  // Override process.stdout.write and process.stderr.write
  process.stdout.write = createEncodedWriteMethod(originalStdoutWrite, encoding);
  process.stderr.write = createEncodedWriteMethod(originalStderrWrite, encoding);

  encodingApplied = true;
  return encoding;
};

/**
 * Gets whether encoding has been applied
 */
export const isEncodingApplied = (): boolean => encodingApplied;

/**
 * Resets the encoding applied flag (mainly for testing)
 */
export const resetEncodingState = (): void => {
  encodingApplied = false;
};
