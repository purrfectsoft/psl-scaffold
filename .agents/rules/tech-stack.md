---
trigger: always_on
---

# 🛠️ Tech Stack & Workflow

## Core Stack

- **Framework**: Next.js 15 (App Router).
- **Language**: TypeScript (Strict Mode).
- **Styling**: Tailwind CSS + `packages/ui` (Shadcn/Radix).
- **API**: tRPC v11 + React Query (Tanstack).
- **Database**: PostgreSQL + Prisma ORM.
- **Auth**: NextAuth v5 (Google Provider).
- **AI Context**: Context7 MCP (Mandatory for documentation lookup).

## Key Workflows

- **Dev Server**:
  - `pnpm dev` (Standard)
  - `pnpm dev:fresh` _(planned script; use once added to `package.json` for testing Auth/Redirects or ensuring clean port start)_.
- **Database**:
  - `pnpm db:push` _(planned script for schema prototyping; requires Prisma CLI and matching `package.json` script)_.
  - `pnpm migrate` _(planned script for versioned migrations; requires Prisma and migration setup)_.
  - `npx prisma studio` _(planned: use once Prisma schema and client are configured, as a database viewer)_.
- **Linting**: `pnpm lint`.

## Critical Patterns

- **Images**: Planned pattern — once `ImageWithFallback` is added under `@/components/ui/image-with-fallback`, prefer it for all images.
- **Layout**: Planned pattern — once `Section` and `Container` are implemented under `@/components/ui/layout-system`, use them for layout structure.
- **Fetching**: Planned pattern — once tRPC is wired up, use tRPC hooks (e.g. `trpc.example.useQuery`) in Client Components and the tRPC `caller` in Server Components.
