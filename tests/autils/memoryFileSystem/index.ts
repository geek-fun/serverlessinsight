import path from 'node:path';

export const createMemoryFileSystem = () => {
  const files = new Map<string, Buffer>();
  const directories = new Set<string>();
  const descriptors = new Map<number, string>();
  let nextDescriptor = 0;
  const key = (file: string) => path.resolve(file);
  const missing = (file: string) => Object.assign(new Error(file), { code: 'ENOENT' });
  const read = (file: string): Buffer => {
    const content = files.get(key(file));
    if (!content) throw missing(file);
    return content;
  };
  const write = (file: string | number, content: string | Buffer) => {
    const target = typeof file === 'number' ? descriptors.get(file)! : key(file);
    files.set(target, Buffer.from(content));
  };
  const mkdir = (directory: string): void => {
    const target = key(directory);
    directories.add(target);
    if (path.dirname(target) !== target) mkdir(path.dirname(target));
  };
  return {
    existsSync: (file: string) => files.has(key(file)) || directories.has(key(file)),
    mkdirSync: mkdir,
    mkdtempSync: (prefix: string) => {
      const directory = `${prefix}${directories.size}`;
      mkdir(directory);
      return directory;
    },
    readFileSync: (file: string, encoding?: string) => {
      const content = read(file);
      return encoding ? content.toString(encoding as BufferEncoding) : Buffer.from(content);
    },
    writeFileSync: write,
    appendFileSync: (file: string, content: string) => {
      write(file, Buffer.concat([files.get(key(file)) ?? Buffer.alloc(0), Buffer.from(content)]));
    },
    copyFileSync: (from: string, to: string) => write(to, read(from)),
    openSync: (file: string, flags: string) => {
      if (flags === 'wx' && files.has(key(file))) {
        throw Object.assign(new Error(file), { code: 'EEXIST' });
      }
      const descriptor = ++nextDescriptor;
      descriptors.set(descriptor, key(file));
      write(file, '');
      return descriptor;
    },
    fsyncSync: () => undefined,
    closeSync: (descriptor: number) => descriptors.delete(descriptor),
    renameSync: (from: string, to: string) => {
      write(to, read(from));
      files.delete(key(from));
    },
    unlinkSync: (file: string) => {
      if (!files.delete(key(file))) throw missing(file);
    },
    rmSync: (file: string, options?: { force?: boolean; recursive?: boolean }) => {
      const target = key(file);
      if (!options?.force && !files.has(target) && !directories.has(target)) throw missing(file);
      const matches = (entry: string) =>
        entry === target || (options?.recursive && entry.startsWith(`${target}${path.sep}`));
      [...files.keys()].filter(matches).forEach((entry) => files.delete(entry));
      [...directories].filter(matches).forEach((entry) => directories.delete(entry));
    },
    readdirSync: (directory: string, options?: { withFileTypes?: boolean }) => {
      if (!directories.has(key(directory))) throw missing(directory);
      const children = [...directories, ...files.keys()].filter(
        (entry) => path.dirname(entry) === key(directory) && entry !== key(directory),
      );
      return children.map((entry) =>
        options?.withFileTypes
          ? { name: path.basename(entry), isDirectory: () => directories.has(entry) }
          : path.basename(entry),
      );
    },
  };
};
