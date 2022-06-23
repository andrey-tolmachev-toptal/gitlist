module.exports = {
  env: {
    browser: true,
    'es6': true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [ 'deprecation', 'react', '@typescript-eslint', 'simple-import-sort' ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      files: [ '**/src/**/*.@(spec|test).@(ts|tsx|js|jsx)' ],
      env: { jest: true }
    }
  ],
  plugins: [ 'deprecation', 'react', '@typescript-eslint', 'simple-import-sort' ],
  ignorePatterns: [
    'src/libs/**',
    'scripts',
    'public',
    'azure-pipeline',
    '.storybook',
    'build'
  ],
  rules: {
    // TODO: remove next rules ignore

    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',

    // end of remove
    'simple-import-sort/imports': 'error',
    'array-bracket-spacing': [
      'error',
      'always'
    ],

    'arrow-spacing': 'error',

    'camelcase': [ 1 ],

    'comma-dangle': [
      'error',
      'never'
    ],

    'class-methods-use-this': [
      'off'
    ],

    'curly': 'error',

    'eol-last': [
      'error', 'always'
    ],

    'function-paren-newline': [
      'off'
    ],

    'indent': [
      'error',
      4
    ],

    'jsx-quotes': [
      'error',
      'prefer-double'
    ],

    'key-spacing': [
      'error',
      { 'beforeColon': false }
    ],

    'keyword-spacing': 'error',

    'linebreak-style': [
      'error',
      'unix'
    ],

    'no-confusing-arrow': [
      'error',
      { 'allowParens': true }
    ],

    'no-param-reassign': [ 'off' ],

    'no-plusplus': [
      'error',
      { 'allowForLoopAfterthoughts': true }
    ],

    'no-unused-expressions': [
      'error',
      { 'allowTernary': true }
    ],

    'no-underscore-dangle': [
      'error',
      { 'allowAfterThis': true }
    ],

    'object-curly-spacing': [
      'error',
      'always'
    ],

    'padded-blocks': [
      'error',
      { 'classes': 'always' }
    ],

    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': 'block-like',
        'next': '*'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'block-like'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'return'
      }
    ],

    'prefer-template': 'error',

    'quotes': [
      'error',
      'single',
      { 'allowTemplateLiterals': true }
    ],

    'react/display-name': [
      'off'
    ],

    'react/prop-types': [
      'off'
    ],

    'react/jsx-curly-spacing': [
      'error',
      {
        'when': 'always',
        'children': true,
        'spacing': {
          'objectLiterals': 'never'
        }
      }
    ],

    'react/jsx-max-props-per-line': [ 1, { 'maximum': 1 } ],

    'semi': [
      'error',
      'always'
    ],

    'template-curly-spacing': [
      'error',
      'always'
    ],

    '@typescript-eslint/explicit-function-return-type': [ 'off' ],

    'deprecation/deprecation': 'warn'
  }
};
