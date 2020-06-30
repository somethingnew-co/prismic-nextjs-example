import { urlResolver } from '@stnew/prismic-nextjs'

const routes = {
  'index': 'homepage',
  'page': '/**',
}

export const linkResolver = urlResolver(routes)
export const hrefResolver = urlResolver(routes)
