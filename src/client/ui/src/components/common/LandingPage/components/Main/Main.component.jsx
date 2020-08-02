import React from 'react'

const Main = () => {
  return (
    <main>
      <section id="home" className="home-banner particles-box theme-g-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10 text-center">
              <span style={{ fontSize: '20px' }}>Speech to text</span>
              <h1>
                Hệ thống cung cấp dịch vụ nhận dạng âm thanh <br /> Tiếng Việt
              </h1>
              <p>
                VietSpeech là hệ thống hàng đầu trong cung cấp và tích hợp <br />
                dịch vụ nhận dạng âm thanh Tiếng Việt.
              </p>
              <a className="m-btn btn-white" href="/login">
                Dùng thử dịch vụ
              </a>
            </div>
            <div className="col-md-8">
              <div className="hb-img">
                <img src={`${process.env.PUBLIC_URL}/images/customer/macbook.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="introduce" className="feature-section p-50px-t p-90px-b md-p-50px-tb">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center m-40px-b sm-m-30px-b">
              <div className="section-title">
                <span className="theme-g-bg" />
                <h2 id="introduce">VietSpeech giúp gì cho bạn?</h2>
                <p style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  VietSpeech là hệ thống hỗ trợ chuyển đổi file âm thanh thành văn bản một cách hiệu quả và nhanh chóng.
                  Thay vì mất hàng giờ ngồi nghe và gõ lại văn bản, giờ đây với VietSpeech, chỉ cần một vài thao tác,
                  bạn đã có ngay văn bản. Hệ thống cung cấp những tính năng như cung cấp các báo cáo sử dụng dịch vụ của
                  người dùng theo thời gian thực, mời tham gia dự án, cho phép chỉnh sửa và tải xuống văn bản được
                  dịch,...
                </p>
              </div>
            </div>
          </div>
          <div id="feature" className="row">
            <div className="col-md-4">
              <div className="feature-box sm-m-30px-b">
                <div className="f-icon theme-bg">
                  <i className="icon-genius" />
                </div>
                <h4 className="m-25px-t">Tốc độ cao</h4>
                <p>
                  Được xây dựng với hệ thống chịu tải cao. Đảm bảo dịch vụ của bạn hoạt động 24/7 với tốc độ nhanh nhất.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box sm-m-30px-b">
                <div className="f-icon theme-bg">
                  <i className="icon-documents" />
                </div>
                <h4>Tự động hóa</h4>
                <p>
                  Mọi hoạt động doanh nghiệp của bạn không ngừng trở nên thông minh hơn, nâng cao hiệu suất kinh doanh
                  và gia tăng sự hài lòng của khách hàng.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box sm-m-30px-b">
                <div className="f-icon theme-bg">
                  <i className="icon-recycle" />
                </div>
                <h4>Mô hình linh hoạt.</h4>
                <p>
                  VietSpeech triển khai các sản phẩm, dịch vụ cũng như hỗ trợ một cách linh hoạt từ cloud đến on-premise
                  để đáp ứng nhu cầu của doanh nghiệp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="advantage" className="sub-section">
        <div className="container">
          <div className="row align-items-center m-60px-b">
            <div className="col-md-6">
              <img src={`${process.env.PUBLIC_URL}/images/customer/flow1.png`} alt="" />
            </div>
            <div className="col-md-6 sm-m-30px-t">
              <h6 className="sub-title theme-color">Gắn kết với khách hàng.</h6>
              <h4 className="sub-section-title m-0px m-15px-b">
                Hỗ trợ khách hàng <br />
                24/7
              </h4>
              <p>VietSpeech giúp mối quan hệ giữa doanh nghiệp và khách hàng ngày càng bền chặt</p>
              <ul className="ul-list-style m-20px-b">
                <li>Tiếp cận với khách hàng qua nhiều kênh</li>
                <li>Luôn có mặt khi khách hàng cần, mọi lúc, mọi nơi</li>
                <li>Hiểu ý định và mong muốn của khách hàng</li>
              </ul>
            </div>
          </div>
          <div className="row align-items-center m-60px-b">
            <div className="col-md-6 order-2 sm-m-30px-t order-md-first">
              <h6 className="sub-title theme-color">Tích hợp và cập nhật liên tục.</h6>
              <h4 className="sub-section-title m-0px m-15px-b">
                Đảm bảo khách hàng <br />
                có dịch vụ tốt nhất.
              </h4>
              <p>VietSpeech luôn liên tục cập nhật và nâng cao chất lượng sản phẩm.</p>
              <ul className="ul-list-style m-20px-b">
                <li>Tự đông cập nhật</li>
                <li>Tích hợp liên tục</li>
                <li>Dịch vụ mới nhất</li>
              </ul>
            </div>
            <div className="col-md-6">
              <img src={`${process.env.PUBLIC_URL}/images/customer/flow2.png`} alt="" />
            </div>
          </div>
          <div className="row align-items-center m-90px-b">
            <div className="col-md-6">
              <img src={`${process.env.PUBLIC_URL}/images/customer/flow3.png`} alt="" />
            </div>
            <div className="col-md-6 sm-m-30px-t">
              <h6 className="sub-title theme-color">Báo cáo và thống kê </h6>
              <h4 className="sub-section-title m-0px m-15px-b">
                Theo dõi chi tiết <br />
                lượng truy cập
              </h4>
              <p>Đảm bảo khách hàng theo dõi được số lượng truy vấn hàng tuần, hàng tháng.</p>
              <ul className="ul-list-style m-20px-b">
                <li>Tự động kiểm soát.</li>
                <li>Đáp ứng dịch vụ kịp thời.</li>
                <li>Dễ dàng nâng cấp dịch vụ.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="trusted-clients p-60px-tb">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="tc-left sm-m-30px-b">
                <span className="theme-color">Đối tác</span>
                <h2>
                  Những đối tác chiến lược của chúng tôi.
                  <br />
                </h2>
                <p />
                <a className="m-btn btn-theme" href="/register">
                  Đăng ký dùng thử
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="clients-list clients-border clients-col-3">
                <ul>
                  <li>
                    <img src={`${process.env.PUBLIC_URL}/images/customer/logo-1.png`} alt="" />
                  </li>
                  <li>
                    <img src={`${process.env.PUBLIC_URL}/images/customer/logo-2.png`} alt="" />
                  </li>
                  <li>
                    <img src={`${process.env.PUBLIC_URL}/images/customer/logo-3.png`} alt="" />
                  </li>
                  <li>
                    <img src={`${process.env.PUBLIC_URL}/images/customer/logo-4.png`} alt="" />
                  </li>
                  <li>
                    <img src={`${process.env.PUBLIC_URL}/images/customer/logo-5.png`} alt="" />
                  </li>
                  <li>
                    <img src={`${process.env.PUBLIC_URL}/images/customer/logo-6.png`} alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main
