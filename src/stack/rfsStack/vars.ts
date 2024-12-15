import { Stages, Vars } from '../../types';
import { isEmpty } from 'lodash';
import { RfsStack } from './index';

const variable = (id: string, value: unknown) => {
  if (typeof value === 'string') {
    return `
variable "${id}" { 
  type = string
  default = "${value}"
}`;
  }
  if (typeof value === 'number') {
    return `
variable "${id}" {
  type = number
  default = ${value}
}`;
  }
  if (typeof value === 'boolean') {
    return `
variable "${id}" {
  type = boolean
  default = ${value}
}`;
  } else {
    throw new Error(`Unsupported variable type: ${typeof value}`);
  }
};

const stagesHcl = (stages: Stages) => {
  return `
variable "stages" {
  type = object({
    ${Object.keys(stages)
      .map((stage) => {
        return `${stage} = object({
          ${Object.keys(stages[stage])
            .map(
              (key) => `
            ${key} = string
            `,
            )
            .join('')}
      })
      `;
      })
      .join('')}
  })
  default = {
    ${Object.keys(stages)
      .map((stage) => {
        return `
    ${stage} = {
      ${Object.entries(stages[stage])
        .map(
          ([key, value]) => `
        ${key} = "${value}"
        `,
        )
        .join('')}
      }`;
      })
      .join('')}
  }
}`;
};

export const resolveVars = (
  stack: RfsStack,
  vars: Vars | undefined,
  stages: Stages | undefined,
) => {
  let hcl = ``;
  if (!isEmpty(vars)) {
    Object.entries(vars).map(([id, value]) => {
      hcl += variable(id, value);
    });
  }
  if (!isEmpty(stages)) {
    hcl += `
${stagesHcl(stages)}
`;
  }

  stack.appendHcl(hcl + '\n');
};
