export type FunctionRaw = {
  name: string;
  runtime: string;
  handler: string;
  code: string;
  memory: number;
  timeout: number;
  environment?: {
    [key: string]: string;
  };
};

export type FunctionDomain = FunctionRaw & {
  key: string;
};
