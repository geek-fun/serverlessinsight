# ServerlessInsight

<div align="center">

[![Node.js CI](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml/badge.svg)](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml)
[![release](https://github.com/geek-fun/serverlessinsight/actions/workflows/release.yml/badge.svg)](https://github.com/geek-fun/serverlessinsight/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/@geek-fun%2Fserverlessinsight.svg)](https://badge.fury.io/js/@geek-fun%2Fserverlessinsight)
[![Known Vulnerabilities](https://snyk.io/test/github/geek-fun/serverlessinsight/badge.svg)](https://snyk.io/test/github/geek-fun/serverlessinsight)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![codecov](https://codecov.io/gh/geek-fun/serverlessinsight/graph/badge.svg?token=ISW7MFuSlf)](https://codecov.io/gh/geek-fun/serverlessinsight)

**Full life cycle cross-provider serverless application management for your fast-growing business**

[Website](https://serverlessinsight.geekfun.club) • [Documentation](https://serverlessinsight.geekfun.club) • [Examples](./samples) • [中文文档](./README.zh-CN.md)

</div>

---

ServerlessInsight is a powerful serverless framework for managing serverless applications across multiple cloud providers. It provides a unified interface to deploy, manage, and debug serverless functions and resources using Infrastructure as Code (IaC) principles.

Whether you're building on AWS, Alibaba Cloud, Huawei Cloud, or other providers, ServerlessInsight simplifies your development workflow with:

- **Multi-cloud support** - Work with multiple cloud providers using a single tool
- **Infrastructure as Code** - Define your serverless infrastructure in YAML
- **Local development** - Test your functions locally before deploying
- **Type-safe templates** - Validate your configurations before deployment

---

## ✨ Features

- 🌍 **Multi-Cloud Provider Support** - Deploy to Alibaba Cloud, Huawei Cloud, and more
- 📦 **Unified Configuration** - Single YAML format for all providers
- 🚀 **Quick Deployment** - Deploy serverless applications with a single command
- 🔍 **Template Validation** - Validate your IaC templates before deployment
- 🏠 **Local Testing** - Run and debug serverless functions locally
- 🔄 **Template Generation** - Generate provider-specific IaC templates
- 🌐 **API Gateway Integration** - Configure HTTP endpoints for your functions
- 💾 **Resource Management** - Manage storage, databases, and other cloud resources
- 🔐 **Security First** - Built-in validation and security best practices
- 📊 **Comprehensive Logging** - Debug and monitor your applications

---

## ☁️ Supported Providers

ServerlessInsight supports the following cloud providers:

| Provider | Functions | API Gateway | Storage | Databases | Status |
|----------|-----------|-------------|---------|-----------|--------|
| **Alibaba Cloud** | ✅ FC3 | ✅ API Gateway | ✅ OSS | ✅ RDS, OTS, ESS | Stable |
| **Huawei Cloud** | ✅ FunctionGraph | 🚧 Coming Soon | 🚧 Coming Soon | 🚧 Coming Soon | Beta |
| **AWS** | 🔜 Planned | 🔜 Planned | 🔜 Planned | 🔜 Planned | Planned |
| **Azure** | 🔜 Planned | 🔜 Planned | 🔜 Planned | 🔜 Planned | Planned |
| **Google Cloud** | 🔜 Planned | 🔜 Planned | 🔜 Planned | 🔜 Planned | Planned |
| **Tencent Cloud** | 🔜 Planned | 🔜 Planned | 🔜 Planned | 🔜 Planned | Planned |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- Cloud provider credentials (Alibaba Cloud AccessKey, Huawei Cloud credentials, etc.)

### Installation

Install ServerlessInsight globally using npm:

```bash
npm install -g @geek-fun/serverlessinsight
```

Verify the installation:

```bash
si --version
```

---

## 📚 Usage

```bash
# Validate your serverless configuration
si validate <stackName> -f serverless.yml

# Deploy your serverless application
si deploy <stackName> -f serverless.yml -s dev

# Run your application locally for debugging
si local <stackName> -f serverless.yml -s local

# Generate provider-specific template
si template <stackName> -f serverless.yml -t JSON

# Destroy the deployed stack
si destroy <stackName> -f serverless.yml
```

---

## 💡 Examples

ServerlessInsight uses a simple YAML format to define your serverless infrastructure:

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

For more examples, check out the [samples](./samples) directory:

- [API Gateway Example](./samples/aliyun-poc-api.yml) - Deploy functions with HTTP endpoints
- [Storage Example](./samples/aliyun-poc-bucket.yml) - Configure OSS buckets
- [Database Example](./samples/aliyun-poc-rds.yml) - Set up RDS databases
- [Table Store Example](./samples/aliyun-poc-table.yml) - Configure OTS table storage
- [Elasticsearch Example](./samples/aliyun-poc-es.yml) - Deploy Elasticsearch Serverless
- [Custom Domain Example](./samples/aliyun-poc-domain.yml) - Configure custom domains
- [GPU Functions Example](./samples/aliyun-poc-fc-gpu.yml) - Deploy GPU-enabled functions
- [Huawei Cloud Example](./samples/huawei-poc-fc.yml) - Deploy to Huawei Cloud FunctionGraph

---

## 🔧 Local Development

```bash
# Clone and setup
git clone https://github.com/geek-fun/serverlessinsight.git
cd serverlessinsight
npm install

# Build and link for development
npm run build
npm link

# Run local development server
si local my-stack -f serverless.yml -s local

# Run tests
npm test

# Lint code
npm run lint:check
```

---

## 📘 Documentation

For comprehensive documentation, visit [serverlessinsight.geekfun.club](https://serverlessinsight.geekfun.club)

Additional resources:
- [Quick Start Guide](https://serverlessinsight.geekfun.club)
- [Configuration Reference](https://serverlessinsight.geekfun.club)
- [API Documentation](https://serverlessinsight.geekfun.club)
- [Best Practices](https://serverlessinsight.geekfun.club)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 👥 Community

Join our community to get help, share ideas, and contribute:

- **GitHub Issues** - [Report bugs or request features](https://github.com/geek-fun/serverlessinsight/issues)
- **Website** - [serverlessinsight.geekfun.club](https://serverlessinsight.geekfun.club)

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

ServerlessInsight is built with these amazing technologies:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Commander.js](https://github.com/tj/commander.js/) - CLI framework
- [Alibaba Cloud ROS CDK](https://github.com/aliyun/Resource-Orchestration-Service-Cloud-Development-Kit) - Cloud infrastructure SDK

---

<div align="center">

**Made with ❤️ by the [geek-fun](https://github.com/geek-fun) team**

[⬆ Back to Top](#serverlessinsight)

</div>
