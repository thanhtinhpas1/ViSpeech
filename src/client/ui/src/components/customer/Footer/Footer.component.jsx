/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Footer = () => {
  const fbLibrary = () => {
    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: 'v8.0'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  useEffect(() => {
    fbLibrary()
  }, [fbLibrary])

  return (
    <>
      <div id="fb-root"></div>
      <div class="fb-customerchat"
        attribution={setup_tool}
        page_id="577800236200579"
        theme_color="#1890ff"
        logged_in_greeting="Hãy để lại lời nhắn, chúng tôi sẽ liên hệ trong thời gian sớm nhất!"
        logged_out_greeting="Hãy để lại lời nhắn, chúng tôi sẽ liên hệ trong thời gian sớm nhất!">
      </div>
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
              <div className="d-flex justify-content-between justify-content-md-end align-items-center guttar-25px pdt-0-5x pdb-0-5x">
                <div className="copyright-text">&copy; 2020 VietSpeech.</div>
                {/* <div className="lang-switch relative">
                <a href="#" className="lang-switch-btn toggle-tigger">
                  En <em className="ti ti-angle-up" />
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
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
