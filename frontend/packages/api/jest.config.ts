import type { Config } from 'jest'

const config: Config = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.ts$': '@swc/jest',
	},
	collectCoverageFrom: ['src/**/*.ts'],
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	moduleNameMapper: {
		'^@test/(.*)$': '<rootDir>/test/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default config
