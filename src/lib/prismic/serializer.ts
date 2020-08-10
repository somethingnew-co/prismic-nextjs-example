import { Elements } from 'prismic-reactjs'
import { PrismicLink } from '@stnew/prismic-nextjs'

import {
  HTMLSerializerElementMap,
  HTMLSerializerPropsFunction,
} from '@stnew/prismic-react/dist/types'

import { Text } from 'components/Text'
import styled from 'styled-components'

const Image = styled.img`
 width: 100%;
`

const ListItem = styled.li`
  font-style: italic;
`

const linkProps: HTMLSerializerPropsFunction = element => ({
  link: element.data,
})

const imgProps: HTMLSerializerPropsFunction = element => ({
  src: element.url,
  alt: element.alt || '',
  copyright: element.copyright || '',
})


export const elementMap: HTMLSerializerElementMap = {
  [Elements.heading1]: [Text, { as: 'h1', typeStyle: 'h1' }],
  [Elements.heading2]: [Text, { as: 'h2', typeStyle: 'h2' }],
  [Elements.paragraph]: [Text, { as: 'p', typeStyle: 'p1' }],
  [Elements.listItem]: [Text, { as: ListItem }],
  [Elements.hyperlink]: [PrismicLink, linkProps],
  [Elements.image]: [Image, imgProps],
}
