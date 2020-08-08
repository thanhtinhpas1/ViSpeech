/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert, Button, Form, Input } from 'antd'
import { ROLES, USER_TYPE, DEFAULT_ERR_MESSAGE, TIMEOUT_MILLISECONDS } from '../../../utils/constant'
import SocketService from '../../../services/socket.service'
import UserService from '../../../services/user.service'
import SocketUtils from '../../../utils/socket.util'
import Utils from '../../../utils'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { USER_CREATED_SUCCESS_EVENT, USER_CREATED_FAILED_EVENT } = KAFKA_TOPIC

const RegisterPage = ({ registerObj, onClearUserState, registerStart, registerSuccess, registerFailure }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const loadingRef = useRef(registerObj.isLoading)
  loadingRef.current = registerObj.isLoading

  useEffect(() => {
    SocketService.socketOnListeningEvent(USER_CREATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(USER_CREATED_FAILED_EVENT)
  }, [])

  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  useEffect(() => {
    if (registerObj.data) {
      history.push(`/login`)
    }
  }, [registerObj.data, history])

  useEffect(() => {
    let timer = null
    if (registerObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          registerFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    return () => clearTimeout(timer)
  }, [registerObj, registerFailure])

  const onSubmit = async values => {
    const { username, email, lastName, firstName, password } = values
    const user = {
      username: username.trim(),
      email: email.trim(),
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      password,
      roles: [{ name: ROLES.USER }],
      userType: USER_TYPE.NORMAL,
    }

    registerStart()
    try {
      await UserService.register(user)
      const unsubscribe$ = invokeCheckSubject.UserCreated.subscribe(data => {
        if (data.error != null) {
          registerFailure(data.errorObj)
        } else {
          registerSuccess(user)
        }
        unsubscribe$.unsubscribe()
        unsubscribe$.complete()
      })
    } catch (err) {
      registerFailure({ message: DEFAULT_ERR_MESSAGE })
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
            <h2 className="page-ath-heading">Đăng ký</h2>
            {!registerObj.isLoading && registerObj.isSuccess === false && (
              <Alert
                message={Utils.buildFailedMessage(registerObj.message)}
                type="error"
                showIcon
                closable
                style={{ marginBottom: '20px' }}
              />
            )}
            <Form form={form} onFinish={onSubmit} size="large">
              <Form.Item
                name="username"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên đăng nhập!',
                  },
                ]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
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
              <Form.Item name="lastName" hasFeedback rules={[]}>
                <Input placeholder="Họ" />
              </Form.Item>
              <Form.Item
                name="firstName"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên!',
                  },
                ]}
              >
                <Input placeholder="Tên" />
              </Form.Item>
              <Form.Item
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
              <Form.Item
                name="confirmedPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      // eslint-disable-next-line prefer-promise-reject-errors
                      return Promise.reject('Mật khẩu không khớp. Vui lòng nhập lại!')
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={registerObj.isLoading} type="primary" className="btn-block">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <div className="gaps-2x" />
            <div className="form-note">
              Đã có tài khoản?
              <a href="/login">
                {' '}
                <strong>Đăng nhập</strong>
              </a>
            </div>
          </div>
          <div className="page-ath-footer">
            <ul className="footer-links">
              <li>
                <a href="#">Điều khoản</a>
              </li>
              <li>
                <a href="#">Tài liệu</a>
              </li>
              <li>© 2020 VietSpeech.</li>
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

RegisterPage.propTypes = {}

export default RegisterPage
