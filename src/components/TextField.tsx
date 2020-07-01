import React, { ReactChildren } from 'react'
import styled from 'styled-components'
import { RichText as PrimsicRichText, Elements } from 'prismic-reactjs'
import { usePrismic } from '@stnew/prismic-nextjs'
import { Link } from 'components/Link'
import { Text } from './Text'
import { linkResolver } from 'lib/prismic/resolvers'

// Add unique key to props
function propsWithUniqueKey(props, key): { [any: string]: any } {
  return Object.assign(props || {}, { key })
}

const Image = styled.img`
 width: 100%;
`
interface HTMLSerializer {
  (
    type: string,
    element: any,
    content: null,
    children: ReactChildren,
    key: number,
  )
}

const htmlSerializer: HTMLSerializer = function (type, element, content, children, key) {
  let props = {}

  switch (type) {
    case Elements.heading1:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h1', typeStyle: 'h1' }, key), children)
    case Elements.heading2:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h2', typeStyle: 'h2' }, key), children)
    case Elements.heading3:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h3', typeStyle: 'h3' }, key), children)
    case Elements.heading4:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h4', typeStyle: 'h4' }, key), children)
    case Elements.heading5:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h5', typeStyle: 'h5' }, key), children)
    case Elements.heading6:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h6', typeStyle: 'h6' }, key), children)
    case Elements.paragraph:
      return React.createElement(Text, propsWithUniqueKey({ as: 'p', typeStyle: 'p1' }, key), children)
    case Elements.listItem:
      return React.createElement(Text, propsWithUniqueKey({ as: 'li', typeStyle: 'p1' }, key), children)
    case Elements.oListItem:
      return React.createElement(Text, propsWithUniqueKey({ as: 'li', typeStyle: 'p1' }, key), children)
    case Elements.list:
      return React.createElement('ul', propsWithUniqueKey(props, key), children)
    case Elements.oList:
      return React.createElement('ol', propsWithUniqueKey(props, key), children)
    case Elements.hyperlink:
      const targetAttr = element.data.target ? { target: element.data.target } : {}
      const relAttr = element.data.target ? { rel: 'noopener' } : {}
      props = Object.assign(
        {
          href: element.data,
        },
        targetAttr,
        relAttr,
      )
      return React.createElement(Link, propsWithUniqueKey(props, key), children)

    case Elements.image: // Image
      const linkUrl = element.linkTo ? element.linkTo.url || linkResolver(element.linkTo) : null
      const linkTarget = (element.linkTo && element.linkTo.target) ? { target: element.linkTo.target } : {}
      const linkRel = linkTarget.target ? { rel: 'noopener' } : {}
      const img = React.createElement(Image, { src: element.url, alt: element.alt || '' })
      return React.createElement(
        'div',
        propsWithUniqueKey({ className: [element.label || '', 'block-img'].join(' ') }, key),
        linkUrl ? React.createElement('a', Object.assign({ href: linkUrl }, linkTarget, linkRel), img) : img,
      )
    default:
      return null
  }
}

export const TextField: React.FC = ({ children }) => {
  const { linkResolver } = usePrismic()
  return (
    <PrimsicRichText
      render={children}
      linkResolver={linkResolver}
      htmlSerializer={htmlSerializer}
    />
  )
}
