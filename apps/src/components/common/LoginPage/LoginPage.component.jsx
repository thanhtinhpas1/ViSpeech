/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { CUSTOMER_PATH, ADMIN_PATH } from 'utils/constant'
import Utils from 'utils'
import AuthenWithFacebook from '../AuthenWithFacebook/AuthenWithFacebook.container'
import AuthenWithGoogle from '../AuthenWithGoogle/AuthenWithGoogle.container'

const LoginPage = ({ currentUser, loginObj, login, onClearUserState }) => {
  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  if (currentUser) {
    const isUser = Utils.checkIfIsUser(currentUser.roles)
    return <Redirect to={isUser ? CUSTOMER_PATH : ADMIN_PATH} />
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    const form = e.target
    const user = {
      username: form.elements.username.value,
      password: form.elements.password.value,
    }

    login(user)
  }

  return (
    <>
      <div className="page-ath-wrap">
        <div className="page-ath-content">
          <div className="page-ath-header">
            <a href="#" className="page-ath-logo" style={{ fontSize: '2em', fontWeight: 'bold' }}>
              SOFTIA.
            </a>
          </div>
          <div className="page-ath-form">
            <h2 className="page-ath-heading">Đăng nhập</h2>
            {loginObj.message && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                id="alert-login"
                role="alert"
              >
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                {loginObj.message}
              </div>
            )}
            <form onSubmit={e => handleOnSubmit(e)}>
              <div className="input-item">
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  className="input-bordered"
                  name="username"
                  required
                />
              </div>
              <div className="input-item">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="input-bordered"
                  name="password"
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="input-item text-left">
                  <input
                    className="input-checkbox input-checkbox-md"
                    id="remember-me"
                    type="checkbox"
                  />
                  <label htmlFor="remember-me">Ghi nhớ tài khoản</label>
                </div>
                <div>
                  <a href="/customer/forgot.html">Quên mật khẩu?</a>
                  <div className="gaps-2x" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Đăng nhập
              </button>
            </form>
            <div className="sap-text">
              <span>Hoặc đăng nhập với</span>
            </div>
            <ul className="row guttar-20px guttar-vr-20px">
              <li className="col">
                <AuthenWithFacebook />
              </li>
              <li className="col">
                <AuthenWithGoogle />
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
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>© 2019 Softia.</li>
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
