# 🗺️ Project Structure Map

This is a {{MONOREPO_TOOL}} monorepo.

## 📂 Apps

- **`apps/{{APP_NAME}}`**: {{APP_DESCRIPTION}}.
  - `app/` or `src/app/`: App Router / Entry point.
  - `components/`: UI Components.
  - `lib/`: Utilities.
  - `server/`: API Routers & Context (if applicable).

## 📦 Packages (Shared)

- **`packages/ui`**: Shared Design System.
- **`packages/config`**: Shared configurations (ESLint, TS, Tailwind).
- **`packages/validators`**: Shared Zod schemas.
- **`packages/database`**: Prisma Client singleton (if applicable).

## 🧭 Navigation Tips

- All new features belong in `apps/` unless explicitly shared.
- Use `@/` or `@workspace/` alias for root imports.
