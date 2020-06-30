import 'styled-components'
import { Theme as StyledSystemTheme } from 'styled-system'
import { Theme } from './styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme, StyledSystemTheme {
    grid: {
      columns: number
      columnGap: string | number | (string | number)[]
      maxWidth: string | number | (string | number)[]
      margins: string | number | (string | number)[]
    }
    colors: {
      [key: string]: string
    }
  }
}
