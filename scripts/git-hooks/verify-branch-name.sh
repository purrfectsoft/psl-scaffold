#!/bin/bash
# scripts/git-hooks/verify-branch-name.sh

BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null || true)

# Skip check for detached HEAD (no branch name)
if [[ -z "$BRANCH_NAME" ]]; then
  exit 0
fi

# Allowed prefixes (Aligned with Conventional Commits + Project Types)
ALLOWED_PREFIXES=("feat/" "fix/" "chore/" "infra/" "docs/" "refactor/" "test/" "revert/" "build/" "ci/" "perf/" "style/")

# Skip check for main/master
if [[ "$BRANCH_NAME" == "main" || "$BRANCH_NAME" == "master" ]]; then
  exit 0
fi

# Create a regex pattern from the allowed prefixes
# This joins the array elements with a '|'
PATTERN="^($(IFS=\|; echo "${ALLOWED_PREFIXES[*]}"))"

if [[ ! "$BRANCH_NAME" =~ $PATTERN ]]; then
  echo "❌ Error: Branch name '$BRANCH_NAME' does not follow convention."
  echo "   Allowed prefixes: ${ALLOWED_PREFIXES[*]}"
  echo "   Example: feat/user-login, fix/header-bug"
  exit 1
fi

exit 0
