import React from 'react'
import styled from 'styled-components'
import { Text } from 'components/Text'
import { RichText } from 'prismic-reactjs'
import { Box, Container, Row, Col, Flex } from '@stnew/layout'
import { PrismicSlice } from '@stnew/prismic-types'
import { Section } from 'components/Section'

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

const Quote: React.FC<PrismicSlice> = ({ primary }) => {
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
              <Box ml={15}>
                <Text as="div">{byline}</Text>
              </Box>
            </Flex>
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

export default Quote
