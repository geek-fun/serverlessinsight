// Aliyun FC handler that returns HTML (simulating static content serving)
module.exports.handler = function (event, context, callback) {
  var eventData = JSON.parse(event.toString());
  context.logger.info('Serving HTML for ' + eventData.path);

  var html =
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head><meta charset="utf-8"><title>Test Page</title></head>\n' +
    '<body><h1>Hello from HTML handler</h1></body>\n' +
    '</html>';

  var response = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    body: html,
  };

  callback(null, response);
};

// Handler that returns CSS for verifying non-JSON static content
module.exports.css = function (event, context, callback) {
  var css = 'body { margin: 0; padding: 0; color: #333; }';

  var response = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      'Content-Type': 'text/css',
    },
    body: css,
  };

  callback(null, response);
};
