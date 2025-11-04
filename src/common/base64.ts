export const encodeBase64 = (str: string) => Buffer.from(str, 'utf-8').toString('base64');

export const encodeBase64ForRosId = (str: string) => encodeBase64(str).replace(/=+$/, '');
