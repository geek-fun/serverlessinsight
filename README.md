<div align="center">

# ServerlessInsight

**Full life cycle cross-provider serverless management — describe your app, we handle the rest.**

**Open source. Multi-cloud. Infrastructure as Code.**

[![Release](https://img.shields.io/github/v/release/geek-fun/serverlessinsight?color=orange&label=release&logo=github)](https://github.com/geek-fun/serverlessinsight/releases)
[![npm version](https://img.shields.io/npm/v/@geek-fun/serverlessinsight?color=orange&logo=npm)](https://www.npmjs.com/package/@geek-fun/serverlessinsight)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg&logo=apache)](LICENSE)
[![Stars](https://img.shields.io/github/stars/geek-fun/serverlessinsight&logo=github)](https://github.com/geek-fun/serverlessinsight/stargazers)
[![CI](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml/badge.svg)](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml)

<p>
  <img src="https://img.shields.io/badge/Node.js-339933&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Alibaba%20Cloud-FF6A00&logo=alibabacloud&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tencent%20Cloud-0A9AED&logo=tencentqq&logoColor=white"/>
  <img src="https://img.shields.io/badge/Huawei%20Cloud-FF0000&logo=hauwei&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-232F3E&logo=amazonwebservices&logoColor=white"/>
</p>

[npm i -g @geek-fun/serverlessinsight](https://www.npmjs.com/package/@geek-fun/serverlessinsight) · [Docs](https://serverlessinsight.geekfun.club) · [Website](https://serverlessinsight.geekfun.club) · [GitHub](https://github.com/geek-fun/serverlessinsight)

English · [简体中文](README.zh-CN.md)

</div>

---

ServerlessInsight is a **cross-provider serverless framework** — it replaces cloud-specific CLI tools, web consoles, and DIY scripts with a single unified tool. Define your serverless infrastructure in YAML once, deploy to Alibaba Cloud, Tencent Cloud, Huawei Cloud, and more. Think of it as Terraform for serverless, purpose-built for functions, API gateways, storage, and databases.

<p align="center">
  <img src="https://img.shields.io/badge/Alibaba%20Cloud-FF6A00?logo=alibabacloud&logoColor=white" />
  <img src="https://img.shields.io/badge/Tencent%20Cloud-0A9AED?logo=tencentqq&logoColor=white" />
  <img src="https://img.shields.io/badge/Huawei%20Cloud-FF0000?logo=huawei&logoColor=white" />
  <img src="https://img.shields.io/badge/Volcengine-1677FF?logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?logo=amazonwebservices&logoColor=white" />
  <img src="https://img.shields.io/badge/Azure-0078D4?logo=microsoftazure&logoColor=white" />
  <img src="https://img.shields.io/badge/GCP-4285F4?logo=googlecloud&logoColor=white" />
</p>

## Installation

<a href="https://www.npmjs.com/package/@geek-fun/serverlessinsight">
  <img src="https://img.shields.io/badge/npm_install-g_--g_@geek--fun/serverlessinsight-CB3837&logo=npm&logoColor=white" alt="npm install">
</a>
&nbsp;
<a href="https://github.com/geek-fun/serverlessinsight/releases">
  <img src="https://img.shields.io/badge/Releases-GitHub-lightgrey&logo=github" alt="Releases">
</a>
&nbsp;
<a href="https://serverlessinsight.geekfun.club">
  <img src="https://img.shields.io/badge/Docs-serverlessinsight.geekfun.club-blue&logo=gitbook&logoColor=white" alt="Docs">
</a>

```bash
npm install -g @geek-fun/serverlessinsight
si --version
```

## Key Features

### Multi-Cloud, One Config

Define your infrastructure once in YAML and deploy across Alibaba Cloud, Tencent Cloud, Huawei Cloud, and Volcengine — with AWS, Azure, and GCP on the roadmap. No more juggling cloud-specific CLIs or Terraform modules for every provider.

- **Unified configuration** — single `serverless.yml` format for all providers
- **Provider-specific template generation** — generate native IaC templates from your config
- **Cross-provider awareness** — the same abstractions work across different clouds

| Provider          | Functions        | API Gateway    | Storage        | Databases        | Status  |
| ----------------- | ---------------- | -------------- | -------------- | ---------------- | ------- |
| **Alibaba Cloud** | ✅ FC3           | ✅ API Gateway | ✅ OSS         | ✅ RDS, OTS, ESS | Stable  |
| **Tencent Cloud** | ✅ SCF           | 🚧 Coming Soon | ✅ COS         | ✅ TDSQL-C       | Stable  |
| **Volcengine**    | ✅ veFaaS        | ✅ API Gateway | ✅ TOS         | —                | Stable  |
| **Huawei Cloud**  | ✅ FunctionGraph | 🚧 Coming Soon | 🚧 Coming Soon | 🚧 Coming Soon   | Beta    |
| **AWS**           | 🔜 Planned       | 🔜 Planned     | 🔜 Planned     | 🔜 Planned       | Planned |
| **Azure**         | 🔜 Planned       | 🔜 Planned     | 🔜 Planned     | 🔜 Planned       | Planned |
| **Google Cloud**  | 🔜 Planned       | 🔜 Planned     | 🔜 Planned     | 🔜 Planned       | Planned |

### Infrastructure as Code

Declarative YAML configuration with validation, planning, and state management — following proven IaC patterns.

- **Plan before deploy** — `si plan` shows exactly what will change before anything happens
- **State tracking** — incremental deployments with drift detection via local state files
- **Validation** — type-safe template validation catches config errors before they reach the cloud
- **Partial failure recovery** — successfully deployed resources are saved even when others fail; retry to continue

### Quick Deployment

```bash
# Validate your config
si validate -f serverless.yml

# Preview changes
si plan -f serverless.yml

# Deploy to production
si deploy -f serverless.yml -s prod

# Destroy when done
si destroy -f serverless.yml
```

### Local Development

Run and debug your serverless functions locally without deploying to the cloud.

- **LocalStack server** — test functions, buckets, and API endpoints locally
- **Bucket file serving** — access local storage files via HTTP for rapid iteration
- **Same config, different target** — `si local -f serverless.yml -s local` uses your existing config

### API Gateway & Custom Domain

Configure HTTP endpoints and bind custom domains with automatic DNS verification.

- **API Gateway integration** — define triggers with HTTP methods and paths
- **Custom domain binding** — automatic CNAME + DNS TXT ownership verification for OSS and API Gateway
- **CDN acceleration** — edge caching and global content delivery for static sites
- **OSS Transfer Acceleration** — cross-region data transfers through Alibaba backbone

### Resource Management

Beyond functions — manage the full serverless stack including storage, databases, and more.

- **Object storage** — OSS (Alibaba), COS (Tencent), TOS (Volcengine)
- **Databases** — RDS, OTS, ESS, TDSQL-C with more on the way
- **Elasticsearch Serverless** — deploy and manage ES clusters
- **GPU functions** — deploy GPU-enabled serverless functions

### Architecture

ServerlessInsight follows a **functional client architecture** that cleanly separates cloud provider SDKs from business logic:

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

- **Functional & pure** — business logic uses pure functions with immutable data
- **SDK encapsulation** — provider SDKs accessed ONLY through client modules
- **No classes** — prefer `type` over `interface`, functional patterns over classes

## Development

ServerlessInsight is built with [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/), [Commander.js](https://github.com/tj/commander.js/) CLI, and pure functional architecture.

### Prerequisites

- **Node.js** >= 16

### Quick Start

```bash
git clone https://github.com/geek-fun/serverlessinsight.git
cd serverlessinsight
npm install
npm run build
npm link
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | TypeScript compilation |
| `npm test` | Run all tests with coverage |
| `npm run test:unit` | Unit tests only |
| `npm run test:service` | Service tests only |
| `npm run lint:check` | ESLint check |
| `npm run lint:fix` | Auto-fix lint issues |

### Sample Config

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

events:
  api_gateway:
    type: API_GATEWAY
    name: my-api-gateway
    triggers:
      - method: GET
        path: /api/hello
        backend: ${functions.hello_function}
```

More in the [samples](./samples) directory.

## Community

<p align="center">
  <a href="https://github.com/geek-fun/serverlessinsight/discussions"><img src="https://img.shields.io/badge/GitHub_Discussions-Join-181717&logo=github&logoColor=white" alt="GitHub Discussions" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/geek-fun/serverlessinsight/issues"><img src="https://img.shields.io/badge/GitHub_Issues-Report-181717&logo=github&logoColor=white" alt="GitHub Issues" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/geek-fun"><img src="https://img.shields.io/badge/GitHub-Follow-181717&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

## Contributing

Contributions welcome! Open an issue or pull request. See the [AGENTS.md](AGENTS.md) for coding conventions.

## Sponsor

<p align="center">
  <a href="https://github.com/sponsors/geek-fun"><img src="https://img.shields.io/badge/GitHub_Sponsors-%E2%9D%A4_Support-EA4AAA&logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" /></a>
</p>

## Star History

<a href="https://www.star-history.com/?repos=geek-fun/serverlessinsight&type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=geek-fun/serverlessinsight&type=date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=geek-fun/serverlessinsight&type=date" />
    <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=geek-fun/serverlessinsight&type=date" />
  </picture>
</a>

## License

[Apache 2.0](LICENSE) © GEEKFUN
