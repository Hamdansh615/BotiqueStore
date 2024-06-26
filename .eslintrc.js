module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: 'off',
    "prettier/prettier": "off",
    'comma-dangle': 'off',
    'no-var': 'error',
    'new-cap': 'error',
    'no-alert': 'error',
    'max-lines': 'error',
    'max-depth': 'error',
    'no-shadow': 'off',
    'no-console': 'error',
    'no-debugger': 'error',
    'prefer-arrow-callback': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'max-statements-per-line': 'error',
    'react-native/no-inline-styles': 'off',
    'max-lines-per-function': ['error', 1500],
    '@typescript-eslint/no-shadow': ['error'],
    "react/no-unstable-nested-components": [
      "warn",
      { "allowAsProps": true }
    ]
  },
}
