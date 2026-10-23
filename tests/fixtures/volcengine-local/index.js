exports.handler = async (event, context) => ({
  statusCode: 207,
  headers: { 'Content-Type': 'application/json', 'X-Local-Contract': 'vefaas' },
  body: JSON.stringify({
    event,
    context,
    stage: process.env.LOCAL_STAGE,
    greeting: process.env.LOCAL_GREETING,
  }),
});
exports.fail = async () => {
  throw new Error('synthetic handler failure');
};
exports.timeout = async () => new Promise(() => {});
exports.block = () => {
  for (;;) {
    /* Exercise the parent-side invocation deadline. */
  }
};
exports.empty = async () => undefined;
exports.invalid = async () => ({ statusCode: 201, body: { invalid: true } });
exports.metadata = async (event) => {
  const request = Buffer.isBuffer(event) ? JSON.parse(event.toString()) : event;
  const internal = request.path.endsWith('/bigint') ? 1n : {};
  if (typeof internal === 'object') internal.self = internal;
  return {
    statusCode: 201,
    headers: { 'content-type': 'text/plain', 'x-local-metadata': 'preserved' },
    body: 'ok',
    internal,
  };
};
