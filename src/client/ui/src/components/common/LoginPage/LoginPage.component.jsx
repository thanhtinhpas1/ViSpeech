/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import Utils from '../../../utils'
import { JWT_TOKEN, DEFAULT_ERR_MESSAGE, TIMEOUT_MILLISECONDS } from '../../../utils/constant'
import STORAGE from '../../../utils/storage'
import SocketService from '../../../services/socket.service'
import UserService from '../../../services/user.service'
import SocketUtils from '../../../utils/socket.util'
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle.container'
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook.container'
import './LoginPage.style.scss'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { USER_CREATED_SUCCESS_EVENT, USER_CREATED_FAILED_EVENT } = KAFKA_TOPIC

const LoginPage = ({
  loginObj,
  loginWithSocialObj,
  login,
  loginWithSocial,
  loginWithSocialSuccess,
  loginWithSocialFailure,
  onClearUserState,
}) => {
  const [form] = Form.useForm()
  const loadingRef = useRef(loginWithSocialObj.isLoading)
  loadingRef.current = loginWithSocialObj.isLoading

  useEffect(() => {
    SocketService.socketOnListeningEvent(USER_CREATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(USER_CREATED_FAILED_EVENT)
  }, [])

  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  const onSubmit = values => {
    const { username, password } = values
    const user = {
      username: username.trim(),
      password,
    }

    login(user)
  }

  useEffect(() => {
    let timer = null
    if (loginWithSocialObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          loginWithSocialFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    return () => clearTimeout(timer)
  }, [loginWithSocialObj, loginWithSocialFailure])

  const loginWithFacebookOrGoogle = async (accessToken, userType) => {
    loginWithSocial(accessToken, userType)
    try {
      const socialUser = await UserService.loginWithSocial(accessToken, userType)
      if (socialUser._id) {
        // already create new user with social account
        loginWithSocialSuccess(socialUser)
        STORAGE.setPreferences(JWT_TOKEN, socialUser.jwtToken)
      } else {
        // create new user with social account
        const unsubscribe$ = invokeCheckSubject.UserCreated.subscribe(data => {
          if (data.error != null) {
            loginWithSocialFailure(data.errorObj)
          } else {
            const user = { ...data.userDto }
            if (!Array.isArray(user.roles)) {
              user.roles = [user.roles]
            }
            loginWithSocialSuccess(user)
            STORAGE.setPreferences(JWT_TOKEN, user.jwtToken)
          }
          unsubscribe$.unsubscribe()
          unsubscribe$.complete()
        })
      }
    } catch (err) {
      loginWithSocialFailure({ message: DEFAULT_ERR_MESSAGE })
    }
  }

  return (
    <>
      <div className="page-ath-wrap login-page">
        <div className="page-ath-content">
          <div className="page-ath-header">
            <a href="/" className="page-ath-logo" style={{ fontSize: '2em', fontWeight: 'bold', letterSpacing: '1px' }}>
              VIET SPEECH
            </a>
          </div>
          <div className="page-ath-form">
            <h2 className="page-ath-heading">Đăng nhập</h2>
            {!loginObj.isLoading && loginObj.isSuccess === false && (
              <Alert
                message={Utils.buildFailedMessage(loginObj)}
                type="error"
                showIcon
                closable
                style={{ marginBottom: '20px' }}
              />
            )}
            {!loginWithSocialObj.isLoading && loginWithSocialObj.isSuccess === false && (
              <Alert
                message={Utils.buildFailedMessage(loginWithSocialObj.message)}
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
              <div className="d-flex justify-content-end align-items-center">
                {/* <div className="input-item text-left">
                  <input className="input-checkbox input-checkbox-md" id="remember-me" type="checkbox" />
                  <label htmlFor="remember-me">Ghi nhớ tài khoản</label>
                </div> */}
                <div>
                  <a href="/forget-password" style={{ fontSize: '15px' }}>
                    Quên mật khẩu?
                  </a>
                  <div className="gaps-2x" />
                </div>
              </div>
              <Form.Item>
                <Button htmlType="submit" loading={loginObj.isLoading} type="primary" className="btn-block">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <div className="sap-text">
              <span>Hoặc đăng nhập với</span>
            </div>
            <ul className="row guttar-20px guttar-vr-20px">
              <li className="col">
                <LoginWithFacebook loginWithSocial={loginWithFacebookOrGoogle} />
              </li>
              <li className="col">
                <LoginWithGoogle loginWithSocial={loginWithFacebookOrGoogle} />
              </li>
            </ul>
            <div className="gaps-2x" />
            <div className="gaps-2x" />
            <div className="form-note">
              Chưa có tài khoản?
              <a href="/register">
                {' '}
                <strong>Đăng ký ở đây</strong>
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

LoginPage.propTypes = {}

export default LoginPage
