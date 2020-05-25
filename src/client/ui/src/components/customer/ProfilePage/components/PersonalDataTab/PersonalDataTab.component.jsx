/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import InfoModal from 'components/customer/InfoModal/InfoModal.component'
import { ROLES } from 'utils/constant'
import Utils from 'utils'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { USER_UPDATED_SUCCESS_EVENT, USER_UPDATED_FAILED_EVENT } = KAFKA_TOPIC

const PersonalDataTab = ({
  currentUser,
  updateCurrentUserObj,
  updateCurrentUser,
  updateCurrentUserSuccess,
  updateCurrentUserFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(USER_UPDATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(USER_UPDATED_FAILED_EVENT)
  }, [])

  useEffect(() => {
    const roleInputs = window.$('.role-inputs')
    if (
      currentUser.roles &&
      currentUser.roles.length > 0 &&
      roleInputs.length === Utils.filter(Object.values(ROLES), role => role !== ROLES.ADMIN).length
    ) {
      for (let i = 0; i < roleInputs.length; i += 1) {
        const isChecked = Utils.getRolesInArray(currentUser.roles).includes(roleInputs[i].name)
        if (isChecked) {
          window.$('.role-inputs')[i].checked = true
        }
      }
    }
  }, [currentUser.roles])

  useEffect(() => {
    if (updateCurrentUserObj.isLoading === false && updateCurrentUserObj.isSuccess != null) {
      if (updateCurrentUserObj.isSuccess === true) {
        setInfoModal({
          title: 'Cập nhật thông tin',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
            },
          },
        })
      } else {
        setInfoModal({
          title: 'Cập nhật thông tin',
          message: Utils.buildFailedMessage(updateCurrentUserObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
            },
          },
        })
      }
    }
  }, [updateCurrentUserObj])

  const onSubmit = async event => {
    event.preventDefault()
    if (!currentUser._id) return

    const form = event.target
    const user = {
      _id: currentUser._id,
      firstName: form.elements.firstName.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      username: form.elements.username.value.trim(),
      email: form.elements.email.value.trim(),
      roles: currentUser.roles,
    }

    setInfoModal({
      title: 'Cập nhật thông tin',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    })
    window.$('#info-modal').modal('show')

    updateCurrentUser(currentUser._id, user)
    try {
      await UserService.updateUserInfo(currentUser._id, user)
      invokeCheckSubject.UserUpdated.subscribe(data => {
        if (data.error != null) {
          updateCurrentUserFailure(data.errorObj)
        } else {
          updateCurrentUserSuccess(user)
        }
      })
    } catch (err) {
      updateCurrentUserFailure({ message: err.message })
    }
  }

  return (
    <div className="tab-pane fade show active" id="personal-data">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="last-name" className="input-item-label">
                Họ
              </label>
              <input
                className="input-bordered"
                type="text"
                id="last-name"
                name="lastName"
                defaultValue={currentUser.lastName || ''}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="first-name" className="input-item-label">
                Tên
              </label>
              <input
                className="input-bordered"
                type="text"
                id="first-name"
                name="firstName"
                defaultValue={currentUser.firstName || ''}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="username" className="input-item-label">
                Username
              </label>
              <input
                className="input-bordered"
                type="text"
                id="username"
                name="username"
                defaultValue={currentUser.username || ''}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="email" className="input-item-label">
                Email
              </label>
              <input
                className="input-bordered"
                type="email"
                id="email"
                name="email"
                defaultValue={currentUser.email || ''}
                disabled={Utils.isEmailVerified(currentUser.roles)}
              />
            </div>
          </div>
          <div className="col-md-12">
            <label className="input-item-label text-exlight">Vai trò</label>
            <ul className="d-flex flex-wrap checkbox-list">
              {Utils.filter(Object.values(ROLES), role => role !== ROLES.ADMIN).map(role => {
                return (
                  <li key={role}>
                    <div className="input-item text-left">
                      <input
                        className="input-checkbox input-checkbox-sm role-inputs"
                        type="checkbox"
                        name={role}
                        disabled
                      />
                      <label>{role.toUpperCase()}</label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="gaps-1x" />
        <div className="d-sm-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">
            Cập nhật
          </button>
        </div>
      </form>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default PersonalDataTab
