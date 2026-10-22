exports.handler = async (event, context) => ({
  statusCode: 201,
  headers: { 'Content-Type': 'application/json', 'X-Local-Example': 'vefaas' },
  body: JSON.stringify({
    message: process.env.GREETING,
    stage: process.env.STAGE,
    requestId: context.requestId,
    method: event.httpMethod,
    path: event.path,
    query: event.queryStringParameters,
    body: event.body,
  }),
});
