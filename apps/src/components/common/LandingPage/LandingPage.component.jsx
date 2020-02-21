/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Loading from './components/Loading/Loading.component'
import Header from './components/Header/Header.component'
import Main from './components/Main/Main.component'
import Footer from './components/Footer/Footer.component'

const LandingPage = () => {
  return (
    <div>
      <Loading />
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default LandingPage
