/* eslint-disable no-underscore-dangle */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { CUSTOMER_PATH, JWT_TOKEN } from 'utils/constant'
import STORAGE from 'utils/storage'

const Header = ({ currentUser, authenticate, logout }) => {
  const [userLinks, setUserLinks] = useState([])
  const [navbarMenu, setNavbarMenu] = useState([])
  const history = useHistory()

  useEffect(() => {
    const userLinksArr = [
      {
        href: `${CUSTOMER_PATH}/profile`,
        iconClass: 'ti-id-badge',
        name: 'Trang cá nhân',
      },
      {
        href: `${CUSTOMER_PATH}/transactions`,
        iconClass: 'ti-eye',
        name: 'Lịch sử giao dịch',
      },
    ]
    const navbarMenuArr = [
      {
        href: `${CUSTOMER_PATH}`,
        emClass: 'ikon-dashboard',
        name: 'Trang chủ',
      },
      {
        href: `${CUSTOMER_PATH}/projects`,
        emClass: 'ikon-coins',
        name: 'Dự án',
      },
      {
        href: `${CUSTOMER_PATH}/transactions`,
        emClass: 'ikon-transactions',
        name: 'Lịch sử giao dịch',
      },
      {
        href: `${CUSTOMER_PATH}/reports`,
        emClass: 'ikon-transactions',
        name: 'Thống kê',
      },
    ]
    setUserLinks(userLinksArr)
    setNavbarMenu(navbarMenuArr)
  }, [])

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    if ((!currentUser._id && token) || !token) authenticate(token)
  }, [currentUser._id, authenticate])

  const onLogout = () => {
    logout()
    history.push(`/`)
  }

  const handleOnClick = e => {
    window.$('ul.navbar-menu li.menu-item').removeClass('active')
    window
      .$(e.target)
      .parent()
      .addClass('active')
  }

  return (
    <>
      <div className="topbar-wrap">
        <div className="topbar is-sticky">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <ul className="topbar-nav d-lg-none">
                <li className="topbar-nav-item relative">
                  <a href="#" className="toggle-nav">
                    <div className="toggle-icon">
                      <span className="toggle-line" />
                      <span className="toggle-line" />
                      <span className="toggle-line" />
                      <span className="toggle-line" />
                    </div>
                  </a>
                </li>
              </ul>
              <a className="topbar-logo" href="/">
                <img className="light-logo" src={`${process.env.PUBLIC_URL}/images/customer/logo-light.svg`} alt="" />
              </a>
              <ul className="topbar-nav">
                <li className="topbar-nav-item relative">
                  <span className="user-welcome d-none d-lg-inline-block">
                    Chào mừng, {currentUser.lastName} {currentUser.firstName}
                  </span>
                  <a href="#" className="toggle-tigger user-thumb">
                    <em className="ti ti-user" />
                  </a>
                  <div className="toggle-class dropdown-content dropdown-content-right dropdown-arrow-right user-dropdown">
                    <div className="user-status">
                      <h6 className="user-status-title">Token balance</h6>
                      <div className="user-status-balance">
                        12,000,000 <small>TWZ</small>
                      </div>
                    </div>
                    <ul className="user-links">
                      {userLinks.map(link => {
                        return (
                          <li key={link.href}>
                            <Link to={link.href}>
                              <i className={`ti ${link.iconClass}`} />
                              {link.name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                    <ul className="user-links bg-light">
                      <li>
                        <a href="#!" onClick={onLogout}>
                          <i className="ti ti-power-off" />
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar">
          <div className="container">
            <div className="navbar-innr">
              <ul className="navbar-menu">
                {navbarMenu.map(menuItem => {
                  return (
                    <li key={menuItem.href} className="menu-item">
                      <Link to={menuItem.href} onClick={handleOnClick}>
                        <em className={`ikon ${menuItem.emClass}`} />
                        {menuItem.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Header)
// You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
