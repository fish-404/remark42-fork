module.exports = {
	overrides: [
		{
			files: ['**/*.ts'],
			env: {
				browser: true,
				es2021: true,
			},
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'prettier',
			],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: ['./tsconfig.json'],
			},
			plugins: ['@typescript-eslint'],
		},
		{
			files: ['**/*.{js,cjx}'],
			parser: 'espree',
			extends: ['eslint:recommended', 'prettier'],
			env: {
				node: true,
			},
		},
	],
}
