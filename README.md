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
- 🌐 **Custom Domain Binding** - Automatic domain binding with DNS verification for OSS and API Gateway
- 💾 **Resource Management** - Manage storage, databases, and other cloud resources
- 🔐 **Security First** - Built-in validation and security best practices
- 📊 **Comprehensive Logging** - Debug and monitor your applications

---

## ☁️ Supported Providers

ServerlessInsight supports the following cloud providers:

| Provider          | Functions        | API Gateway    | Storage        | Databases        | Status  |
| ----------------- | ---------------- | -------------- | -------------- | ---------------- | ------- |
| **Alibaba Cloud** | ✅ FC3           | ✅ API Gateway | ✅ OSS         | ✅ RDS, OTS, ESS | Stable  |
| **Tencent Cloud** | ✅ SCF           | 🚧 Coming Soon | ✅ COS         | ✅ TDSQL-C       | Stable  |
| **Volcengine**    | ✅ veFaaS        | ✅ API Gateway | ✅ TOS         | —                | Stable  |
| **Huawei Cloud**  | ✅ FunctionGraph | 🚧 Coming Soon | 🚧 Coming Soon | 🚧 Coming Soon   | Beta    |
| **AWS**           | 🔜 Planned       | 🔜 Planned     | 🔜 Planned     | 🔜 Planned       | Planned |
| **Azure**         | 🔜 Planned       | 🔜 Planned     | 🔜 Planned     | 🔜 Planned       | Planned |
| **Google Cloud**  | 🔜 Planned       | 🔜 Planned     | 🔜 Planned     | 🔜 Planned       | Planned |

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
si validate -f serverless.yml

# Generate deployment plan (see what will change)
si plan -f serverless.yml

# Deploy your serverless application
si deploy -f serverless.yml -s dev

# Run your application locally for debugging
si local -f serverless.yml -s local

# Show deployed resource information
si show -f serverless.yml

# Destroy the deployed stack
si destroy -f serverless.yml
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
- [Custom Domain Example](./samples/aliyun-poc-domain.yml) - Configure OSS static website with custom domain binding
- [Database Example](./samples/aliyun-poc-rds.yml) - Set up RDS databases
- [Table Store Example](./samples/aliyun-poc-table.yml) - Configure OTS table storage
- [Elasticsearch Example](./samples/aliyun-poc-es.yml) - Deploy Elasticsearch Serverless
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
si local -f serverless.yml -s local

# Run tests
npm test

# Lint code
npm run lint:check
```

### Local Testing with Buckets

When running the local development server, you can test bucket operations by accessing files through the LocalStack server:

```bash
# List all files in a bucket
curl http://localhost:4567/si_buckets/<bucket_key>/

# Access a specific file from a bucket
curl http://localhost:4567/si_buckets/<bucket_key>/path/to/file.html

# List files in a subdirectory
curl http://localhost:4567/si_buckets/<bucket_key>/subdir/
```

The bucket handler serves files from the directory specified in your bucket's `website.code` configuration.

### Architecture

ServerlessInsight follows a **functional client architecture** that cleanly separates cloud provider SDKs from business logic:

#### Layered Design

```
┌─────────────────────────────────────────┐
│   Resource / Planner / Executor Layer   │  ← Provider-agnostic business logic
│   (Pure functions, no SDK imports)       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Functional Client Layer          │  ← Encapsulated SDK operations
│   (aliyunClient.ts, tencentClient.ts)   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Cloud Provider SDKs                 │  ← @alicloud/*, tencentcloud-*
└─────────────────────────────────────────┘
```

#### Key Principles

- **Functional & Pure**: All business logic uses pure functions with immutable data
- **SDK Encapsulation**: Provider SDKs are accessed ONLY through client modules
- **Operation Functions**: Clients expose high-level operation functions (e.g., `createFunction`, `getFunction`)
- **No Classes**: Prefer `type` over `interface`, and functional patterns over classes
- **Minimal Side Effects**: File I/O and other side effects are isolated at boundaries

#### Client Pattern Example

```typescript
// ✅ Client exposes operation functions, not raw SDKs
export type AliyunClient = {
  fc3: {
    createFunction: (config: Fc3FunctionConfig, codeBase64: string) => Promise<void>;
    getFunction: (functionName: string) => Promise<Fc3FunctionInfo | null>;
    // ... other operations
  };
  // ... other services
};

// ✅ Resource layer uses clean client API
const client = createAliyunClient(context);
const codeBase64 = readFileAsBase64(codePath);
await client.fc3.createFunction(config, codeBase64);
```

This architecture enables:

- **Better Testing**: Mock client operations instead of SDKs
- **Maintainability**: Provider changes isolated to client layer
- **Type Safety**: Strong typing throughout the stack
- **Code Reuse**: Shared client operations across resources

---

## 🌐 Custom Domain Binding

ServerlessInsight provides automatic custom domain binding for OSS buckets and API Gateway with built-in DNS verification.

### OSS Custom Domain Binding

When you configure a custom domain for an OSS bucket (static website hosting), ServerlessInsight automatically:

1. **Binds the domain** to your OSS bucket
2. **Creates DNS CNAME records** pointing to the correct OSS endpoint
3. **Handles domain ownership verification** via DNS TXT records when required by the cloud provider
4. **Manages retry logic** with DNS propagation polling for reliable binding

```yaml
buckets:
  my_website:
    name: my-website-bucket
    security:
      acl: PUBLIC_READ
    website:
      code: ./dist
      domain: www.example.com # Custom domain binding
      index: index.html
      error_page: 404.html
```

### Domain Ownership Verification Flow

When binding a custom domain that requires ownership verification:

```
┌─────────────────────────────────────────────────────────────────┐
│                    OSS Custom Domain Binding                     │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │   PutCname (Attempt)   │
                   └───────────────────────┘
                               │
           ┌───────────────────┴───────────────────┐
           │                                       │
           ▼                                       ▼
   ┌───────────────┐                    ┌─────────────────┐
   │   Success     │                    │ NeedVerifyDomain│
   └───────────────┘                    │    Ownership    │
                                        └─────────────────┘
                                                  │
                                                  ▼
                                    ┌─────────────────────────┐
                                    │  CreateCnameToken API   │
                                    │  (Get TXT record value) │
                                    └─────────────────────────┘
                                                  │
                                                  ▼
                                    ┌─────────────────────────┐
                                    │  Check existing TXT     │
                                    │  records (avoid dupes)  │
                                    └─────────────────────────┘
                                                  │
                                                  ▼
                                    ┌─────────────────────────┐
                                    │  Add DNS TXT Record     │
                                    │  (_dnsauth.domain)      │
                                    └─────────────────────────┘
                                                  │
                                                  ▼
                                    ┌─────────────────────────┐
                                    │  Poll DNS Propagation   │
                                    │  (up to 10 × 1 min)     │
                                    └─────────────────────────┘
                                                  │
                                                  ▼
                                    ┌─────────────────────────┐
                                    │  Retry PutCname         │
                                    │  (up to 5 × 30 sec)     │
                                    └─────────────────────────┘
```

### Supported Domain Types

For OSS static website hosting, ServerlessInsight supports:

| Domain Type       | CNAME Target                  | Use Case                                       |
| ----------------- | ----------------------------- | ---------------------------------------------- |
| Root domain (`@`) | `bucket.region.taihangcda.cn` | Bypasses DNS CNAME restriction on root domains |
| Subdomain (`www`) | `bucket.region.taihangcda.cn` | Standard CNAME for all subdomains              |
| Any subdomain     | `bucket.region.taihangcda.cn` | Unified CNAME endpoint for all domain types    |

> 💡 **Note**: All domain types now use the recommended `taihangcda.cn` CNAME endpoint, which is derived automatically from your bucket's actual extranet endpoint via the `GetBucketInfo` API.

For detailed configuration, see [OSS Custom Domain Binding Guide](./docs/oss-custom-domain-binding.md).

---

## 🗄️ State Management

ServerlessInsight uses a state-based deployment model that tracks all deployed resources in a local state file (`.serverlessinsight/state-{app}-{service}.json` in the project directory). This enables:

- **Incremental deployments** - Only changed resources are updated
- **Drift detection** - Identifies differences between local state and cloud resources
- **Safe destruction** - Knows which resources to clean up

### Partial Failure Recovery

When deploying multiple resources, if one fails, ServerlessInsight ensures that:

1. **Successfully deployed resources are always saved to state** - Even if subsequent resources fail, your state file will contain all resources that were successfully created/updated/deleted
2. **Clear error reporting** - You'll see which resources succeeded and which failed
3. **Easy retry** - Simply run `deploy` again to continue from where you left off

Example partial failure output:

```
⚠️  PARTIAL DEPLOYMENT FAILURE: 2 resource(s) succeeded, but functions.api_handler failed.
State has been saved for successfully deployed resources. Run deploy again to retry failed resources.
Next steps: 1) Review the error above, 2) Fix any configuration issues, 3) Run deploy again to continue.
```

### State File Location

The state file is stored as `.serverlessinsight/state-{app}-{service}.json` in your project directory (e.g., `.serverlessinsight/state-myapp-myservice.json`). This file:

- Should be committed to version control for team collaboration
- Contains resource metadata and identifiers
- Is automatically updated after each successful operation

### State Recovery

If you encounter state drift (cloud resources exist that aren't in your state file):

1. **Manual import** - Currently, resources must be manually added to the state file
2. **Clean start** - Delete the state file and resources in the cloud, then redeploy

> 💡 **Tip**: Always backup your state file before making manual modifications.

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

---

<div align="center">

**Made with ❤️ by the [geek-fun](https://github.com/geek-fun) team**

[⬆ Back to Top](#serverlessinsight)

</div>
