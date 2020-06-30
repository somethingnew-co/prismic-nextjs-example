import Prismic from 'prismic-javascript'
import { apiEndpoint, accessToken } from './config'

export const prismicClient = Prismic.client(apiEndpoint, { accessToken })

export async function fetchByDocType(type: string, options = {}): Promise<any> {
  return prismicClient.query(Prismic.Predicates.at('document.type', type), options)
}
