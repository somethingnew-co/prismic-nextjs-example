import { PrismicDropdown } from 'types'

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
