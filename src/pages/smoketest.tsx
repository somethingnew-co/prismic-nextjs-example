import React from 'react'
import { defaultClient } from 'lib/prismic'
import { RichText, RichTextBlock } from 'prismic-reactjs'

function Smoketest({ smoketest: data }: Props): React.ReactElement {
  return (
    <main>
      <mark>Title</mark>
      <RichText render={data.title} />

      <mark>RichText</mark>
      <RichText render={data.richtext} />

      <mark>Color</mark>
      <div>{data.color}</div>

      <mark>Number</mark>
      <div>{data.number}</div>

      <mark>Date / timestamp</mark>
      <div>{data.date}</div>
      <div>{data.timestamp}</div>

      <mark>Select</mark>
      <div>{data.select}</div>

      <mark>Geopoint</mark>
      <div>{data.geopoint.latitude}, {data.geopoint.longitude}</div>

    </main>
  )
}

interface Props {
  smoketest: {
    boolean: PrismicBoolean
    boolean_true: PrismicBoolean
    title: RichTextBlock[]
    richtext: RichTextBlock[]
    date: PrismicDate
    timestamp: PrismicTimestamp
    select: PrismicSelect
    geopoint: PrismicGeopoint
    color: PrismicColor
    number: PrismicNumber
    image: PrismicImage
  }
}

type PrismicBoolean = boolean
type PrismicDate = string
type PrismicTimestamp = string
type PrismicSelect = string
type PrismicGeopoint = { latitude: number, longitude: number }
type PrismicColor = string
type PrismicNumber = number
type PrismicImage = {
  alt: string | null
  copyright: string | null
  dimensions: { width: number, height: number }
  url: string
}

export const getStaticProps = defaultClient.getSingle('smoketest').staticProps

export default Smoketest
