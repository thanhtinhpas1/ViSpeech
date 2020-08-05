/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import UserService from '../../../services/user.service'
import SocketService from '../../../services/socket.service'
import SocketUtils from '../../../utils/socket.util'
import Utils from '../../../utils'

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

  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(RESET_PASSWORD_EMAIL_SENT_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(RESET_PASSWORD_EMAIL_SENT_FAILED_EVENT)
  }, [])

  const onSubmit = async values => {
    const { email } = values
    setUserEmail(email)

    sendResetPasswordEmail(email)
    try {
      await UserService.sendResetPasswordEmail(email)
      const unsubscribe$ = invokeCheckSubject.ResetPasswordEmail.subscribe(data => {
        if (data.error != null) {
          sendResetPasswordEmailFailure(data.errorObj)
        } else {
          sendResetPasswordEmailSuccess()
        }
        form.resetFields()
        unsubscribe$.unsubscribe()
        unsubscribe$.complete()
      })
    } catch (err) {
      sendResetPasswordEmailFailure({ message: err.message })
      form.resetFields()
    }
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
            {!sendResetPasswordEmailObj.isLoading && sendResetPasswordEmailObj.isSuccess === null && (
              <>
                <h2 className="page-ath-heading">Quên mật khẩu?</h2>
                <div>Đừng lo lắng. Hãy nhập email bạn đã đăng ký với Viet Speech vào ô bên dưới.</div>
              </>
            )}
            {!sendResetPasswordEmailObj.isLoading && sendResetPasswordEmailObj.isSuccess === true && (
              <>
                <h2 className="page-ath-heading">Đặt lại mật khẩu</h2>
                <div>
                  Chúng tôi đã gửi một email đến địa chỉ {userEmail}. Nhấp vào đường dẫn trong mail để đặt lại mật khẩu.
                </div>
                <div>
                  Chưa nhận được mail?
                  <br />
                  Vui lòng kiểm tra thư mục spam hoặc <Button type="link">gửi lại</Button> email.
                </div>
              </>
            )}

            {!sendResetPasswordEmailObj.isLoading && sendResetPasswordEmailObj.isSuccess !== true && (
              <Form form={form} onFinish={onSubmit}>
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
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" loading={sendResetPasswordEmailObj.isLoading} type="primary" size="large">
                    Gửi mã xác nhận
                  </Button>
                </Form.Item>
              </Form>
            )}
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
    </>
  )
}

export default ForgetPassword
