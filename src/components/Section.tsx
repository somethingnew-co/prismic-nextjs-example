import React from 'react'
import { Box } from '@stnew/layout'
import { useThemeSwitch } from 'lib/prismic/helpers'

interface Props {
  theme?: string
}

export const Section: React.FC<Props> = ({ theme, children }) => {
  const {
    background,
    foreground,
  } = useThemeSwitch(theme)

  return (
    <Box
      as="section"
      py={60}
      backgroundColor={background}
      color={foreground}
    >
      {children}
    </Box>
  )
}
