import React from 'react'
import { Container, Flex } from '@stnew/layout'
import { PrismicLink } from '@stnew/prismic-nextjs'
import { PrismicDoc } from '@stnew/prismic-types'
import styled from 'styled-components'
import { PrismicKeyText } from 'types'
import NextLink from 'next/link'

const HeaderLogo = styled.a`
  margin: 0;
  font-size: 2em;
  font-weight: 700;
  color: black;
  text-decoration: none;
`

const NavLink = styled(PrismicLink)`
  display: inline-block;
  padding: 15px;
  color: inherit;
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

interface Props {
  site_title: string
  nav: {
    link: PrismicDoc
    label: PrismicKeyText
  }[]
}

export const Header: React.FC<Props> = ({ site_title, nav }) => (
  <header>
    <Container my={30}>
      <Flex justifyContent="space-between" alignItems="center">
        <NextLink as="/" href="/[[...page]]" passHref>
          <HeaderLogo>
            {site_title}
          </HeaderLogo>
        </NextLink>
        <div>
          {nav.map(item => (
            <NavLink key={item.label} link={item.link}>{item.label}</NavLink>
          ))}
        </div>
      </Flex>
    </Container>
  </header>
)
