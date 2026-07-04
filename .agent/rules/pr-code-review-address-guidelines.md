# Code Review Workflow

## Fetching PR Review Comments

First ensure you are on the correct branch and it is up to date.

### Primary Method: GitHub MCP Server (Recommended)

1. Use `mcp_github_get_pull_request` to fetch the PR context.
2. Use `mcp_github_get_pull_request_reviews` and `mcp_github_get_pull_request_comments` for inline comments.
3. Cross-reference comments to build an action plan.

### Fallback Method: CLI Scripts

```bash
# Discover available reviews
node scripts/gh-pr-review-comments.js <PR_NUMBER>

# Fetch specific review
node scripts/gh-pr-review-comments.js <PR_NUMBER> <REVIEW_ID>

# Delta mode (unaddressed feedback only)
node scripts/gh-pr-review-comments.js <PR_NUMBER> --delta
```

### Important Rules

- **Always use MCP tools first.** Only fallback to scripts if MCP fails.
- **NEVER** commit review comment files to git.
- **Auto-Proceed**: Continue fixing, committing, pushing, and replying unless clarification is needed.
- Once addressed, post a Top Level Reply to the PR addressing all feedback.

## Reporting Format

### Required Sections

1. **High-Level Brief**: Grouped summary of fixes.
2. **Detailed Stats Table**: Reviewer, Comments, Status, Latest Activity (UTC).
3. **Condensed Stats Panel**: `<details>` block with assessment summary.

> Wrap all GitHub handles in backticks (e.g., `@user`) to avoid notifications.
> Use absolute UTC timestamps, never relative times.
