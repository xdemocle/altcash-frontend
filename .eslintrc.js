module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:react/recommended', 'react-app', 'prettier'],

  plugins: ['react'],

  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      {
        allow: ['warn', 'error', 'debug', 'group', 'groupEnd']
      }
    ],
    'no-unused-vars': ['warn'],
    semi: ['warn', 'never'],
    'no-extra-semi': 'warn',
    'semi-spacing': 'warn',
    camelcase: 'warn',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'ignore',
        asyncArrow: 'ignore'
      }
    ],
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
