/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import Utils from 'utils'
import STORAGE from 'utils/storage'
import { JWT_TOKEN } from 'utils/constant'
import SocketUtils from 'utils/socket.util'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import PersonalDataTab from './components/PersonalDataTab/PersonalDataTab.container'
import PasswordTab from './components/PasswordTab/PasswordTab.container'
import InfoModal from '../InfoModal/InfoModal.component'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { VERIFY_EMAIL_SENT_SUCCESS_EVENT, VERIFY_EMAIL_SENT_FAILED_EVENT } = KAFKA_TOPIC

const ProfilePage = ({
  currentUser,
  sendVerifyEmailObj,
  sendVerifyEmail,
  sendVerifyEmailSuccess,
  sendVerifyEmailFailure,
  onAuthenticate,
}) => {
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    if (currentUser && !Utils.isEmailVerified(currentUser.roles)) {
      SocketService.socketOnListeningEvent(VERIFY_EMAIL_SENT_SUCCESS_EVENT)
      SocketService.socketOnListeningEvent(VERIFY_EMAIL_SENT_FAILED_EVENT)
    }
  }, [currentUser])

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    onAuthenticate(token)
  }, [onAuthenticate])

  useEffect(() => {
    if (sendVerifyEmailObj.isLoading === false && sendVerifyEmailObj.isSuccess === true) {
      setInfoModal({
        title: 'Kích hoạt tài khoản',
        message: 'Mail kích hoạt tài khoản đã được gửi đến bạn.<br/>Vui lòng kiểm tra mail và làm theo hướng dẫn.',
        icon: { isSuccess: true },
      })
    }
    if (sendVerifyEmailObj.isLoading === false && sendVerifyEmailObj.isSuccess === false) {
      setInfoModal({
        title: 'Kích hoạt tài khoản',
        message: Utils.buildFailedMessage(sendVerifyEmailObj.message, 'Thất bại'),
        icon: { isSuccess: false },
      })
    }
  }, [sendVerifyEmailObj])

  const onSendVerifyEmail = async () => {
    const infoObj = {
      title: 'Kích hoạt tài khoản',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    }
    setInfoModal(infoObj)
    window.$('#info-modal').modal('show')

    sendVerifyEmail(currentUser._id)
    try {
      await UserService.sendVerifyEmail(currentUser._id)
      invokeCheckSubject.VerifyEmailSent.subscribe(data => {
        if (data.error != null) {
          sendVerifyEmailFailure(data.errorObj)
        } else {
          sendVerifyEmailSuccess()
        }
      })
    } catch (err) {
      sendVerifyEmailFailure({ message: err.message })
    }
  }

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
                    <a className="nav-link" data-toggle="tab" href="#change-password">
                      Mật khẩu
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="profile-details">
                  <PersonalDataTab />
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
                    {currentUser && !Utils.isEmailVerified(currentUser.roles) ? (
                      <>
                        <p className="pdb-0-5x">
                          Email của bạn chưa được xác thực. Xác thực email để kích hoạt tài khoản.
                        </p>
                        <button className="btn btn-sm btn-auto btn-warning" onClick={onSendVerifyEmail}>
                          Xác thực email
                        </button>
                      </>
                    ) : (
                      <span className="badge badge-sm badge-success">Email đã được xác thực</span>
                    )}
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
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default ProfilePage
