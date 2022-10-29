module.exports = {
	rootDir: '../',
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{ts,tsx}',
		'!**/node_modules/**',
		'!**/*.d.{ts,tsx}',
		'!**/*.interface.{ts,tsx}',
	],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/config/setupTests.ts'],
	testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
	moduleNameMapper: {
		'\\.(css|scss)$': '<rootDir>/config/jest.nullmapper.js',
	},
};
