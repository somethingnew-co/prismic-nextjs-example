import dynamic from 'next/dynamic'

import Hero from './Hero'
import Content from './Content'
const Quote = import('./Quote')
const Carousel = dynamic(() => import('./Carousel'))

export const sliceMap = {
  'hero': Hero,
  'content': Content,
  'quote': Quote,
  'carousel': Carousel,
}
