/**
 * apollo-http-link.js
 */
import { ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import AWSAppSyncClient from 'aws-appsync'
import { createAuthLink } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'
// import Auth from '@aws-amplify/auth'
import appSyncConfig from '../../aws-exports'

const config = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey
    // jwtToken: async () =>
    //   (await Auth.currentSession()).getIdToken().getJwtToken()
  }
  // cacheOptions: {
  //   dataIdFromObject: (obj) => {
  //     let id = defaultDataIdFromObject(obj)

  //     if (!id) {
  //       const { __typename: typename } = obj
  //       switch (typename) {
  //         case 'Comment':
  //           return `${typename}:${obj.commentId}`
  //         default:
  //           return id
  //       }
  //     }

  //     return id
  //   }
  // }
})

export default ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError}`)
    }
  }),
  createAuthLink(config),
  createSubscriptionHandshakeLink(config)
])
