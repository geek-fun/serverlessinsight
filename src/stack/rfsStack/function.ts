import { ActionContext, FunctionDomain } from '../../types';

const fgsApplication = (context: ActionContext, service: string) => `
resource "huaweicloud_fgs_application" "${service}_app" {
  name = "${service}-app"
  description = "${service} application"
  package_type = "event"
}
`;

const fgsFunction = (fn: FunctionDomain, context: ActionContext, service: string) => `
resource "huaweicloud_fgs_function" "${fn.key}" {
  function_name = "${fn.name}"
  handler = "${fn.handler}"
  runtime = "${fn.runtime}"
  memory_size = ${fn.memory}
  timeout = ${fn.timeout}
  environment = ${JSON.stringify(fn.environment)}
  code = {
    package_type = "inline"
    code = <<EOF
      ${fn.code}
    EOF
  }
  application = huaweicloud_fgs_application.${service}_app.id
  
}
`;

export const resolveFunction = (
  functions: Array<FunctionDomain> | undefined,
  context: ActionContext,
  service: string,
) => {
  if (!functions) {
    return undefined;
  }
  const app = fgsApplication(context, service);

  return app + '\n' + functions.map((fn) => fgsFunction(fn, context, service)).join('\n');
};
