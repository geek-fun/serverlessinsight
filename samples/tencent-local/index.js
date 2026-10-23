exports.handler = async (event, context) => ({
  statusCode: 201,
  headers: { 'Content-Type': 'application/json', 'X-Local-Example': 'scf' },
  body: JSON.stringify({
    message: process.env.GREETING,
    stage: process.env.STAGE,
    requestId: context.request_id,
    method: event.httpMethod,
    path: event.path,
    query: event.queryString,
    body: event.body,
  }),
});
