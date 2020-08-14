/* eslint-disable no-console */
import React from 'react'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import { apolloClient } from 'lib/prismic'

function Page({ data, ...props }: Props): React.ReactElement {
  console.log(data, props)

  return (
    <main>
      <mark>Title</mark>
      <RichText render={data.title} />
      <RichText render={data.rich_text} />
    </main>
  )
}

interface Props {
  data: {
    title: RichTextBlock[]
    rich_text: RichTextBlock[]
  }
}

const ops = {
  type: 'landing_page',
  param: 'uid',
  rootUid: 'test-page',
}

apolloClient.config = ops
apolloClient.fields = `
  title
  rich_text
  body {
    ...on Landing_pageBodyHero {
      type
      primary {
        heading
        image
      }
    }
    __typename
  }
`

export const getStaticProps = apolloClient.staticProps
export const getStaticPaths = apolloClient.staticPaths

export default Page
