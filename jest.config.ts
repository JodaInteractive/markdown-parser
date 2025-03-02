import type { Config } from 'jest';

const config: Config = {
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
	preset: 'ts-jest',
	cache: true,
	verbose: true,
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
		'(.+)\\.js': '$1',
	},
};

export default config;
