import React from 'react'
import { Container, Row, Col } from '@stnew/layout'
import { PrismicSlice } from '@stnew/prismic-types'
import { TextField } from 'components/TextField'
import { Section } from 'components/Section'
import { Button } from 'components/Button'
import { valignSwitch } from 'lib/prismic/helpers'

const ContentItem: React.FC<{
  item: any
  length: number
}> = ({ item, length }) => {

  const {
    content,
    text_align,
    vertical_align,
    cta_link,
    cta_label,
  } = item

  const valign = valignSwitch(vertical_align)

  return (
    <Col
      span={[12, 12 / length]}
      display="flex"
      textAlign={text_align.toLowerCase()}
      flexDirection="column" justifyContent={valign}
    >
      <div>
        <TextField>{content}</TextField>
        {cta_link?.url && (
          <Button variant="ghost">{cta_label}</Button>
        )}
      </div>
    </Col>
  )
}

const Content: React.FC<PrismicSlice> = ({ primary, items }) => {
  const { theme } = primary
  const { length } = items
  return (
    <Section theme={theme}>
      <Container>
        <Row>
          {items.map((item, i) => <ContentItem key={i} item={item} length={length} />)}
        </Row>
      </Container>
    </Section>
  )
}

export default Content
