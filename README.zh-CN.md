# ServerlessInsight

<div align="center">

[![Node.js CI](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml/badge.svg)](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml)
[![release](https://github.com/geek-fun/serverlessinsight/actions/workflows/release.yml/badge.svg)](https://github.com/geek-fun/serverlessinsight/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/@geek-fun%2Fserverlessinsight.svg)](https://badge.fury.io/js/@geek-fun%2Fserverlessinsight)
[![Known Vulnerabilities](https://snyk.io/test/github/geek-fun/serverlessinsight/badge.svg)](https://snyk.io/test/github/geek-fun/serverlessinsight)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![codecov](https://codecov.io/gh/geek-fun/serverlessinsight/graph/badge.svg?token=ISW7MFuSlf)](https://codecov.io/gh/geek-fun/serverlessinsight)

**为快速增长的业务提供全生命周期跨云服务商的 Serverless 应用管理**

[官方网站](https://serverlessinsight.geekfun.club) • [文档](https://serverlessinsight.geekfun.club) • [示例](./samples) • [English](./README.md)

</div>

---

ServerlessInsight 是一个强大的 Serverless 框架，用于跨多个云服务商管理 Serverless 应用。它提供了统一的接口来部署、管理和调试 Serverless 函数和资源，使用基础设施即代码（IaC）原则。

无论您是在 AWS、阿里云、华为云还是其他服务商上构建应用，ServerlessInsight 都能简化您的开发工作流程：

- **多云支持** - 使用单一工具与多个云服务商协作
- **基础设施即代码** - 使用 YAML 定义您的 Serverless 基础设施
- **本地开发** - 在部署前本地测试您的函数
- **类型安全模板** - 在部署前验证您的配置

---

## ✨ 特性

- 🌍 **多云服务商支持** - 部署到阿里云、华为云等多个平台
- 📦 **统一配置** - 所有服务商使用单一 YAML 格式
- 🚀 **快速部署** - 使用单个命令部署 Serverless 应用
- 🔍 **模板验证** - 在部署前验证您的 IaC 模板
- 🏠 **本地测试** - 在本地运行和调试 Serverless 函数
- 🔄 **模板生成** - 生成特定云服务商的 IaC 模板
- 🌐 **API 网关集成** - 为您的函数配置 HTTP 端点
- 💾 **资源管理** - 管理存储、数据库和其他云资源
- 🔐 **安全优先** - 内置验证和安全最佳实践
- 📊 **全面的日志记录** - 调试和监控您的应用

---

## ☁️ 支持的云服务商

ServerlessInsight 支持以下云服务商：

| 云服务商         | 函数             | API 网关    | 存储        | 数据库           | 状态   |
| ---------------- | ---------------- | ----------- | ----------- | ---------------- | ------ |
| **阿里云**       | ✅ FC3           | ✅ API 网关 | ✅ OSS      | ✅ RDS, OTS, ESS | 稳定   |
| **华为云**       | ✅ FunctionGraph | 🚧 即将推出 | 🚧 即将推出 | 🚧 即将推出      | 测试版 |
| **AWS**          | 🔜 计划中        | 🔜 计划中   | 🔜 计划中   | 🔜 计划中        | 计划中 |
| **Azure**        | 🔜 计划中        | 🔜 计划中   | 🔜 计划中   | 🔜 计划中        | 计划中 |
| **Google Cloud** | 🔜 计划中        | 🔜 计划中   | 🔜 计划中   | 🔜 计划中        | 计划中 |
| **腾讯云**       | 🔜 计划中        | 🔜 计划中   | 🔜 计划中   | 🔜 计划中        | 计划中 |

---

## 🚀 快速开始

### 前置要求

- **Node.js** 16.x 或更高版本
- 云服务商凭证（阿里云 AccessKey、华为云凭证等）

### 安装

使用 npm 全局安装 ServerlessInsight：

```bash
npm install -g @geek-fun/serverlessinsight
```

验证安装：

```bash
si --version
```

---

## 📚 使用方法

```bash
# 验证您的 Serverless 配置
si validate <stackName> -f serverless.yml

# 部署您的 Serverless 应用
si deploy <stackName> -f serverless.yml -s dev

# 本地运行您的应用进行调试
si local <stackName> -f serverless.yml -s local

# 生成特定云服务商的模板
si template <stackName> -f serverless.yml -t JSON

# 销毁已部署的堆栈
si destroy <stackName> -f serverless.yml
```

---

## 💡 示例

ServerlessInsight 使用简单的 YAML 格式来定义您的 Serverless 基础设施：

```yaml
version: 0.0.1
provider:
  name: aliyun
  region: cn-hongkong

service: my-api-service

functions:
  hello_function:
    name: hello-world-fn
    code:
      runtime: nodejs18
      handler: index.handler
      path: ./src
    memory: 512
    timeout: 10
    environment:
      NODE_ENV: production

events:
  api_gateway:
    type: API_GATEWAY
    name: my-api-gateway
    triggers:
      - method: GET
        path: /api/hello
        backend: ${functions.hello_function}
```

更多示例请查看 [samples](./samples) 目录：

- [API 网关示例](./samples/aliyun-poc-api.yml) - 部署带 HTTP 端点的函数
- [存储示例](./samples/aliyun-poc-bucket.yml) - 配置 OSS 存储桶
- [数据库示例](./samples/aliyun-poc-rds.yml) - 设置 RDS 数据库
- [表格存储示例](./samples/aliyun-poc-table.yml) - 配置 OTS 表格存储
- [Elasticsearch 示例](./samples/aliyun-poc-es.yml) - 部署 Elasticsearch Serverless
- [自定义域名示例](./samples/aliyun-poc-domain.yml) - 配置自定义域名
- [GPU 函数示例](./samples/aliyun-poc-fc-gpu.yml) - 部署支持 GPU 的函数
- [华为云示例](./samples/huawei-poc-fc.yml) - 部署到华为云 FunctionGraph

---

## 🔧 本地开发

```bash
# 克隆和设置
git clone https://github.com/geek-fun/serverlessinsight.git
cd serverlessinsight
npm install

# 构建并链接用于开发
npm run build
npm link

# 运行本地开发服务器
si local my-stack -f serverless.yml -s local

# 运行测试
npm test

# 检查代码规范
npm run lint:check
```

---

## 📘 文档

完整文档请访问 [serverlessinsight.geekfun.club](https://serverlessinsight.geekfun.club)

其他资源：

- [快速开始指南](https://serverlessinsight.geekfun.club)
- [配置参考](https://serverlessinsight.geekfun.club)
- [API 文档](https://serverlessinsight.geekfun.club)
- [最佳实践](https://serverlessinsight.geekfun.club)

---

## 🗄️ 状态管理

ServerlessInsight 使用基于状态的部署模型，在本地状态文件 (`.serverlessinsight/state.json`) 中跟踪所有已部署的资源。这使得：

- **增量部署** - 只有更改的资源才会被更新
- **漂移检测** - 识别本地状态与云资源之间的差异
- **安全销毁** - 知道要清理哪些资源

### 部分失败恢复

当部署多个资源时，如果其中一个失败，ServerlessInsight 确保：

1. **成功部署的资源始终保存到状态** - 即使后续资源失败，您的状态文件也将包含所有成功创建/更新/删除的资源
2. **清晰的错误报告** - 您将看到哪些资源成功，哪些资源失败
3. **轻松重试** - 只需再次运行 `deploy` 即可从中断的地方继续

部分失败输出示例：

```
⚠️  部署部分失败: 2 个资源成功，但 functions.api_handler 失败。
已成功部署的资源状态已保存。再次运行 deploy 以重试失败的资源。
后续步骤: 1) 查看上面的错误, 2) 修复配置问题, 3) 再次运行 deploy 继续。
```

### 状态文件位置

状态文件存储在项目目录的 `.serverlessinsight/state.json` 中。此文件：

- 应提交到版本控制以便团队协作
- 包含资源元数据和标识符
- 在每次成功操作后自动更新

### 状态恢复

如果遇到状态漂移（云资源存在但不在状态文件中）：

1. **手动导入** - 目前，资源必须手动添加到状态文件
2. **重新开始** - 删除状态文件和云中的资源，然后重新部署

> 💡 **提示**：在进行手动修改之前，请始终备份您的状态文件。

---

## 🤝 贡献

我们欢迎社区的贡献！以下是您可以帮助的方式：

1. **Fork 仓库**
2. **创建功能分支** (`git checkout -b feature/amazing-feature`)
3. **提交您的更改** (`git commit -m 'Add amazing feature'`)
4. **推送到分支** (`git push origin feature/amazing-feature`)
5. **打开 Pull Request**

---

## 👥 社区

加入我们的社区以获取帮助、分享想法和贡献：

- **GitHub Issues** - [报告错误或请求功能](https://github.com/geek-fun/serverlessinsight/issues)
- **官方网站** - [serverlessinsight.geekfun.club](https://serverlessinsight.geekfun.club)

---

## 📄 许可证

本项目采用 Apache License 2.0 许可证 - 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

ServerlessInsight 使用以下优秀技术构建：

- [Node.js](https://nodejs.org/) - JavaScript 运行时
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [Commander.js](https://github.com/tj/commander.js/) - CLI 框架
- [阿里云 ROS CDK](https://github.com/aliyun/Resource-Orchestration-Service-Cloud-Development-Kit) - 云基础设施 SDK

---

<div align="center">

**由 [geek-fun](https://github.com/geek-fun) 团队用 ❤️ 制作**

[⬆ 回到顶部](#serverlessinsight)

</div>
