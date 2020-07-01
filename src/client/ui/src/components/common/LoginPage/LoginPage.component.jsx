/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {Alert, Button} from 'antd'
import Utils from 'utils'
import {JWT_TOKEN} from 'utils/constant'
import STORAGE from 'utils/storage'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle.container'
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook.container'

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
  useEffect(() => {
    SocketService.socketOnListeningEvent(USER_CREATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(USER_CREATED_FAILED_EVENT)
  }, [])

  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  const handleOnSubmit = e => {
    e.preventDefault()

    const form = e.target
    const user = {
      username: form.elements.username.value,
      password: form.elements.password.value,
    }

    login(user)
  }

  const loginWithFacebookOrGoogle = async (accessToken, userType) => {
    loginWithSocial(accessToken, userType)
    try {
      const socialUser = await UserService.loginWithSocial(accessToken, userType)
      if (socialUser._id) {
        loginWithSocialSuccess(socialUser)
        STORAGE.setPreferences(JWT_TOKEN, socialUser.jwtToken)
      } else {
        invokeCheckSubject.UserCreated.subscribe(data => {
          if (data.error != null) {
            loginWithSocialFailure(data.errorObj)
          } else {
            const user = { ...data.userDto }
            user.roles = [user.roles]
            loginWithSocialSuccess(user)
            STORAGE.setPreferences(JWT_TOKEN, user.jwtToken)
          }
        })
      }
    } catch (err) {
      const msg = 'Đã có lỗi xảy ra, vui lòng thử lại sau ít phút.'
      loginWithSocialFailure({ message: msg })
    }
  }

  return (
    <>
      <div className="page-ath-wrap">
        <div className="page-ath-content">
          <div className="page-ath-header">
            <a href="/" className="page-ath-logo" style={{ fontSize: '2em', fontWeight: 'bold' }}>
              ASR VIETSPEECH
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
            <form onSubmit={e => handleOnSubmit(e)}>
              <div className="input-item">
                <input type="text" placeholder="Tên đăng nhập" className="input-bordered" name="username" required />
              </div>
              <div className="input-item">
                <input type="password" placeholder="Mật khẩu" className="input-bordered" name="password" required />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="input-item text-left">
                  <input className="input-checkbox input-checkbox-md" id="remember-me" type="checkbox" />
                  <label htmlFor="remember-me">Ghi nhớ tài khoản</label>
                </div>
                <div>
                  <a href="/customer/forgot.html">Quên mật khẩu?</a>
                  <div className="gaps-2x" />
                </div>
              </div>
              <Button htmlType="submit" loading={loginObj.isLoading} type="primary" size="large" className="btn-block">
                Đăng nhập
              </Button>
            </form>
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
                <strong>Đăng kí ở đây</strong>
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
              <li>© 2020 Softia.</li>
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
