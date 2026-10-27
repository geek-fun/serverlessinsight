<div align="center">

<img src="docs/brand/brand.jpg" alt="ServerlessInsight" width="420" />

# ServerlessInsight

**Full-lifecycle serverless IaC for Alibaba Cloud, Tencent Cloud and Volcengine.**

Define functions, API gateways, storage and databases in one YAML — preview the plan, deploy with confidence, and operate it in production.

[![Release](https://img.shields.io/github/v/release/geek-fun/serverlessinsight?color=orange&label=release&logo=github)](https://github.com/geek-fun/serverlessinsight/releases)
[![npm version](https://img.shields.io/npm/v/@geek-fun/serverlessinsight?color=orange&logo=npm)](https://www.npmjs.com/package/@geek-fun/serverlessinsight)
[![npm downloads](https://img.shields.io/npm/dm/@geek-fun/serverlessinsight?color=orange&logo=npm)](https://www.npmjs.com/package/@geek-fun/serverlessinsight)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?logo=apache)](LICENSE)
[![CI](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml/badge.svg)](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml)
[![Stars](https://img.shields.io/github/stars/geek-fun/serverlessinsight?logo=github)](https://github.com/geek-fun/serverlessinsight/stargazers)
[![Issues](https://img.shields.io/github/issues/geek-fun/serverlessinsight?logo=github)](https://github.com/geek-fun/serverlessinsight/issues)

<p>
  <img src="https://img.shields.io/badge/Node.js-%3E%3D22.12-339933?logo=nodedotjs&logoColor=white" alt="Node.js >= 22.12" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

<p>
  <img src="https://img.shields.io/badge/Alibaba%20Cloud-FF6A00?logo=alibabacloud&logoColor=white" alt="Alibaba Cloud" />
  <img src="https://img.shields.io/badge/Tencent%20Cloud-0A9AED?logo=tencentqq&logoColor=white" alt="Tencent Cloud" />
  <img src="https://img.shields.io/badge/Volcengine-1677FF?logoColor=white" alt="Volcengine" />
</p>

[npm](https://www.npmjs.com/package/@geek-fun/serverlessinsight) · [Documentation](https://serverlessinsight.com/docs.html) · [Website](https://serverlessinsight.com) · [Samples](samples) · [Changelog](CHANGELOG.md) · [Issues](https://github.com/geek-fun/serverlessinsight/issues)

English · [简体中文](README.zh-CN.md)

</div>

---

ServerlessInsight (`si`) is an open-source, cross-cloud serverless framework. Instead of juggling provider-specific CLIs, console clicks and one-off scripts, you describe the whole serverless stack — functions, HTTP endpoints, object storage, databases and tables — in a single YAML file, then let `si` plan, deploy and operate it.

Think Terraform for serverless: one declarative workflow with state tracking and drift detection, built around functions, API gateways and serverless data services. No vendor lock-in, Apache-2.0 licensed.

**Deployable today:** Alibaba Cloud, Tencent Cloud and Volcengine. Huawei Cloud, AWS, Azure and Google Cloud are on the [roadmap](#roadmap).

## Table of contents

- [Quick start](#quick-start)
- [Why ServerlessInsight](#why-serverlessinsight)
- [Features](#features)
- [Supported providers](#supported-providers)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Architecture](#architecture)
- [Development](#development)
- [Community](#community)
- [Contributing](#contributing)
- [Sponsor](#sponsor)
- [License](#license)

## Quick start

**Requires Node.js 22.12 or later.**

```bash
npm install -g @geek-fun/serverlessinsight
si --version
```

Create `serverlessinsight.yml`:

```yaml
version: 0.0.1

provider:
  name: aliyun
  region: cn-hongkong

app: hello-world
service: hello-world-api

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

Then:

```bash
si validate                 # check the config against the IaC schema
si diff                     # show what would change, without saving state
si deploy --stage prod      # show the plan, confirm, and apply
si local                    # run the app locally on http://localhost:4567
si destroy --stage prod     # remove everything si created
```

`si` discovers `serverlessinsight.yml` in the current directory; pass `-f <path>` for a different file name. To target another cloud, change `provider.name` to `tencent` or `volcengine` — runtimes, triggers and resources are mapped to native services per provider.

## Why ServerlessInsight

- **Serverless-native, not generic IaC.** Functions, triggers, API gateways, domains, buckets, databases and tables are first-class resources with provider-aware defaults — no hand-written Terraform modules or SDK wrapper scripts.
- **One YAML across clouds.** The same primitives and stage/variable system apply to every supported provider, so switching clouds is a `provider.name` change, not a rewrite.
- **Plan before anything happens.** `si diff` reads state and live resources without writing anything; `si deploy` executes exactly the plan you approved, and manual console changes surface as drift.
- **Built for automation.** Logs go to stderr and machine-readable results to stdout, every JSON envelope is versioned, error codes are stable across locales, and exit codes follow Terraform conventions.
- **Real local development.** Run your handlers, HTTP routes, timer schedules and bucket endpoints locally with the same configuration — no cloud account or credentials needed.
- **Open source, no lock-in.** Apache-2.0, state in a local file or your own bucket, and no proprietary runtime to adopt.

## Features

### Multi-cloud, one config

Define infrastructure once and deploy across Alibaba Cloud, Tencent Cloud and Volcengine. Provider differences — runtime identifiers, cron dialects, gateway resources, ownership tags — are resolved by the framework, not by your YAML.

- **Unified configuration** — one `serverlessinsight.yml` format for every provider
- **Provider-specific mapping** — runtime names, trigger shapes and resource types are translated to native values
- **Cross-provider awareness** — the same functions, buckets, databases and events work across clouds

### Plan before deploy

`si diff` previews every change on Alibaba Cloud, Tencent Cloud and Volcengine. It reads the configured state backend and live cloud resources without applying changes or saving state.

```bash
si diff --stage dev
si diff --stage dev --json
si diff --stage dev --region cn-beijing -p memory=1024
si diff --stage dev --no-refresh
```

Use `-p, --parameter <key=value>` repeatedly to override configuration variables. `--no-refresh` skips live drift checks for tracked resources; ownership probes for new resources still run. Credentials and the selected state backend must be configured. Read failures exit with an error. Migrated legacy state produces a warning and remains unchanged.

Volcengine plans include functions, TOS buckets and API Gateway resources in dependency order.

**Exit codes**: `si diff` exits `0` when there are no changes, `2` when changes are present (Terraform convention), and `1` on errors. `si validate` exits `0` when valid and `1` when validation fails.

### Infrastructure as code

Declarative YAML with validation, planning and state management, following proven IaC patterns.

- **State tracking** — incremental deployments from `.serverlessinsight/` state, with local, bucket and SaaS backends
- **Drift detection** — resources changed outside `si` are flagged before the next deploy
- **Validation** — type-safe template validation catches config errors before they reach the cloud
- **Partial failure recovery** — successfully deployed resources are saved even when others fail; retry to continue
- **State locking** — concurrent deploys are blocked, with `si force-unlock` as the escape hatch

### Built for agents and scripts

The CLI is designed to be driven by agents and shell scripts: logs always go to **stderr** while result data goes to **stdout**, so piping stdout into `jq` always yields a single parseable JSON document.

```bash
si diff --json | jq '.summary'
si validate --json | jq '.valid'
si show --json | jq '.resourceCount'
si schema | jq '."$id"'   # self-contained draft-07 JSON Schema of the IaC format
```

<details>
<summary><b>Stable output envelopes, error codes and color behavior</b></summary>

Stable output envelopes (each carries a version field, so shapes only ever change under a new version):

- `si diff --json` → `{ planVersion: 1, provider, app, service, stage, changes: [{ logicalId, type, action: "create|update|destroy|recreate", attributes, drifted?, driftReasons? }], summary: { create, update, destroy, recreate, unchanged } }`
- `si validate --json` → `{ validateVersion: 1, valid, errors: [{ path, keyword, message, allowedValues? }] }`
- `si show --json` → `{ showVersion: 1, provider, app, service, stage, stateLocation, backend: "saas|bucket_store|local", locked, lock, resources, resourceCount, ... }`
- failures (in `--json` mode) → `{ error: { code, message } }` on stdout

Stable error codes: error `code`s are the i18n message keys behind the translated message (e.g. `RAM_ROLE_NOT_FOUND_IN_CLOUD`) — they are identical under every locale, so agents can map codes to self-healing actions regardless of `LANG`.

Colors: ANSI color is disabled when the `NO_COLOR` environment variable is set ([no-color.org](https://no-color.org)) or `--no-color` is passed, keeping piped output clean in non-TTY environments.

</details>

### Local development

Run and debug serverless functions locally without deploying to the cloud or configuring credentials.

- **HTTP functions** — provider-native event, context and response translation for Aliyun FC, Tencent SCF function URLs and Volcengine veFaaS
- **Timer triggers** — `functions.*.triggers.timer` schedules fire against UTC wall-clock and invoke your handler with the provider's timer event shape
- **Bucket file serving** — access local storage files over HTTP for rapid iteration
- **Watch mode** — code changes reload automatically
- **Same config, different target** — `si local -s dev` reuses your existing configuration

See [Local development](docs/local-development.md) for the supported subset and runnable examples: [Tencent SCF](samples/tencent-local/serverlessinsight.yml) and [Volcengine veFaaS](samples/volcengine-local/serverlessinsight.yml).

### API gateway & custom domains

Configure HTTP endpoints and bind custom domains with automatic DNS verification.

- **HTTP triggers** — define triggers with HTTP methods and paths, backed by a function
- **Custom domains** — automatic CNAME + DNS TXT ownership verification for OSS and API Gateway on Alibaba Cloud, and DNSPod-backed domains on Tencent Cloud
- **CDN acceleration** — edge caching and global content delivery for static sites
- **OSS transfer acceleration** — cross-region data transfers through the Alibaba backbone
- **Tencent function URLs** — HTTP entry points without a standalone gateway resource

### Timer triggers

Schedule functions with a provider-agnostic `si-cron` expression under `functions.*.triggers.timer`:

```yaml
functions:
  my_fn:
    triggers:
      timer:
        - name: billing-run            # required — drift detection is name-keyed
          cron: '0 23 3 * * *'         # required — si-cron, interpreted in UTC
          payload: '{"job":"billing-run"}'  # optional, passed through verbatim
          enable: true                 # optional, default true
          description: daily billing   # optional
        - name: report-hourly
          cron: '@every 1h'
```

`cron` accepts a standard 5-field expression (`minute hour day month weekday`), a 6-field expression with a seconds prefix, or `@every <duration>` (`30s`, `5m`, `1h`, `1d`, …). si-cron is always **UTC** — the synthesis layer translates it into each provider's dialect (Aliyun FC3 6-field, Tencent SCF 7-field with year, Volcengine veFaaS 5-field crontab), including the UTC+8 field shift, so the same YAML fires at the same instant everywhere. Invalid expressions and provider capability limits (Tencent SCF allows at most 10 timers per function) fail at `si validate`, before any deploy.

<details>
<summary><b><code>triggers</code> vs top-level <code>events</code></b></summary>

`functions.*.triggers` (http, timer) are things that *invoke this function* — they are function-owned, die with the function, and have no independent configuration surface. Top-level `events` (e.g. `API_GATEWAY`) are infrastructure resources with their own config face — custom domains, certificates, route tables — that keep living when a backend function is removed. Rule of thumb: independent configuration surface → `events`; pure scheduling/event binding → `triggers`.

</details>

### Resource management

Beyond functions — manage the full serverless stack, including storage, databases and tables.

- **Object storage** — OSS (Alibaba), COS (Tencent), TOS (Volcengine)
- **Databases** — RDS MySQL Serverless, TDSQL-C and Elasticsearch Serverless
- **Tables** — TableStore on Alibaba Cloud
- **GPU functions** — deploy GPU-enabled serverless functions on Alibaba Cloud

## Supported providers

| Provider          | Functions                    | HTTP entry                | Object storage | Databases & tables                                          | Status  |
| ----------------- | ---------------------------- | ------------------------- | -------------- | ----------------------------------------------------------- | ------- |
| **Alibaba Cloud** | ✅ FC3                       | ✅ API Gateway            | ✅ OSS         | ✅ RDS MySQL Serverless, TableStore, Elasticsearch Serverless | Stable  |
| **Tencent Cloud** | ✅ SCF                       | ✅ Function URL triggers  | ✅ COS         | ✅ TDSQL-C, Elasticsearch Serverless                         | Stable  |
| **Volcengine**    | ✅ veFaaS                    | ✅ API Gateway            | ✅ TOS         | —                                                           | Stable  |
| **Huawei Cloud**  | ⚠️ Terraform template only   | —                         | —              | —                                                           | Preview |
| **AWS**           | —                            | —                         | —              | —                                                           | Planned |
| **Azure**         | —                            | —                         | —              | —                                                           | Planned |
| **Google Cloud**  | —                            | —                         | —              | —                                                           | Planned |

Notes:

- Huawei Cloud configuration is parsed and can generate Terraform HCL templates, but deployment is not implemented yet.
- Tencent Cloud has no standalone API Gateway resource; HTTP entry points use function URL triggers.
- Volcengine does not yet support serverless databases or tables.
- See the [full provider matrix](https://serverlessinsight.com/reference.html) for resource-level details.

## Documentation

| Resource                  | Link                                                                  |
| ------------------------- | --------------------------------------------------------------------- |
| Getting started           | <https://serverlessinsight.com/getting-started.html>                  |
| Configuration reference   | <https://serverlessinsight.com/reference.html>                        |
| CLI reference             | <https://serverlessinsight.com/cli.html>                              |
| JSON Schema               | `si schema` (self-contained draft-07)                                 |
| Local development         | [docs/local-development.md](docs/local-development.md)                |
| State locking             | [docs/state-locking.md](docs/state-locking.md)                        |
| Architecture decisions    | [docs/adr](docs/adr)                                                  |
| Samples                   | [samples](samples)                                                    |
| Changelog                 | [CHANGELOG.md](CHANGELOG.md)                                          |
| FAQ                       | <https://serverlessinsight.com/faq.html>                              |

## Roadmap

- Huawei Cloud function deployment (template generation exists today)
- AWS, Azure and Google Cloud providers
- Tencent Cloud standalone API Gateway resources
- Volcengine serverless databases and tables
- More serverless resources and provider capabilities

Roadmap items are directional, not commitments. Open an issue to discuss priorities.

## Architecture

ServerlessInsight follows a **functional client architecture** that cleanly separates cloud provider SDKs from business logic:

```
┌─────────────────────────────────────────┐
│   Resource / Planner / Executor Layer   │  ← Provider-agnostic business logic
│   (Pure functions, no SDK imports)       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Functional Client Layer          │  ← Encapsulated SDK operations
│ (aliyunClient, tencentClient,           │
│  volcengineClient)                       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Cloud Provider SDKs                 │  ← @alicloud/*, tencentcloud-*, @volcengine/*
└─────────────────────────────────────────┘
```

- **Functional and pure** — business logic uses pure functions with immutable data
- **SDK encapsulation** — provider SDKs are accessed only through client modules
- **Functional-first** — `type` over `interface`, functions over classes, declarative collection handling

## Development

ServerlessInsight is built with [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/), [Commander.js](https://github.com/tj/commander.js/) for the CLI, and a functional architecture.

### Prerequisites

- **Node.js** >= 22.12
- **npm** (bundled with Node.js)

### Build from source

```bash
git clone https://github.com/geek-fun/serverlessinsight.git
cd serverlessinsight
npm install
npm run build
npm link
```

### Scripts

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `npm run build`        | TypeScript compilation       |
| `npm test`             | All tests with coverage      |
| `npm run test:unit`    | Unit tests only              |
| `npm run test:service` | Service tests only           |
| `npm run test:ci`      | CI test run                  |
| `npm run lint:check`   | ESLint check                 |
| `npm run lint:fix`     | Auto-fix lint issues         |

Tests are split into fast, fully mocked unit tests and service tests that exercise the real parser, planner, executor and state manager. Coverage is enforced at 85% for branches, functions, lines and statements.

### Project structure

```
src/
├── commands/        # CLI command handlers (deploy, destroy, diff, local, ...)
├── common/          # Shared utilities, clients, state and lock management
│   ├── aliyunClient/
│   ├── tencentClient/
│   └── volcengineClient/
├── lang/            # i18n translations (en.ts, zh-CN.ts)
├── parser/          # YAML parsing and validation
├── stack/           # Provider-specific resource logic
│   ├── aliyunStack/
│   ├── scfStack/            # Tencent Cloud
│   ├── volcengineStack/
│   ├── localStack/          # Local development server
│   └── rfsStack/            # Huawei Cloud Terraform templates (preview)
├── types/           # TypeScript type definitions
└── validator/       # JSON Schema validation
tests/
├── fixtures/        # Test fixtures (YAML configs, artifacts)
├── unit/            # Isolated unit tests
└── service/         # End-to-end service tests
```

See [AGENTS.md](AGENTS.md) for coding conventions, test rules and architecture principles.

## Community

<p align="center">
  <img src="docs/images/wechat_official.png" width="300" alt="WeChat Official Account">
</p>

<p align="center">
  <a href="https://x.com/geekfun_club"><img src="https://img.shields.io/badge/X-Follow-000000?logo=x&logoColor=white" alt="X / Twitter" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.youtube.com/@geekfun-club"><img src="https://img.shields.io/badge/YouTube-Subscribe-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/geek-fun"><img src="https://img.shields.io/badge/GitHub-Follow-181717?logo=github&logoColor=white" alt="GitHub" /></a>
</p>

## Contributing

Contributions are welcome — bug reports, feature requests, documentation fixes and code.

- Open an issue with the [bug report](.github/ISSUE_TEMPLATE/bug_report.md) or [feature request](.github/ISSUE_TEMPLATE/feature_request.md) template.
- Before opening a pull request, run `npm run lint:check`, `npm run build` and `npm test`.
- Follow the conventions in [AGENTS.md](AGENTS.md) and the existing [pull request template](.github/PULL_REQUEST_TEMPLATE.md).

## Sponsor

<p align="center">
  <img src="docs/images/wechat_ponsor.jpg" width="140" alt="WeChat Sponsor QR">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/sponsors/geek-fun"><img src="https://img.shields.io/badge/GitHub_Sponsors-%E2%9D%A4_Support-EA4AAA?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" /></a>
</p>

## License

[Apache 2.0](LICENSE) © GEEKFUN
