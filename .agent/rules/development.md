---
trigger: always_on
---

# 🛠️ Development Standards & Workflows

## 🛡️ Guardrails & Safety First

1. **Branching Strategy**: **NEVER** commit directly to `{{DEFAULT_BRANCH}}`. Always create feature (`feat/`), bugfix (`fix/`), or chore (`chore/`) branches.
2. **Environment & Sync**: Run `git status` to ensure a clean slate before any commits. Propose gitignoring newly discovered temporary files instead of committing them.
3. **Dependencies & CVEs**: Do not install packages without approval. Run `{{PACKAGE_MANAGER}} audit` before upgrades/additions to check for vulnerability alerts.
4. **Shell Portability**: Prefer PATH-based discovery for `{{PACKAGE_MANAGER}}`. Verify active package manager and runtime versions on startup using `{{PACKAGE_MANAGER}} -v && node -v`.
5. **Fail Early**: Stop execution immediately on any non-zero exit code. Never ignore lint, test, or build errors.

## 📝 Code Standards & TypeScript Guidelines

- **Strict TypeScript**: Do not use `any`. Use `unknown` with type guards or explicit TypeScript types/interfaces for all variables and props.
- **React & Styling**: Use functional components with named exports. Utilize shared UI design primitive components from `{{UI_PACKAGE_ALIAS}}` (e.g., `@workspace/ui`).
- **State**: Optimize performance using `useMemo` and `useCallback` for complex structures or expensive computations.
- **Server Safety**: Use `server-only` declarations for pure data logic to prevent leaks.
- **Shared Schemas**: Define validation schemas under `{{VALIDATORS_PATH}}` (e.g., `packages/validators`) to ensure type consistency across client and server boundaries.

---

## 🚀 Key Workflows

Run the following scripts from the root directory:

### 1. Local Development & Verification

- **Dev Server**: `{{PACKAGE_MANAGER}} dev`
- **Build**: `{{PACKAGE_MANAGER}} build` (turbo-powered production compilation).
- **Linting**: `{{PACKAGE_MANAGER}} lint` (turbo-powered static analysis checks).
- **Format**: `{{PACKAGE_MANAGER}} format` (run Prettier format).
- **Typecheck**: `{{PACKAGE_MANAGER}} typecheck` (run TypeScript strict compiler checks).

### 2. Database Workflows (if applicable)

- **Db Schema Prototyping**: `{{PACKAGE_MANAGER}} db:push` (direct schema push).
- **Client Generation**: `{{PACKAGE_MANAGER}} db:generate` (generates db client).
