module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:@next/next/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      {
        allow: ['warn', 'error', 'debug', 'group', 'groupEnd']
      }
    ],
    'no-unused-vars': ['warn'],
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off'
  }
};
