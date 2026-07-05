# 🐾 PSL Repository Boilerplate

> **Purrfect Software Limited — Universal Agent & Workflow Boilerplate**

The canonical scaffolding template for all PSL repositories. Distilled from cross-analysis of 6 PSL repos (`mm-website`, `purrfectcore-client`, `Jasper`, `purrmission`, `garage-band`).

This repo is **not a project itself** — it is a template you copy into new or existing projects to bootstrap the PSL standard structure for agent rules, CI tooling, commit hygiene, and MCP integration.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start — New Project](#quick-start--new-project)
- [Applying to an Existing Project](#applying-to-an-existing-project)
- [Placeholder Reference](#placeholder-reference)
- [What's Included](#whats-included)
- [Per-Project Customization Guide](#per-project-customization-guide)
- [Post-Setup Verification Checklist](#post-setup-verification-checklist)
- [Scripts](#scripts)
- [FAQ](#faq)

---

## Prerequisites

Before applying this boilerplate, ensure you have:

| Tool                  | Version    | Check           |
| :-------------------- | :--------- | :-------------- |
| **Node.js**           | ≥ 22.0.0   | `node -v`       |
| **pnpm**              | ≥ 9.0.0    | `pnpm -v`       |
| **Git**               | any recent | `git --version` |
| **GitHub CLI**        | any recent | `gh --version`  |
| **nvm** (recommended) | any        | `nvm --version` |

```bash
# Enable corepack for pnpm if not already
corepack enable
```

---

## Quick Start — New Project

Use this when creating a **brand new** PSL repository from scratch.

### 1. Create the repo and copy the boilerplate

```bash
# Create your new project directory
mkdir my-new-project && cd my-new-project
git init

# Copy boilerplate files (exclude the spec file and README)
rsync -av --exclude='psl-agent-boilerplate.md' \
          --exclude='README.md' \
          --exclude='.git' \
          /path/to/psl-boilerplate/ ./
```

### 2. Replace all placeholders

Run the interactive placeholder replacement (or do it manually — see [Placeholder Reference](#placeholder-reference)):

```bash
# Example: replace project name everywhere
find . -type f \( -name '*.md' -o -name '*.json' -o -name '*.yaml' -o -name '*.js' \) \
  -exec sed -i 's/{{PROJECT_NAME}}/my-new-project/g' {} +
```

> **⚠️ Important**: Do NOT blindly `sed` all placeholders at once. Some are context-specific and need different values per file. Use the [Placeholder Reference](#placeholder-reference) table below to fill each one intentionally.

### 3. Install dependencies

```bash
nvm use          # reads .nvmrc → Node 22
pnpm install
```

### 4. Set up Husky hooks

```bash
pnpm prepare     # initializes Husky
chmod +x .husky/pre-commit .husky/commit-msg
```

### 5. Set up environment secrets (if using Pawthy)

```bash
# Edit .pawthyrc with your actual project/env IDs first, then:
pnpm env:pull
```

### 6. Sync MCP config

```bash
pnpm mcp:sync
```

### 7. Verify setup

```bash
pnpm lint        # should pass (or show expected warnings for empty project)
pnpm typecheck   # should pass
pnpm build       # should pass
```

### 8. First commit

```bash
git checkout -b chore/initial-scaffolding
git add .
git commit -m "chore: scaffold project from PSL boilerplate"
```

---

## Applying to an Existing Project

Use this when adding the PSL standard structure to a project that **already has code**.

### Step 1: Audit existing structure

Before copying, check what your project already has:

```bash
# In your existing project:
ls -la .agent/ .github/ .husky/ scripts/ 2>/dev/null
cat AGENTS.md 2>/dev/null
```

### Step 2: Copy only what's missing

**Do NOT blindly overwrite existing files.** Copy selectively:

```bash
# Agent rules (safe to copy if .agent/rules/ doesn't exist yet)
cp -rn /path/to/psl-boilerplate/.agent/ ./.agent/

# GitHub issue templates (safe to copy if ISSUE_TEMPLATE/ doesn't exist)
cp -rn /path/to/psl-boilerplate/.github/ ./.github/

# Husky hooks (review before copying — may conflict with existing hooks)
cp -rn /path/to/psl-boilerplate/.husky/ ./.husky/

# Root configs (copy only if missing)
for f in .editorconfig .nvmrc .lintstagedrc.json .pawthyrc commitlint.config.js; do
  [ ! -f "$f" ] && cp "/path/to/psl-boilerplate/$f" "./$f"
done

# AGENTS.md (copy if missing, merge if exists)
[ ! -f AGENTS.md ] && cp /path/to/psl-boilerplate/AGENTS.md ./
```

### Step 3: Merge configs that may conflict

These files likely already exist and need **manual merging**, not overwriting:

| File                  | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `package.json`        | Merge `scripts` and `devDependencies` sections   |
| `tsconfig.json`       | Merge `compilerOptions` — ensure `strict: true`  |
| `turbo.json`          | Merge `tasks` if Turborepo is already configured |
| `mcp.json`            | Merge `mcpServers` — add missing servers         |
| `.gitignore`          | Append missing patterns                          |
| `pnpm-workspace.yaml` | Verify `apps/*` and `packages/*` are listed      |

### Step 4: Replace placeholders and verify

Follow the same placeholder replacement and verification steps as the [Quick Start](#quick-start--new-project).

---

## Placeholder Reference

Every `{{PLACEHOLDER}}` in this boilerplate must be replaced with a project-specific value. Here is the complete reference:

### Required (Every Project)

| Placeholder                  | Where Used                                          | Example Value      | Description                    |
| :--------------------------- | :-------------------------------------------------- | :----------------- | :----------------------------- |
| `{{PROJECT_NAME}}`           | `AGENTS.md`, `package.json`                         | `mm-website`       | npm package / project name     |
| `{{DEFAULT_BRANCH}}`         | `AGENTS.md`, `guardrails.md`, `coding-standards.md` | `main` or `master` | Protected branch name          |
| `{{REPO_SHAPE_DESCRIPTION}}` | `AGENTS.md`                                         | _See below_        | One-paragraph repo description |

**Example `{{REPO_SHAPE_DESCRIPTION}}`:**

```
This is a Turborepo monorepo.
- `apps/web`: Next.js 15 marketing website.
- `packages/*`: shared packages/config.
Respect app/package boundaries and prefer existing shared abstractions over duplication.
```

### Project Structure

| Placeholder           | Where Used             | Example Value               | Description                |
| :-------------------- | :--------------------- | :-------------------------- | :------------------------- |
| `{{MONOREPO_TOOL}}`   | `project-structure.md` | `Turborepo`                 | Monorepo orchestrator name |
| `{{APP_NAME}}`        | `project-structure.md` | `web`                       | Primary app directory name |
| `{{APP_DESCRIPTION}}` | `project-structure.md` | `Next.js 15 marketing site` | What the app does          |

### Tech Stack

| Placeholder     | Where Used      | Example Value                 | Description             |
| :-------------- | :-------------- | :---------------------------- | :---------------------- |
| `{{FRAMEWORK}}` | `tech-stack.md` | `Next.js 15`                  | Primary framework       |
| `{{STYLING}}`   | `tech-stack.md` | `Tailwind CSS + Shadcn/Radix` | Styling approach        |
| `{{API_LAYER}}` | `tech-stack.md` | `tRPC v11`                    | API layer / protocol    |
| `{{DATABASE}}`  | `tech-stack.md` | `PostgreSQL + Prisma ORM`     | Database + ORM          |
| `{{AUTH}}`      | `tech-stack.md` | `NextAuth v5`                 | Authentication solution |

### Tooling & Secrets

| Placeholder                            | Where Used  | Example Value                     | Description               |
| :------------------------------------- | :---------- | :-------------------------------- | :------------------------ |
| `{{PRISMA_CWD}}`                       | `mcp.json`  | `apps/web`                        | Path to Prisma schema dir |
| `{{PAWTHY_PROJECT_ID}}`                | `.pawthyrc` | `proj_abc123`                     | Pawthy project ID         |
| `{{PAWTHY_ENV_ID}}`                    | `.pawthyrc` | `env_dev_xyz`                     | Pawthy environment ID     |
| `{{SECRET_KEY_1}}`, `{{SECRET_KEY_2}}` | `.pawthyrc` | `DATABASE_URL`, `NEXTAUTH_SECRET` | Secret names to sync      |

### Remove If Not Applicable

| Placeholder / Section                         | Remove If...                 |
| :-------------------------------------------- | :--------------------------- |
| Prisma server in `mcp.json`                   | No database / no Prisma      |
| `.pawthyrc`                                   | Not using Pawthy for secrets |
| `packages/database` in `project-structure.md` | No shared database package   |
| Database workflows in `tech-stack.md`         | No database                  |

---

## What's Included

```
psl-boilerplate/
├── .agent/rules/               # 9 agent rule files
│   ├── guardrails.md           #   Branch protection, error handling
│   ├── coding-standards.md     #   Code style, safety-first
│   ├── security-standards.md   #   Dependency audit, CVE response
│   ├── issue-creation-standards.md  #   Issue template schema
│   ├── issue-execution.md      #   Discovery → Analysis → Engagement
│   ├── pr-code-review-address-guidelines.md  #   PR review workflow
│   ├── project-structure.md    #   Monorepo map
│   ├── tech-stack.md           #   Stack & workflow declarations
│   └── onboarding.md           #   Agent quick-start
├── .github/
│   ├── copilot-instructions.md #   GitHub Copilot MCP config
│   └── ISSUE_TEMPLATE/         # 7 issue templates
│       ├── 01_feature.yml
│       ├── 02_enhancement.yml
│       ├── 03_bug.yml
│       ├── 04_infrastructure.yml
│       ├── 05_documentation.yml
│       ├── 06_epic.yml
│       └── 07_stub.yml
├── .husky/
│   ├── pre-commit              #   Branch name + artifact verification
│   └── commit-msg              #   commitlint integration
├── scripts/
│   ├── sync-mcp.js             #   MCP config sync (stub)
│   ├── test-mcp.js             #   MCP server health check (stub)
│   └── gh-pr-review-comments.js #  PR review comment fetcher (stub)
├── apps/.gitkeep               #   Monorepo apps directory
├── packages/.gitkeep           #   Monorepo packages directory
├── AGENTS.md                   #   Agent entrypoint
├── .editorconfig               #   Editor formatting
├── .gitignore                  #   Node/TS/monorepo ignores
├── .lintstagedrc.json          #   lint-staged config
├── .nvmrc                      #   Node 22
├── .pawthyrc                   #   Pawthy secret sync
├── commitlint.config.js        #   Conventional commits
├── mcp.json                    #   MCP server definitions
├── package.json                #   Root monorepo scripts
├── pnpm-workspace.yaml         #   Workspace config
├── tsconfig.json               #   Strict TypeScript base
└── turbo.json                  #   Turborepo task config
```

---

## Per-Project Customization Guide

After copying and replacing placeholders, you'll likely need to customize further based on your project type:

### Frontend-Only Project (No Database)

Remove or empty these:

- Delete `prisma` server from `mcp.json`
- Remove database entries from `tech-stack.md`
- Remove `packages/database` from `project-structure.md`
- Remove `DATABASE_URL` from `turbo.json` `globalEnv`
- Remove `.pawthyrc` if not using Pawthy

### Single App (Non-Monorepo)

- Delete `turbo.json`
- Delete `pnpm-workspace.yaml`
- Remove Turborepo from `package.json` devDependencies
- Update `package.json` scripts to run directly (e.g., `"dev": "next dev"` instead of `"dev": "turbo run dev"`)
- Remove monorepo safety section from `guardrails.md`
- Simplify `project-structure.md`

### Discord Bot / CLI Tool

- Update `tech-stack.md` framework to `Discord.js` / `Commander.js` / etc.
- Remove styling, API layer placeholders if N/A
- Update `project-structure.md` to reflect `src/` layout instead of `app/`

### Adding Project-Specific Agent Rules

Create additional rule files in `.agent/rules/` and reference them in `AGENTS.md` under "First Read":

```markdown
## First Read

...

- `.agent/rules/my-custom-rule.md` # ← add here
```

---

## Post-Setup Verification Checklist

Run through this checklist after applying the boilerplate to confirm everything is properly configured:

```
[ ] All {{PLACEHOLDER}} tokens have been replaced
    → grep -r '{{' . --include='*.md' --include='*.json' --include='*.yaml' --include='*.js'
    → Should return zero results

[ ] AGENTS.md references the correct default branch
    → grep 'DEFAULT_BRANCH\|main\|master' AGENTS.md

[ ] package.json has correct project name
    → cat package.json | head -3

[ ] .nvmrc matches your target Node version
    → cat .nvmrc

[ ] Husky hooks are executable
    → ls -la .husky/pre-commit .husky/commit-msg

[ ] pnpm install succeeds
    → pnpm install

[ ] Husky initializes
    → pnpm prepare

[ ] MCP config is valid JSON
    → node -e "require('./mcp.json')"

[ ] Lint passes (or shows only expected warnings)
    → pnpm lint

[ ] TypeScript strict mode is active
    → grep '"strict": true' tsconfig.json

[ ] .gitignore covers all build artifacts
    → Verify node_modules/, dist/, .next/, .env are listed

[ ] Git hooks work
    → git checkout -b test/verify-hooks
    → echo "test" > /tmp/test.txt
    → git add . && git commit -m "test: verify hooks"
    → Should trigger commitlint + pre-commit checks

[ ] Issue templates render correctly on GitHub
    → Push to GitHub and check Settings → Issues → Templates
```

---

## Scripts

The `scripts/` directory contains **stubs** that need implementation. Copy working versions from an existing PSL repo or implement from scratch:

| Script                     | What It Does                                                          | Reference Repos                       |
| :------------------------- | :-------------------------------------------------------------------- | :------------------------------------ |
| `sync-mcp.js`              | Syncs `mcp.json` → Claude Desktop / VS Code / Codex / Antigravity IDE | `mm-website`, `Jasper`, `purrmission` |
| `test-mcp.js`              | Spawns each MCP server and checks for a healthy response              | `mm-website`, `Jasper`                |
| `gh-pr-review-comments.js` | Fetches PR review comments via `gh api` for agent-driven code review  | All 4 main repos                      |

To copy from an existing repo:

```bash
# Example: copy sync-mcp.js from mm-website
cp /path/to/mm-website/scripts/sync-mcp.js ./scripts/sync-mcp.js
```

---

## FAQ

### Q: Should I commit the boilerplate spec file (`psl-agent-boilerplate.md`)?

**No.** That file is the source-of-truth reference that lives only in this boilerplate repo. Do not copy it into target projects.

### Q: What if my project already has an `AGENTS.md` / `CLAUDE.md` / `overview.md`?

Merge the content. The boilerplate `AGENTS.md` is designed to be the canonical entrypoint — rename or consolidate existing files into it.

### Q: Can I add more MCP servers to `mcp.json`?

Yes. Common additions:

- `postgres`: `@modelcontextprotocol/server-postgres` — direct DB access
- `gcloud`: `@google-cloud/gcloud-mcp` — GCP integration
- `freepik`: `mcp-remote https://api.freepik.com/mcp` — design assets

### Q: What Node version should I use?

The default is **Node 22** (`.nvmrc`). If your stack requires a different version (e.g., Jasper uses 24.9), update `.nvmrc` and the `engines` field in `package.json`.

### Q: Do I need all 7 issue templates?

At minimum, use `01_feature.yml` and `03_bug.yml`. The others are recommended for mature projects with structured workflows.

---

> **Maintained by**: Purrfect Software Limited
>
> **Last updated**: July 2026
>
> **Source**: Cross-analysis of `mm-website`, `purrfectcore-client`, `Jasper`, `purrmission`, `garage-band`
