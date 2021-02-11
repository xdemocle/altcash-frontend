const { ApolloServer, gql } = require('apollo-server')
const coinsList = require('./coinsList')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Coin {
    id: ID!
    name: String!
    symbol: String!
    markets: [ExchangeMarket!]!
  }

  type ExchangeMarket {
    id: ID!
    market: String!
    exchanger: String!
    isActive: Boolean!
    coin: Coin
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    coins(offset: Int, limit: Int, coin: String): [Coin!]
  }
`

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    coins: () => coinsList
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(` 🚀 Server ready at ${url}`)
})
