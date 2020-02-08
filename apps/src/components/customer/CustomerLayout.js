import React from 'react'
import Header from './Header/Header.container'
import Footer from './Footer/Footer.container'

const CustomerLayout = ({ children }) => {
  return (
    <>
      <link
        rel="stylesheet"
        href={`${process.env.PUBLIC_URL}/assets/css/all/bootstrap.min.css`}
        id="layoutstyle"
      />
      <link
        rel="stylesheet"
        href={`${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`}
        id="layoutstyle"
      />
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default CustomerLayout
