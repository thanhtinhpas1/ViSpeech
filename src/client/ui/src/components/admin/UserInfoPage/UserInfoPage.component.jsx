/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useCallback, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Tabs } from 'antd'
import { ADMIN_PATH, TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import InfoModal from 'components/common/InfoModal/InfoModal.component'
import ConfirmModal from 'components/common/ConfirmModal/ConfirmModal.component'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'
import Utils from 'utils'
import InfoTab from './components/InfoTab/InfoTab.container'
import TransactionsTab from './components/TransactionsTab/TransactionsTab.container'
import ProjectsTab from './components/ProjectsTab/ProjectsTab.container'

const { TabPane } = Tabs

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const {
  USER_DELETED_FAILED_EVENT,
  TOKEN_DELETED_BY_USERID_SUCCESS_EVENT,
  TOKEN_DELETED_BY_USERID_FAILED_EVENT,
  PROJECT_DELETED_BY_USERID_SUCCESS_EVENT,
  PROJECT_DELETED_BY_USERID_FAILED_EVENT,
  PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT,
  PERMISSION_DELETED_BY_USERID_FAILED_EVENT,
} = KAFKA_TOPIC

const UserInfoPage = ({
  userInfoObj,
  deleteUserObj,
  getUserInfo,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
}) => {
  const { id } = useParams()
  const history = useHistory()
  const [infoModal, setInfoModal] = useState({})
  const [confirmModal, setConfirmModal] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(USER_DELETED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_USERID_FAILED_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_DELETED_BY_USERID_FAILED_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_DELETED_BY_USERID_FAILED_EVENT)
  }, [])

  const closeInfoModal = useCallback(() => {
    setInfoModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  const closeConfirmModal = useCallback(() => {
    setConfirmModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  useEffect(() => {
    if (id) {
      getUserInfo(id)
    }
  }, [id, getUserInfo])

  useEffect(() => {
    if (deleteUserObj.isLoading === true) {
      setTimeout(() => {
        if (deleteUserObj.isLoading === true) {
          deleteUserFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (deleteUserObj.isLoading === false && deleteUserObj.isSuccess != null) {
      if (deleteUserObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Xoá khách hàng',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Về danh sách khách hàng',
            clickFunc: () => {
              closeInfoModal()
              history.push(`${ADMIN_PATH}/users`)
            },
          },
          onCancel: () => {
            closeInfoModal()
            history.push(`${ADMIN_PATH}/users`)
          },
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Xoá khách hàng',
          message: Utils.buildFailedMessage(deleteUserObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
            },
          },
          onCancel: () => {
            closeInfoModal()
          },
        })
      }
    }
  }, [deleteUserObj, closeInfoModal, history, deleteUserFailure])

  const onDeleteUser = (e, userId) => {
    if (!userId) return

    setConfirmModal({
      visible: true,
      message: 'Bạn có chắc muốn xoá khách hàng?',
      onCancel: () => closeConfirmModal(),
      onOk: async () => {
        closeConfirmModal()
        setInfoModal({
          visible: true,
          title: 'Xoá khách hàng',
          message: 'Vui lòng chờ giây lát...',
          icon: {
            isLoading: true,
          },
          onCancel: () => closeInfoModal(),
        })

        deleteUser(userId)
        try {
          await UserService.deleteUser(userId)
          invokeCheckSubject.UserDeleted.subscribe(data => {
            if (data.error != null) {
              deleteUserFailure(data.errorObj)
            }
          })
          invokeCheckSubject.TokenDeletedByUserId.subscribe(data => {
            if (data.error != null) {
              deleteUserFailure(data.errorObj)
            }
          })
          invokeCheckSubject.ProjectDeletedByUserId.subscribe(data => {
            if (data.error != null) {
              deleteUserFailure(data.errorObj)
            }
          })
          invokeCheckSubject.PermissionDeletedByUserId.subscribe(data => {
            if (data.error != null) {
              deleteUserFailure(data.errorObj)
            } else {
              deleteUserSuccess()
            }
          })
        } catch (err) {
          deleteUserFailure({ message: err.message })
        }
      },
    })
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card" id="profile-main">
          <div className="card-header">
            <h4 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Thông tin chi tiết khách hàng</span>
              {userInfoObj.isLoading === false && userInfoObj.isSuccess === true && (
                <button
                  className="btn btn-just-icon btn-simple btn-danger m-0"
                  rel="tooltip"
                  title="Xoá khách hàng"
                  onClick={e => onDeleteUser(e, userInfoObj.user._id)}
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </h4>
          </div>
          <div className="card-content">
            <Tabs tabPosition="left" size="large">
              <TabPane tab="Thông tin" key="1">
                <InfoTab userInfoObj={userInfoObj} />
              </TabPane>
              <TabPane tab="Dự án" key="2">
                <ProjectsTab userInfoObj={userInfoObj} />
              </TabPane>
              <TabPane tab="Lịch sử giao dịch" key="3">
                <TransactionsTab userInfoObj={userInfoObj} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      {infoModal.visible && <InfoModal infoModal={infoModal} />}
      {confirmModal.visible && <ConfirmModal confirmModal={confirmModal} />}
    </div>
  )
}

export default UserInfoPage
