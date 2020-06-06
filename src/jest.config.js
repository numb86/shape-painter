module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
    '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@src(.*)$': '<rootDir>/$1',
    '^@shared(.*)$': '<rootDir>/shared/$1',
    '^@svg(.*)$': '<rootDir>/svg/$1',
    '^@tree(.*)$': '<rootDir>/tree/$1',
    '^@clientServer(.*)$': '<rootDir>/clientServer/$1',
  },
  testMatch: ['<rootDir>/**/__tests__/**.test.(ts|tsx)'],
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
};
