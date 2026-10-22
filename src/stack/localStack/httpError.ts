export const createLocalHttpError = (statusCode: number, message: string): Error =>
  Object.assign(new Error(message), { statusCode });
