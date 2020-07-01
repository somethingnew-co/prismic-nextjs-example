import React from 'react'
import { Slice } from './Slice'
import { PrismicSlice } from '@stnew/prismic-types'

interface Props {
  slices: PrismicSlice[]
}

const SliceZone: React.FC<Props> = ({ slices, ...rest }) => {
  if (!slices) return null

  return (
    <React.Fragment>
      {slices.map((slice, index) => <Slice key={index} data={slice} {...rest} />)}
    </React.Fragment>
  )
}

export default SliceZone
