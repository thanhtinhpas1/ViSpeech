/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Navbar = ({ currentUser, logout }) => {
  return (
    <nav className="navbar navbar-default navbar-absolute" data-topbar-color="blue">
      <div className="container-fluid">
        <div className="navbar-minimize">
          <button type="button" id="minimizeSidebar" className="btn btn-round btn-white btn-fill btn-just-icon">
            <i className="material-icons visible-on-sidebar-regular f-26">keyboard_arrow_left</i>
            <i className="material-icons visible-on-sidebar-mini f-26">keyboard_arrow_right</i>
          </button>
        </div>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="/">
            ViSpeech Admin
          </a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
