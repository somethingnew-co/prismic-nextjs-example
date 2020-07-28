/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { usePrismic } from '@stnew/prismic-nextjs'
import { PrismicSlice } from '@stnew/prismic-types'

interface Props {
  data: PrismicSlice
}

interface SliceProps {
  data: PrismicSlice
}

export const Slice: React.FC<Props> = ({ data, ...rest }: SliceProps) => {
  // Set the slice component as state because it might be ansynchronous
  const [Component, setComponent] = useState<JSX.Element | null>(null)

  const componentIsMounted = useRef<boolean>(true)

  const { slices } = usePrismic()
  const { slice_type } = data

  /*
   * This hook runs on mount or if slices update
   */
  useEffect(() => {
    async function getSliceComponent(slice: React.ReactType | Promise<any>): Promise<void> {
      try {
      // If slice component is an import, await for Promise resolution
        const module = await slice

        let SliceComponent: React.ReactType

        if (module.default) {
          // Check first if module is default export...
          SliceComponent = module.default
        } else if (module) {
          // ...otherwise use named export...
          SliceComponent = module
        } else {
          // ...and bail if we can't find an export
          return
        }

        if (componentIsMounted.current) {
          setComponent(() => <SliceComponent { ...data} {...rest } />)
        }

      } catch (error) {
        setComponent(null)
        throw Error(error)
      }
    }

    // Check to see if slice exists in the slice dictionary
    if (slices && slices.hasOwnProperty(slice_type)) {
      getSliceComponent(slices[slice_type])
    }

    return () => {
      componentIsMounted.current = false
    }
  }, [])

  return Component
}
