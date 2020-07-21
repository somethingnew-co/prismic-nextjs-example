import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from '@stnew/layout'
import { TextField } from 'components/TextField'
import { Button } from 'components/Button'
import { PrismicSlice } from '@stnew/prismic-types'
import Experiment from 'components/Experiment'

const HeroImage = styled.img`
 width: 100%;
`

const Hero: React.FC<PrismicSlice> = ({ primary }) => {
  const {
    text,
    image,
    image_position,
    cta_link,
    cta_label,
  } = primary

  return (
    <section>
      <Container py={60}>
        <Row alignItems="center">
          <Col span={[12, 6]} order={1}>
            <Experiment />
            <TextField>{text}</TextField>
            {cta_link?.url && (
              <Button variant="primary">{cta_label}</Button>
            )}
          </Col>
          <Col span={[12, 6]} order={image_position ? 2 : 0}>
            <HeroImage src={image.url} alt={image.alt} />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
