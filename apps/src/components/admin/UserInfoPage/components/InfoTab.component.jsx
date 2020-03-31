/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { ROLES } from 'utils/constant'
import Utils from 'utils'

const InfoTab = ({ userInfoObj, onSubmit }) => {
  return (
    <div role="tabpanel" className="tab-pane active" id="info-tab">
      <div className="card">
        {/* {userInfoObj.isLoading === false && userInfoObj.isSuccess === true && ( */}
        <form className="form-horizontal" onSubmit={onSubmit}>
          <div className="card-content">
            <div className="row">
              <label className="col-sm-2 label-on-left">Họ</label>
              <div className="col-sm-10">
                <div className="form-group label-floating is-empty">
                  <label className="control-label" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ"
                    name="lastName"
                    defaultValue={userInfoObj.user.lastName}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 label-on-left">Tên</label>
              <div className="col-sm-10">
                <div className="form-group label-floating is-empty">
                  <label className="control-label" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên"
                    name="firstName"
                    defaultValue={userInfoObj.user.firstName}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 label-on-left">Tên đăng nhập</label>
              <div className="col-sm-10">
                <div className="form-group">
                  <p className="form-control-static">{userInfoObj.user.username}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 label-on-left">Email</label>
              <div className="col-sm-10">
                <div className="form-group label-floating is-empty">
                  <label className="control-label" />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    defaultValue={userInfoObj.user.email}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 label-on-left">Vai trò</label>
              <div className="col-sm-10">
                {Object.values(ROLES).map(role => {
                  return (
                    <div
                      className="checkbox checkbox-inline"
                      style={{ marginRight: '10px' }}
                      key={role}
                    >
                      <label>
                        <input
                          type="checkbox"
                          name={role}
                          defaultChecked={Utils.getRolesInArray(
                            userInfoObj.user.roles || []
                          ).includes(role)}
                        />
                        {role.toUpperCase()}
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
        </form>
        {/* )} */}
      </div>
    </div>
  )
}

export default InfoTab
