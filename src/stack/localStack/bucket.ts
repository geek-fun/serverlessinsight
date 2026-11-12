import { IncomingMessage } from 'http';
import { ServerlessIac } from '../../types';
import { ParsedRequest, RouteResponse } from '../../types/localStack';
import { logger } from '../../common';
import path from 'node:path';
import fs from 'node:fs';
import { lang } from '../../lang';

type FileEntry = {
  name: string;
  type: string;
  size: number;
  path: string;
};

const TEXT_MIME_TYPES = new Set([
  'text/plain',
  'text/html',
  'text/css',
  'text/javascript',
  'text/markdown',
  'text/xml',
  'application/json',
  'application/javascript',
  'application/xml',
]);

const getMimeType = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.htm': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip',
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

const listDirectory = (dirPath: string, bucketPath: string): Array<FileEntry> => {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    return entries.map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.relative(bucketPath, fullPath);
      const stats = fs.statSync(fullPath);

      return {
        name: entry.name,
        type: entry.isDirectory() ? 'directory' : 'file',
        size: entry.isDirectory() ? 0 : stats.size,
        path: relativePath.replace(/\\/g, '/'), // Normalize path separators
      };
    });
  } catch (error) {
    logger.error(lang.__('ERROR_LISTING_DIRECTORY', { error: String(error) }));
    return [];
  }
};

const getAllFiles = (
  dirPath: string,
  bucketPath: string,
  fileList: Array<FileEntry> = [],
): Array<FileEntry> => {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.relative(bucketPath, fullPath);

      if (entry.isDirectory()) {
        // Recursively list files in subdirectories
        getAllFiles(fullPath, bucketPath, fileList);
      } else {
        const stats = fs.statSync(fullPath);
        fileList.push({
          name: entry.name,
          type: 'file',
          size: stats.size,
          path: relativePath.replace(/\\/g, '/'),
        });
      }
    }

    return fileList;
  } catch (error) {
    logger.error(lang.__('ERROR_GETTING_ALL_FILES', { error: String(error) }));
    return fileList;
  }
};

const serveFileResponse = (filePath: string): RouteResponse => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);

    // For text files, return as string; for binary files, return as base64
    const isTextFile = TEXT_MIME_TYPES.has(mimeType);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': String(fileContent.length),
      },
      body: isTextFile ? fileContent.toString('utf-8') : fileContent.toString('base64'),
    };
  } catch (error) {
    logger.error(lang.__('ERROR_READING_FILE', { error: String(error) }));
    return {
      statusCode: 500,
      body: {
        error: 'Failed to read file',
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

const isPathInsideBucket = (filePath: string, bucketBasePath: string): boolean =>
  path.normalize(filePath).startsWith(path.normalize(bucketBasePath));

const serveWebsiteRequest = (
  url: string,
  bucketBasePath: string,
  bucketKey: string,
  indexDocument: string,
): RouteResponse => {
  const requestedPath = url.startsWith('/') ? url.slice(1) : url;
  const filePath = path.join(bucketBasePath, url);

  if (!isPathInsideBucket(filePath, bucketBasePath)) {
    return {
      statusCode: 403,
      body: { error: 'Access denied: Path traversal attempt detected' },
    };
  }

  const serveIndexDocument = (indexPath: string): RouteResponse => {
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
      return serveFileResponse(indexPath);
    }
    return {
      statusCode: 404,
      body: {
        error: lang.__('LOCAL_BUCKET_INDEX_NOT_FOUND'),
        index: indexDocument,
        bucketKey,
      },
    };
  };

  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isFile()) {
      return serveFileResponse(filePath);
    }
    const directoryIndex = path.join(filePath, indexDocument);
    if (fs.existsSync(directoryIndex) && fs.statSync(directoryIndex).isFile()) {
      return serveFileResponse(directoryIndex);
    }
  }

  if (path.extname(requestedPath) !== '') {
    return {
      statusCode: 404,
      body: {
        error: lang.__('LOCAL_BUCKET_FILE_NOT_FOUND'),
        path: requestedPath,
        bucketKey,
      },
    };
  }

  return serveIndexDocument(path.join(bucketBasePath, indexDocument));
};

export const bucketsHandler = async (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
): Promise<RouteResponse> => {
  logger.info(
    lang.__('BUCKET_REQUEST_RECEIVED', {
      method: req.method || '',
      identifier: parsed.identifier ?? '/',
      url: parsed.url || '',
    }),
  );

  // Find the bucket definition
  const bucketDef = iac.buckets?.find((bucket) => bucket.key === parsed.identifier);
  if (!bucketDef) {
    return {
      statusCode: 404,
      body: { error: 'Bucket not found', bucketKey: parsed.identifier },
    };
  }

  // Determine the bucket path - use website.code if available, otherwise use bucket name
  let bucketBasePath: string;
  if (bucketDef.website?.code) {
    bucketBasePath = path.resolve(process.cwd(), bucketDef.website.code);
  } else {
    // Fallback: create a directory based on bucket name (for non-website buckets)
    bucketBasePath = path.resolve(process.cwd(), bucketDef.name);
  }

  // Check if bucket path exists
  if (!fs.existsSync(bucketBasePath)) {
    return {
      statusCode: 404,
      body: {
        error: 'Bucket directory not found',
        bucketKey: bucketDef.key,
        bucketName: bucketDef.name,
        expectedPath: bucketBasePath,
      },
    };
  }

  if (bucketDef.website?.code) {
    return serveWebsiteRequest(
      parsed.url,
      bucketBasePath,
      bucketDef.key,
      bucketDef.website.index ?? 'index.html',
    );
  }

  // Root path lists all files in bucket
  if (parsed.url === '/') {
    try {
      const files = getAllFiles(bucketBasePath, bucketBasePath);

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          bucket: bucketDef.name,
          bucketKey: bucketDef.key,
          files,
          count: files.length,
        },
      };
    } catch (error) {
      logger.error(lang.__('ERROR_LISTING_BUCKET_FILES', { error: String(error) }));
      return {
        statusCode: 500,
        body: {
          error: 'Failed to list bucket files',
          message: error instanceof Error ? error.message : String(error),
        },
      };
    }
  }

  // Otherwise, serve the requested file
  const requestedPath = parsed.url.startsWith('/') ? parsed.url.slice(1) : parsed.url;
  const filePath = path.join(bucketBasePath, requestedPath);

  // Security check: ensure the requested file is within the bucket directory
  if (!isPathInsideBucket(filePath, bucketBasePath)) {
    return {
      statusCode: 403,
      body: { error: 'Access denied: Path traversal attempt detected' },
    };
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return {
      statusCode: 404,
      body: {
        error: 'File not found',
        path: requestedPath,
        bucketKey: bucketDef.key,
      },
    };
  }

  // If it's a directory, list its contents
  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    try {
      const files = listDirectory(filePath, bucketBasePath);

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          bucket: bucketDef.name,
          bucketKey: bucketDef.key,
          directory: requestedPath,
          files,
          count: files.length,
        },
      };
    } catch (error) {
      logger.error(lang.__('ERROR_LISTING_DIRECTORY', { error: String(error) }));
      return {
        statusCode: 500,
        body: {
          error: 'Failed to list directory',
          message: error instanceof Error ? error.message : String(error),
        },
      };
    }
  }

  return serveFileResponse(filePath);
};
