# 🛠️ Tech Stack & Workflow

## Core Stack

- **Framework**: {{FRAMEWORK}} (e.g., Next.js 15 / Fastify / Discord.js)
- **Language**: TypeScript (Strict Mode)
- **Styling**: {{STYLING}} (e.g., Tailwind CSS + Shadcn/Radix)
- **API**: {{API_LAYER}} (e.g., tRPC v11 / REST / Discord Slash Commands)
- **Database**: {{DATABASE}} (e.g., PostgreSQL + Prisma ORM / SQLite)
- **Auth**: {{AUTH}} (e.g., NextAuth v5 / Discord OAuth)
- **AI Context**: Context7 MCP (Mandatory for documentation lookup)

## Key Workflows

- **Dev Server**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`
- **Type Check**: `pnpm typecheck` or `pnpm type-check`
- **Database** (if applicable):
  - `pnpm db:push` / `pnpm prisma:generate`
  - `pnpm prisma:studio`

## Critical Patterns

> Document project-specific patterns here, e.g.:
> - **Images**: MUST use `ImageWithFallback`.
> - **Layout**: MUST use `Section`, `Container` components.
> - **Fetching**: Use tRPC hooks / `useFetchQuery` / `usePostData`.
