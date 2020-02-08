/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import * as moment from 'moment'
import PersonalDataTab from './components/PersonalDataTab/PersonalDataTab.component'
import SettingsTab from './components/SettingsTab/SettingsTab.component'
import PasswordTab from './components/PasswordTab/PasswordTab.component'

const ProfilePage = () => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="main-content col-lg-8">
            <div className="content-area card">
              <div className="card-innr">
                <div className="card-head">
                  <h4 className="card-title">Trang cá nhân</h4>
                </div>
                <ul className="nav nav-tabs nav-tabs-line" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#personal-data">
                      Thông tin cá nhân
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#settings">
                      Cài đặt
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#password">
                      Mật khẩu
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="profile-details">
                  <PersonalDataTab
                    personalData={{
                      fullName: 'Trần Khánh Linh',
                      email: 'trankhanhlinh98@gmail.com',
                      dateOfBirth: moment(new Date(1998, 9, 16)).format('DD/MM/YYYY'),
                    }}
                  />
                  <SettingsTab
                    settings={{
                      security: [
                        {
                          id: 'save-log',
                          label: 'Lưu lại các hoạt động của tôi',
                        },
                        {
                          id: 'pass-change-confirm',
                          label: 'Xác nhận qua email trước khi thay đổi mật khẩu',
                        },
                      ],
                      notifications: [
                        {
                          id: 'latest-news',
                          label:
                            'Thông báo qua email khi có chương trình khuyến mãi và tin tức mới nhất',
                        },
                        {
                          id: 'activity-alert',
                          label: 'Thông báo qua email khi có hoạt động bất thường xảy ra.',
                        },
                      ],
                    }}
                  />
                  <PasswordTab />
                </div>
              </div>
            </div>
          </div>
          <div className="aside sidebar-right col-lg-4">
            <div className="account-info card">
              <div className="card-innr">
                <h6 className="card-title card-title-sm">Trạng thái tài khoản</h6>
                <ul className="btn-grp">
                  <li>
                    <button className="btn btn-auto btn-xs btn-success">
                      Email đã được xác thực
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="referral-info card">
              <div className="card-innr">
                <h6 className="card-title card-title-sm">Giới thiệu nhận ưu đãi</h6>
                <p className=" pdb-0-5x">
                  Mời bạn bè &amp; người thân và nhận{' '}
                  <strong>
                    <span className="text-primary">ưu đãi - 15%</span> cho lần giao dịch tiếp theo
                  </strong>
                </p>
                <div className="copy-wrap mgb-0-5x">
                  <span className="copy-feedback" />
                  <em className="fas fa-link" />
                  <input
                    type="text"
                    className="copy-address"
                    defaultValue="https://demo.themenio.com/ico?ref=7d264f90653733592"
                    disabled
                  />
                  <button
                    className="copy-trigger copy-clipboard"
                    data-clipboard-text="https://demo.themenio.com/ico?ref=7d264f90653733592"
                  >
                    <em className="ti ti-files" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
