/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Main = () => {
  return (
    <main>
      <section id="home" className="home-banner particles-box theme-g-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10 text-center">
              <span>Speech to text</span>
              <h1>
                Hệ thống nhận dạng âm thanh <br /> Tiếng Việt.
              </h1>
              <p>
                Chúng tôi là hệ thống hàng đầu trong cung cấp và tích hợp <br />
                dịch vụ nhận dạng âm thanh Tiếng Việt.
              </p>
              <a className="m-btn btn-white" href="#">
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
      <section className="feature-section p-50px-t p-90px-b md-p-50px-tb">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center m-40px-b sm-m-30px-b">
              <div className="section-title">
                <span className="theme-g-bg" />
                <h2 id="advanced-home">Điểm nổi bật</h2>
                <p>
                  Được nghiên cứu và phát triển bởi các nhà khoa học và các chuyên gia đầu ngành trong lĩnh vực Học máy,
                  Xử lý ngôn ngữ tự nhiên, Thị giác máy tính, nền tảng trí tuệ nhân tạo toàn diện Softia. cung cấp các
                  giải pháp công nghệ tốt nhất cho doanh nghiệp của bạn với sự hỗ trợ tận tình 24/7.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
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
                  Softia riển khai các sản phẩm, dịch vụ cũng như hỗ trợ một cách linh hoạt từ cloud đến on-premise để
                  đáp ứng nhu cầu của doanh nghiệp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sub-section">
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
              <p>Softia giúp mối quan hệ giữa doanh nghiệp và khách hàng ngày càng bền chặt</p>
              <ul className="ul-list-style m-20px-b">
                <li>Tiếp cận với khách hàng qua nhiều kênh</li>
                <li>Luôn có mặt khi khách hàng cần, mọi lúc, mọi nơi</li>
                <li>Hiểu ý định và mong muốn của khách hàng</li>
              </ul>
              <a className="m-btn btn-theme" href="#">
                Đăng ký dịch vụ
              </a>
            </div>
          </div>
          <div className="row align-items-center m-60px-b">
            <div className="col-md-6 order-2 sm-m-30px-t order-md-first">
              <h6 className="sub-title theme-color">Tích hợp và cập nhật liên tục.</h6>
              <h4 className="sub-section-title m-0px m-15px-b">
                Đảm bảo khách hàng <br />
                có dịch vụ tốt nhất.
              </h4>
              <p>Softia luôn liên tục cập nhật và nâng cao chất lượng sản phẩm.</p>
              <ul className="ul-list-style m-20px-b">
                <li>Tự đông cập nhật</li>
                <li>Tích hợp liên tục</li>
                <li>Dịch vụ mới nhất</li>
              </ul>
              <a className="m-btn btn-theme" href="#">
                Đăng ký dịch vụ
              </a>
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
              <a className="m-btn btn-theme" href="#">
                Đăng ký dịch vụ.
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="p-60px-tb sm-p-40px-tb testimonial-section">
        <div className="container">
          <div className="row m-25px-b sm-m-15px-b">
            <div className="col-md-12 text-center">
              <div className="section-title white">
                <h2>Khách hàng của chúng tôi.</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div id="client-slider-single" className="owl-carousel">
                <div className="testimonial-col">
                  <div className="d-flex">
                    <div className="img">
                      <span>
                        <img src={`${process.env.PUBLIC_URL}/images/customer/avtar1.jpg`} alt="Shark" title="Shark" />
                      </span>
                    </div>
                    <div className="speac">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry&apos;s standard dummy text ever since the 1500s.
                      </p>
                      <h6>
                        <strong>
                          Maria - <span className="theme-color">Owner</span>
                        </strong>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="testimonial-col">
                  <div className="d-flex">
                    <div className="img">
                      <span>
                        <img src={`${process.env.PUBLIC_URL}/images/customer/avtar1.jpg`} alt="Shark" title="Shark" />
                      </span>
                    </div>
                    <div className="speac">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry&apos;s standard dummy text ever since the 1500s.
                      </p>
                      <h6>
                        <strong>
                          Maria - <span className="theme-color">Owner</span>
                        </strong>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="testimonial-col">
                  <div className="d-flex">
                    <div className="img">
                      <span>
                        <img src={`${process.env.PUBLIC_URL}/images/customer/avtar1.jpg`} alt="Shark" title="Shark" />
                      </span>
                    </div>
                    <div className="speac">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry&apos;s standard dummy text ever since the 1500s.
                      </p>
                      <h6>
                        <strong>
                          Maria - <span className="theme-color">Owner</span>
                        </strong>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="testimonial-col">
                  <div className="d-flex">
                    <div className="img">
                      <span>
                        <img src={`${process.env.PUBLIC_URL}/images/customer/avtar1.jpg`} alt="Shark" title="Shark" />
                      </span>
                    </div>
                    <div className="speac">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry&apos;s standard dummy text ever since the 1500s.
                      </p>
                      <h6>
                        <strong>
                          Maria - <span className="theme-color">Owner</span>
                        </strong>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trusted-clients p-60px-tb">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="tc-left sm-m-30px-b">
                <span className="theme-color">Trusted</span>
                <h2>
                  Our trusted
                  <br />
                  Clients
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                <a className="m-btn btn-theme" href="#">
                  Sign Up For Beta
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
