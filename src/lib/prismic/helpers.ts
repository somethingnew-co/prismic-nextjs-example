import { useTheme } from 'styled-components'
import { PrismicDropdown } from 'types'

type Result = { uid: string, data: {[x:string] : any } }
type Path = { params: { [x: string]: string[] } }
type UIDPath = (result: Result) => Path

export function byUID(param: string): UIDPath {
  return (result) => {
    const route = result.data.route !== null
      ? [...result.data.route.split('/'), result.uid]
      : [result.uid]

    return ({ params: { [param]: route } })
  }
}

export function mapPathsByParam(param: string, results: Result[]): Path[] {
  return results.map(byUID(param))
}

export function filterPaths(paths: Path[], pages = []): Path[] {
  /**
   * Don't include leading '/' in longer paths
   * i.e. 'something/new'
   */
  const omittedRoutes = ['homepage', ...pages]

  return paths.filter((path) => {
    const { page } = path.params

    if (omittedRoutes.includes(page.join('/'))) {
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
