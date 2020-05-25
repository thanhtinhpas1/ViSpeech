/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { ADMIN_PATH, ROLES } from 'utils/constant'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'
import InfoModal from 'components/admin/InfoModal/InfoModal.component'
import Utils from 'utils'

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
  getUserList,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(USER_DELETED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_USERID_FAILED_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_DELETED_BY_USERID_FAILED_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_DELETED_BY_USERID_FAILED_EVENT)
  }, [])

  useEffect(() => {
    if (deleteUserObj.isLoading === false && deleteUserObj.isSuccess != null) {
      if (deleteUserObj.isSuccess === true) {
        setInfoModal({
          title: 'Xoá khách hàng',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
              getUserList({ pagination: { current: 1, pageSize: 5 } })
            },
          },
        })
      } else {
        setInfoModal({
          title: 'Xoá khách hàng',
          message: Utils.buildFailedMessage(deleteUserObj.message, 'Thất bại'),
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
  }, [deleteUserObj, getUserList])

  const onDeleteUser = async userId => {
    if (!userId) return

    setInfoModal({
      title: 'Xoá khách hàng',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    })
    window.$('#info-modal').modal('show')

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
      render: _id => (
        <>
          <a href={`${ADMIN_PATH}/user-info/${_id}`} className="btn btn-simple btn-secondary btn-just-icon">
            <i className="zmdi zmdi-eye" />
          </a>
          <a href="#" className="btn btn-simple btn-danger btn-just-icon" onClick={() => onDeleteUser(_id)}>
            <i className="zmdi zmdi-close-circle-o" />
          </a>
        </>
      ),
      width: 120,
      align: 'right',
    },
  ]

  useEffect(() => {
    const pagination = {
      pageSize: 10,
      current: 1,
    }
    getUserList({ pagination })
  }, [getUserList])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Danh sách khách hàng</span>
              <a
                href={`${ADMIN_PATH}/create-user`}
                className="btn btn-just-icon btn-simple btn-primary m-0"
                rel="tooltip"
                title="Thêm mới"
              >
                <i className="zmdi zmdi-plus-circle-o" />
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
                pageSize={5}
                scrollY={500}
              />
            </div>
          </div>
        </div>
      </div>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default UserListPage
