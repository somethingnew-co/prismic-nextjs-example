import React, { ReactNode } from 'react'
import { usePrismic } from '@stnew/prismic-nextjs'
import { PrismicSlice } from '@stnew/prismic-types'

interface SliceProps {
  data: PrismicSlice
  children?: ReactNode
}

export function Slice({ data, ...rest }: SliceProps): JSX.Element | null {
  const { slices } = usePrismic()
  const { slice_type } = data
  let Component = null

  if (slices.hasOwnProperty(slice_type)) {
    Component = slices[slice_type]
  }

  return <Component {...data} {...rest} />
}
