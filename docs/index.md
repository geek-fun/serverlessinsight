# Documentation

- [Provider/region deployment identity, Bucket Store backend matrix and migration](regional-deployment-state.md)
- [State locking and recovery](state-locking.md)
- [Provider integration checklist](../.github/ISSUE_TEMPLATE/CONTRIBUTION.md#adding-a-workload-provider)
- [Local development](local-development.md)
- [Architecture decisions](adr/)

## Earlier delivery considerations

a CI/CD service considerations:

- Zero downtime

- health check
  - **Startup probes**

  - **Readiness probes**

  - **Liveness probes**

    > https://www.fairwinds.com/blog/a-guide-to-understanding-kubernetes-liveness-probes-best-practices

- Blue/green deployment

- canary deployment

- service access control(private/public/geo-blocker)

- Authentication/autorization

- Fast fail and rollback

- full stack local setup
