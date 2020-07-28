import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react'
import {
  prismicClient,
  fetchByDocType,
  filterPaths,
  mapPathsByParam,
} from 'lib/prismic'
import { SliceZone } from '@stnew/prismic-nextjs'
import { Layout } from 'components/Layout'
import { PrismicDocument } from 'types'

function Page({ page }: PrismicDocument): JSX.Element {
  return <SliceZone slices={page.body} />
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  const { page } = params
  const meta = await prismicClient.getSingle('meta', {})
  const document = await prismicClient.getByUID('page', page ? page[page.length - 1] : 'homepage', { ...previewData })

  return {
    props: {
      page: document.data,
      meta: meta.data,
      preview,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchByDocType('page')
  const paths = [{ params: { page: [''] } }, ...filterPaths(mapPathsByParam('page', results))]

  return {
    paths,
    fallback: false,
  }
}

Page.layout = Layout

export default Page
