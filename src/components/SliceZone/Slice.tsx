/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { usePrismic } from '@stnew/prismic-nextjs'
import { PrismicSlice } from '@stnew/prismic-types'

interface SliceProps {
  data: PrismicSlice
}

export const Slice: React.FC<SliceProps> = ({ data, ...rest }: SliceProps) => {
  const { slices } = usePrismic()
  const { slice_type } = data

  if (slices && slices.hasOwnProperty(slice_type)) {
    let SliceComponent: React.ReactType | Promise<any> = slices[slice_type]

    if (Promise.resolve(SliceComponent) === SliceComponent) {
      return <DynamicSlice component={SliceComponent} {...data} {...rest} />
    }

    // TypeScript complains about call signatures
    SliceComponent = SliceComponent as React.ReactType
    return <SliceComponent {...data} {...rest} />
  }

  return null
}

interface DynamicSliceProps {
  component: Promise<any>
}

/**
 * Dynamically load components via import(), which returns a Promise
 */
const DynamicSlice: React.FC<DynamicSliceProps> = ({ component, ...props }: DynamicSliceProps) => {
  // Set the slice component as state because it's ansynchronous
  const [Component, setComponent] = useState<JSX.Element | null>(null)

  const componentIsMounted = useRef<boolean>(true)

  // This hook runs on mount or if slices update
  useEffect(() => {
    async function getSliceComponent(component: Promise<any>): Promise<void> {
      try {
      // If slice component is an import, await for Promise resolution
        const module = await component

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
          setComponent(() => <SliceComponent { ...props} />)
        }

      } catch (error) {
        setComponent(null)
        throw Error(error)
      }
    }

    getSliceComponent(component)

    return () => {
      componentIsMounted.current = false
    }
  }, [])

  return Component
}
