import React, { useState, useEffect } from 'react'
import { CUSTOMER_PATH, JWT_TOKEN } from 'utils/constant'
import STORAGE from 'utils/storage'
import Utils from 'utils'
import InfoModal from '../InfoModal/InfoModal.component'

const VerifyEmailPage = ({
  currentUser,
  history,
  match,
  verifyEmailObj,
  verifyEmail,
  onAuthenticate,
}) => {
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    onAuthenticate(token)
  }, [onAuthenticate])

  useEffect(() => {
    if (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess === true) {
      setInfoModal({
        title: 'Kích hoạt tài khoản',
        message: 'Tài khoản của bạn đã được kích hoạt thành công.',
        icon: { isSuccess: true },
        button: {
          content: 'Về trang cá nhân',
          clickFunc: () => {
            window.$('#info-modal').modal('hide')
            history.push(`${CUSTOMER_PATH}/profile`)
          },
        },
      })
    }
    if (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess === false) {
      setInfoModal({
        title: 'Kích hoạt tài khoản',
        message: 'Kích hoạt tài khoản thất bại. Vui lòng thử lại sau.',
        icon: { isSuccess: false },
      })
    }
  }, [verifyEmailObj, history])

  const onVerifyEmail = () => {
    let infoObj = {
      title: 'Kích hoạt tài khoản',
      message: 'Tài khoản của bạn đã được kích hoạt.',
      icon: { isSuccess: true },
      button: {
        content: 'Về trang cá nhân',
        clickFunc: () => {
          window.$('#info-modal').modal('hide')
          history.push(`${CUSTOMER_PATH}/profile`)
        },
      },
    }

    // 2 cases: refresh page or click verify button again
    if (
      Utils.isEmailVerified(currentUser.roles) ||
      (verifyEmailObj.isLoading === false && verifyEmailObj.isSuccess === true)
    ) {
      setInfoModal(infoObj)
      window.$('#info-modal').modal('show')
      return
    }

    const {
      params: { emailToken },
    } = match

    infoObj = {
      title: 'Kích hoạt tài khoản',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    }
    setInfoModal(infoObj)
    window.$('#info-modal').modal('show')
    verifyEmail(emailToken)
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-9 col-lg-10">
            <div className="content-area card">
              <div className="card-innr">
                <div className="card-head">
                  <h6 className="card-title text-center">Email Confirm Template</h6>
                </div>
                <div className="gaps-1x" />
                <table className="email-wraper">
                  <tbody>
                    <tr>
                      <td className="pdt-4x pdb-4x">
                        <table className="email-header">
                          <tbody>
                            <tr>
                              <td className="text-center pdb-2-5x">
                                <p className="email-title">
                                  The Best Selling Premium HTML Template
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="email-body">
                          <tbody>
                            <tr>
                              <td className="pd-3x pdb-1-5x">
                                <h2 className="email-heading">Confirm Your E-Mail Address</h2>
                              </td>
                            </tr>
                            <tr>
                              <td className="pdl-3x pdr-3x pdb-2x">
                                <p className="mgb-1x">Hi Ishtiyak,</p>
                                <p className="mgb-1x">
                                  Welcome! <br /> You are receiving this email because you have
                                  registered on our site.
                                </p>
                                <p className="mgb-1x">
                                  Click the link below to active your Tokenwiz account.
                                </p>
                                <p className="mgb-2-5x">
                                  This link will expire in 15 minutes and can only be used once.
                                </p>
                                <button
                                  type="button"
                                  className="btn email-btn"
                                  onClick={onVerifyEmail}
                                >
                                  Verify Email
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="pdl-3x pdr-3x">
                                <h4 className="email-heading-s2">or</h4>
                                <p className="mgb-1x">
                                  If the button above does not work, paste this link into your web
                                  browser:
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="pd-3x pdt-2x pdb-3x">
                                <p>
                                  If you did not make this request, please contact us or ignore this
                                  message.
                                </p>
                                <p className="email-note">
                                  This is an automatically generated email please do not reply to
                                  this email. If you face any issues, please contact us at
                                  help@icocrypto.com
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default VerifyEmailPage
