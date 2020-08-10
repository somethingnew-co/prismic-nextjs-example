import { urlResolver } from '@stnew/prismic-nextjs'

const routes = {
  'page': {
    href: '/',
    page: '/[[...page]]',
    root: 'homepage',
  },
  'about': {
    href: '/about',
    page: '/about',
  },
  'smoketest': {
    href: '/smoketest',
    page: '/smoketest',
  },
  'blog_home': {
    href: '/blog',
    page: '/blog',
  },
  'blog_post': {
    href: '/blog',
    page: '/blog/[post]',
  },
}


export const { linkResolver, hrefResolver } = urlResolver(routes)
