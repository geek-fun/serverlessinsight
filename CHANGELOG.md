# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.2] - 2026-06-26

### Fixed

- Remove misleading `-p`/`--port` flag from `si local` command. The local stack
  is a single unified HTTP server that multiplexes across all simulated cloud
  services (API Gateway, functions, buckets) — a single port flag creates false
  expectations about which service's port is being controlled.

## [0.7.1] - 2026-06-26

### Fixed

- Always set errorDocument=indexDocument and enable SupportSubDir for OSS
  static websites (#196) (#197)

### Added

- CDN integration with OSS and API Gateway CDN support (#195)
