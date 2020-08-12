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
                <a className="facebook" href="https://www.facebook.com/ASR-VietSpeech-577800236200579/">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-5 col-lg-4 sm-m-15px-tb">
            <h4>Đường dẫn</h4>
            <div className="d-flex justify-content-around">
              <ul className="list-style">
                <li>
                  <a href="/login">Đăng nhập</a>
                </li>
                <li>
                  <a href="/register">Đăng ký</a>
                </li>
                <li>
                  <a href="https://www.facebook.com/ASR-VietSpeech-577800236200579/">Liên hệ</a>
                </li>
              </ul>
              <ul className="list-style">
                <li>
                  <a href="https://microservices.io/patterns/microservices.html">Microservices</a>
                </li>
                <li>
                  <a href="https://martinfowler.com/tags/domain%20driven%20design.html">Domain Driven Design</a>
                </li>
                <li>
                  <a href="https://martinfowler.com/bliki/CQRS.html">Command Query Responsibility Separate</a>
                </li>
                <li>
                  <a href="https://martinfowler.com/eaaDev/EventSourcing.html">Event Sourcing</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 sm-m-15px-tb">
            <h4 className="font-18 font-alt color-white font-w-600 m-0px m-15px-b">Địa chỉ liên hệ</h4>
            <p><span>Facebook:</span> <a href="https://www.facebook.com/ASR-VietSpeech-577800236200579">Fanpage ASR</a></p>
            <p>
              <span>E-Mail:</span> vispeech2020@gmail.com
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
