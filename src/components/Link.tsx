import React from 'react'
import { Link as PrismicLink } from '@stnew/prismic-nextjs'
import { Box } from '@stnew/layout'

export const Link: React.FC<any> = props => <PrismicLink component={Box} {...props} />
