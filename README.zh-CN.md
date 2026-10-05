<div align="center">

# ServerlessInsight

**全生命周期跨云服务商的 Serverless 管理 —— 描述你的应用，其余交给我们。**

**开源。多云。基础设施即代码。**

**面向阿里云 · 腾讯云 · 华为云 · 火山引擎的 Serverless 命令行工具。**

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
  <img src="https://img.shields.io/badge/Huawei%20Cloud-FF0000?logo=huawei&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-232F3E&logo=amazonwebservices&logoColor=white"/>
</p>

[npm](https://www.npmjs.com/package/@geek-fun/serverlessinsight) · [文档](https://serverlessinsight.geekfun.club) · [官网](https://serverlessinsight.geekfun.club) · [GitHub](https://github.com/geek-fun/serverlessinsight)

简体中文 · [English](README.md)

</div>

---

ServerlessInsight 是一个**跨云服务商的 Serverless 框架**——它用统一的单一工具替代各家云厂商专属的 CLI、Web 控制台和 DIY 脚本。用 YAML 定义一次你的 Serverless 基础设施，即可部署到阿里云、腾讯云、华为云等。可将其视为面向 Serverless 的 Terraform，专为函数、API 网关、存储和数据库而打造。

<p align="center">
  <img src="https://img.shields.io/badge/Alibaba%20Cloud-FF6A00?logo=alibabacloud&logoColor=white" />
  <img src="https://img.shields.io/badge/Tencent%20Cloud-0A9AED?logo=tencentqq&logoColor=white" />
  <img src="https://img.shields.io/badge/Huawei%20Cloud-FF0000?logo=huawei&logoColor=white" />
  <img src="https://img.shields.io/badge/Volcengine-1677FF?logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?logo=amazonwebservices&logoColor=white" />
  <img src="https://img.shields.io/badge/Azure-0078D4?logo=microsoftazure&logoColor=white" />
  <img src="https://img.shields.io/badge/GCP-4285F4?logo=googlecloud&logoColor=white" />
</p>

## 安装

```bash
npm install -g @geek-fun/serverlessinsight
si --version
```

## 核心特性

### 多云支持，统一配置

使用 YAML 一次性定义你的基础设施，即可部署到阿里云、腾讯云、华为云和火山引擎——AWS、Azure 和 GCP 已在路线图中。不再需要为每个云厂商疲于应付专属 CLI 或 Terraform 模块。

- **统一配置** —— 所有云服务商共用单一 `serverless.yml` 格式
- **云厂商专属模板生成** —— 根据配置生成原生 IaC 模板
- **跨云感知** —— 同一套抽象可在不同云之间通用

| 云服务商         | 函数             | API 网关    | 存储        | 数据库           | 状态   |
| ---------------- | ---------------- | ----------- | ----------- | ---------------- | ------ |
| **阿里云**       | ✅ FC3           | ✅ API 网关 | ✅ OSS      | ✅ RDS, OTS, ESS | 稳定   |
| **腾讯云**       | ✅ SCF           | 🚧 即将推出 | ✅ COS      | ✅ TDSQL-C       | 稳定   |
| **火山引擎**     | ✅ veFaaS        | ✅ API 网关 | ✅ TOS      | —                | 稳定   |
| **华为云**       | 🚧 即将推出      | 🚧 即将推出 | 🚧 即将推出 | 🚧 即将推出      | 计划中 |
| **AWS**          | 🔜 计划中        | 🔜 计划中   | 🔜 计划中   | 🔜 计划中        | 计划中 |
| **Azure**        | 🔜 计划中        | 🔜 计划中   | 🔜 计划中   | 🔜 计划中        | 计划中 |
| **Google Cloud** | 🔜 计划中        | 🔜 计划中   | 🔜 计划中   | 🔜 计划中        | 计划中 |

### 基础设施即代码

声明式 YAML 配置，内置校验、计划与状态管理——遵循成熟的 IaC 实践。

- **部署前预览** —— `si plan` 在实际变更前精确展示将要发生的改动
- **状态追踪** —— 基于本地状态文件的增量部署与漂移检测
- **配置校验** —— 类型安全的模板校验在配置触达云端前捕获错误
- **部分失败恢复** —— 即使部分资源失败，已成功部署的资源仍会被保存；重试即可继续

### 快速部署

```bash
# 校验你的配置
si validate -f serverless.yml

# 预览变更
si plan -f serverless.yml

# 部署到生产环境
si deploy -f serverless.yml -s prod

# 完成后销毁
si destroy -f serverless.yml
```

### 在 AI agent 与脚本中使用 si

CLI 专为 agent 与脚本驱动而设计：日志始终输出到 **stderr**，结果数据输出到
**stdout**，因此将 stdout 管道给 `jq` 总能得到单个可解析的 JSON 文档。

```bash
si plan --json -f serverless.yml | jq '.summary'
si validate --json -f serverless.yml | jq '.valid'
si show --json -f serverless.yml | jq '.resourceCount'
si schema | jq '.$id'   # IaC 格式的自包含 draft-07 JSON Schema
```

**稳定的输出 envelope**（每个都带版本号字段，结构只会在新版本号下变化）：

- `si plan --json` → `{ planVersion: 1, provider, app, service, stage,
  changes: [{ logicalId, type, action: "create|update|destroy|recreate",
  attributes, drifted?, driftReasons? }], summary: { create, update, destroy,
  recreate, unchanged } }`
- `si validate --json` → `{ validateVersion: 1, valid, errors: [{ path,
  keyword, message, allowedValues? }] }`
- `si show --json` → `{ showVersion: 1, provider, app, service, stage,
  stateLocation, backend: "saas|bucket_store|local", locked, lock, resources,
  resourceCount, ... }`
- 失败时（`--json` 模式）→ stdout 输出 `{ error: { code, message } }`

**退出码**：`si plan` 无变更时退出 `0`，有变更时退出 `2`（terraform
惯例），出错时退出 `1`。`si validate` 校验通过退出 `0`，校验失败退出 `1`。

**稳定错误码**：错误 `code` 是翻译消息背后的 i18n key（例如
`RAM_ROLE_NOT_FOUND_IN_CLOUD`）——在所有语言环境下保持一致，agent
可以据此映射自愈动作，不受 `LANG` 影响。

**颜色**：设置 `NO_COLOR` 环境变量（[no-color.org](https://no-color.org)）或传入
`--no-color` 时禁用 ANSI 颜色，保证非 TTY 环境下管道输出干净。

### 本地开发

无需部署到云端，即可本地运行和调试你的 Serverless 函数。

- **LocalStack 服务** —— 在本地测试函数、存储桶和 API 端点
- **存储桶文件服务** —— 通过 HTTP 访问本地存储文件，加速迭代
- **同一配置，不同目标** —— `si local -f serverless.yml -s local` 复用你现有的配置

### API 网关与自定义域名

配置 HTTP 端点并绑定自定义域名，附带自动 DNS 验证。

- **API 网关集成** —— 使用 HTTP 方法和路径定义触发器
- **自定义域名绑定** —— 为 OSS 和 API 网关自动完成 CNAME + DNS TXT 所有权验证
- **CDN 加速** —— 为静态站点提供边缘缓存与全球内容分发
- **OSS 传输加速** —— 通过阿里云骨干网进行跨区域数据传输

### 定时触发器

在 `functions.*.triggers.timer` 下使用 provider 无关的 `si-cron` 表达式调度函数：

```yaml
functions:
  my_fn:
    triggers:
      timer:
        - name: billing-run            # 必填 —— 漂移检测按 name 定位
          cron: '0 23 3 * * *'         # 必填 —— si-cron，按 UTC 解释
          payload: '{"job":"billing-run"}'  # 可选，原样透传
          enable: true                 # 可选，默认 true
          description: 每日出账       # 可选
        - name: report-hourly
          cron: '@every 1h'
```

`cron` 支持标准 5 段表达式（`分 时 日 月 周`）、带秒前缀的 6 段，或
`@every <时长>`（`30s`、`5m`、`1h`、`1d` 等）。si-cron 一律按 **UTC** 解释——
合成层负责翻译成各家方言（阿里云 FC3 六段、腾讯云 SCF 含年的七段、火山引擎
veFaaS 五段 crontab），并完成 UTC+8 字段平移，因此同一份 YAML 在所有云平台
触发时刻一致。非法表达式与平台能力上限（腾讯云 SCF 单函数最多 10 个定时触发器）
在 `si validate` 阶段即报错，不会进入部署。

**`functions.*.triggers` 与顶层 `events` 的区分**：`triggers`（http、timer）
是「调用本函数的东西」——函数级归属、随函数级联删除、没有独立配置面。顶层
`events`（如 `API_GATEWAY`）是拥有独立配置面的基础设施资源——自定义域名、
证书、路由表——删除后端函数后它们依然存在。经验法则：有独立配置面 →
`events`；纯调度/事件绑定 → `triggers`。

### 资源管理

不止于函数——管理包含存储、数据库等在内的完整 Serverless 技术栈。

- **对象存储** —— OSS（阿里云）、COS（腾讯云）、TOS（火山引擎）
- **数据库** —— RDS、OTS、ESS、TDSQL-C，更多陆续支持
- **Elasticsearch Serverless** —— 部署并管理 ES 集群
- **GPU 函数** —— 部署支持 GPU 的 Serverless 函数

### 架构

ServerlessInsight 采用**函数式客户端架构**，将云厂商 SDK 与业务逻辑清晰分离：

```
┌─────────────────────────────────────────┐
│   Resource / Planner / Executor Layer   │  ← 与云厂商无关的业务逻辑
│   (纯函数，不引入 SDK)                    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Functional Client Layer          │  ← 封装的 SDK 操作
│   (aliyunClient.ts, tencentClient.ts)   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Cloud Provider SDKs                 │  ← @alicloud/*, tencentcloud-*
└─────────────────────────────────────────┘
```

- **函数式且纯粹** —— 业务逻辑使用不可变数据的纯函数
- **SDK 封装** —— 云厂商 SDK 仅能通过客户端模块访问
- **无类** —— 优先使用 `type` 而非 `interface`，优先采用函数式模式而非类

## 开发

ServerlessInsight 基于 [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)、[Commander.js](https://github.com/tj/commander.js/) CLI 构建，采用纯函数式架构。

### 前置要求

- **Node.js** >= 16

### 快速开始

```bash
git clone https://github.com/geek-fun/serverlessinsight.git
cd serverlessinsight
npm install
npm run build
npm link
```

### 脚本

| 命令               | 说明                 |
| ------------------ | -------------------- |
| `npm run build`    | TypeScript 编译      |
| `npm test`         | 运行全部测试（含覆盖率） |
| `npm run test:unit`    | 仅单元测试        |
| `npm run test:service` | 仅服务测试        |
| `npm run lint:check`  | ESLint 检查        |
| `npm run lint:fix`    | 自动修复 lint 问题  |

### 示例配置

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

更多示例见 [samples](./samples) 目录。

## 社区

<p align="center">
  <img src="https://www.geekfun.club/wechat-group.jpg" width="140" alt="WeChat Group">
</p>

<p align="center">
  <a href="https://discord.gg/5NSUyPK2E"><img src="https://img.shields.io/badge/Discord-加入-5865F2?logo=discord&logoColor=white" alt="Discord" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://x.com/geekfun_club"><img src="https://img.shields.io/badge/X-关注-000000?logo=x&logoColor=white" alt="X / Twitter" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.youtube.com/@geekfun-club"><img src="https://img.shields.io/badge/YouTube-订阅-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/geek-fun"><img src="https://img.shields.io/badge/GitHub-关注-181717?logo=github&logoColor=white" alt="GitHub" /></a>
</p>

## 贡献

欢迎贡献！提交 Issue 或 Pull Request 即可。编码规范请参见 [AGENTS.md](AGENTS.md)。

## 赞助

<p align="center">
  <a href="https://github.com/sponsors/geek-fun"><img src="https://img.shields.io/badge/GitHub_Sponsors-%E2%9D%A4_支持-EA4AAA?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" /></a>
</p>

## Star 历史

<a href="https://www.star-history.com/?repos=geek-fun/serverlessinsight&type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=geek-fun/serverlessinsight&type=date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=geek-fun/serverlessinsight&type=date" />
    <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=geek-fun/serverlessinsight&type=date" />
  </picture>
</a>

## 许可证

[Apache 2.0](LICENSE) © GEEKFUN
