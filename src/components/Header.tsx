import React from 'react'
import { Container, Flex } from '@stnew/layout'
import styled from 'styled-components'
import { Link } from './Link'
import { PrismicLink, PrismicKeyText } from 'types'

const HeaderLogo = styled.a`
  margin: 0;
  font-size: 2em;
  font-weight: 700;
  color: black;
  text-decoration: none;
`

const NavLink = styled(Link)`
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
    link: PrismicLink
    label: PrismicKeyText
  }[]
}

export const Header: React.FC<Props> = ({ site_title, nav }) => (
  <header>
    <Container my={30}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/" as={HeaderLogo}>{site_title}</Link>
        <div>
          {nav.map(item => (
            <NavLink key={item.label} href={item.link}>{item.label}</NavLink>
          ))}
        </div>
      </Flex>
    </Container>
  </header>
)
