// import * as ros from '@alicloud/ros-cdk-core';
// import * as fc from '@alicloud/ros-cdk-fc';
//
// export class IacStack extends ros.Stack {
//   constructor(scope: ros.Construct, id: string, props?: ros.StackProps) {
//     super(scope, id, props);
//     new ros.RosInfo(this, ros.RosInfo.description, 'This is the simple ros cdk app example.');
//
//     const functionCompute = new fc.RosFunction(
//       this,
//       'MyFunction',
//       {
//         functionName: 'my-function',
//         serviceName: service.attrServiceName,
//         handler: 'index.handler',
//         runtime: 'nodejs14',
//         code: {
//           zipFile:
//             'exports.handler = function(event, context, callback) { callback(null, "Hello World"); }',
//         },
//       },
//       false,
//     );
//     console.log(functionCompute);
//   }
// }
//
// export const defineResource = (name: string, type: string, properties: Record<string, any>) => {};
