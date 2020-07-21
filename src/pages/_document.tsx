/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// Document creation date ref
const buildDate = new Date()

interface DocumentProps {
  styleTags: string
}

export default class extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {/* <link rel="stylesheet" href="/fonts/fonts.css" /> */}
          {this.props.styleTags}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-173129830-1"></script>
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-173129830-1', { 'optimize_id': 'OPT-WLTX6FX'});
            `,
          }}>
          </script>
          <script async defer type="text/javascript" src="//static.cdn.prismic.io/prismic.js?repo=stnew&new=true"></script>
        </Head>
        <body data-build={buildDate}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
