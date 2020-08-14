import { GetStaticProps, GetStaticPaths } from 'next'
import gql from 'graphql-tag'
import { DocumentNode } from 'graphql'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

interface Config {
  type: string
  param: string
  rootUid?: string
  fallback?: boolean
}

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

export class PrismicNextApollo {
  private _config: Config
  private _fields: DocumentNode
  private _allQueriesFragment: DocumentNode | null = null

  constructor(public client: ApolloClient<NormalizedCacheObject>) {
    this.client = client
  }

  set config(config: Config) {
    this._config = config
  }

  set fields(splat: string) {
    this._fields = gql`
      fragment PrismicFields on ${capitalize(this._config.type)} {
        ${splat}
      }
    `
  }

  set allQueries(fragment: DocumentNode) {
    this._allQueriesFragment = fragment
  }

  get staticProps(): GetStaticProps {
    return async ({ params }) => {
      const {
        type,
        param,
        rootUid,
      } = this._config

      const uid = params[param] ? params[param][params[param].length - 1] : rootUid

      const variables = {
        uid,
        lang: 'en-us',
      }

      const QUERY = gql`
        query ($uid: String!, $lang: String!){
          ${type}(uid:$uid, lang: $lang){
            ...PrismicFields
          }
          ${this._allQueriesFragment ? '...AdditionalQueries' : ''}
        }

        ${this._fields}
        ${this._allQueriesFragment || ''}
    `
      const response = await this.client.query({ query: QUERY, variables })

      const { [type]: data, ...rest } = response.data

      return { props: { data, ...rest } }
    }
  }

  get staticPaths(): GetStaticPaths {
    return async () => {
      const {
        type,
        param,
        rootUid,
      } = this._config

      const allType = `all${capitalize(type)}s`

      const query = gql`
        query{
          ${allType}(lang: "en-us"){
            edges{
              node{
                _meta{
                  uid
                }
              }
            }
          }
        }
      `

      const { data } = await this.client.query({ query })

      const paths = data[allType].edges.map(({ node }) => {
        const { uid } = node._meta

        if (uid === rootUid) {
          return { params: { [param]: [] } }
        }

        return { params: { [param]: [uid] } }
      })

      return {
        paths,
        fallback: false,
      }
    }
  }
}
