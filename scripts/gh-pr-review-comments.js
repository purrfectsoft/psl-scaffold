/**
 * gh-pr-review-comments.js
 *
 * Fetches PR review comments for agent-driven code review workflows.
 *
 * Usage:
 *   node scripts/gh-pr-review-comments.js <PR_NUMBER>
 *   node scripts/gh-pr-review-comments.js <PR_NUMBER> <REVIEW_ID>
 *   node scripts/gh-pr-review-comments.js <PR_NUMBER> --delta
 *
 * TODO: Implement PR review comment fetching logic.
 * Refer to existing PSL repos (mm-website, purrfectcore-client, Jasper, purrmission)
 * for reference implementations.
 */

"use strict";

const { execSync } = require("child_process");

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage:");
    console.error("  node scripts/gh-pr-review-comments.js <PR_NUMBER>");
    console.error("  node scripts/gh-pr-review-comments.js <PR_NUMBER> <REVIEW_ID>");
    console.error("  node scripts/gh-pr-review-comments.js <PR_NUMBER> --delta");
    process.exit(1);
  }

  const prNumber = args[0];
  const reviewId = args[1];
  const isDelta = args.includes("--delta");

  console.log(`🔍 Fetching review comments for PR #${prNumber}...`);

  if (isDelta) {
    console.log("   Mode: Delta (unaddressed feedback only)");
  } else if (reviewId) {
    console.log(`   Review ID: ${reviewId}`);
  } else {
    console.log("   Mode: Discovery (listing all reviews)");
  }

  // TODO: Use `gh api` to fetch PR reviews and comments
  // TODO: Format output for agent consumption
  // TODO: Support delta mode (filter already-addressed comments)

  console.log("\n⚠️  gh-pr-review-comments.js is a stub — implement fetching logic above.");
}

main();
