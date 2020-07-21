import React, { useEffect, useState } from 'react'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

function useGoogleOptimize(experimentId: string): number {
  const [variant, setVariant] = useState<null | number>(null)

  useEffect(() => {
    const setExperiment = (value: string): void => {
      setVariant(Number(value))
    }

    gtag('event', 'optimize.callback', {
      name: experimentId,
      callback: setExperiment,
    })

    // Cleanup
    return () =>
      gtag('event', 'optimize.callback', {
        name: experimentId,
        callback: setExperiment,
        remove: true,
      })
  }, [experimentId])

  return variant
}

const ExperimentalComponent: React.FC = () => {
  const variant = useGoogleOptimize('-pe3NUhmRDGHmxfBq3BWXw')

  return (
    <React.Fragment>
      { variant === 0 && <div>Original</div> }
      { variant === 1 && <div>Variant 1</div> }
      { variant === 2 && <div>Variant 2</div> }
    </React.Fragment>
  )
}

export default ExperimentalComponent
