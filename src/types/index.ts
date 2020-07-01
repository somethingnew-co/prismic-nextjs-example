import { PrismicSlice } from '@stnew/prismic-types'

export type PrismicDropdown = string

export type PrismicKeyText = string

export interface PrismicDocument {
  [key: string]: any
  body: PrismicSlice[]
}

export interface PrismicLink {
  link_type: string
  url: string
  id?: string
  type?: string
  tags?: string[]
  slug?: string
  lang?: string
  uid?: string
  data?: any
  isBroken?: boolean
  target?: string
}

export interface PrismicText {
  type: string
  text: string
  spans: any[]
}
