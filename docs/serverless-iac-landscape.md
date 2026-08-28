# Serverless IaC 框架与平台全景（2026）

> 本文聚焦**专用 Serverless IaC 框架**的全方位分析（特点、配置示例、竞争力、与 ServerlessInsight 的关系），并补充自托管 FaaS 平台与托管 Serverless 平台作为背景。
> 背景：ServerlessInsight 是一款跨云 serverless IaC 工具（当前覆盖阿里云 FC3 / 腾讯云 SCF / 火山引擎 veFaaS / 华为云 FunctionGraph），以统一资源抽象 + 状态管理（plan / drift / 部分失败恢复）为核心路线。

## 一、专用 Serverless IaC 框架全方位分析

这一类工具以「函数 / FaaS」为第一公民，围绕事件触发、API 网关、绑定资源做专门抽象，区别于 Terraform / Pulumi 等通用 IaC。下面按定位分组逐个拆解。

### 1.1 Serverless Framework —— 历史最久、生态最大的 serverless 框架（V4 起仅支持 AWS）

**定位与特点**
- 2015 年起步，serverless 领域的「老大哥」，YAML（`serverless.yml`）+ 插件体系。
- **V4 仅支持 AWS**（`provider.name` 只接受 `aws`）。历史上 V1–V3 曾通过官方/社区插件支持 Azure、GCP、腾讯云、阿里云等，但 **V4 已正式废弃所有非 AWS provider**，官方聚焦 AWS 最佳体验；未来计划通过 Extension 机制重新支持其他云厂商。
- 抽象层级高：`functions` / `events` / `resources` 三段式，把 API Gateway、DynamoDB 等包装成声明式配置。
- 插件生态庞大（离线调试、打包、自定义域名、监控等），社区资料最丰富。

**配置示例**
```yaml
service: my-api
provider:
  name: aws
  runtime: nodejs20.x
functions:
  hello:
    handler: src/index.handler
    events:
      - httpApi:
          path: /hello
          method: get
```

**竞争力分析**
- ✅ 优势：AWS 生态最成熟（社区、插件、文档/Stack Overflow 答案最多）；插件可解决长尾需求。
- ❌ 短板：**V4（2023 年底）起引入基于信用点（credit）的商业许可收费**——年营收 ≥ 200 万美元的组织需付费（约 $4/credit，预留低至 $1），引发社区反弹；**V3 已于 2025 年初停止维护**，社区另起 `oss-serverless` / `osls` 分支续命；复杂配置会变成嵌套 YAML「地狱」；无类型安全，引用错误要到部署时才暴露；底层走 CloudFormation，受 500 资源上限与较慢部署拖累；**V4 彻底不支持非 AWS 云，国内云（阿里/腾讯等）无法使用官方 V4**。

> **来源（官方文档）**：Serverless Framework 官方《Upgrading to v4》（"Version 4 discontinues support for cloud providers beyond AWS" / "Deprecation Of Non-AWS Providers"）、官方 V4 许可与定价说明、官方论坛确认 "As of v4, no. AWS only."。

**与 ServerlessInsight 的关系**
形态上仍最接近（YAML 定义 + 插件体系），但 **V4 已不支持任何国内云**——ServerlessInsight 以阿里云 / 腾讯云 / 火山 / 华为等国内云原生资源为第一目标，并加入 plan / 状态 / drift 等工程化能力，差异化护城河比此前判断更强。

### 1.2 Serverless Devs —— 阿里云发起的 CNCF 多云开发者平台

**定位与特点**
- 由**阿里云发起**、已进入 **CNCF Sandbox**，是中文社区最活跃的 serverless 工具。
- 多云组件模型：按云分组件（`fc3` / `aws-lambda` / `tencent-scf` / `huawei-functiongraph` / `baidu-cfc` 等），用 `s.yaml` 描述，CLI 为 `s`。据阿里云官方文档（2026-06 更新），FaaS 组件覆盖**阿里云函数计算 FC3、AWS Lambda、腾讯云 SCF、华为云 FunctionGraph、百度云 CFC**；`s config` 密钥配置还支持 Azure、Google。
- 强调**全生命周期**：初始化、构建、部署、调试（`s local`）、CI/CD 集成、可观测性。
- 支持 `s cli` 纯命令行模式与 Registry 模板市场，组件/插件可扩展。

**配置示例**
```yaml
edition: 3.0.0
name: fc3-demo
access: default
resources:
  hello_function:
    component: fc3
    props:
      region: cn-hongkong
      functionName: hello-world
      runtime: nodejs18
      handler: index.handler
      codeUri: ./src
      events:
        - apigateway:
            path: /api/hello
            method: GET
```

**竞争力分析**
- ✅ 优势：背靠阿里云 + CNCF，国内云（尤其 FC3）支持最原生、最及时；组件化让每朵云独立演进；开发者工具链完整（本地调试、多环境、CI/CD）。
  - ❌ 短板：国际化与英文社区弱于 Serverless Framework；以「组件」逐云封装，缺少跨云统一抽象，换云要改写组件与字段；**没有持久化的本地状态文件**（以云上资源为真相源）——虽有 `s plan` 预览变更，但无状态锁、无漂移历史追踪、无部分失败自动恢复，团队协作与大规模治理是薄弱环节。

> **来源（官方文档）**：阿里云 Function Compute 文档《Serverless Devs overview》(2026-06)、Serverless Devs 官方文档 components 页（fc3 / tencent-scf / huawei-functiongraph / aws-lambda 组件）、阿里云《Serverless Devs 命令列表》(2026-03，含 `s plan` / `s info` / `s sync`)。

**与 ServerlessInsight 的关系**
这是**最直接的国内竞品**。路线差异：Serverless Devs 走「组件化 + 开发者工具链」，ServerlessInsight 走「统一资源抽象 + 持久状态」。需注意 Serverless Devs **已有 `s plan` 变更预览**，所以 ServerlessInsight 不能只靠「plan」做差异点——真正的护城河是 Serverless Devs 缺失的三件事：**① 持久化本地状态文件**（支持漂移历史追踪）、**② 部分失败自动恢复**（失败资源落盘、重试续跑）、**③ 状态锁 / 多环境并发治理**。定位上 ServerlessInsight 应突出「跨云一致性 + 状态可治理性（drift / 部分失败恢复）」。

### 1.3 AWS SAM —— AWS 官方原生方案

**定位与特点**
- AWS 官方 Serverless Application Model，YAML 模板编译为 CloudFormation。
- 与 AWS 服务深度绑定：新特性首发支持；`sam local` 用 Docker 本地模拟 Lambda / API Gateway / DynamoDB，体验最成熟；`sam sync` 加速代码变更部署。
- Step Functions 编排支持最佳。

**配置示例**
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  HelloFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: index.handler
      Runtime: nodejs20.x
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /hello
            Method: get
```

**竞争力分析**
- ✅ 优势：免费、官方维护、本地模拟最准；熟悉 CloudFormation 的团队零门槛。
- ❌ 短板：仅 AWS；YAML 冗长；无类型安全；复杂栈同样受 CloudFormation 限制。

**与 ServerlessInsight 的关系**：AWS-only，与 ServerlessInsight 的跨云定位不重叠；可作为「AWS 分支能力对齐」的参考对象。

### 1.4 SST (Ion) —— 2026 年开发者体验标杆

**定位与特点**
- v2 基于 AWS CDK；**v3（Ion，2024 年发布）改为基于 Pulumi / Terraform 引擎**，用 TypeScript 定义基础设施。
- 杀手锏 `sst dev`：本地代码直连真实 AWS 资源，保存即生效（真实 Lambda + 真实 DynamoDB），迭代极快。
- 全栈优先：原生支持 Next.js / Remix / Astro / SvelteKit 部署；资源间 type-safe「链接」。
- 免费开源，配套 SST Console 看板。

**配置示例**
```ts
import { Api } from 'sst/aws';

const api = new Api('MyApi', {
  routes: { 'GET /hello': 'src/hello.handler' },
});
```

**竞争力分析**
- ✅ 优势：类型安全、实时开发体验最佳；全栈应用部署体验领先；2026 新项目首选推荐度高。
  - ❌ 短板：内置组件以 **AWS 与 Cloudflare** 为主（通过 Pulumi/Terraform 可接入 150+ provider 含 Azure、GCP，但非二者资源需用底层 provider 直写）；依赖 Pulumi/Terraform，需理解其模型；生态比 Serverless Framework 小。

> **来源（官方文档）**：SST 官方文档 Providers 页（150+ providers、内置 AWS/Cloudflare 组件）、SST v3 发布公告（从 CDK 迁移到 Pulumi/Terraform）。

**与 ServerlessInsight 的关系**：代表「代码即 IaC + 极佳 DX」方向，是 ServerlessInsight 在开发者体验层面的对标；但 SST 不做跨云统一抽象，与本项目路线互补而非直接竞争。

### 1.5 Architect (arc) —— 极简约定优于配置

**定位与特点**
- 由 Architect（原 Begin）维护，manifest 文件（`app.arc`，也支持 YAML/JSON/TOML）声明式描述基础设施。
- 约定优于配置：目录结构即路由（如 `src/http/get-index/` 自动生成 `GET /` 的 Lambda）。
- 本地 `arc sandbox` 一键起完整环境（含本地 DynamoDB），部署确定性高。

**配置示例**
```
@app
myapp

@aws
region us-east-1

@http
get /hello
  src src/http/get-hello

@tables
notes
  noteId *String
```

**竞争力分析**
- ✅ 优势：心智负担最低，约定即基础设施；本地开发体验好；输出即 SAM/CloudFormation，安全可控。
  - ❌ 短板：仅 AWS；社区规模小于 Serverless Framework；抽象偏「Web 应用」场景，复杂基础设施表达力有限。

**与 ServerlessInsight 的关系**：定位差异大（AWS-only、约定式），参考价值在于「极简本地开发循环」可借鉴。

### 1.6 AWS Chalice —— Python 微服务框架

**定位与特点**
- AWS 官方出品的 Python serverless 微框架，装饰器风格路由，类似 Flask。
- 自动生成 IAM policy；`chalice deploy` 一条命令完成 Lambda + API Gateway 部署。
- 支持 S3 / SNS / SQS 等事件源装饰器。

**配置示例**
```python
from chalice import Chalice
app = Chalice(app_name="helloworld")

@app.route("/")
def index():
    return {"hello": "world"}
```
```bash
$ chalice deploy
# => https://<id>.execute-api.<region>.amazonaws.com/api/
```

**竞争力分析**
- ✅ 优势：Python 团队零学习曲线；自动 IAM；与 AWS 服务深度集成。
- ❌ 短板：仅 AWS、仅 Python；偏「写代码即定义基础设施」，缺少独立 IaC 文件，难以做复杂编排与跨资源治理。

### 1.7 Zappa —— Python Web 框架上云

**定位与特点**
- 把现有 Flask / Django / FastAPI（ASGI）应用「lift-and-shift」到 Lambda + API Gateway。
- 配置为 `zappa_settings.json`，按 stage 管理；内置 `keep_warm`、 scheduled events、remote_env、X-Ray 等。

**配置示例**
```json
{
  "dev": {
    "app_function": "app.app",
    "aws_region": "us-east-1",
    "s3_bucket": "zappa-deploy",
    "events": [{ "function": "app.task", "expression": "rate(1 minute)" }]
  }
}
```
```bash
$ zappa deploy dev
```

**竞争力分析**
- ✅ 优势：已有 Python Web 应用迁移 serverless 的捷径；社区老牌、资料多。
- ❌ 短板：仅 AWS、仅 Python；大包冷启动慢（靠 keep_warm 缓解）；不擅长新建复杂 serverless 架构。

### 1.8 Claudia.js —— Node.js 极简部署

**定位与特点**
- 面向 Node.js 的 opinionated 部署工具，让 Lambda + API Gateway 的 Web 应用极快上线。
- `claudia create` / `claudia update` 命令式发布，配置即代码量极小。

**配置示例**
```js
const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
api.get('/hello', () => 'Hello World');
module.exports = api;
```
```bash
$ claudia create --region us-east-1 --api-module web
```

**竞争力分析**
- ✅ 优势：Node.js 小项目最快上手；命令简单。
- ❌ 短板：维护活跃度下降、社区偏老；仅 AWS、仅 Node.js；抽象能力弱，难覆盖完整 serverless 栈。

### 1.9 横向对比总表

| 框架 | 形态 | 状态模型 | 多云 | 类型安全 | 本地开发 | 主要短板 |
| --- | --- | --- | --- | --- | --- | --- |
| Serverless Framework | YAML + 插件 | 云原生(CFN) | ❌ V4 仅 AWS（非 AWS 已废弃） | ❌ | 插件模拟 | V4 仅 AWS、信用点收费、YAML 复杂 |
| Serverless Devs | YAML + 组件 | 无（云即真相源） | ✅ 阿里/腾讯/华为/AWS/百度 | ❌ | `s local` 强 | 国际化弱、无跨云统一抽象、无持久状态 |
| AWS SAM | YAML→CFN | 云原生(CFN) | ❌ AWS | ❌ | `sam local` 最准 | 仅 AWS、YAML 冗长 |
| SST (Ion) | TypeScript | Pulumi/TF 后端 | AWS+Cloudflare(内置)；150+ provider(TF/Pulumi) | ✅ | `sst dev` 最佳 | 非 AWS/Cloudflare 需底层 provider |
| Architect (arc) | `app.arc` | 云原生(CFN) | ❌ AWS | ❌ | `arc sandbox` | 社区小、表达力有限 |
| Chalice | Python 代码 | 本地 deployed.json | ❌ AWS | ⚠️ 代码内 | 弱 | 仅 Python、无独立 IaC 文件 |
| Zappa | JSON（Python Web） | 部分(settings+版本) | ❌ AWS | ❌ | 弱 | 仅 Python、冷启动慢 |
| Claudia.js | Node.js 代码 | 本地 claudia.json | ❌ AWS | ❌ | 弱 | 维护老化、仅 Node.js |

## 二、自托管 / 开源 Serverless（FaaS）平台

跑在自己 K8s 或裸机上，避免厂商锁定：

| 平台 | 底座 | 特点 |
| --- | --- | --- |
| **Knative** | Kubernetes | CNCF，最成熟，Serving(scale-to-zero) + Eventing，冷启动 ~600ms–1.5s |
| **OpenFaaS** | K8s / Docker Swarm / Compose | 最易上手，26k+ stars，社区活跃 |
| **Apache OpenWhisk** | 任意 | 企业级多租户，IBM Cloud Functions 底层 |
| **Fission** | Kubernetes | 冷启动 <100ms（预热池），CNCF Sandbox |
| **Nuclio** | K8s | 高性能，主打实时 / AI 推理 |
| **Fn Project**（Oracle，已凉）、**Kubeless**（已归档） | — | 建议避开 |

> 这些平台本身需要「部署平台」，而非「描述业务资源」。若未来想让 ServerlessInsight 也能编排自建 FaaS，**Knative / OpenFaaS** 是首选对接目标。

## 三、托管 Serverless 平台（要抽象的目标资源方）

- **AWS**：Lambda、Fargate、App Runner
- **阿里云**：函数计算 FC3、Serverless 应用引擎 SAE、函数工作流
- **腾讯云**：SCF、云函数、Serverless Framework 国内版
- **Google**：Cloud Run、Cloud Functions
- **Azure**：Functions、Container Apps
- **Cloudflare Workers**、**Vercel / Netlify Functions**、**Deno Deploy**、**Fly.io** —— 边缘 / 前端向 serverless
- **Coolify / CapRover** —— 自托管 PaaS（类 Heroku）

## 四、与 ServerlessInsight 的定位与扩展建议

ServerlessInsight 的独特价值：**国内云（阿里 / 腾讯 / 火山 / 华为）原生资源 + 跨云统一抽象 + 状态管理**。国际上没有一款主流框架把国内云当成一等公民；国内最直接的竞品 Serverless Devs 走组件化路线，未强调「基础设施可治理性」。

### 状态管理模型对比（state model）

「有没有 state」决定了漂移检测、部分失败恢复、并发锁、多环境一致性的能力上限。按状态存放位置可分三类：

| 框架 | 状态模型 | 持久化状态文件? | 状态存放位置 | 漂移 / 回滚 |
| --- | --- | --- | --- | --- |
| Serverless Framework | 委托 CloudFormation | 否（CFN stack 即状态） | AWS CFN stack | CFN 原生漂移检测 + 回滚 |
| AWS SAM | 委托 CloudFormation | 否 | AWS CFN stack | CFN change set |
| Architect (arc) | 委托 CloudFormation / SAM | 否 | AWS CFN stack | CFN 原生 |
| SST (Ion v3) | Pulumi / Terraform 引擎 | 是（state backend） | Pulumi Cloud / S3 / TF state | Pulumi 漂移检测 + 托管状态 |
| Chalice | 本地文件 | 是 | `.chalice/deployed.json` | 按 stage 文件；官方提醒团队共享易乱 |
| Claudia.js | 本地文件 | 是 | `claudia.json` | 按文件 update / rollback |
| Zappa | 配置 + Lambda 版本 | 部分（`zappa_settings.json`） | 云上按命名；Lambda 版本回滚 | Lambda 版本回退 |
| Serverless Devs | 云即真相源（薄客户端） | 否 | 云上资源 | `s plan` 仅预览，无历史 |
| Knative / OpenFaaS / Fission | Kubernetes | 否（K8s 对象） | K8s etcd + GitOps | K8s reconcile + GitOps |
| 托管平台（Vercel / Netlify / Cloudflare） | 厂商平台 | 否 | 厂商 | 厂商托管 |

**三类模型的优劣**

- **A. 云厂商原生状态（CFN / K8s）** —— Serverless Framework、SAM、Architect、Knative/OpenFaaS/Fission。
  - ✅ 无需管理状态文件、无泄露/锁冲突风险；平台自带回滚与漂移检测。
  - ❌ 锁定该云的状态模型，跨云没有统一视图；漂移能力受限于平台（如 CFN 漂移检测覆盖不全）。
- **B. 显式状态文件 / 后端（TF / Pulumi / Chalice / Claudia）** —— 真正的「IaC 状态」。
  - ✅ 漂移历史、部分失败恢复、状态锁、可跨云（TF/Pulumi）；治理能力最强。
  - ❌ 状态文件需妥善保管（含敏感引用）、需配置后端、需锁管理；Chalice/Claudia 的简单 JSON 在团队场景脆弱（Chalice 官方文档直言 sharing `deployed.json` 会乱）。
- **C. 云即真相源 · 薄客户端** —— Serverless Devs、Zappa。
  - ✅ 最简单，无状态管理负担，开发者体验轻；上手快。
  - ❌ 无漂移历史、无部分失败自动恢复、无并发锁；依赖命名约定与组件幂等，规模/合规场景弱。

**对 ServerlessInsight 的定位**：ServerlessInsight 属于 **B 类（持久状态 + 部分失败恢复 + 漂移）**，但把 B 的治理能力**跨云统一**——这是 A 类（仅 AWS CFN）与 C 类（Serverless Devs 无状态）都给不了的。差异点不是「有 plan」（Serverless Devs 也有 `s plan`），而是「持久状态支撑的漂移历史 + 部分失败恢复 + 状态锁」。

> **来源（官方文档）**：AWS CloudFormation（stack 即状态、drift 检测）；Architect《Why Architect》("compiled into AWS CloudFormation")；Chalice CD 文档（"sharing and updating the deployed.json file will get messy"）；Claudia《customising deployments》（`claudia.json` 记录资源 ID）；Zappa README（`zappa_settings.json` + Lambda 版本回滚）；Serverless Devs 命令列表（`s plan` 预览）；Pulumi 官方对比（Serverless Framework / SST 状态模型）。

若需扩展平台覆盖，优先级建议：

1. **同生态补齐**：腾讯云 SCF 之外的 API 网关、COS、CLS
2. **对接自托管 FaaS**：Knative / OpenFaaS（企业私有化需求大）
3. **边缘层**：Cloudflare Workers（开发者向，增长快）

## 五、参考链接

- **Serverless Devs**（阿里云开源，CNCF Sandbox）：https://www.serverless-devs.com/  · 文档 https://docs.serverless-devs.com/  · GitHub https://github.com/Serverless-Devs/Serverless-Devs
- **Serverless Framework**：https://www.serverless.com/
- **AWS SAM**：https://docs.aws.amazon.com/serverless-application-model/
- **SST**：https://sst.dev/
- **Architect (arc)**：https://arc.codes/
- **AWS Chalice**：https://aws.github.io/chalice/
- **Zappa**：https://github.com/zappa/Zappa
- **Claudia.js**：https://claudiajs.com/
- **Terraform**（通用 IaC 参考）：https://www.terraform.io/  · **Pulumi**（通用 IaC 参考）：https://www.pulumi.com/
- **Knative**：https://knative.dev/  · **OpenFaaS**：https://www.openfaas.com/  · **Apache OpenWhisk**：https://openwhisk.apache.org/  · **Fission**：https://fission.io/
