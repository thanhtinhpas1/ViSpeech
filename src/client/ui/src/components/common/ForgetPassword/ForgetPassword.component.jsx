/* eslint react/prop-types: 0 */
import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import UserService from '../../../services/user.service'
import SocketService from '../../../services/socket.service'
import SocketUtils from '../../../utils/socket.util'
import Utils from '../../../utils'
import LoadingIcon from '../LoadingIcon/LoadingIcon.component'
import { TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE } from '../../../utils/constant'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { RESET_PASSWORD_EMAIL_SENT_SUCCESS_EVENT, RESET_PASSWORD_EMAIL_SENT_FAILED_EVENT } = KAFKA_TOPIC

const ForgetPassword = ({
  sendResetPasswordEmailObj,
  onClearUserState,
  sendResetPasswordEmail,
  sendResetPasswordEmailSuccess,
  sendResetPasswordEmailFailure,
}) => {
  const [form] = Form.useForm()
  const [userEmail, setUserEmail] = useState(null)
  const [resendDone, setResendDone] = useState(null)
  const loadingRef = useRef(sendResetPasswordEmailObj.isLoading)
  loadingRef.current = sendResetPasswordEmailObj.isLoading

  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(RESET_PASSWORD_EMAIL_SENT_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(RESET_PASSWORD_EMAIL_SENT_FAILED_EVENT)
  }, [])

  useEffect(() => {
    let timer = null
    if (sendResetPasswordEmailObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          setResendDone(p => {
            return p === false ? true : null
          })
          sendResetPasswordEmailFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    return () => clearTimeout(timer)
  }, [sendResetPasswordEmailObj, sendResetPasswordEmailFailure])

  const onSubmit = async (values, resend = false) => {
    const { email } = values
    const emailToSend = email || userEmail

    sendResetPasswordEmail(emailToSend)
    try {
      await UserService.sendResetPasswordEmail(emailToSend)
      const unsubscribe$ = invokeCheckSubject.ResetPasswordEmailSent.subscribe(data => {
        setResendDone(resend)
        if (data.error != null) {
          sendResetPasswordEmailFailure(data.errorObj)
        } else {
          sendResetPasswordEmailSuccess()
          setUserEmail(emailToSend)
        }
        form.resetFields()
        unsubscribe$.unsubscribe()
        unsubscribe$.complete()
      })
    } catch (err) {
      sendResetPasswordEmailFailure({ message: err.message })
      setResendDone(resend)
      form.resetFields()
    }
  }

  const resendEmail = () => {
    setResendDone(false)
    onSubmit({}, true)
  }

  return (
    <>
      <div className="page-ath-wrap">
        <div className="page-ath-content">
          <div className="page-ath-header">
            <a href="/" className="page-ath-logo" style={{ fontSize: '2em', fontWeight: 'bold', letterSpacing: '1px' }}>
              VIET SPEECH
            </a>
          </div>
          <div className="page-ath-form">
            {!userEmail && sendResetPasswordEmailObj.isSuccess !== true && (
              <>
                <h2 className="page-ath-heading">Quên mật khẩu?</h2>
                <div>
                  Đừng lo lắng! <br /> Hãy nhập email bạn đã đăng ký với Viet Speech vào ô bên dưới.
                </div>
                <div className="gaps-2x" />
              </>
            )}
            {userEmail && (
              <>
                <h2 className="page-ath-heading">Đặt lại mật khẩu</h2>
                <div>
                  Chúng tôi đã gửi một email đến địa chỉ{' '}
                  <span style={{ color: '#1c65c9', fontWeight: 'bold' }}>{userEmail}</span>.
                  <br />
                  Nhấp vào đường dẫn trong mail để đặt lại mật khẩu nhé.
                </div>
                <div className="gaps-4x" />
                <div>
                  Chưa nhận được email?
                  <br />
                  Vui lòng kiểm tra thư mục spam hoặc{' '}
                  <a
                    href="#!"
                    onClick={resendEmail}
                    className={`${sendResetPasswordEmailObj.isLoading ? 'disabled' : ''}`}
                  >
                    gửi lại
                  </a>{' '}
                  email.
                </div>
                {sendResetPasswordEmailObj.isLoading && (
                  <div>
                    <div className="gaps-2x" />
                    <LoadingIcon />
                    <span style={{ marginLeft: '15px' }}>Đang gửi...</span>
                  </div>
                )}
                {resendDone && !sendResetPasswordEmailObj.isLoading && sendResetPasswordEmailObj.isSuccess === true && (
                  <>
                    <div className="gaps-2x" />
                    <Alert
                      message="Gửi lại email thành công"
                      type="success"
                      showIcon
                      closable
                      style={{ marginBottom: '20px' }}
                    />
                  </>
                )}
                {resendDone && !sendResetPasswordEmailObj.isLoading && sendResetPasswordEmailObj.isSuccess === false && (
                  <>
                    <div className="gaps-2x" />
                    <Alert
                      message={Utils.buildFailedMessage(sendResetPasswordEmailObj.message)}
                      type="error"
                      showIcon
                      closable
                      style={{ marginBottom: '20px' }}
                    />
                  </>
                )}
              </>
            )}

            {!userEmail && sendResetPasswordEmailObj.isSuccess !== true && (
              <Form form={form} onFinish={onSubmit} size="large">
                {!sendResetPasswordEmailObj.isLoading && sendResetPasswordEmailObj.isSuccess === false && (
                  <Alert
                    message={Utils.buildFailedMessage(sendResetPasswordEmailObj.message)}
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: '20px' }}
                  />
                )}
                <Form.Item
                  name="email"
                  hasFeedback
                  rules={[
                    { type: 'email', message: 'Email không hợp lệ!' },
                    {
                      required: true,
                      message: 'Vui lòng nhập email!',
                    },
                  ]}
                >
                  <Input placeholder="Email của bạn" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" loading={sendResetPasswordEmailObj.isLoading} type="primary">
                    Gửi mã xác nhận
                  </Button>
                </Form.Item>
              </Form>
            )}
            <div>
              <div className="gaps-4x" />
              <a href="/login">Về trang đăng nhập</a>
            </div>
          </div>
          <div className="page-ath-footer">
            <ul className="footer-links">
              <li>© 2020 VietSpeech.</li>
              <li>Sponsored by SendGrid</li>
            </ul>
          </div>
        </div>
        <div className="page-ath-gfx">
          <div className="w-100 d-flex justify-content-center">
            <div className="col-md-8 col-xl-5">
              <img src={`${process.env.PUBLIC_URL}/images/all/ath-gfx.png`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
