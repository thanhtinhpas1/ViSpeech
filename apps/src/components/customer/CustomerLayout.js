import React from 'react'
import Header from './Header/Header.container'
import Footer from './Footer/Footer.container'

const CustomerLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default CustomerLayout
