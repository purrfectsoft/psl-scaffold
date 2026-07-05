#!/bin/bash

# Get current branch name
branch_name=$(git symbolic-ref --short HEAD)

# Define disallowed branches
if [[ "$branch_name" == "develop" || "$branch_name" == "main" || "$branch_name" == "master" ]]; then
  echo "❌ ERROR: Cannot commit directly to '$branch_name' branch."
  echo "Please create a feature branch (e.g. feat/..., fix/..., chore/...) and submit a PR."
  exit 1
fi

# Define allowed patterns
if [[ "$branch_name" =~ ^(feat|fix|chore|refactor|docs|style|test|ci|build)/ ]]; then
  exit 0
else
  echo "❌ ERROR: Branch name '$branch_name' does not match allowed patterns."
  echo "Allowed branch prefixes: feat/, fix/, chore/, refactor/, docs/, style/, test/, ci/, build/"
  exit 1
fi
