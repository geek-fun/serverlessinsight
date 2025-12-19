# Contributing to ServerlessInsight

Thank you for your interest in contributing to ServerlessInsight! This document provides guidelines and setup instructions for contributors.

## Development Setup

### Prerequisites

- Node.js 22.x or higher
- npm (comes with Node.js)
- Git

### Local Development

1. Fork and clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/serverlessinsight.git
   cd serverlessinsight
   ```

2. Install dependencies
   ```bash
   npm ci
   ```

3. Build the project
   ```bash
   npm run build
   ```

4. Run tests
   ```bash
   npm test
   ```

5. Run linter
   ```bash
   npm run lint:check
   # Or auto-fix issues
   npm run lint:fix
   ```

## Release Process

### NPM Publishing Setup (Maintainers Only)

The release workflow automatically publishes to npm when a new version is tagged. To avoid OTP (One-Time Password) authentication errors during automated publishing:

#### Setting up NPM Automation Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Go to **Access Tokens** in your account settings: `https://www.npmjs.com/settings/<your-username>/tokens`
3. Click **Generate New Token**
4. Select **Automation** token type (this bypasses 2FA/OTP requirements)
5. Set appropriate permissions (publish access required)
6. Copy the generated token

#### Configuring GitHub Secret

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Create or update the secret named `NPM_TOKEN`
4. Paste the automation token as the value
5. Save the secret

**Important Notes:**
- **Automation tokens** do NOT require OTP for publishing (they bypass 2FA)
- **Publish tokens** will fail in CI/CD because they require OTP
- The token should have publish permissions for the `@geek-fun/serverlessinsight` package
- Keep your tokens secure and rotate them periodically

### Troubleshooting NPM Publishing

If you encounter the error:
```
npm error code EOTP
npm error This operation requires a one-time password from your authenticator.
```

This means the `NPM_TOKEN` secret is:
- Not set in GitHub secrets, OR
- Using a "Publish" token instead of an "Automation" token, OR
- The token has expired or been revoked

**Solution:** Follow the NPM Automation Token setup instructions above.

## Contribution Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Write code following existing style
   - Add tests for new functionality
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/) format
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Ensure CI checks pass

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint:fix` before committing
- Follow TypeScript best practices
- Add JSDoc comments for public APIs

## Testing

- Write tests for all new features
- Maintain or improve code coverage
- Run `npm test` before submitting PRs
- Tests should be deterministic and isolated

## Questions?

If you have questions or need help, feel free to:
- Open an issue on GitHub
- Join our community discussions
- Reach out to the maintainers

Thank you for contributing! 🎉
