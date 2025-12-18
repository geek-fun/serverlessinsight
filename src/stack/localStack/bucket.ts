import { IncomingMessage } from 'http';
import { ServerlessIac } from '../../types';
import { ParsedRequest, RouteResponse } from '../../types/localStack';
import { logger } from '../../common';
import path from 'node:path';
import fs from 'node:fs';

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

const listDirectory = (
  dirPath: string,
  bucketPath: string,
): Array<{ name: string; type: string; size: number; path: string }> => {
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
    logger.error(`Error listing directory: ${error}`);
    return [];
  }
};

const getAllFiles = (
  dirPath: string,
  bucketPath: string,
  fileList: Array<{ name: string; type: string; size: number; path: string }> = [],
): Array<{ name: string; type: string; size: number; path: string }> => {
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
    logger.error(`Error getting all files: ${error}`);
    return fileList;
  }
};

export const bucketsHandler = async (
  req: IncomingMessage,
  parsed: ParsedRequest,
  iac: ServerlessIac,
): Promise<RouteResponse> => {
  logger.info(
    `Bucket request received by local server -> ${req.method} ${parsed.identifier ?? '/'} ${parsed.url}`,
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
      logger.error(`Error listing bucket files: ${error}`);
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
  const normalizedFilePath = path.normalize(filePath);
  const normalizedBucketPath = path.normalize(bucketBasePath);
  if (!normalizedFilePath.startsWith(normalizedBucketPath)) {
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
      logger.error(`Error listing directory: ${error}`);
      return {
        statusCode: 500,
        body: {
          error: 'Failed to list directory',
          message: error instanceof Error ? error.message : String(error),
        },
      };
    }
  }

  // Serve the file
  try {
    const fileContent = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);

    // For text files, return as string; for binary files, return as base64
    const isTextFile =
      mimeType.startsWith('text/') ||
      mimeType === 'application/json' ||
      mimeType === 'application/javascript' ||
      mimeType === 'application/xml';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': String(fileContent.length),
      },
      body: isTextFile ? fileContent.toString('utf-8') : fileContent.toString('base64'),
    };
  } catch (error) {
    logger.error(`Error reading file: ${error}`);
    return {
      statusCode: 500,
      body: {
        error: 'Failed to read file',
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
};
