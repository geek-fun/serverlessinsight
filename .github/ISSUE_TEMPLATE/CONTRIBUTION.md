# Contributing to ServerlessInsight

## Introduction

First off, thank you for considering contributing to ServerlessInsight! It's people like you that make this project great.

## How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b [feat|doc|fix|refactor]/your-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the expectations for behavior when contributing to this project.

## Reporting Issues

If you find a bug, please create an issue using the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Provide as much detail as possible to help us understand and resolve the issue.

## Submitting Pull Requests

- Ensure your code follows the project's coding standards.
- Write clear, concise commit messages.
- Include tests for any new functionality.
- Ensure all tests pass before submitting your pull request.

## Adding a workload provider

A workload provider is not complete until its state-storage story is explicit. Work
through this checklist before proposing a new provider integration:

- [ ] Workload SDK client, planner/executor resources, schema entries and fixtures.
- [ ] **Storage-backend parity (required)**: `BUCKET_STORE` needs a native JSON object
      adapter for that provider's object storage, as OSS/COS/TOS already have. Route it
      through `resolveStateStorage` / `createStateBackend` in
      `src/common/stateBackend/index.ts` and reuse `createRemoteStateBackend` and
      `createAggregateStore` — never duplicate state, backup, migration or locking
      logic.
- [ ] Resolve credentials for the **storage** cloud (permanent and STS), never reuse
      another cloud's workload credentials, and fail before mutation when they are
      missing. Keep `storageProvider` / `storageRegion` independent of `-v` / `-r`
      workload overrides and reject unsupported storage providers explicitly.
- [ ] Adapter contract: HTTPS, the configured region, bounded connection/request
      timeouts and ordinary PUT/DELETE. Only a confirmed missing object reads as
      `null`; missing buckets, denied access, invalid JSON and network failures stay
      errors. Deleting a missing object is idempotent; other deletions stay visible.
- [ ] Locking follows the
      [Bucket Store compatibility policy](../../docs/state-locking.md#known-issues-bucket-store-concurrency):
      shared `<key>.si-lock`, ordinary PUT, read-back ownership verification,
      `conditionalCreate: false`, no bucket-versioning queries or changes, and a
      documented requirement to serialize all writers sharing a bucket/key.
- [ ] Tests: isolated adapter/factory unit tests plus SDK-mocked service tests over
      the real state lifecycle (automatic V3 upgrade, V4 round trips, backups, sibling
      partitions, migration ownership, lock/force-unlock, versioning scenarios and
      storage/verification failures). Keep every coverage metric at or above 85%.
- [ ] Documentation: update the backend matrix, YAML example, credential variables,
      required object permissions and concurrency limitation in both READMEs and
      `docs/regional-deployment-state.md`; update schema descriptions and both i18n
      files (`src/lang/en.ts`, `src/lang/zh-CN.ts`).

If a provider intentionally has no Bucket Store backend (for example a template-only
provider), document that explicitly in the provider matrix and keep
`resolveStateStorage` rejecting it. Never fall back silently to another cloud's SDK.

## Coding Standards

- Follow the typescript style Guide and pass all syle checkes
- Use [Prettier](https://prettier.io/) for code formatting.
- Ensure your code passes linting (`npm run lint:check`).

## Running Tests

- Run tests with `npm test`.
- Ensure all tests pass before submitting your pull request.

## Additional Resources

- [Project Documentation](https://serverlessinsight.geekfun.club/)
- [GitHub Repository](https://github.com/geek-fun/serverlessinsight)
- [GEEKFUN Community](https://www.geekfun.club/)
