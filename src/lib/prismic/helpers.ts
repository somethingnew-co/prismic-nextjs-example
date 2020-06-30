import { useTheme } from 'styled-components'
import { PrismicDropdown } from 'types'

type Result = { uid: string }
type Path = { params: { [x: string]: string } }
type UIDPath = (result: Result) => Path

export function byUID(param: string): UIDPath {
  return result => ({ params: { [param]: result.uid } })
}

export function mapPathsByParam(param: string, results: Result[]): Path[] {
  return results.map(byUID(param))
}

export function filterPaths(paths: Path[], pages = []): Path[] {
  // Always filter index page
  const omittedPages = ['homepage', ...pages]

  return paths.filter((path) => {
    const { page } = path.params

    if (omittedPages.includes(page)) {
      return false
    }

    return path
  })
}

export function useThemeSwitch(theme: string): {
  background: string
  foreground: string
} {
  const { colors } = useTheme()

  const {
    white,
    whitesmoke,
    black,
    primary,
  } = colors

  switch (theme) {
    case 'White':
      return {
        background: white,
        foreground: black,
      }
    case 'Grey':
      return {
        background: whitesmoke,
        foreground: black,
      }
    case 'Invert':
      return {
        background: black,
        foreground: white,
      }
    case 'Primary':
      return {
        background: primary,
        foreground: white,
      }

    default:
      return {
        background: white,
        foreground: black,
      }
  }
}

export function valignSwitch(align: PrismicDropdown): string {
  switch (align) {
    case 'Top':
      return 'flex-start'
    case 'Center':
      return 'center'
    case 'Bottom':
      return 'flex-end'
    case 'Between':
      return 'flex-between'
    case 'Around':
      return 'flex-around'
    default:
      return 'flex-start'
  }
}
