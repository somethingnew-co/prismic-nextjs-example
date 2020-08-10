import React from 'react'
import styled, { css } from 'styled-components'
import { space, layout, variant, compose, border, color, typography } from 'styled-system'
import { PrismicLink } from '@stnew/prismic-nextjs'
import { PrismicDoc } from '@stnew/prismic-types'

const buttonVariants = variant({
  variants: {
    primary: {
      bg: 'primary',
      color: 'white',
    },
    ghost: {
      color: 'white',
      borderColor: 'inherit',
    },
  },
})

const buttonComposition = compose(space, layout, border, color, typography)

const StyledButton = styled.button(
  () => css`
    font-family: inherit;
    font-size: 1rem;
    appearance: none;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    line-height: 1;
    padding: 0.65em 1.15em;
    text-decoration: none;
    touch-action: manipulation;
    white-space: nowrap;
    text-align: center;
  `,
  buttonVariants,
  buttonComposition,
)

interface Props {
  children: React.ReactNode
  link?: PrismicDoc
  onClick?: () => void
  variant?: string
}

export const Button: React.FC<Props> = function ({ children, link, onClick, ...rest }) {
  return link ? (
    <StyledButton as={PrismicLink} link={link} {...rest}>
      {children}
    </StyledButton>
  ) : (
    <StyledButton onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  )
}
