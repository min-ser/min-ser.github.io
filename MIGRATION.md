# Root Migration Guide

## Target

`https://min-ser.github.io/` directly serves the current Career / Engineering Portfolio.

- Root: current web resume design
- `/expertise/`: selected and migrated legacy `_posts` engineering articles
- `/archive/`: archive index
- `/legacy-blog/`: preserved BlackCode/HUD legacy design
- `/Portfolio/...`: existing independent projects copied alongside the root site
- `/Portfolio/kms/`: retired and intentionally excluded from deployment

## Applying this package to the repository

1. Back up the current repository.
2. Copy this package to the repository root.
3. Extract your separately backed-up `Portfolio` directory into the repository root.
4. Delete `Portfolio/kms` if it still exists locally. The deploy workflow also excludes it as a safety guard.
5. Keep `Portfolio/study/ai` and `Portfolio/study/cs` if those projects are still in use; the workflow builds them automatically when present.
6. Commit and push to `main` or `master`.

The deployment workflow builds the root Next.js site first, then merges the remaining `Portfolio` content into the final GitHub Pages artifact.
