import { GetStaticProps } from 'next'
import React from 'react'
import { prismicClient } from 'lib/prismic'
import { SliceZone } from 'components/SliceZone'
import { Layout } from 'components/Layout'
import { PrismicDocument } from 'types'

function Index({ page }: PrismicDocument): JSX.Element {
  return <SliceZone slices={page.body} />
}

Index.layout = Layout

export const getStaticProps: GetStaticProps = async ({ preview = false, previewData }) => {
  const meta = await prismicClient.getSingle('meta', {})
  const page = await prismicClient.getByUID('page', 'homepage', { ...previewData })

  return {
    props: {
      page: page.data,
      meta: meta.data,
      preview,
    },
  }
}

export default Index
