import React from 'react'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import { usePrismic } from '@stnew/prismic-nextjs'

export const TextField: React.FC<{ children: RichTextBlock[]}> = ({ children }) => {
  const { linkResolver, htmlSerializer } = usePrismic()
  return (
    <RichText
      render={children}
      linkResolver={linkResolver as () => string}
      htmlSerializer={htmlSerializer}
    />
  )
}
