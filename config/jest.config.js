module.exports = {
	rootDir: '../',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js, ts, jsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
	moduleNameMapper: {
		'\\.(css|scss)$': '<rootDir>/config/jest.nullmapper.js',
	},
};
