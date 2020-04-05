module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'react-app', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'jsx-quotes': [1, 'prefer-double'],
    'semi-style': ['warn', 'last'],
    'no-plusplus': 'off',
    'eol-last': 'warn',
    'max-len': ['warn', 80, { ignoreUrls: true }],
    'no-tabs': 'off',
    indent: ['warn', 2],
    'no-console': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    "react/jsx-filename-extension": ['warn', { "extensions": [".js", ".jsx",".tsx"] }],
    'react/jsx-props-no-spreading': 'off',
  },
}
