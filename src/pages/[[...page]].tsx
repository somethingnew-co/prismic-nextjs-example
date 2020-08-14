import React from 'react'
import { defaultClient } from 'lib/prismic'
import { SliceZone } from '@stnew/prismic-nextjs'
import { Layout } from 'components/Layout'
import { PrismicDocument } from 'types'

function Page({ page }: PrismicDocument): JSX.Element {
  return <SliceZone data={page.body} />
}

const { staticProps, staticPaths } = defaultClient
  .getSingle('shared_meta', {}, 'meta')
  .getRepeatable({ type: 'page', param: 'page', rootUid: 'homepage' })
  .getStaticProps(async () => ({
    props: {
      test: 'TEST',
    },
  }))

export const getStaticProps = staticProps
export const getStaticPaths = staticPaths

Page.layout = Layout

export default Page
