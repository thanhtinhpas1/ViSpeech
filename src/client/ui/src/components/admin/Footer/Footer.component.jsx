/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { ADMIN_PATH } from 'utils/constant'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <nav className="pull-left">
          <ul>
            <li>
              <a href={`${ADMIN_PATH}`}>Trang chủ</a>
            </li>
            <li>
              <a href="#">Công ty</a>
            </li>
          </ul>
        </nav>
        <p className="copyright pull-right">©VietSpeech. Admin Dashboard</p>
      </div>
    </footer>
  )
}

export default Footer
