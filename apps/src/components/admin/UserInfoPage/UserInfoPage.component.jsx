/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { ROLES, ADMIN_PATH } from 'utils/constant'
import Utils from 'utils'
import InfoTab from './components/InfoTab.component'
import ActivitiesTab from './components/ActivitiesTab.component'
import ChangePasswordTab from './components/ChangePasswordTab.component'

const UserInfoPage = ({ userInfoObj, deleteUserObj, getUserInfo, updateUserInfo, deleteUser }) => {
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getUserInfo(id)
    }
  }, [id, getUserInfo])

  const onSubmit = event => {
    event.preventDefault()
    if (!id) {
      return
    }

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
      email: form.elements.email.value,
      roles: formattedRoles,
    }
    updateUserInfo(id, user)
  }

  const onDeleteUser = (e, userId) => {
    deleteUser(userId)
  }

  if (deleteUserObj.isLoading === false && deleteUserObj.isSuccess === true) {
    return <Redirect to={`${ADMIN_PATH}/users`} />
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card" id="profile-main">
          <div className="card-content">
            <h3 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Thông tin chi tiết khách hàng</span>
              {userInfoObj.isLoading === false && userInfoObj.isSuccess === true && (
                <button
                  className="btn btn-just-icon btn-simple btn-behance m-0"
                  rel="tooltip"
                  title="Xoá khách hàng"
                  onClick={e => onDeleteUser(e, userInfoObj.user._id)}
                >
                  <i className="zmdi zmdi-delete" />
                </button>
              )}
            </h3>
            <div role="tabpanel">
              <ul className="nav nav-pills">
                <li className="active">
                  <a href="#info-tab" aria-controls="info-tab" role="tab" data-toggle="tab">
                    Thông tin
                  </a>
                </li>
                <li>
                  <a
                    href="#activities-tab"
                    aria-controls="activities-tab"
                    role="tab"
                    data-toggle="tab"
                  >
                    Hoạt động
                  </a>
                </li>
                <li>
                  <a
                    href="#change-password-tab"
                    aria-controls="change-password-tab"
                    role="tab"
                    data-toggle="tab"
                  >
                    Cài đặt
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <InfoTab userInfoObj={userInfoObj} onSubmit={onSubmit} />
                <ActivitiesTab />
                <ChangePasswordTab />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-profile">
          <div className="card-avatar">
            <a href="#pablo">
              <img className="img" src="/images/admin/faces/avatar.png" />
            </a>
          </div>
          <div className="card-content">
            <h6 className="category text-gray">CEO / Co-Founder</h6>
            <h4 className="card-title">Alec Thompson</h4>
            <p className="description">
              Don&apos;t be scared of the truth because we need to restart the human foundation in
              truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back
              is...
            </p>
            <a href="#pablo" className="btn btn-rose btn-round">
              Follow
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoPage
