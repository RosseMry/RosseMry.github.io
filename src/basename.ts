/**
 * GitHub Pages serves the production build under /cv/ (matching the repo
 * name) — empty in dev, where Vite already serves from the root. Update the
 * '/cv' below (and public/404.html's pathSegmentsToKeep) if the repo is ever
 * renamed or moved to a custom domain/user page.
 */
export const BASENAME = import.meta.env.PROD ? './' : '';
