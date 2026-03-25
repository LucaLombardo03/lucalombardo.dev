# lucalombardo.dev

This repository is prepared for GitHub Pages publishing from the `docs/` folder.

## Publish on GitHub Pages

1. Push the repository to GitHub.
2. Open `Settings > Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Select your main branch and the `/docs` folder.
5. Save and wait for the first deployment.

Whenever you update the site files in the project root, run `.\sync-pages.ps1` before pushing so `docs/` stays in sync.

## Public files

Only the static site files inside `docs/` should be published.
