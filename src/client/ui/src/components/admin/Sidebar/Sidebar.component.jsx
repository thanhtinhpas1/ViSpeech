/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { JWT_TOKEN, ADMIN_PATH } from 'utils/constant'
import STORAGE from 'utils/storage'

const Sidebar = ({ currentUser, onAuthenticate, logout }) => {
  const location = useLocation()

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    if ((!currentUser && token) || !token) onAuthenticate(token)
  }, [currentUser, onAuthenticate])

  return (
    <div className="sidebar">
      <div className="logo">
        <a href={`${ADMIN_PATH}`} className="simple-text">
          ViSpeech Admin
        </a>
      </div>
      <div className="logo logo-mini">
        <a href={`${ADMIN_PATH}`} className="simple-text">
          T
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav nav-mobile-menu" style={{ marginTop: '15px' }}>
          <li className="dropdown">
            <a href="#!" className="dropdown-toggle" data-toggle="dropdown">
              <i className="material-icons">person</i>
              <p className="hidden-lg hidden-md">
                Trang cá nhân
                <b className="caret" />
              </p>
            </a>
            <ul className="dropdown-menu">
              <li>
                <div
                  style={{
                    color: '#333',
                    fontSize: '13px',
                    padding: '10px 20px',
                    margin: '0 5px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Xin chào, {currentUser.lastName} {currentUser.firstName}
                </div>
              </li>
              <li>
                <a href="#!" onClick={logout}>
                  Đăng xuất
                </a>
              </li>
            </ul>
          </li>
          <li className="separator hidden-lg hidden-md" />
        </ul>
        <ul className="nav">
          <li className={`${location.pathname === ADMIN_PATH ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}`}>
              <i className="material-icons">dashboard</i>
              <p>Trang chủ</p>
            </a>
          </li>
          <li
            className={`${
              location.pathname === `${ADMIN_PATH}/users` || location.pathname === `${ADMIN_PATH}/create-user`
                ? 'active'
                : ''
            } `}
          >
            <a data-toggle="collapse" href="#layouts" className="collapsed" aria-expanded="false">
              <i className="zmdi zmdi-accounts" />
              <p>
                Khách hàng
                <b className="caret" />
              </p>
            </a>
            <div className="collapse" id="layouts" aria-expanded="false" style={{ height: '0px' }}>
              <ul className="nav">
                <li>
                  <a href={`${ADMIN_PATH}/users`}>Danh sách</a>
                </li>
                <li>
                  <a href={`${ADMIN_PATH}/create-user`}>Thêm mới</a>
                </li>
              </ul>
            </div>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/projects` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/projects`}>
              <i className="material-icons">library_books</i>
              <p>Danh sách dự án</p>
            </a>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/tokens` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/tokens`}>
              <i className="material-icons">library_books</i>
              <p>Danh sách token</p>
            </a>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/transactions` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/transactions`}>
              <i className="material-icons">library_books</i>
              <p>Lịch sử giao dịch</p>
            </a>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/reports` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/reports`}>
              <i className="material-icons">equalizer</i>
              <p>Thống kê</p>
            </a>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/histories` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/histories`}>
              <i className="material-icons">library_books</i>
              <p>Lịch sử sử dụng dịch vụ</p>
            </a>
          </li>
          <li className={`${location.pathname === `${ADMIN_PATH}/tasks` ? 'active' : ''} `}>
            <a href={`${ADMIN_PATH}/tasks`}>
              <i className="material-icons">schedule</i>
              <p>Danh sách thực thi</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
