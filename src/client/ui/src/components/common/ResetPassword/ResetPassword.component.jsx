/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */

import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Alert } from 'antd'
import SocketService from '../../../services/socket.service'
import SocketUtils from '../../../utils/socket.util'
import Utils from '../../../utils'
import UserService from '../../../services/user.service'
import { DEFAULT_ERR_MESSAGE, TIMEOUT_MILLISECONDS } from '../../../utils/constant'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PASSWORD_RESET_SUCCESS_EVENT, PASSWORD_RESET_FAILED_EVENT } = KAFKA_TOPIC

const ResetPassword = ({ resetPasswordObj, resetPassword, resetPasswordSuccess, resetPasswordFailure }) => {
  const [form] = Form.useForm()
  const { emailToken } = useParams()
  const loadingRef = useRef(resetPasswordObj.isLoading)
  loadingRef.current = resetPasswordObj.isLoading

  useEffect(() => {
    SocketService.socketOnListeningEvent(PASSWORD_RESET_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PASSWORD_RESET_FAILED_EVENT)
  }, [])

  useEffect(() => {
    let timer = null
    if (resetPasswordObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          resetPasswordFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    return () => clearTimeout(timer)
  }, [resetPasswordObj, resetPasswordFailure])

  const onSubmit = async values => {
    const { newPassword } = values

    resetPassword({ newPassword, emailToken })
    try {
      await UserService.resetPassword(newPassword, emailToken)
      const unsubscribe$ = invokeCheckSubject.PasswordReset.subscribe(data => {
        if (data.error != null) {
          resetPasswordFailure(data.errorObj)
        } else {
          resetPasswordSuccess()
        }
        form.resetFields()
        unsubscribe$.unsubscribe()
        unsubscribe$.complete()
      })
    } catch (err) {
      resetPasswordFailure({ message: err.message })
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
            <h2 className="page-ath-heading">Đặt lại mật khẩu</h2>
            <Form form={form} onFinish={onSubmit} size="large">
              {!resetPasswordObj.isLoading && resetPasswordObj.isSuccess === false && (
                <Alert
                  message={Utils.buildFailedMessage(resetPasswordObj.message)}
                  type="error"
                  showIcon
                  closable
                  style={{ marginBottom: '20px' }}
                />
              )}
              {!resetPasswordObj.isLoading && resetPasswordObj.isSuccess === true && (
                <Alert
                  message="Thay đổi mật khẩu thành công"
                  type="success"
                  showIcon
                  closable
                  style={{ marginBottom: '20px' }}
                />
              )}
              <div className="row">
                <div className="col-md-12">
                  <Form.Item
                    name="newPassword"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!',
                      },
                    ]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu mới" />
                  </Form.Item>
                </div>
                <div className="col-md-12">
                  <Form.Item
                    name="confirmedNewPassword"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu mới!',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve()
                          }
                          // eslint-disable-next-line prefer-promise-reject-errors
                          return Promise.reject('Mật khẩu không khớp. Vui lòng nhập lại!')
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Xác nhận mật khẩu mới" />
                  </Form.Item>
                </div>
                <div className="col-md-12 d-sm-flex justify-content-between align-items-center">
                  <Form.Item>
                    <Button htmlType="submit" loading={resetPasswordObj.isLoading} type="primary">
                      Thay đổi
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
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

export default ResetPassword
