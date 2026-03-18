# State Locking

## Overview

ServerlessInsight implements automatic state locking to prevent concurrent modifications to your infrastructure state. This prevents state corruption and race conditions when multiple team members or CI/CD pipelines attempt to modify the same stack simultaneously.

## How It Works

State locking is **automatic and transparent** during normal operations. When you run commands that modify infrastructure (`deploy` or `destroy`), ServerlessInsight:

1. **Acquires a lock** before making any changes
2. **Performs the operation** while holding the lock
3. **Releases the lock** automatically on completion or error

## Lock Behavior

### Automatic Locking

Locking happens automatically for these commands:

- `si deploy` - Locks during deployment
- `si destroy` - Locks during destruction

No manual lock/unlock commands are needed for normal operations.

### Lock Acquisition

- **Timeout**: 10 minutes by default
- **Retry**: Exponential backoff (2s, 4s, 8s, 16s, 30s max)
- **Storage**:
  - **Local backend**: `.serverlessinsight/state.json.si-lock` file (local file system)
  - **Remote backend**: Lock object stored alongside state in the remote backend (e.g., OSS/COS bucket), shared across machines/CI runners

### Lock Information

Each lock contains:

- **ID**: Unique identifier for the lock
- **User**: Email or username@hostname
- **Process**: Operation type and process ID
- **Host**: Machine hostname
- **Timestamp**: When the lock was acquired
- **Path**: Path to the state file

## When Lock Acquisition Fails

If another operation holds the lock, you'll see an error like:

```
Error: State is currently locked

Lock Info:
  ID:        abc123-def456
  Held by:   alice@example.com
  Process:   si deploy (PID 54321)
  Host:      dev-laptop-42
  Acquired:  2026-01-09 10:15:30 UTC (3 minutes ago)
  Operation: deploy

Failed to acquire lock after 600 seconds.

If you are certain no other operation is running, use:
  si force-unlock abc123-def456
```

### What To Do

1. **Wait for the operation to complete** - Check with the lock holder if possible
2. **Verify no operation is running** - Check the host machine and process
3. **Force unlock if necessary** - Only if you're absolutely certain no operation is running

## Force Unlock (Emergency Recovery)

Use force-unlock only when you're certain no other operation is running. Forcing a lock while another operation is active can cause state corruption.

### Command

```bash
si force-unlock <LOCK_ID>
```

### Example

```bash
$ si force-unlock abc123-def456

Current lock information:

Lock Info:
  ID:        abc123-def456
  Held by:   alice@example.com
  Process:   si deploy (PID 54321)
  Host:      dev-laptop-42
  Acquired:  2026-01-09 10:15:30 UTC (45 minutes ago)
  Operation: deploy

⚠️  WARNING: Force unlocking can cause state corruption if another
operation is still running!
Are you absolutely sure? (yes/no): yes
✓ Lock released
```

### When to Use Force Unlock

- **Process crashed**: The deployment process crashed but left the lock file
- **Machine powered off**: The machine running the deployment is no longer accessible
- **Stale lock**: Lock has been held for an unreasonable time (hours) with no activity
- **CI/CD failed**: A CI/CD job failed to release the lock properly

### When NOT to Use Force Unlock

- **Operation is still running**: Another user's deployment is actively running
- **Uncertain**: You're not sure if another operation is running
- **Convenience**: You don't want to wait for another operation to finish

## Stale Lock Detection

Locks held for more than 1 hour are considered potentially stale and will be flagged in error messages, but they are NOT automatically removed. You must use `force-unlock` to remove them.

## Performance

State locking adds minimal overhead:

- **Local state backend (file system)**:
  - Lock acquisition: <50ms
  - Lock release: <10ms
  - No network calls (local file system only)
- **Remote state backends (e.g., OSS/COS)**:
  - Lock acquisition/release involves storage API requests over the network
  - Additional latency is typically small compared to overall deployment time

## Troubleshooting

### "State is currently locked" Error

**Problem**: You receive a lock error when trying to deploy.

**Solution**:

1. Check if another deployment is actually running
2. Wait for it to complete, or
3. Use `force-unlock` if you're certain no operation is running

### Lock File Remains After Crash

**Problem**: A deployment crashed but the lock file wasn't removed.

**Solution**:

```bash
si force-unlock <LOCK_ID>
```

### Multiple Concurrent CI/CD Jobs

**Problem**: Multiple CI pipelines trying to deploy the same stack.

**Solution**:

- Configure your CI/CD to prevent concurrent deployments (e.g., GitLab's `resource_group`, GitHub Actions concurrency groups)
- Only one deployment will succeed; others will wait or fail with a lock error

## Limitations

- **Local file system**: When using local state files, locking is limited to that machine's file system
- **Same machine (local backend)**: For purely local state, locks are only effective on a single machine (not distributed)
- **Backend-dependent behavior**: When using remote state backends (e.g., OSS/COS), locking behavior and performance depend on the remote storage API and network conditions

## Best Practices

1. **Coordinate deployments**: Communicate with your team about ongoing deployments
2. **CI/CD serialization**: Configure your CI/CD to serialize deployments per stack
3. **Monitor locks**: If you frequently see lock errors, investigate your deployment patterns
4. **Verify before force-unlock**: Always verify no operation is running before forcing unlock
5. **Document force-unlocks**: Keep a record of when and why you used force-unlock

## FAQ

### Q: Do I need to manually lock/unlock?

**A**: No. Locking is automatic for all modification operations.

### Q: What happens if my process crashes?

**A**: The lock will remain until you use `force-unlock`. This prevents partial deployments from corrupting state.

### Q: Can multiple people deploy simultaneously?

**A**: No. Only one deployment operation can proceed at a time for a given stack.

### Q: Does locking work across different machines?

**A**: It depends on the state backend:

- **Local backend**: Locks are local to a single machine. For team collaboration with a local backend, use a shared CI/CD system so only one runner operates on the stack at a time.
- **Remote backend**: Yes. The lock object is stored in the shared remote backend, so it is effective across different machines and CI runners that use the same state.

### Q: How do I know if a lock is stale?

**A**: Locks older than 1 hour are flagged as potentially stale, but you must verify manually.

### Q: Can I disable locking?

**A**: No. Locking is always enabled to prevent state corruption.
