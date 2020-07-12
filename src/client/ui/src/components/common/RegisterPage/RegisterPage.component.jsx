/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert, Button } from 'antd'
import { ROLES, USER_TYPE, DEFAULT_ERR_MESSAGE, TIMEOUT_MILLISECONDS } from 'utils/constant'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'
import Utils from 'utils'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { USER_CREATED_SUCCESS_EVENT, USER_CREATED_FAILED_EVENT } = KAFKA_TOPIC

const RegisterPage = ({ registerObj, onClearUserState, registerStart, registerSuccess, registerFailure }) => {
  const history = useHistory()

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
    if (registerObj.isLoading === true) {
      setTimeout(() => {
        if (registerObj.isLoading === true) {
          registerFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
  }, [registerObj, registerFailure])

  const handleOnSubmit = async e => {
    e.preventDefault()

    const form = e.target
    const user = {
      username: form.elements.username.value,
      email: form.elements.email.value,
      lastName: form.elements.lastName.value,
      firstName: form.elements.firstName.value,
      password: form.elements.password.value,
      roles: [{ name: ROLES.USER }],
      userType: USER_TYPE.NORMAL,
    }

    registerStart()
    try {
      await UserService.register(user)
      invokeCheckSubject.UserCreated.subscribe(data => {
        if (data.error != null) {
          registerFailure(data.errorObj)
        } else {
          registerSuccess(user)
        }
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
            <form onSubmit={e => handleOnSubmit(e)}>
              <div className="input-item">
                <input type="text" placeholder="Tên đăng nhập" className="input-bordered" name="username" required />
              </div>
              <div className="input-item">
                <input type="email" placeholder="Email" className="input-bordered" name="email" required />
              </div>
              <div className="input-item">
                <input type="text" placeholder="Họ" className="input-bordered" name="lastName" />
              </div>
              <div className="input-item">
                <input type="text" placeholder="Tên" className="input-bordered" name="firstName" required />
              </div>
              <div className="input-item">
                <input type="password" placeholder="Mật khẩu" className="input-bordered" name="password" required />
              </div>
              <div className="input-item text-left">
                <input className="input-checkbox input-checkbox-md" id="term-condition" type="checkbox" required />
                <label htmlFor="term-condition">
                  Tôi đồng ý với
                  <a href="#"> Điều khoản và</a> &amp;
                  <a href="#"> Quy định.</a>
                </label>
              </div>
              <Button
                htmlType="submit"
                loading={registerObj.isLoading}
                type="primary"
                size="large"
                className="btn-block"
              >
                Đăng ký
              </Button>
            </form>
            <div className="gaps-2x" />
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
              <li>© 2020 ASR VietSpeech.</li>
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
