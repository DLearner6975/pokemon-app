# Contributing

## Issue Intake

Use the GitHub issue templates so new work starts with the right context.

- Open a `Bug report` when something is broken, incorrect, or has regressed.
- Open a `Feature / new issue` when you are proposing a new capability, an improvement, or a scoped task.
- Search existing issues before creating a new one to avoid duplicates.

Good issues explain the problem first and provide enough detail for someone else to act on them without guessing.

## Choosing The Right Issue Type

### Bug report

Choose a bug report when the application does not behave as expected.

Include:

- what you expected to happen
- what actually happened
- reliable reproduction steps
- environment details when relevant
- logs or screenshots when they make the problem clearer

### Feature / new issue

Choose a feature or new issue when the goal is to add, improve, or plan work.

Include:

- the problem or opportunity
- the proposed change
- expected user impact or value
- references, examples, or screenshots if they help
- scope notes or constraints when known

Avoid opening feature issues that only state a solution without explaining the problem behind it.

## Pull Request Process

Before opening a PR:

- make sure the work is tracked by an issue when appropriate
- confirm the branch is ready for review
- run the local checks that match CI

When opening a PR:

- use the PR template
- explain what changed and why
- link the related issue or explain why one is not needed
- document how the change was validated
- include screenshots or UI notes for visible changes

## CI Expectations

Pull requests to `main` are expected to pass the baseline GitHub Actions workflow.

The CI workflow currently runs:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm build`

If one of these checks fails locally, fix that before requesting review.

## PR Closure And Branch Handling

PR lifecycle does not end at review. It also includes clean closure and branch cleanup.

- When a PR is merged, delete the source branch if it is no longer needed.
- When a PR is closed without merge, leave a short note explaining why it was closed and whether the branch should be kept for follow-up work.
- When a PR is replaced or superseded, link the newer PR so the branch history stays understandable.
- Do not keep stale branches around unless there is a clear reason to continue work on them.

## Repository Setting For Maintainers

To reinforce this process, maintainers should enable GitHub's automatic deletion of head branches after merge in the repository settings.
