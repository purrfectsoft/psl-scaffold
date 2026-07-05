#!/bin/bash

# Check if any files inside .gemini or other IDE brain folders are staged
staged_artifacts=$(git diff --cached --name-only | grep -E "\.gemini" || true)

if [ -n "$staged_artifacts" ]; then
  echo "❌ ERROR: Detected agent artifacts or IDE configuration files staged for commit:"
  echo "$staged_artifacts"
  echo "Please unstage these files before committing."
  exit 1
fi

exit 0
