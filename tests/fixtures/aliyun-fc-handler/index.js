// Aliyun FC handler following the documented format
module.exports.handler = function (event, context, callback) {
  // Event is a Buffer in Aliyun FC, need to parse it
  var eventData = JSON.parse(event.toString());

  // Log using context.logger as per Aliyun FC
  context.logger.info('Received request for ' + eventData.path);
  context.logger.debug('Processing request body: ' + JSON.stringify(eventData.body));

  var content = {
    path: eventData.path,
    method: eventData.httpMethod,
    headers: eventData.headers,
    queryParameters: eventData.queryParameters || {}, // Ensure it's always an object
    pathParameters: eventData.pathParameters || {}, // Ensure it's always an object
    body: eventData.body,
    message: 'Hello from Aliyun FC',
  };

  var response = {
    isBase64Encoded: false,
    statusCode: '200',
    headers: {
      'x-custom-header': 'header value',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  };

  context.logger.info('Response generated');
  callback(null, response);
};
