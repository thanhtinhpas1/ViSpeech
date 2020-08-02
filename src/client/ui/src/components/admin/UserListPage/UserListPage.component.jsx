/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback, useRef } from 'react'
import * as moment from 'moment'
import {
  ADMIN_PATH,
  ROLES,
  DEFAULT_PAGINATION,
  STATUS,
  DEFAULT_ERR_MESSAGE,
  TIMEOUT_MILLISECONDS,
} from '../../../utils/constant'
import AntdTable from '../../common/AntdTable/AntdTable.component'
import SocketService from '../../../services/socket.service'
import UserService from '../../../services/user.service'
import SocketUtils from '../../../utils/socket.util'
import InfoModal from '../../common/InfoModal/InfoModal.component'
import ConfirmModal from '../../common/ConfirmModal/ConfirmModal.component'
import Utils from '../../../utils'

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

const UserListPage = ({
  userListObj,
  deleteUserObj,
  clearDeleteUserState,
  getUserList,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})
  const [confirmModal, setConfirmModal] = useState({})
  const loadingRef = useRef(deleteUserObj.isLoading)
  loadingRef.current = deleteUserObj.isLoading

  useEffect(() => {
    return () => clearDeleteUserState()
  }, [clearDeleteUserState])

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
    let timer = null
    if (deleteUserObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          deleteUserFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (deleteUserObj.isLoading === false && deleteUserObj.isSuccess != null) {
      if (deleteUserObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Xoá người dùng',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
              getUserList({ pagination: DEFAULT_PAGINATION.SIZE_5 })
            },
          },
          onCancel: () => {
            closeInfoModal()
            getUserList({ pagination: DEFAULT_PAGINATION.SIZE_5 })
          },
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Xoá người dùng',
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
    return () => clearTimeout(timer)
  }, [deleteUserObj, getUserList, closeInfoModal, deleteUserFailure])

  const onDeleteUser = async userId => {
    if (!userId) return

    setConfirmModal({
      visible: true,
      message: 'Bạn có chắc muốn xoá người dùng?',
      onCancel: () => closeConfirmModal(),
      onOk: async () => {
        closeConfirmModal()
        setInfoModal({
          visible: true,
          title: 'Xoá người dùng',
          message: 'Vui lòng chờ giây lát...',
          icon: {
            isLoading: true,
          },
          onCancel: () => closeInfoModal(),
        })

        deleteUser(userId)
        let tokenDeleted = false
        let projectDeleted = false
        let permissionDeleted = false
        try {
          await UserService.deleteUser(userId)
          const unsubscribe$ = invokeCheckSubject.UserDeleted.subscribe(data => {
            if (data.error != null) {
              deleteUserFailure(data.errorObj)
            }
            unsubscribe$.unsubscribe()
            unsubscribe$.complete()
          })
          const unsubscribe1$ = invokeCheckSubject.TokenDeletedByUserId.subscribe(data => {
            if (data.error != null) {
              deleteUserFailure(data.errorObj)
            } else {
              tokenDeleted = true
              if (tokenDeleted && projectDeleted && permissionDeleted) {
                deleteUserSuccess()
              }
            }
            unsubscribe1$.unsubscribe()
            unsubscribe1$.complete()
          })
          const unsubscribe2$ = invokeCheckSubject.ProjectDeletedByUserId.subscribe(data => {
            if (data.error != null) {
              deleteUserFailure(data.errorObj)
            } else {
              projectDeleted = true
              if (tokenDeleted && projectDeleted && permissionDeleted) {
                deleteUserSuccess()
              }
            }
            unsubscribe2$.unsubscribe()
            unsubscribe2$.complete()
          })
          const unsubscribe3$ = invokeCheckSubject.PermissionDeletedByUserId.subscribe(data => {
            if (data.error != null) {
              deleteUserFailure(data.errorObj)
            } else {
              permissionDeleted = true
              if (tokenDeleted && projectDeleted && permissionDeleted) {
                deleteUserSuccess()
              }
            }
            unsubscribe3$.unsubscribe()
            unsubscribe3$.complete()
          })
        } catch (err) {
          deleteUserFailure({ message: err.message })
        }
      },
    })
  }

  const columns = [
    {
      title: 'Họ',
      dataIndex: 'lastName',
      canSearch: true,
      render: lastName => <span>{lastName}</span>,
      width: 180,
    },
    {
      title: 'Tên',
      dataIndex: 'firstName',
      canSearch: true,
      render: firstName => <span>{firstName}</span>,
      width: 180,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      canSearch: true,
      render: username => <span>{username}</span>,
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      canSearch: true,
      render: email => <span>{email}</span>,
      width: 180,
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      filters: [
        { text: ROLES.USER, value: ROLES.USER },
        { text: ROLES.MANAGER_USER, value: ROLES.MANAGER_USER },
        { text: ROLES.ADMIN, value: ROLES.ADMIN },
      ],
      filterMultiple: false,
      render: roles => {
        return <span>{roles[0].name}</span>
      },
      width: 180,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      headerClassName: 'dt-token',
      className: 'dt-amount',
      filters: [
        { text: STATUS.ACTIVE.viText, value: STATUS.ACTIVE.name },
        { text: STATUS.INACTIVE.viText, value: STATUS.INACTIVE.name },
      ],
      filterMultiple: false,
      render: isActive => (
        <div className="d-flex align-items-center">
          <div className={`data-state ${isActive.cssClass}`} />
          <span className="sub sub-s2" style={{ paddingTop: '0' }}>
            {isActive.viText}
          </span>
        </div>
      ),
      width: 180,
    },
    {
      title: 'Tạo ngày',
      dataIndex: 'createdDate',
      sorter: true,
      render: createdDate => moment(createdDate).format('DD/MM/YYYY HH:mm'),
      width: 180,
      align: 'center',
    },
    {
      title: '',
      dataIndex: '_id',
      headerClassName: 'text-right',
      render: (_id, record) => {
        const isActive = record.isActive.name === STATUS.ACTIVE.name
        return (
          <>
            <a href={`${ADMIN_PATH}/user-info/${_id}`} className="btn btn-simple btn-secondary btn-just-icon">
              <i className="far fa-eye" />
            </a>
            <button
              disabled={!isActive}
              className="btn btn-simple btn-danger btn-just-icon"
              onClick={() => onDeleteUser(_id)}
            >
              <i className="fas fa-times" />
            </button>
          </>
        )
      },
      width: 120,
      align: 'right',
    },
  ]

  useEffect(() => {
    getUserList({ pagination: DEFAULT_PAGINATION.SIZE_5 })
  }, [getUserList])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Danh sách người dùng</span>
              <a
                href={`${ADMIN_PATH}/create-user`}
                className="btn btn-just-icon btn-simple btn-primary m-0"
                rel="tooltip"
                title="Thêm mới"
              >
                <i className="fas fa-plus" />
              </a>
            </h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <AntdTable
                dataObj={userListObj.userList}
                columns={columns}
                fetchData={getUserList}
                isLoading={userListObj.isLoading}
                pageSize={DEFAULT_PAGINATION.SIZE_5.pageSize}
                scrollY={500}
              />
            </div>
          </div>
        </div>
      </div>
      {infoModal.visible && <InfoModal infoModal={infoModal} />}
      {confirmModal.visible && <ConfirmModal confirmModal={confirmModal} />}
    </div>
  )
}

export default UserListPage
