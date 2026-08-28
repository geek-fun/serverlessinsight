# Serverless IaC 框架与平台全景（2026）

> 本文梳理支持 serverless 的 Infrastructure as Code 框架与平台，按定位分层。
> 背景：ServerlessInsight 是一款跨云 serverless IaC 工具（当前覆盖阿里云 FC3 / 腾讯云 SCF / 火山引擎 veFaaS / 华为云 FunctionGraph），本文也标注了各类工具与本项目的关系。

## 一、专用 Serverless IaC 框架（以函数 / FaaS 为核心抽象）

| 框架 | 语言 / 形态 | 多云 | 说明 |
| --- | --- | --- | --- |
| **Serverless Framework** | YAML (`serverless.yml`) + 插件 | ✅ AWS / Azure / GCP / 阿里云等 | 生态最大（数百插件），但 v3 收费策略变更，社区口碑下滑 |
| **AWS SAM** | YAML（编译为 CloudFormation） | ❌ AWS only | AWS 官方，本地模拟 (`sam local`) 最成熟 |
| **SST (Ion)** | TypeScript | AWS + Cloudflare | 2026 推荐度最高，Live Lambda 开发体验极佳，v3 底层换为 Pulumi / Terraform |
| **AWS CDK** | TS / Python / Go / Java / .NET | ❌ AWS only | “代码即 IaC” 正统，L2 / L3 construct 复用强，AWS 主推方向 |
| **Architect (arc)** | 纯文本 / `arc` | ❌ AWS only | 极简，约定优于配置 |
| **Chalice** | Python | ❌ AWS only | AWS Lambda + API Gateway 的 Python 框架 |
| **Zappa** | Python | ❌ AWS only | 专注 Flask / Django → Lambda 部署 |
| **Claudia.js** | Node.js | ❌ AWS only | Lambda 部署工具，偏老 |

> **与 ServerlessInsight 的关系**：形态上最接近 **Serverless Framework**（YAML 定义 + 多云平台），但 Serverless Framework 对国内云（阿里云 / 腾讯云）只是二等支持，而 ServerlessInsight 直接以国内云原生资源为第一目标 —— 这是差异化护城河。

## 二、通用 IaC 工具（通过 Provider 支持 serverless 资源）

- **Terraform**（HCL）—— 3000+ provider，覆盖所有主流云的 Lambda / FC / SCF / 函数计算资源
- **OpenTofu** —— Terraform 的开源 fork，完全兼容
- **Pulumi** —— 真实语言（TS / Python / Go / ...），4800+ provider，多云平台首选“代码即 IaC”
- **CDK for Terraform (CDKTF)** —— CDK 编程模型 + Terraform provider
- **Crossplane** —— Kubernetes CRD 管云资源，GitOps 友好
- **Azure Bicep / ARM**、**Google Cloud Deployment Manager / gcloud** —— 各厂商原生

## 三、自托管 / 开源 Serverless（FaaS）平台

跑在自己 K8s 或裸机上，避免厂商锁定：

| 平台 | 底座 | 特点 |
| --- | --- | --- |
| **Knative** | Kubernetes | CNCF，最成熟，Serving(scale-to-zero) + Eventing，冷启动 ~600ms–1.5s |
| **OpenFaaS** | K8s / Docker Swarm / Compose | 最易上手，26k+ stars，社区活跃 |
| **Apache OpenWhisk** | 任意 | 企业级多租户，IBM Cloud Functions 底层 |
| **Fission** | Kubernetes | 冷启动 <100ms（预热池），CNCF Sandbox |
| **Nuclio** | K8s | 高性能，主打实时 / AI 推理 |
| **Fn Project**（Oracle，已凉）、**Kubeless**（已归档） | — | 建议避开 |

> 这些平台本身需要“部署平台”，而非“描述业务资源”。若未来想让 ServerlessInsight 也能编排自建 FaaS，**Knative / OpenFaaS** 是首选对接目标。

## 四、托管 Serverless 平台（要抽象的目标资源方）

- **AWS**：Lambda、Fargate、App Runner
- **阿里云**：函数计算 FC3、Serverless 应用引擎 SAE、函数工作流
- **腾讯云**：SCF、云函数、Serverless Framework 国内版
- **Google**：Cloud Run、Cloud Functions
- **Azure**：Functions、Container Apps
- **Cloudflare Workers**、**Vercel / Netlify Functions**、**Deno Deploy**、**Fly.io** —— 边缘 / 前端向 serverless
- **Coolify / CapRover** —— 自托管 PaaS（类 Heroku）

## 五、与 ServerlessInsight 的定位与扩展建议

ServerlessInsight 的独特价值：**国内云（阿里 / 腾讯 / 火山 / 华为）原生资源 + 跨云统一抽象 + 状态管理**。国际上没有一款主流框架把国内云当成一等公民。

若需扩展平台覆盖，优先级建议：

1. **同生态补齐**：腾讯云 SCF 之外的 API 网关、COS、CLS
2. **对接自托管 FaaS**：Knative / OpenFaaS（企业私有化需求大）
3. **边缘层**：Cloudflare Workers（开发者向，增长快）
