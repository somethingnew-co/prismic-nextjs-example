import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'
import { sliceMap } from 'slices'
import { PrismicProvider } from '@stnew/prismic-nextjs'
import { hrefResolver, linkResolver } from 'lib/prismic'
import { Theme } from 'styles/theme'
import 'styles/global.css'
import { elementMap } from 'lib/prismic/serializer'

const theme = new Theme()

const Preview = styled.a`
  position: fixed;
  bottom: 0;
  right: 1rem;
  color: black;
  background: #ffcc78;
  text-decoration: none;
  padding: 0.33rem 0.75rem;
  border-radius: 0.5rem 0.5rem 0 0;
  line-height: 1;
  font-size: 14px;
`

type LayoutComponent = React.ReactType<NextApp>

type NextApp = AppProps & {
  Component: {
    layout: LayoutComponent
  }
}

export default function App({ Component, pageProps }: NextApp): JSX.Element {

  const Layout = Component.layout || 'main'

  return (
    <>
      <Head>
        <title>Demo</title>
      </Head>
      <ThemeProvider theme={theme}>
        <PrismicProvider
          slices={sliceMap}
          linkResolver={linkResolver}
          hrefResolver={hrefResolver}
          htmlSerializer={elementMap}
        >
          <Layout {...pageProps}>
            {pageProps.preview && (
              <Preview href="/api/preview/exit">Close Preview</Preview>
            )}
            <Component {...pageProps} />
          </Layout>
        </PrismicProvider>
      </ThemeProvider>
    </>
  )
}
