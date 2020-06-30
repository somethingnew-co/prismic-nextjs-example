import React from 'react'
import { Container, Row, Col, Flex } from '@stnew/layout'
import styled from 'styled-components'
import { RichText } from 'prismic-reactjs'
import { Section } from 'components/Section'
import { Slice } from 'types'

const QuoteImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const QuoteText = styled.div`
  p {
    font-size: 2.5rem;
  }

  p::before {
    content: open-quote;
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Quote: React.FC<Slice> = ({ primary }) => {
  const {
    quote,
    byline,
    byline_image,
    theme,
  } = primary

  return (
    <Section theme={theme}>
      <Container>
        <Row>
          <Col span={9} mx="auto">
            <QuoteText>
              <RichText render={quote} />
            </QuoteText>
            <Flex alignItems="center">
              <QuoteImage src={byline_image.url} />
              <RichText as="div" ml={15}>{byline}</RichText>
            </Flex>
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

export default Quote
