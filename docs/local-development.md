# Local development

Run `si local -f serverlessinsight.yml -s local` from the application's directory.
No cloud credentials or cloud calls are required for local function invocation.
The default port is 4567; set `SI_LOCALSTACK_SERVER_PORT` to choose another port.
`--provider`/`-v` and `--region`/`-r` override the YAML provider and region.
The selected stage and its `stages` variables are available during configuration evaluation.
Code paths resolve relative to the current working directory.

## Tested support

| Provider     | Local HTTP functions / API Gateway                                                                                                     | Local timers                                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Aliyun       | Existing FC Buffer events, context and response translation                                                                            | Existing FC timer simulation                                                                                                              |
| Volcengine   | `node14/v1` and `node20/v1` code directories and ZIP packages; exact API Gateway paths and configured methods, including `ANY`         | CloudEvents timer envelope per the [provider docs](https://docs.volcengine.com/docs/vefaas/Trigger_event_message_structure?lang=zh); the trigger name substitutes for the cloud timer id in `source` |
| Tencent      | Existing generic execution; provider-native HTTP parity is tracked in [#267](https://github.com/geek-fun/serverlessinsight/issues/267) | Existing timer simulation; provider context parity is not claimed                                                                         |
| AWS / Huawei | Existing generic execution; native HTTP parity is not claimed                                                                          | Provider-native parity is not claimed                                                                                                     |

## Volcengine veFaaS HTTP

Try the complete [example](../samples/volcengine-local/serverlessinsight.yml):

```sh
cd samples/volcengine-local
si local -s local
```

In another terminal:

```sh
curl -i 'http://localhost:4567/si_events/api/echo?name=local'
curl -i -X POST 'http://localhost:4567/si_events/api/echo' \
  -H 'Content-Type: text/plain' --data 'plain text'
curl -i -X POST 'http://localhost:4567/si_functions/echo/echo' \
  -H 'Content-Type: application/json' --data '{"hello":"world"}'
```

Each call returns HTTP 201 with the example's header and JSON body.
`/si_events/<event-key>/<configured-path>` matches the event's backend;
`/si_functions/<function-key>/<path>` invokes the same HTTP adapter directly,
without requiring a deployed trigger or domain. Prefixes are removed from `event.path`.
Paths match exactly, including repeated and trailing slashes. Local Volcengine routes
use the same `Exact` match mode as the framework's `CreateRoute` request; bracket
parameters and `*` have no wildcard meaning in this mode.

The handler receives an object with `httpMethod`, `path`, `pathParameters`,
`queryStringParameters`, `headers` and `body`. The exact-path integration supplies
an empty `pathParameters` map. Query values are URL-decoded strings; repeated keys
use the last value. Headers use Node's lowercase names and merged duplicate-header
behavior — the provider's [event documentation](https://docs.volcengine.com/docs/vefaas/Trigger_event_message_structure?lang=zh)
shows canonical casing (`X-Faas-Request-Id`, `Host`); compare header names
case-insensitively, as the local simulator cannot recover the original wire casing.
The incoming local host is retained. `x-faas-request-id` is replaced with
a newly generated local UUID matching `context.requestId`.

Empty requests produce `body: ''`. JSON and text remain unparsed UTF-8 strings,
including Unicode and a UTF-8 BOM. Chunks are combined before decoding. Arbitrary
binary requests with invalid UTF-8 return 415 before handler invocation. This
subset does not invent an `isBase64Encoded` field or a cloud binary convention.
Binary response bodies are also unsupported; encode application data into a UTF-8
string yourself when appropriate.

Context contains only `{ requestId }`, with a synthetic UUID for each invocation.
Configured function environment variables are passed to the worker. AWS runtime
variables, ARN fields, Aliyun service metadata and credentials are not synthesized.

Handlers return an object with optional `statusCode`, `headers` and `body`:

```js
exports.handler = async (event, context) => ({
  statusCode: 201,
  headers: { 'Content-Type': 'text/plain' },
  body: `Received ${event.httpMethod}; request ${context.requestId}`,
});
```

Local response validation accepts integer statuses 200–599, string-valued headers
and string bodies. Missing values default to 200, JSON content type and an empty
body; an omitted return value also sends an empty 200 response. The adapter sends
the body verbatim and ignores fields outside the three response fields. A JSON
body should be explicitly serialized with `JSON.stringify`; the provider response
envelope is never nested in the HTTP body.

## Volcengine veFaaS timers

Enabled `functions.*.triggers.timer` schedules fire locally against UTC wall-clock
(`@every` from server start), like the other providers. The handler receives the
CloudEvents envelope documented by the provider:

```json
{
  "id": "<local UUID>",
  "source": "/faas/event/timer/<trigger-name>",
  "specversion": "1.0",
  "time": "2026-10-23T00:00:00.000Z",
  "type": "faas.timer.event",
  "datacontenttype": "application/octet-stream",
  "data": "<configured payload, empty string by default>"
}
```

The context is the same minimal `{ requestId }` as HTTP invocations. Known local
differences: the local trigger name substitutes for the cloud timer id in
`source` (the platform id does not exist locally), and `id`/`requestId` are
independent local UUIDs — the provider docs do not document a linkage for timers.

## Local errors and limitations

| Condition                                                                                        | Local behavior                                                                          |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Unknown function/event, method or exact path mismatch                                            | HTTP 404                                                                                |
| Matched route without a backend                                                                  | HTTP 202                                                                                |
| Backend references a missing function                                                            | HTTP 500                                                                                |
| Handler export missing, module loading failure or handler exception                              | HTTP 500 with an execution error and diagnostic message                                 |
| Function timeout, including a blocking handler                                                   | HTTP 500 with a timeout message; the worker is terminated and later requests still work |
| Invalid UTF-8 request body                                                                       | HTTP 415                                                                                |
| Invalid response envelope, header or binary response                                             | HTTP 502                                                                                |
| Volcengine container, native runtime, `nodeprime14/v1`, other language or non-API event endpoint | HTTP 501 with a limitation message                                                      |

These HTTP error statuses describe the local simulator, not guaranteed cloud error
responses. The invocation deadline includes worker startup and module loading.
The shared worker runs the locally installed Node version; it does not reproduce
the selected cloud Node version, process reuse, initializer lifecycle, concurrency
limits, IAM checks, gateway plugins/authentication, TLS, cloud networking or
provider-assigned deployment identifiers. Handler-loader CommonJS/ESM behavior
remains shared with other local providers. Container/native HTTP servers and
non-HTTP event sources are outside this implementation.

The contract follows the provider's [Node.js development contract](https://docs.volcengine.com/docs/vefaas/Node_js_runtime_Development_methods?lang=en)
and [API Gateway event structure](https://docs.volcengine.com/docs/vefaas/Trigger_event_message_structure?lang=zh),
with the explicitly limited UTF-8 subset above. Automated tests verify local
behavior offline; live-cloud parity has not been verified.

## Verification

From the repository root, run `npm run build` followed by `npm test`. The local
contract tests exercise real workers and HTTP responses, including exceptions,
timeouts and route mismatches. The offline CLI smoke test starts the built `si`
command without cloud credentials and verifies GET, JSON and text requests,
received event/context, stage variables, status, headers and response body; it
skips itself when `dist/` is absent so a raw `npm test` without a build still
passes.
