import http from 'node:http';

export const makeRequest = (
  url: string,
  method = 'GET',
): Promise<{
  statusCode: number | undefined;
  data: string;
}> => {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method: method }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });
    req.on('error', reject);
    req.end();
  });
};
