interface Colors { [color: string]: string }

export enum Themes {
  white = 'White',
  grey = 'Grey',
  invert = 'Invert',
  primary = 'Primary',
}

export class Theme {
  constructor(primary?: string) {
    this.colors = { ...this.colors, ...this.themeColor(primary || '') }
  }

  themeColor(name: string): Colors {
    switch (name) {
      case Themes.white:
        return {
          background: this.colors.white,
          foreground: this.colors.black,
        }
      case Themes.grey:
        return {
          background: this.colors.whitesmoke,
          foreground: this.colors.black,
        }
      case Themes.invert:
        return {
          background: this.colors.black,
          foreground: this.colors.white,
        }
      case Themes.primary:
        return {
          background: this.colors.primary,
          foreground: this.colors.white,
        }

      default:
        return {
          background: this.colors.white,
          foreground: this.colors.black,
        }
    }
  }

  colors: Colors = {
    primary: '#ff5678',
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

  typography = {
    h1: {
      fontSize: '3rem',
      color: 'foreground',
    },
    p1: {
      lineHeight: 1.5,
    },
  }
}
