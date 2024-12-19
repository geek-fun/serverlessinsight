export type CdkAssets = {
  version: string;
  rootPath: string;
  dockerImages: Record<string, unknown>;
  files: {
    [key: string]: {
      source: {
        path: string;
        packaging: string;
      };
      destinations: {
        [key: string]: {
          bucketName: string;
          objectKey: string;
        };
      };
    };
  };
};
