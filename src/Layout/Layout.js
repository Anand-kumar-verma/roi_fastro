import React from 'react'
import Header from './Header'

function Layout(props) {
  const { header = true, footer = true, children } = props
  return (
    <div >
      {header && <Header />}

      {children}

      {/* {footer && <Footer />} */}
    </div>
  )
}

export default Layout
