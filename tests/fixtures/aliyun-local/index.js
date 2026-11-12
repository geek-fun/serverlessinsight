const respond = (payload) => ({
  statusCode: 200,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
});

exports.handler = async (event, context) => {
  const fcEvent = JSON.parse(event);
  return respond({ from: 'echo', event: fcEvent, requestId: context.requestId });
};

exports.clash = async (event, context) => {
  const fcEvent = JSON.parse(event);
  return respond({ from: 'clash', event: fcEvent, requestId: context.requestId });
};
