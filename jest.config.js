const { defaults: tsjPreset } = require('ts-jest/presets')
module.exports = {
    ...tsjPreset,
    preset: 'react-native',
    moduleNameMapper: {
        '\\.svg$': '<rootDir>/__mocks__/svgMocks.js',
    },
    transform: {
        '^.+\\.jsx$': 'babel-jest',
        '\\.svg$': '<rootDir>/jest-svg-transformer.js',
        '^.+\\.tsx?$': [
          'ts-jest',
          {
            babelConfig: true,
          },
        ],
      },
    transformIgnorePatterns: [
        'node_modules/(?!(@react-native|react-native|react-native-keychain|react-native-button))',
    ],
    globals: {
       
    },
    setupFiles: [
        './node_modules/react-native-gesture-handler/jestSetup.js',
        './jest.mock.js',
    ],
    // This is the only part which you can keep
    // from the above linked tutorial's config:
    cacheDirectory: '.jest/cache',
}