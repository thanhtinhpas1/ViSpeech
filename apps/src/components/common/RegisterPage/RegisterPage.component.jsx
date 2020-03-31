/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { ROLES } from 'utils/constant'

const RegisterPage = ({ registerObj, register, onClearUserState }) => {
  useEffect(() => {
    onClearUserState()
  }, [onClearUserState])

  const handleOnSubmit = e => {
    e.preventDefault()

    const form = e.target
    const user = {
      username: form.elements.username.value,
      email: form.elements.email.value,
      lastName: form.elements.lastName.value,
      firstName: form.elements.firstName.value,
      password: form.elements.password.value,
      roles: [{ name: ROLES.USER }],
    }

    register(user)
  }

  if (registerObj.newUser) {
    return <Redirect to="/login" />
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
            <h2 className="page-ath-heading">Đăng ký</h2>
            {registerObj.message && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                id="alert-login"
                role="alert"
              >
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                {registerObj.message}
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
                  type="email"
                  placeholder="Email"
                  className="input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="input-item">
                <input type="text" placeholder="Họ" className="input-bordered" name="lastName" />
              </div>
              <div className="input-item">
                <input
                  type="text"
                  placeholder="Tên"
                  className="input-bordered"
                  name="firstName"
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
              <div className="input-item text-left">
                <input
                  className="input-checkbox input-checkbox-md"
                  id="term-condition"
                  type="checkbox"
                  required
                />
                <label htmlFor="term-condition">
                  I agree to Softia&apos;s
                  <a href="#"> Privacy Policy</a> &amp;
                  <a href="#"> Terms.</a>
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Đăng ký
              </button>
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

RegisterPage.propTypes = {}

export default RegisterPage
