import { Header } from './Header'
import React from 'react'
import { Footer } from './Footer'

interface Props {
  meta: any
}

export const Layout: React.FC<Props> = ({ meta, children }) => (
  <>
    <Header {...meta} />
    <main>
      {children}
    </main>
    <Footer />
  </>
)
