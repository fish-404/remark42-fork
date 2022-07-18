module.exports = {
	'./**/*.{ts,js,cjs}': ['pnpm lint-staged:format', 'pnpm lint-staged:lint'],
}
