import React from 'react'
import { Slice } from './Slice'
import { PrismicSlice } from '@stnew/prismic-types'

function SliceZone({ slices, ...rest }: {
  slices: PrismicSlice[]
}): JSX.Element | null {
  if (!slices) return null

  return (
    <React.Fragment>
      {slices.map((slice, index) => <Slice key={index} data={slice} {...rest} />)}
    </React.Fragment>
  )
}

export default SliceZone
