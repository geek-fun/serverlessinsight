# OSS 自定义域名绑定最佳实践

本文档记录了阿里云 OSS 自定义域名绑定的最佳实践，特别是针对静态网站托管场景下根域名（@）和 www 子域名的同时绑定。

## 背景

在 ServerlessInsight v0.5.7 版本中，新增了 `ALIYUN_OSS_DNS_CNAME` 资源类型，用于跟踪 OSS Bucket 的自定义域名 DNS CNAME 记录。这引发了以下问题：

1. 是否需要同时绑定根域名（@）和 www 子域名？
2. 为什么两个域名指向不同的 CNAME 目标？
3. `thepacificxxs.com` 域名是什么？

## 核心发现

### 1. 同时绑定 @ 和 www 是最佳实践

**结论：是的，这是静态网站托管的常见最佳实践。**

| 场景 | 是否推荐 | 说明 |
|------|---------|------|
| **静态网站托管** | ✅ 强烈推荐 | 用户可以通过 `example.com` 或 `www.example.com` 访问网站 |
| **品牌一致性** | ✅ 推荐 | 防止用户输入错误导致无法访问 |
| **SEO 优化** | ✅ 推荐 | 避免搜索引擎将两个域名视为不同网站 |

根据阿里云官方文档：

> 如果目标是利用OSS托管完整的静态网站，在绑定自定义域名后，还需进一步配置静态网站托管功能。

### 2. DNS CNAME 限制与阿里云解决方案

#### DNS 协议限制

根域名（@）存在特殊的 DNS 限制：

```
❌ 根域名（@）不能同时存在 CNAME 和其他记录（如 MX、TXT、NS）
❌ 如果 @ 设置 CNAME，则无法接收邮件（MX 记录失效）
```

这是 DNS 协议层面的限制，并非阿里云特有的要求。

#### 阿里云 OSS 域名类型

阿里云 OSS 提供多种域名类型用于访问：

| 域名类型 | 格式 | 说明 |
|---------|------|------|
| **外网访问域名（标准 Endpoint）** | `bucket.oss-region.aliyuncs.com` | 默认公网访问 |
| **内网访问域名** | `bucket.oss-region-internal.aliyuncs.com` | 同地域 ECS 内网访问 |
| **传输加速域名** | `bucket.oss-accelerate.aliyuncs.com` | 跨地域加速访问 |
| **CNAME 域名** | `bucket.region.taihangcda.cn` 或 `bucket.region.thepacificxxs.com` | 用于自定义域名 CNAME 解析 |

### 3. `thepacificxxs.com` 是阿里云 CNAME 域名

**结论：这是阿里云为 OSS 提供的 CNAME 域名，专门用于根域名绑定场景。**

根据阿里云官方文档：

> 外网访问的 CNAME 域名（推荐，如 `example-bucket.<region-id>.taihangcda.cn`）或外网访问域名

阿里云提供的 CNAME 域名后缀包括：
- `taihangcda.cn`
- `thepacificxxs.com`
- 其他地域特定的 CNAME 域名

**用途**：为根域名（@）提供 CNAME 解析支持，绕过 DNS 协议限制。

### 4. 实际配置示例

以 `serverlessinsight-site` 项目为例：

| 域名 | DNS CNAME 指向 | 原因 |
|------|---------------|------|
| `serverlessinsight.com` (@) | `...ap-southeast-1.thepacificxxs.com` | 根域名使用阿里云 CNAME 域名 |
| `www.serverlessinsight.com` | `...oss-ap-southeast-1.aliyuncs.com` | 子域名使用标准 OSS Endpoint |

## State.json 配置规范

### v0.5.7 新增资源类型

ServerlessInsight v0.5.7 新增了 `ALIYUN_OSS_DNS_CNAME` 资源类型，用于跟踪 DNS CNAME 记录。

### 完整配置示例

```json
{
  "version": "3.0",
  "provider": "aliyun",
  "app": "your-app",
  "service": "your-service",
  "stages": {
    "prod": {
      "resources": {
        "buckets.your_bucket": {
          "mode": "managed",
          "region": "ap-southeast-1",
          "definition": {
            "bucketName": "your-bucket-prod",
            "acl": "PUBLIC_READ",
            "websiteConfiguration": {
              "indexDocument": "index.html",
              "errorDocument": "404.html"
            },
            "domain": "www.example.com"
          },
          "instances": [
            {
              "type": "ALIYUN_OSS_BUCKET",
              "sid": "si:aliyun:oss:prod:your-bucket-prod",
              "id": "your-bucket-prod",
              "bucketName": "your-bucket-prod",
              "location": "oss-ap-southeast-1",
              "creationDate": "2025-01-01T00:00:00.000Z",
              "storageClass": "Standard",
              "acl": "PUBLIC_READ"
            },
            {
              "type": "ALIYUN_OSS_DNS_CNAME",
              "sid": "si:aliyun:alidns:prod:example.com",
              "id": "example.com",
              "domain": "example.com",
              "cname": "your-bucket-prod.ap-southeast-1.thepacificxxs.com",
              "dnsRecordId": "2003723449998867456"
            },
            {
              "type": "ALIYUN_OSS_DNS_CNAME",
              "sid": "si:aliyun:alidns:prod:www.example.com",
              "id": "www.example.com",
              "domain": "www.example.com",
              "cname": "your-bucket-prod.oss-ap-southeast-1.aliyuncs.com",
              "dnsRecordId": "2003686009003140096"
            }
          ],
          "lastUpdated": "2026-03-18T00:00:00.000Z",
          "status": "ready"
        }
      }
    }
  }
}
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `instances[].type` | 资源类型：`ALIYUN_OSS_BUCKET` 或 `ALIYUN_OSS_DNS_CNAME` |
| `instances[].domain` | 自定义域名 |
| `instances[].cname` | CNAME 指向的目标域名 |
| `instances[].dnsRecordId` | 阿里云 DNS 记录 ID（可选，用于自动管理 DNS） |

## 配置步骤

### 1. 绑定自定义域名到 OSS Bucket

1. 登录 [OSS 控制台](https://oss.console.aliyun.com/)
2. 选择目标 Bucket
3. 进入 **Bucket 配置** > **域名管理**
4. 点击 **绑定域名**，添加 `example.com` 和 `www.example.com`

### 2. 配置 DNS CNAME 记录

#### 根域名（@）

| 配置项 | 值 |
|--------|-----|
| 记录类型 | CNAME |
| 主机记录 | @ |
| 记录值 | `your-bucket.region.thepacificxxs.com` |

#### www 子域名

| 配置项 | 值 |
|--------|-----|
| 记录类型 | CNAME |
| 主机记录 | www |
| 记录值 | `your-bucket.oss-region.aliyuncs.com` |

### 3. 获取 dnsRecordId

**方法一：阿里云 CLI**

```bash
aliyun alidns DescribeDomainRecords \
  --DomainName example.com \
  --RRKeyWord www \
  --output cols=RecordId,RR,Type,Value rows=DomainRecords.Record[]
```

**方法二：API 调用**

访问 [阿里云 API Explorer](https://api.aliyun.com/trial?product=Alidns&api=DescribeDomainRecords)

**方法三：浏览器开发者工具**

1. 打开 [云解析 DNS 控制台](https://dns.console.aliyun.com/)
2. 按 F12 打开开发者工具
3. Network 标签中找到 `DescribeDomainRecords` 请求
4. 查看响应中的 `RecordId` 字段

### 4. 配置 HTTPS（推荐）

1. 在 OSS 域名管理中，为自定义域名申请免费 SSL 证书
2. 或上传已有的 SSL 证书
3. 开启强制 HTTPS 跳转

## 常见问题

### Q1: 为什么根域名必须使用阿里云 CNAME 域名？

**A**: 这是 DNS 协议限制，不是阿里云要求。根域名如果直接 CNAME 到 OSS Endpoint，会影响其他记录（如 MX）。阿里云提供的 CNAME 域名（如 `thepacificxxs.com`）是专门优化过的解决方案。

### Q2: dnsRecordId 是必须的吗？

**A**: 不是必须的。如果省略：
- ServerlessInsight 会使用域名本身作为 ID
- 不会自动创建/删除 DNS 记录
- 需要手动管理 DNS

如果包含 dnsRecordId：
- ServerlessInsight 可以自动管理 DNS 记录
- 删除 Bucket 时会自动删除对应的 DNS 记录

### Q3: 只绑定一个域名可以吗？

**A**: 可以，但推荐同时绑定：
- 用户可能输入 `example.com` 或 `www.example.com`
- 只绑定一个会导致部分用户无法访问
- 对 SEO 有负面影响（搜索引擎可能视为两个不同网站）

### Q4: Bucket 在中国内地，需要注意什么？

**A**: 重要限制：
- 域名必须完成 ICP 备案
- 自 2025年3月20日起，新开通 OSS 服务的用户必须使用自定义域名访问

### Q5: 如何验证 CNAME 配置是否生效？

**A**: 使用 dig 命令：

```bash
dig example.com CNAME +short
dig www.example.com CNAME +short
```

如果返回 OSS 的域名，则配置正确。

## 相关文档

- [阿里云 OSS 自定义域名官方文档](https://help.aliyun.com/zh/oss/user-guide/map-custom-domain-names-5)
- [阿里云 OSS 访问域名类型](https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints)
- [阿里云静态网站托管](https://help.aliyun.com/zh/oss/user-guide/hosting-static-websites)

## 参考资料

- [RFC 1035 - Domain Names](https://www.rfc-editor.org/rfc/rfc1035) - DNS 协议规范
- [阿里云 OSS 产品文档](https://help.aliyun.com/zh/oss/)
- [ServerlessInsight v0.5.7 Release Notes](https://github.com/geek-fun/serverlessinsight/releases/tag/v0.5.7)