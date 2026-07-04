module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 200],
    "body-max-line-length": [0],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "infra",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};
