/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'

const Header = () => {
  const [navbarMenu, setNavbarMenu] = useState([])

  useEffect(() => {
    const navbarMenuArr = [
      {
        href: '/',
        isActive: true,
        name: 'Trang chủ',
      },
      {
        href: '#introduce',
        isActive: false,
        name: 'Giới thiệu',
      },
      {
        href: '#feature',
        isActive: false,
        name: 'Tính năng',
      },
      {
        href: '#advantage',
        isActive: false,
        name: 'Lợi ích',
      },
      {
        href: '/login',
        isActive: false,
        name: 'Đăng nhập',
      },
    ]
    setNavbarMenu(navbarMenuArr)
  }, [])

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="/" style={{ fontSize: '1.8em', letterSpacing: '3px' }}>
            VIET SPEECH
            {/* <img className="light-logo" src={`${process.env.PUBLIC_URL}/images/customer/logo1.png`} alt="" /> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarshark"
            aria-controls="navbarshark"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarshark">
            <ul className="navbar-nav ml-auto">
              {navbarMenu.map(navLink => (
                <li key={navLink.name}>
                  <a className={`nav-link ${navLink.isActive ? 'active' : ''}`} href={navLink.href}>
                    {navLink.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
// You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
