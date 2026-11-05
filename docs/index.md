# Documentation

- [Provider/region deployment identity, state formats and migration](regional-deployment-state.md)
- [State locking and recovery](state-locking.md)
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
