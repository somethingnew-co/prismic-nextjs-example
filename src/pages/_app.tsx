import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'
import { sliceMap } from 'slices'
import { PrismicProvider } from '@stnew/prismic-nextjs'
import { hrefResolver, linkResolver } from 'lib/prismic'
import { Theme } from 'styles/theme'
import 'styles/global.css'

const rootResolver = 'page'
const theme = new Theme('#ff5678')

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

type LayoutComponent = (props: any) => JSX.Element

type NextApp = AppProps & {
  Component: {
    layout: LayoutComponent
  }
}

export default function App({ Component, pageProps }: NextApp): JSX.Element {

  const Layout = Component.layout || 'main'

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({ 'event': 'optimize.activate' })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Demo</title>
      </Head>
      <ThemeProvider theme={theme}>
        <PrismicProvider
          slices={sliceMap as unknown as { [key: string]: (props: any) => JSX.Element }}
          linkResolver={linkResolver}
          hrefResolver={hrefResolver}
          rootResolver={rootResolver}
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
