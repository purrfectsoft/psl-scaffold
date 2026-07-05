---
trigger: always_on
---

# 🔍 Code Review & Pull Request Guardrails

## 🛡️ Pre-Merge Delay & Safety Checks

- **Mandatory PR Merge Delay**: Wait at least **10 minutes** before merging any pull request to allow reviewers and automated tools to post feedback.
- **Pre-Merge Review Check**: Immediately prior to merge, run the comment fetcher or check review comments using the GitHub MCP server to ensure all issues are resolved.
  `node scripts/gh-pr-review-comments.{{SCRIPT_EXTENSION}} <PR_NUMBER>` (e.g., `.js` or `.cjs`)
  Address, push, and reply to all feedback before merging.

---

## 📥 Fetching Review Comments

Always retrieve review comments using Git-ignored locations (e.g., `tmp/`) to save comment details. **NEVER** commit review comments files.

### Primary Method: GitHub MCP Server (Recommended)

1. Use `mcp_github_get_pull_request` to fetch the PR context.
2. Use `mcp_github_get_pull_request_reviews` and `mcp_github_get_pull_request_comments` for inline comments.
3. Cross-reference comments to build an action plan.

### Fallback Method: CLI Scripts

```bash
# 1. Discover active reviews
node scripts/gh-pr-review-comments.{{SCRIPT_EXTENSION}} <PR_NUMBER>

# 2. Fetch specific review comments
node scripts/gh-pr-review-comments.{{SCRIPT_EXTENSION}} <PR_NUMBER> <REVIEW_ID>

# 3. Delta Mode (Fetch only unaddressed comments)
node scripts/gh-pr-review-comments.{{SCRIPT_EXTENSION}} <PR_NUMBER> --delta --file ./tmp/new_feedback.md
```

- Parse priority levels from comments: `![critical]`, `![high]`, `![medium]`. Do not ignore feedback without explicit justification.
- **Auto-Proceed**: Execute fixes in focused, atomic commits, push changes, and reply to each thread.

---

## 📊 Review Statistics & Reporting

After addressing comments, post a top-level summary reply on the PR using this exact format:

### 1. High-Level Brief

- **Topic A**: Summary of fix.
- **Topic B**: Summary of fix.

### 2. Reviewer Stats Table

| Reviewer        | Comments | Status     | Latest  |
| :-------------- | :------- | :--------- | :------ |
| **`@username`** | 3        | ✅ 3 Fixed | 10m ago |

### 3. Condensed Stats Panel (Required Details Block)

Include a `<details>` block with this specific format:

```html
<details>
<summary>[Found and addressed a total of <Total> code review feedback from <Count> code reviews left by <ReviewerCount> reviewers between <StartTime> and <EndTime>. This Took ~<Duration> minutes for Antigravity Agent 47. Click to expand]</summary>

- **Reviewers**: <ReviewerCount> (`@reviewer`)
- **Coverage**: 100% Addressed
- **AI-Human Collaboration**: 🤖 Agent 47 x 👤 Reviewers
</details>
```

_Note: Wrap all GitHub usernames in backticks (e.g., `@user`) to prevent unwanted notifications._
