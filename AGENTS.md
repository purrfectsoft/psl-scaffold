# {{PROJECT_NAME}} Agent Guide

This file defines baseline behavior for coding agents working in this repository.

## First Read

Start with these rule files before making changes:

- `.agent/rules/README.md` (Main Entry & Navigation Index)
- `.agent/rules/overview.md` (Tech Stack & Architecture)
- `.agent/rules/development.md` (Coding Standards & Workflows)
- `.agent/rules/code-review.md` (PR Delay & Comment Fetching)
- `.agent/rules/workflow.md` (GitHub Issue Lifecycle & Onboarding)

## Non-Negotiables

- Never commit directly to `{{DEFAULT_BRANCH}}`.
- Use focused, atomic commits.
- Do not suppress build, lint, or test failures silently.
- Do not edit lockfiles manually.
- Keep documentation and rules in sync with behavioral or workflow changes.

## Repo Shape

{{REPO_SHAPE_DESCRIPTION}}

<!-- Example for Monorepo: -->
<!-- This is a Turborepo monorepo. -->
<!-- - `apps/{{app}}`: {{description}}. -->
<!-- - `packages/*`: shared packages/config. -->
<!-- Respect app/package boundaries and prefer existing shared abstractions over duplication. -->

## MCP and Tooling

- MCP server source of truth is `mcp.json`.
- Use `pnpm mcp:sync` after MCP config changes.
- Use `pnpm mcp:inspect` to verify MCP server startup/connectivity.

## Working Style

- Prefer strict TypeScript-safe changes.
- Keep changes minimal and local to the task scope.
- Surface assumptions and risks clearly.
- When behavior changes, update docs in the same change.
