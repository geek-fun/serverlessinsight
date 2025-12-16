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

## 📖 目录

- [特性](#特性)
- [支持的云服务商](#支持的云服务商)
- [快速开始](#快速开始)
  - [前置要求](#前置要求)
  - [安装](#安装)
- [使用方法](#使用方法)
  - [基础命令](#基础命令)
  - [命令参考](#命令参考)
- [示例](#示例)
- [本地开发](#本地开发)
  - [本地运行](#本地运行)
  - [从源码构建](#从源码构建)
  - [运行测试](#运行测试)
- [文档](#文档)
- [贡献](#贡献)
- [社区](#社区)
- [许可证](#许可证)

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

| 云服务商 | 函数 | API 网关 | 存储 | 数据库 | 状态 |
|----------|------|----------|------|--------|------|
| **阿里云** | ✅ FC3 | ✅ API 网关 | ✅ OSS | ✅ RDS, OTS, ESS | 稳定 |
| **华为云** | ✅ FunctionGraph | 🚧 即将推出 | 🚧 即将推出 | 🚧 即将推出 | 测试版 |
| **AWS** | 🔜 计划中 | 🔜 计划中 | 🔜 计划中 | 🔜 计划中 | 计划中 |
| **Azure** | 🔜 计划中 | 🔜 计划中 | 🔜 计划中 | 🔜 计划中 | 计划中 |
| **Google Cloud** | 🔜 计划中 | 🔜 计划中 | 🔜 计划中 | 🔜 计划中 | 计划中 |
| **腾讯云** | 🔜 计划中 | 🔜 计划中 | 🔜 计划中 | 🔜 计划中 | 计划中 |

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

### 基础命令

```bash
# 显示帮助信息
si --help

# 验证您的 Serverless 配置
si validate <stackName> -f serverless.yml

# 部署您的 Serverless 应用
si deploy <stackName> -f serverless.yml -s dev

# 生成特定云服务商的模板
si template <stackName> -f serverless.yml -t JSON

# 本地运行您的应用进行调试
si local <stackName> -f serverless.yml -p 3000

# 销毁已部署的堆栈
si destroy <stackName> -f serverless.yml
```

### 命令参考

#### `validate`

验证您的 Serverless IaC 配置：

```bash
si validate <stackName> [选项]

选项：
  -f, --file <path>     指定 YAML 文件路径
  -s, --stage <stage>   指定部署阶段
```

#### `deploy`

部署您的 Serverless 应用：

```bash
si deploy <stackName> [选项]

选项：
  -f, --file <path>              指定 YAML 文件路径
  -s, --stage <stage>            指定部署阶段
  -r, --region <region>          指定云区域
  -v, --provider <provider>      指定云服务商
  -k, --accessKeyId <key>        指定 AccessKeyId
  -x, --accessKeySecret <secret> 指定 AccessKeySecret
  -n, --securityToken <token>    指定 SecurityToken
  -p, --parameter <key=value>    覆盖参数（可重复）
```

#### `template`

生成特定平台的 IaC 模板：

```bash
si template <stackName> [选项]

选项：
  -f, --file <path>     指定 YAML 文件路径
  -s, --stage <stage>   指定部署阶段
  -t, --format <type>   输出格式（JSON 或 YAML），默认：JSON
```

#### `local`

本地运行您的 Serverless 应用：

```bash
si local <stackName> [选项]

选项：
  -f, --file <path>     指定 YAML 文件路径
  -s, --stage <stage>   指定部署阶段（默认："default"）
  -p, --port <port>     指定端口（默认：3000）
  -d, --debug           启用调试模式
  -w, --watch           启用文件监视（默认：true）
```

#### `destroy`

删除已部署的 Serverless 堆栈：

```bash
si destroy <stackName> [选项]

选项：
  -f, --file <path>              指定 YAML 文件路径
  -r, --region <region>          指定云区域
  -v, --provider <provider>      指定云服务商
  -k, --accessKeyId <key>        指定 AccessKeyId
  -x, --accessKeySecret <secret> 指定 AccessKeySecret
  -n, --securityToken <token>    指定 SecurityToken
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

### 本地运行

在不部署的情况下本地测试您的 Serverless 函数：

```bash
# 启动本地开发服务器
si local my-stack -f serverless.yml --stage local

# 您的函数将可通过以下地址访问：
# http://localhost:3000/si_<event-type>/<id>-<name>-<region>/<path>
```

本地服务器支持：
- 文件更改时热重载
- 详细日志的调试模式
- 模拟云服务商环境
- HTTP 触发器测试

### 从源码构建

克隆仓库并在本地构建：

```bash
# 克隆仓库
git clone https://github.com/geek-fun/serverlessinsight.git
cd serverlessinsight

# 安装依赖
npm install

# 构建项目
npm run build

# 全局链接用于开发
npm link

# 验证安装
si --version
```

### 运行测试

```bash
# 运行所有测试并生成覆盖率报告
npm test

# 以 CI 模式运行测试
npm run test:ci

# 检查代码规范
npm run lint:check

# 修复代码规范问题
npm run lint:fix
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

## 🤝 贡献

我们欢迎社区的贡献！以下是您可以帮助的方式：

1. **Fork 仓库**
2. **创建功能分支** (`git checkout -b feature/amazing-feature`)
3. **提交您的更改** (`git commit -m 'Add amazing feature'`)
4. **推送到分支** (`git push origin feature/amazing-feature`)
5. **打开 Pull Request**

### 开发设置

1. Fork 并克隆仓库
2. 安装依赖：`npm install`
3. 为您的更改创建分支
4. 进行更改并添加测试
5. 运行测试：`npm test`
6. 提交 pull request

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
