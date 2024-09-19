# ServerlessInsight

[![Node.js CI](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml/badge.svg)](https://github.com/geek-fun/serverlessinsight/actions/workflows/node.yml)
[![release](https://github.com/geek-fun/serverlessinsight/actions/workflows/release.yml/badge.svg)](https://github.com/geek-fun/serverlessinsight/actions/workflows/release.yml)
[![npm version](https://badge.fury.io/js/@geek-fun%2Fserverlessinsight.svg)](https://badge.fury.io/js/@geek-fun%2Fserverlessinsight)
[![Known Vulnerabilities](https://snyk.io/test/github/geek-fun/serverlessinsight/badge.svg)](https://snyk.io/test/github/geek-fun/serverlessinsight)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![codecov](https://codecov.io/gh/geek-fun/serverlessinsight/graph/badge.svg?token=ISW7MFuSlf)](https://codecov.io/gh/geek-fun/serverlessinsight)

Full life cycle cross providers serverless application management for your fast-growing business.

## Quick Start

### prerequisites

- Node.js 16.x

### Install

```bash
npm install -g @geek-fun/serverlessinsight
```

### Usage

```bash
si -h
```

#### Initialize a new project

```bash
si init
```

#### Deploy the application

```bash
si deploy
```

#### Remove the application

```bash
si remove
```

## Development

Link ServerlessInsight globally to use the CLI tool.

```bash
npm run build
npm link
```

run the command then:

```bash
si -h
```
