/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { CUSTOMER_PATH } from 'utils/constant'

const Header = () => {
  const [userLinks, setUserLinks] = useState([])
  const [navbarMenu, setNavbarMenu] = useState([])

  useEffect(() => {
    const userLinksArr = [
      { href: `${CUSTOMER_PATH}/profile`, iconClass: 'ti-id-badge', name: 'Trang cá nhân' },
      { href: `${CUSTOMER_PATH}/transactions`, iconClass: 'ti-eye', name: 'Lịch sử giao dịch' },
    ]
    const navbarMenuArr = [
      { href: `${CUSTOMER_PATH}`, emClass: 'ikon-dashboard', name: 'Trang chủ' },
      { href: `${CUSTOMER_PATH}/tokens-wallet`, emClass: 'ikon-distribution', name: 'Ví key' },
      {
        href: `${CUSTOMER_PATH}/transactions`,
        emClass: 'ikon-transactions',
        name: 'Lịch sử giao dịch',
      },
    ]
    setUserLinks(userLinksArr)
    setNavbarMenu(navbarMenuArr)
  }, [])

  // useEffect(() => {
  //   const token = UserService.getPreferences(JWT_TOKEN)
  //   if (!currentUser && token) onAuthenticate(token)
  // }, [currentUser, onAuthenticate])

  // useEffect(() => {
  //   let interval
  //   onClearNotificationState()
  //   if (currentUser) {
  //     const userId = currentUser._id
  //     getNotificationList({
  //       userId,
  //       currentPage: 1,
  //       currentLimit: ITEMS_PER_PAGE,
  //     })
  //     interval = setInterval(
  //       () =>
  //         getNotificationList({
  //           userId,
  //           currentPage: 1,
  //           currentLimit: ITEMS_PER_PAGE,
  //         }),
  //       30000
  //     )
  //   }

  //   // returned function will be called on component unmount
  //   return () => {
  //     clearTimeout(interval)
  //   }
  // }, [currentUser, onClearNotificationState, getNotificationList])

  // const onSearch = value => {
  //   // const {history} = props;
  //   // console.log('on search push: ', value)
  //   history.push({
  //     pathname: `/teacher/search/${value}`,
  //   })
  // }

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
                <img
                  className="light-logo"
                  src={`${process.env.PUBLIC_URL}/images/customer/logo-light.svg`}
                  alt=""
                />
              </a>
              <ul className="topbar-nav">
                <li className="topbar-nav-item relative">
                  <span className="user-welcome d-none d-lg-inline-block">
                    Chào mừng, Khánh Linh
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
                            <a href={link.href}>
                              <i className={`ti ${link.iconClass}`} />
                              {link.name}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                    <ul className="user-links bg-light">
                      <li>
                        <a href="#">
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
                    <li key={menuItem.href}>
                      <a href={menuItem.href}>
                        <em className={`ikon ${menuItem.emClass}`} />
                        {menuItem.name}
                      </a>
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
