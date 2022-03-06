module.exports = {
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  bracketSpacing: true,
  importOrder: [
    '^@graphql/(.*)$',
    '^@common/(.*)$',
    '^@components/(.*)$',
    '^@pages/(.*)$',
    '^@assets/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: false
}
