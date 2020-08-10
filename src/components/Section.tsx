import React from 'react'
import { Box } from '@stnew/layout'
import { ThemeProvider } from 'styled-components'
import { Theme } from 'styles/theme'

interface Props {
  theme?: string
}

export const Section: React.FC<Props> = ({ theme, children }) => {
  const sectionTheme = new Theme(theme)

  return (
    <ThemeProvider theme={sectionTheme}>
      <Box
        as="section"
        py={60}
        backgroundColor={sectionTheme.colors.background}
        color={sectionTheme.colors.foreground}
      >
        {children}
      </Box>
    </ThemeProvider>
  )
}
