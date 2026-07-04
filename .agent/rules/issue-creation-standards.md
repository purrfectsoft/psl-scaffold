# Issue Creation Standards

When creating or modifying GitHub Issues, you MUST adhere to the project's strict lifecycle standards.

## 1. Templates & Structure

Never create an unstructured issue. You must use the following schema for all "Work" issues (Features, Enhancements, Infra):

### Required Sections

1. **Objective / Preamble**: High-level goal.
2. **Acceptance Criteria**: Checkbox list of requirements.
3. **Implementation Brief**: Technical context or plan.
4. **QA Checklist**: Manual verification steps.

## 2. Title Format

- **Human Readable**: Titles must be concise, human-readable sentences or phrases.
- **No Prefixes**: Do NOT use conventional commit prefixes (e.g., `feat:`, `chore:`) in issue titles.
- **Exceptions**: Use square bracket labels only for high-level highlighting, e.g., `[Epic]`, `[Urgent]`.

## 3. Labeling

You must apply exactly one `type:*` label. Applying a `priority:*` label is recommended.

### Types (One Required)

- `type: feature` — New capabilities
- `type: enhancement` — Improvement to existing features
- `type: bug` — Fixes
- `type: infra` — DevOps/Config
- `type: docs` — Documentation
- `type: epic` — Tracking parents
- `type: stub` — Ideas, Incubation, Placeholders

### Priority (Optional but Recommended)

- `priority: P0` — Critical/Urgent
- `priority: P1` — High/Important
- `priority: P2` — Medium/Normal
- `priority: P3` — Low/Nice to have

## 4. Tooling

Use `gh issue create` with the `--label` and `--body` (or `--body-file`) flags to ensure compliance.
