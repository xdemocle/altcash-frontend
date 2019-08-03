module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'react-app',
    'plugin:react/recommended'
  ],

  plugins: ['prettier', 'react'],

  rules: {
    'prettier/prettier': ['error'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      {
        allow: ['warn', 'error', 'debug', 'group', 'groupEnd']
      }
    ],
    'no-unused-vars': ['error'],
    'semi': ['warn', 'never'],
    'no-extra-semi': 'warn',
    'semi-spacing': 'warn',
    'camelcase': 'warn',
    'comma-dangle': ['warn', 'never'],
    quotes: ['warn', 'single'],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        MemberExpression: 1
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true
      }
    ],
    curly: 'error',
    'no-else-return': 'error',
    'no-lonely-if': 'error',
    'brace-style': 'error',
    'arrow-spacing': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'never'
      }
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+']
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true
        }
      }
    ],
    'no-trailing-spaces': 'warn',
    'no-multi-spaces': 'warn'
  }

  // parserOptions: {
  //   parser: 'babel-eslint'
  // }
}
