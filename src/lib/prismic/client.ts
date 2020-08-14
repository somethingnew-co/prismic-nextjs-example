import Prismic from 'prismic-javascript'
import { restEndpoint, graphqlEnpoint, accessToken } from './config'
import { PrismicNextRest } from './api/rest'
import { PrismicNextApollo } from './api/graphql'
import { PrismicLink as apolloLinkPrismic } from 'apollo-link-prismic'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'

export const defaultClient = new PrismicNextRest(Prismic.client(restEndpoint, { accessToken }))

export const apolloClient = new PrismicNextApollo(
  new ApolloClient({
    link: apolloLinkPrismic({ uri: graphqlEnpoint }),
    cache: new InMemoryCache(),
  }),
)

apolloClient.allQueries = gql`
  fragment AdditionalQueries on Query {
    meta: single_page(uid: "single", lang: $lang){
      title
      rich_text
    }

    test: single_page(uid: "single", lang: $lang){
      title
      rich_text
    }
  }
`
