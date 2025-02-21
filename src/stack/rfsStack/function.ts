import { ActionContext, FunctionDomain } from '../../types';
import { resolveCode } from '../../common';
import { RfsStack } from './index';

const fgsApplication = (context: ActionContext, service: string) => `
resource "huaweicloud_fgs_application" "${service}_app" {
  name = "${service}-app"
  description = "${service} application"
  package_type = "event"
}
`;

const fgsFunction = (fn: FunctionDomain, context: ActionContext, service: string) => `
resource "huaweicloud_fgs_function" "${fn.key}" {
  name = "${fn.name}"
  handler = "${fn.code!.handler}"
  runtime = "${fn.code!.runtime}"
  memory_size = ${fn.memory}
  timeout = ${fn.timeout}
  environment = ${JSON.stringify(fn.environment)}
  code_type = "inline"
  func_code = "${resolveCode(fn.code!.path)}"
  app = "huaweicloud_fgs_application.${service}_app.id"
}
`;

export const resolveFunction = (
  stack: RfsStack,
  functions: Array<FunctionDomain> | undefined,
  context: ActionContext,
  service: string,
) => {
  if (!functions) {
    return undefined;
  }
  const app = fgsApplication(context, service);
  stack.appendHcl(app + '\n' + functions.map((fn) => fgsFunction(fn, context, service)).join('\n'));
};
