import React from 'react'
import styled from 'styled-components'
import { RichText as PrismicRichText } from 'prismic-reactjs'
import { usePrismic } from '@stnew/prismic-nextjs'
import {
  color,
  layout,
  space,
  typography,
  compose,
  variant,
  system,
  position,
  border,
} from 'styled-system'
import { PrismicText } from 'types'


const isRichText = (obj: PrismicText): boolean => (
  obj
  && typeof obj === 'object'
  && obj.hasOwnProperty('type')
  && obj.hasOwnProperty('text')
  && obj.hasOwnProperty('spans')
)

const StyledText = styled('p')(
  compose(
    color,
    layout,
    space,
    typography,
    position,
    border,
  ),
  system({
    textTransform: true,
    whiteSpace: true,
  }),
  variant({
    prop: 'typeStyle',
    scale: 'typography',
    variants: { default: {} },
  }),
)

interface TextProps {
  typeStyle?: string
  as?: React.ElementType
}

export const Text: React.FC<TextProps> = ({ children, ...rest }) => {
  if (!children) return null
  let renderText = children

  if (
    typeof children !== 'string'
    && isRichText(children[0] as PrismicText)
  ) {
    renderText = PrismicRichText.asText(children[0])
  }

  return (
    <StyledText {...rest}>{renderText}</StyledText>
  )
}

export const RichText: React.FC<TextProps> = ({ children, as, ...rest }) => {
  const { linkResolver } = usePrismic()

  return (
    <Text {...rest} as={as || 'div'}>
      <PrismicRichText render={children} linkResolver={linkResolver} />
    </Text>
  )
}
