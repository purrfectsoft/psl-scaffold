#!/bin/bash
# scripts/git-hooks/verify-artifacts.sh

# Forbidden directories/files that shouldn't be committed
FORBIDDEN=("dist/" ".next/" "coverage/" "tmp/" "node_modules/")

# Check for staged files in forbidden areas
STAGED_FILES=$(git diff --cached --name-only)

EXIT_CODE=0

# Use process substitution or here-string to avoid subshell issues
if [ -n "$STAGED_FILES" ]; then
    while IFS= read -r file; do
      for pattern in "${FORBIDDEN[@]}"; do
        if [[ "$file" == "$pattern"* || "$file" == */"$pattern"* ]]; then
          echo "❌ Error: Attempting to commit artifact '$file'."
          echo "   Please remove it from staging (git reset HEAD \"$file\") and add to .gitignore."
          EXIT_CODE=1
        fi
      done
    done <<< "$STAGED_FILES"
fi

exit $EXIT_CODE
