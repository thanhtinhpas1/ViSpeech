/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import AntdTable from '../../../../common/AntdTable/AntdTable.component'
import InfoModal from '../../../../common/InfoModal/InfoModal.component'
import ConfirmModal from '../../../../common/ConfirmModal/ConfirmModal.component'
import {
  STATUS,
  DEFAULT_PAGINATION,
  CUSTOMER_PATH,
  DEFAULT_ERR_MESSAGE,
  TIMEOUT_MILLISECONDS,
} from '../../../../../utils/constant'
import SocketUtils from '../../../../../utils/socket.util'
import SocketService from '../../../../../services/socket.service'
import Utils from '../../../../../utils'
import PermissionService from '../../../../../services/permission.service'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PERMISSION_FOR_ASSIGNEE_DELETED_SUCCESS_EVENT, PERMISSION_FOR_ASSIGNEE_DELETED_FAILED_EVENT } = KAFKA_TOPIC

const AssigneesTable = ({
  currentUser,
  projectId,
  projectName,
  getProjectAssigneeListObj,
  deletePermissionForAssigneeObj,
  getProjectAssignees,
  deletePermissionForAssignee,
  deletePermissionForAssigneeSuccess,
  deletePermissionForAssigneeFailure,
  clearDeletePermissionForAssigneeState,
}) => {
  const [infoModal, setInfoModal] = useState({})
  const [confirmModal, setConfirmModal] = useState({})
  const loadingRef = useRef(deletePermissionForAssigneeObj.isLoading)
  loadingRef.current = deletePermissionForAssigneeObj.isLoading

  useEffect(() => {
    return () => clearDeletePermissionForAssigneeState()
  }, [clearDeletePermissionForAssigneeState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(PERMISSION_FOR_ASSIGNEE_DELETED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_FOR_ASSIGNEE_DELETED_FAILED_EVENT)
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
    if (deletePermissionForAssigneeObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          deletePermissionForAssigneeFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (deletePermissionForAssigneeObj.isLoading === false && deletePermissionForAssigneeObj.isSuccess != null) {
      if (deletePermissionForAssigneeObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Xoá thành viên khỏi dự án',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
              getProjectAssignees({ projectId, pagination: DEFAULT_PAGINATION.SIZE_5 })
            },
          },
          onCancel: () => {
            closeInfoModal()
            getProjectAssignees({ projectId, pagination: DEFAULT_PAGINATION.SIZE_5 })
          },
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Xoá thành viên khỏi dự án',
          message: Utils.buildFailedMessage(deletePermissionForAssigneeObj.message, 'Thất bại'),
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
  }, [
    projectId,
    deletePermissionForAssigneeObj,
    getProjectAssignees,
    closeInfoModal,
    deletePermissionForAssigneeFailure,
  ])

  const onDeletePermissionForAssignee = async assigneeId => {
    if (!assigneeId || !projectId || !currentUser?._id) return

    setConfirmModal({
      visible: true,
      message: 'Bạn có chắc muốn xoá thành viên khỏi dự án?',
      onCancel: () => closeConfirmModal(),
      onOk: async () => {
        closeConfirmModal()
        setInfoModal({
          visible: true,
          title: 'Xoá thành viên',
          message: 'Vui lòng chờ giây lát...',
          icon: {
            isLoading: true,
          },
          onCancel: () => closeInfoModal(),
        })

        deletePermissionForAssignee(projectId, currentUser._id, assigneeId)
        try {
          await PermissionService.deletePermissionForAssignee(projectId, currentUser._id, assigneeId)
          const unsubscribe$ = invokeCheckSubject.PermissionForAssigneeDeleted.subscribe(data => {
            if (data.error != null) {
              deletePermissionForAssigneeFailure(data.errorObj)
            } else {
              deletePermissionForAssigneeSuccess()
            }
            unsubscribe$.unsubscribe()
            unsubscribe$.complete()
          })
        } catch (err) {
          deletePermissionForAssigneeFailure({ message: err.message })
        }
      },
    })
  }

  const columns = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      canSearch: true,
      render: username => <span className="lead tnx-id">{username}</span>,
      width: 180,
    },
    {
      title: 'Họ',
      dataIndex: 'lastName',
      canSearch: true,
      render: lastName => <span className="lead">{lastName}</span>,
      width: 150,
    },
    {
      title: 'Tên',
      dataIndex: 'firstName',
      canSearch: true,
      render: lastName => <span className="lead">{lastName}</span>,
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      canSearch: true,
      render: email => <span className="lead">{email}</span>,
      width: 150,
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
      title: '',
      dataIndex: '_id',
      render: (_id, record) => {
        return (
          <>
            <Link
              to={`${CUSTOMER_PATH}/update-permission?projectId=${projectId}&assignerId=${currentUser?._id}&assigneeId=${_id}&username=${record.username}&projectName=${projectName}`}
              className="btn btn-light-alt btn-xs btn-icon mr-2"
            >
              <em className="ti ti-eye" />
            </Link>
            <button className="btn btn-danger-alt btn-xs btn-icon" onClick={() => onDeletePermissionForAssignee(_id)}>
              <em className="ti ti-trash" />
            </button>
          </>
        )
      },
      width: 120,
      align: 'right',
    },
  ]

  useEffect(() => {
    if (!projectId) return
    getProjectAssignees({ projectId, pagination: DEFAULT_PAGINATION.SIZE_5 })
  }, [projectId, getProjectAssignees])

  const getProjectAssigneeList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      if (!projectId) return
      getProjectAssignees({ projectId, pagination, sortField, sortOrder, filters })
    },
    [projectId, getProjectAssignees]
  )

  return (
    <div>
      <AntdTable
        dataObj={getProjectAssigneeListObj.assigneeList}
        columns={columns}
        fetchData={getProjectAssigneeList}
        isLoading={getProjectAssigneeListObj.isLoading}
        pageSize={DEFAULT_PAGINATION.SIZE_5.pageSize}
        scrollY={500}
      />
      {infoModal.visible && <InfoModal infoModal={infoModal} />}
      {confirmModal.visible && <ConfirmModal confirmModal={confirmModal} />}
    </div>
  )
}

export default AssigneesTable
