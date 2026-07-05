---
trigger: model_decision
---

# 📖 Project Overview & Architecture

This document provides a cohesive reference for the {{PROJECT_NAME}}'s technologies, project directory structure, core architectures, and development roadmap.

## 🛠️ Technology Stack

- **Runtime**: Node.js v{{NODE_VERSION}}+ (ES Modules / TypeScript).
- **Package Manager**: {{PACKAGE_MANAGER}} (e.g., pnpm with Turborepo monorepo workspaces).
- **Framework**: {{FRAMEWORK}} (e.g., Next.js 15 App Router).
- **Styling**: {{STYLING}} (e.g., Tailwind CSS + packages/ui Shadcn/Radix).
- **API Layer**: {{API_LAYER}} (e.g., tRPC v11 + React Query).
- **Database**: {{DATABASE}} (e.g., PostgreSQL + Prisma ORM).
- **Authentication**: {{AUTH}} (e.g., NextAuth v5).
- **AI Context**: Context7 MCP (Mandatory for documentation lookup).

## 🗺️ Workspace Structure Map

```
{{WORKSPACE_MAP}}
<!-- Example for Monorepo:
{{PROJECT_ROOT}}/
├── apps/
│   └── {{APP_NAME}}/            # Main application
└── packages/                    # Shared Workspace Packages
    ├── config/                  # Shared configs
    └── ui/                      # Shared design system components
-->
```

## 🏗️ Architecture & Decision Documents

When designing or modifying components, refer to the spec files in `docs/`:

- **System Architecture**: [docs/system-architecture.md](file:///{{PROJECT_ROOT_URL}}/docs/system-architecture.md) - Details and specifications of the architecture.

<!-- Add relevant document links here -->

## 🗺️ Roadmap & Priorities

- [ ] **Test Coverage**: Implement testing harness and add coverage for shared helpers.
- [ ] **Security Audits**: Run standard security updates.
