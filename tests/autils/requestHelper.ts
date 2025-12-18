import http from 'node:http';

export const makeRequest = (
  url: string,
  method = 'GET',
  body?: string,
): Promise<{
  statusCode: number | undefined;
  headers: http.IncomingHttpHeaders;
  data: string;
}> => {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, data });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(body);
    }

    req.end();
  });
};
