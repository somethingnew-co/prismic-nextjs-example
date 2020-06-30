export class Theme {
  constructor(primary: string) {
    if (primary) {
      this.colors.primary = primary
    }
  }

  colors = {
    primary: '#FF0000',
    white: '#FFFFFF',
    whitesmoke: '#F5F5F5',
    black: '#1A1A1A',
  }

  grid = {
    columns: 12,
    columnGap: 30,
    maxWidth: '64rem',
    margins: 30,
  }
}
