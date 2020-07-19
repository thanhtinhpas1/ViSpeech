/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Footer = () => {
  return (
    <div className="footer-bar">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-8">
            <ul className="footer-links">
              <li>
                <a href="#">Điều khoản</a>
              </li>
              <li>
                <a href="/customer/documents">Tài liệu</a>
              </li>
              <li>
                <a href="#">Về chúng tôi</a>
              </li>
              <li>
                <a href="#">Điều khoản và quy định</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mt-2 mt-sm-0">
            <div
              className="d-flex justify-content-between justify-content-md-end align-items-center guttar-25px pdt-0-5x pdb-0-5x">
              <div className="copyright-text">&copy; 2020 ASR VietSpeech.</div>
              <div className="lang-switch relative">
                <a href="#" className="lang-switch-btn toggle-tigger">
                  En <em className="ti ti-angle-up"/>
                </a>
                <div className="toggle-class dropdown-content dropdown-content-up">
                  <ul className="lang-list">
                    <li>
                      <a href="#">VI</a>
                    </li>
                    <li>
                      <a href="#">EN</a>
                    </li>
                    <li>
                      <a href="#">FR</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
