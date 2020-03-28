/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { ROLES } from 'utils/constant'
import Utils from 'utils'

const UserCreatePage = ({ createUserObj, createUser }) => {
  const emptyAllInputField = () => {
    window.$('#create-user-form')[0].reset()
  }

  useEffect(() => {
    if (createUserObj.isLoading === false && createUserObj.isSuccess === true) {
      emptyAllInputField()
    }
  }, [createUserObj])

  const onSubmit = event => {
    event.preventDefault()

    const form = event.target
    const selectedRoles = Object.values(ROLES).map(role => {
      return {
        name: role,
        isSelected: form.elements[role].checked,
      }
    })
    const formattedRoles = Utils.formatRolesToSubmit(selectedRoles)

    const user = {
      firstName: form.elements.firstName.value,
      lastName: form.elements.lastName.value,
      username: form.elements.username.value,
      password: form.elements.password.value,
      email: form.elements.email.value,
      roles: formattedRoles,
    }
    createUser(user)
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-content">
            <h4 className="card-title">Thêm khách hàng mới</h4>
            <form onSubmit={onSubmit} id="create-user-form">
              <div className="form-group label-floating">
                <label className="control-label">
                  Họ <small>*</small>
                </label>
                <input type="text" className="form-control" name="lastName" required />
              </div>
              <div className="form-group label-floating">
                <label className="control-label">
                  Tên <small>*</small>
                </label>
                <input type="text" className="form-control" name="firstName" required />
              </div>
              <div className="form-group label-floating">
                <label className="control-label">
                  Tên đăng nhập <small>*</small>
                </label>
                <input type="text" className="form-control" name="username" required />
              </div>
              <div className="form-group label-floating">
                <label className="control-label">
                  Mật khẩu <small>*</small>
                </label>
                <input type="password" className="form-control" name="password" required />
              </div>
              <div className="form-group label-floating">
                <label className="control-label">
                  Email <small>*</small>
                </label>
                <input type="email" className="form-control" name="email" required />
              </div>
              <div className="row m-t-15">
                <label className="col-sm-2 label-on-left">Vai trò</label>
                <div className="col-sm-10">
                  {Object.values(ROLES).map(role => {
                    return (
                      <div className="checkbox checkbox-inline m-t-0" key={role}>
                        <label>
                          <input type="checkbox" name={role} />
                          {role.toUpperCase()}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary">
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCreatePage
