module.exports = {
  trailingComma: 'none',
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  bracketSpacing: true,
  importOrder: [
    '^@graphql/(.*)$',
    '^@common/(.*)$',
    '^@components/(.*)$',
    '^@pages/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: false
}
