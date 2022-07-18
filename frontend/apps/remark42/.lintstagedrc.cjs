module.exports = {
  './**/*.{ts,tsx,js,jsx}': ['pnpm lint-staged:lint:scripts', 'pnpm lint-staged:format'],
  './**/*.css': ['pnpm lint-staged:lint:styles', 'pnpm lint-staged:format'],
  './templates/**.html': ['pnpm lint-staged:lint:styles', 'cd apps/remark42 && pnpm lint-staged:format'],
};
