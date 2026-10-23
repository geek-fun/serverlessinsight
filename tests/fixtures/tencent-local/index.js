exports.handler = async (event, context) => ({
  statusCode: 207,
  headers: { 'Content-Type': 'application/json', 'X-Local-Contract': 'scf' },
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
exports.binary = async () => ({ statusCode: 200, isBase64Encoded: true, body: 'AA==' });
exports.text = async () => 'plain string response';
exports.json = async () => ({ message: 'inferred json' });
