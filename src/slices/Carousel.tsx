import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '@stnew/layout'
import { PrismicSlice } from '@stnew/prismic-types'
import { Section } from 'components/Section'

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

const Image = styled.img`
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
`

const Control = styled.button`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  border-radius: 50%;
  color: white;
  font-size: 1rem;
  width: 40px;
  height: 40px;
  line-height: 1;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: black;
  }
`

const NextButton = styled(Control)`
  right: 10%;
  line-height: 2.5;
`
const PrevButton = styled(Control)`
  left: 10%;
  line-height: 2.5;
`

const Carousel: React.FC<PrismicSlice> = ({ items }) => {
  const [index, setIndex] = useState(0)

  function prev(): void {
    setIndex(mod(index - 1, items.length))
  }

  function next(): void {
    setIndex(mod(index + 1, items.length))
  }

  return (
    <Section>
      <Container position="relative">
        <Image src={items[index].image.url} />
        <PrevButton onClick={prev}>{'◀'}</PrevButton>
        <NextButton onClick={next}>{'▶'}</NextButton>
      </Container>
    </Section>
  )
}

export default Carousel
