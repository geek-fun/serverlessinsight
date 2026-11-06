# State Locking

## Overview

ServerlessInsight automatically coordinates state mutations through backend locks. Local lock acquisition uses an exclusive file create; SaaS coordinates deployment lifecycles on the server. Bucket Store retains best-effort locking for compatibility with OSS, COS and TOS bucket configurations. See the [known concurrency limitation](#known-issues-bucket-store-concurrency).

## How It Works

State locking is **automatic and transparent** during normal operations. When you run commands that modify infrastructure (`deploy` or `destroy`), ServerlessInsight:

1. **Acquires a lock** before making changes (see the backend-specific [Lock Acquisition](#lock-acquisition) behavior)
2. **Performs the operation** while holding the lock
3. **Releases the lock** automatically on completion or error

### Crash Safety (Ctrl+C / SIGTERM)

If you interrupt a running `deploy` or `destroy` with `Ctrl+C` (`SIGINT`) or `SIGTERM`, the CLI releases the active lock before exiting. The release is best-effort:

- **Local backend**: release is synchronous (a direct file `unlink`), so it always completes before the process exits.
- **Remote backend**: release is an async storage delete that may be cut short by the exit. If that happens, the remote lock is recovered automatically via the existing stale/dead-PID detection path (a lock older than 1 hour is flagged as stale, and a lock whose process ID is no longer alive on the same host is auto-released on the next acquisition attempt).

## Lock Behavior

### Automatic Locking

Locking happens automatically for these commands:

- `si deploy` - Locks during deployment
- `si destroy` - Locks during destruction
- `si migrate` - Locks source metadata changes and handoffs
- Automatic V3 state preparation - Uses the same whole-file/key lock

No manual lock/unlock commands are needed for normal operations.

### Lock Acquisition

- **Timeout**: 10 minutes by default
- **Retry**: Exponential backoff (2s, 4s, 8s, 16s, 30s max)
- **Local acquisition**: The lock file is created with `open(path, 'wx')` (`O_EXCL`). An existing file rejects the create atomically.
- **Bucket acquisition**: Read `<key>.si-lock`; if absent, write lock metadata with an ordinary PUT, then read it back and verify the ID. This sequence is not atomic. It works identically with bucket versioning disabled, enabled or suspended; it does not query or change versioning, and does not require conditional-write headers. OSS, COS and TOS report `conditionalCreate: false`.
- **Storage**:
  - **Local backend**: `.serverlessinsight/state-<app>-<service>.json.si-lock` file (local file system)
  - **Remote backend**: `<key>.si-lock` in an OSS/COS/TOS bucket, shared across machines/CI runners

Local and Bucket locks address the complete aggregate across all stages, providers and regions. Planning may precede the lock; after acquisition the selected partition must still match its approved base. Writes merge a fresh aggregate so sibling updates survive. SaaS locks remain per deployment lifecycle.

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

The CLI force-unlock command applies to Local/Bucket locks. For SaaS, use the Console deployment force-unlock action, which identifies the immutable deployment UUID. Select the original provider/region when inspecting or recovering a deployment.

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
- **Remote state backends (e.g., OSS/COS/TOS)**:
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

**Problem**: A deployment crashed (e.g., SIGKILL, machine power loss) and the lock file wasn't removed.

**Solution**: Interruptions via `Ctrl+C`/`SIGTERM` are handled gracefully and release the lock. For a hard crash, the lock is recovered on the next acquisition attempt (dead-PID auto-release on the same host, or the stale-lock path), or you can run:

```bash
si force-unlock <LOCK_ID>
```

### Multiple Concurrent CI/CD Jobs

**Problem**: Multiple CI pipelines trying to deploy the same stack.

**Solution**:

- Configure your CI/CD to prevent concurrent deployments (e.g., GitLab's `resource_group`, GitHub Actions concurrency groups)
- A visible lock normally makes other writers wait or fail, but simultaneous acquisition can succeed in both processes. Bucket users must serialize all writers sharing a bucket/key.

## Known issues: Bucket Store concurrency

Bucket Store locking is best-effort on OSS, COS and TOS, including on buckets
without versioning. Two writers can both read an absent lock, then each write and
verify its own ID before the other writer replaces it. Both may proceed. Ownership
checks during release and hostname/PID-based recovery also do not provide
distributed exclusion. This limitation applies with bucket versioning disabled,
enabled or suspended; versioning does not resolve it, and si never queries or
changes it.

Serialize all mutating commands sharing the same bucket and exact state key,
including different stages, providers and regions, automatic state upgrades, and
SaaS handoffs. Use one deployment queue or coordinate all CI jobs and local users;
a concurrency group in one repository does not coordinate other repositories or
manual CLI runs. Force-unlock only after the original operation has stopped.

The existing YAML key, V4 aggregate, lock key and recovery commands are retained.
State backups and plan-base checks remain available, but do not make simultaneous
cloud operations safe. Local and SaaS locking behavior is unchanged.

## Limitations

- **Local file system**: When using local state files, locking is limited to that machine's file system
- **Same machine (local backend)**: For purely local state, locks are only effective on a single machine (not distributed)
- **Backend-dependent behavior**: When using remote state backends (e.g., OSS/COS/TOS), locking behavior and performance depend on the remote storage API and network conditions

## Best Practices

1. **Coordinate deployments**: Communicate with your team about ongoing deployments
2. **CI/CD serialization**: Serialize all Bucket mutations per bucket/key, across every writer
3. **Monitor locks**: If you frequently see lock errors, investigate your deployment patterns
4. **Verify before force-unlock**: Always verify no operation is running before forcing unlock
5. **Document force-unlocks**: Keep a record of when and why you used force-unlock

## FAQ

### Q: Do I need to manually lock/unlock?

**A**: No. Locking is automatic for all modification operations.

### Q: What happens if my process crashes?

**A**: If you interrupt it with `Ctrl+C` or `SIGTERM`, the lock is released before exit. If the process is killed abruptly (SIGKILL, power loss), the lock remains until the next acquisition attempt recovers it (dead-PID or stale-lock detection) or you run `si force-unlock`. Inspect the persisted state and cloud resources before retrying an interrupted deployment.

### Q: Can multiple people deploy simultaneously?

**A**: Local locks coordinate writers sharing one aggregate file. Bucket writers sharing a key must be externally serialized because acquisition is not atomic, including across different stages, providers and regions. SaaS deployments on different lifecycle IDs may run independently; the same lifecycle remains exclusive.

### Q: Does locking work across different machines?

**A**: It depends on the state backend:

- **Local backend**: Locks are local to a single machine. For team collaboration with a local backend, use a shared CI/CD system so only one runner operates on the stack at a time.
- **Bucket backend**: All machines/runners using the same bucket/key see the same lock object, but it does not guarantee mutual exclusion. Serialize writers externally.
- **SaaS backend**: The server coordinates the selected deployment lifecycle, independently of the client machine.

### Q: How do I know if a lock is stale?

**A**: Locks older than 1 hour are flagged as potentially stale, but you must verify manually.

### Q: Can I disable locking?

**A**: No. Locking is always enabled. Bucket Store users must also serialize writers because its lock acquisition is best-effort.
