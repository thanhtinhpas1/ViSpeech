/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-5 sm-m-15px-tb">
            <h4>Về chúng tôi</h4>
            <p className="footer-text">
              Chúng tôi là đội ngũ phát triển ViSpeech nhằm xây dựng cơ sở cung cấp dịch vụ nhận dạng âm thanh tiếng
              Việt phục vụ cho các tổ chức cá nhân có nhu cầu.
            </p>
            <ul className="social-icons">
              <li>
                <a className="facebook" href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a className="google" href="#">
                  <i className="fab fa-google-plus-g" />
                </a>
              </li>
              <li>
                <a className="linkedin" href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-5 col-lg-4 sm-m-15px-tb">
            <h4>Đường dẫn</h4>
            <div className="d-flex justify-content-around">
              <ul className="list-style">
                <li>
                  <a href="/customer/login">Đăng nhập</a>
                </li>
                <li>
                  <a href="/register">Đăng ký</a>
                </li>
                <li>
                  <a href="/customer/documents">Tài liệu</a>
                </li>
                <li>
                  <a href="/customer/projects">Dự án</a>
                </li>
              </ul>
              <ul className="list-style">
                <li>
                  <a href="#">Microservices</a>
                </li>
                <li>
                  <a href="#">Domain Driven Design</a>
                </li>
                <li>
                  <a href="#">Command Query Responsibility Separate</a>
                </li>
                <li>
                  <a href="#">Event Sourcing</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 sm-m-15px-tb">
            <h4 className="font-18 font-alt color-white font-w-600 m-0px m-15px-b">Địa chỉ liên hệ</h4>
            <p>227 Nguyễn Văn Cừ</p>
            <p>
              <span>E-Mail:</span> 1612704@student.hcmus.edu.vn
            </p>
            <p>
              1612339@student.hcmus.edu.vn
            </p>
            <p>
              <span>Phone:</span> +083 0962804643
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 footer-copy">
            <p className="m-0px">© Copyright by VietSpeech. Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
