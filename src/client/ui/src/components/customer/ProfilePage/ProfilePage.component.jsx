/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Utils from 'utils'
import STORAGE from 'utils/storage'
import { DEFAULT_ERR_MESSAGE, JWT_TOKEN, TIMEOUT_MILLISECONDS } from 'utils/constant'
import SocketUtils from 'utils/socket.util'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import InfoModal from 'components/common/InfoModal/InfoModal.component'
import PersonalDataTab from './components/PersonalDataTab/PersonalDataTab.container'
import PasswordTab from './components/PasswordTab/PasswordTab.container'

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
  const [ infoModal, setInfoModal ] = useState({})
  const loadingRef = useRef(sendVerifyEmailObj.isLoading)
  loadingRef.current = sendVerifyEmailObj.isLoading

  useEffect(() => {
    if (currentUser && !Utils.isEmailVerified(currentUser.roles)) {
      SocketService.socketOnListeningEvent(VERIFY_EMAIL_SENT_SUCCESS_EVENT)
      SocketService.socketOnListeningEvent(VERIFY_EMAIL_SENT_FAILED_EVENT)
    }
  }, [ currentUser ])

  const closeInfoModal = useCallback(() => {
    setInfoModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    onAuthenticate(token)
  }, [ onAuthenticate ])

  useEffect(() => {
    let timer = null
    if (sendVerifyEmailObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          sendVerifyEmailFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (sendVerifyEmailObj.isLoading === false && sendVerifyEmailObj.isSuccess != null) {
      if (sendVerifyEmailObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Kích hoạt tài khoản',
          message: 'Mail kích hoạt tài khoản đã được gửi đến bạn.<br/>Vui lòng kiểm tra mail và làm theo hướng dẫn.',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
            },
          },
          onCancel: () => closeInfoModal(),
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Kích hoạt tài khoản',
          message: Utils.buildFailedMessage(sendVerifyEmailObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
            },
          },
          onCancel: () => closeInfoModal(),
        })
      }
    }
    return () => clearTimeout(timer)
  }, [ sendVerifyEmailObj, closeInfoModal, sendVerifyEmailFailure ])

  const onSendVerifyEmail = async () => {
    const infoObj = {
      visible: true,
      title: 'Kích hoạt tài khoản',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
      onCancel: () => closeInfoModal(),
    }
    setInfoModal(infoObj)

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
                  <PersonalDataTab/>
                  <PasswordTab/>
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
                    { currentUser && !Utils.isEmailVerified(currentUser.roles) ? (
                      <>
                        <p className="pdb-0-5x">
                          Email của bạn chưa được xác thực. Xác thực email để kích hoạt tài khoản.
                        </p>
                        <button className="btn btn-sm btn-auto btn-warning" onClick={ onSendVerifyEmail }>
                          Xác thực email
                        </button>
                      </>
                    ) : (
                      <span className="badge badge-sm badge-success">Email đã được xác thực</span>
                    ) }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      { infoModal.visible && <InfoModal infoModal={ infoModal }/> }
    </div>
  )
}

export default ProfilePage
