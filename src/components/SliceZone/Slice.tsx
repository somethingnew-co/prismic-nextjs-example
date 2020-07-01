import React from 'react'
import { usePrismic } from '@stnew/prismic-nextjs'
import { PrismicSlice } from '@stnew/prismic-types'

interface Props {
  data: PrismicSlice
}

export const Slice: React.FC<Props> = ({ data, ...rest }) => {
  const { slices } = usePrismic()
  const { slice_type } = data
  let Component = null

  if (slices.hasOwnProperty(slice_type)) {
    Component = slices[slice_type]
  }

  return <Component {...data} {...rest} />
}
