/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import InfoModal from 'components/common/InfoModal/InfoModal.component'
import ConfirmModal from 'components/common/ConfirmModal/ConfirmModal.component'
import { ADMIN_PATH, STATUS, DEFAULT_PAGINATION, TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import SocketService from 'services/socket.service'
import ProjectService from 'services/project.service'
import SocketUtils from 'utils/socket.util'
import Utils from 'utils'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const {
  PROJECT_DELETED_SUCCESS_EVENT,
  PROJECT_DELETED_FAILED_EVENT,
  TOKEN_DELETED_BY_PROJECTID_SUCCESS_EVENT,
  TOKEN_DELETED_BY_PROJECTID_FAILED_EVENT,
} = KAFKA_TOPIC

const ProjectsPage = ({
  getProjectListObj,
  deleteProjectObj,
  clearDeleteProjectState,
  getProjectList,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})
  const [confirmModal, setConfirmModal] = useState({})

  useEffect(() => {
    return () => clearDeleteProjectState()
  }, [clearDeleteProjectState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(PROJECT_DELETED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_DELETED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_PROJECTID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_PROJECTID_FAILED_EVENT)
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
    if (deleteProjectObj.isLoading === true) {
      setTimeout(() => {
        if (deleteProjectObj.isLoading === true) {
          deleteProjectFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (deleteProjectObj.isLoading === false && deleteProjectObj.isSuccess != null) {
      if (deleteProjectObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Xoá dự án',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
              getProjectList({ pagination: DEFAULT_PAGINATION.SIZE_10 })
            },
          },
          onCancel: () => {
            closeInfoModal()
            getProjectList({ pagination: DEFAULT_PAGINATION.SIZE_10 })
          },
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Xoá dự án',
          message: Utils.buildFailedMessage(deleteProjectObj.message, 'Thất bại'),
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
  }, [deleteProjectObj, getProjectList, closeInfoModal, deleteProjectFailure])

  const onDeleteProject = async projectId => {
    if (!projectId) return

    setConfirmModal({
      visible: true,
      message: 'Bạn có chắc muốn xoá dự án?',
      onCancel: () => closeConfirmModal(),
      onOk: async () => {
        closeConfirmModal()
        setInfoModal({
          visible: true,
          title: 'Xoá dự án',
          message: 'Vui lòng chờ giây lát...',
          icon: {
            isLoading: true,
          },
          onCancel: () => closeInfoModal(),
        })

        deleteProject(projectId)
        try {
          await ProjectService.deleteProject(projectId)
          invokeCheckSubject.ProjectDeleted.subscribe(data => {
            if (data.error != null) {
              deleteProjectFailure(data.errorObj)
            }
          })
          invokeCheckSubject.TokenDeletedByProjectId.subscribe(data => {
            if (data.error != null) {
              deleteProjectFailure(data.errorObj)
            } else {
              deleteProjectSuccess()
            }
          })
        } catch (err) {
          deleteProjectFailure({ message: err.message })
        }
      },
    })
  }

  const columns = [
    {
      title: 'Mã dự án',
      dataIndex: '_id',
      canSearch: true,
      render: _id => <span>{_id}</span>,
      width: 150,
    },
    {
      title: 'Tên dự án',
      dataIndex: 'name',
      canSearch: true,
      render: name => <span>{name}</span>,
      width: 180,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: description => <div className="d-flex align-items-center">{description}</div>,
      width: 200,
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'ownerName',
      canSearch: true,
      render: ownerName => <span>{ownerName}</span>,
      width: 120,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isValid',
      headerClassName: 'dt-token',
      className: 'dt-amount',
      filters: [
        { text: STATUS.VALID.viText, value: STATUS.VALID.name },
        { text: STATUS.INVALID.viText, value: STATUS.INVALID.name },
      ],
      filterMultiple: false,
      render: isValid => (
        <div className="d-flex align-items-center">
          <div className={`data-state ${isValid.cssClass}`} />
          <span className="sub sub-s2" style={{ paddingTop: '0' }}>
            {isValid.viText}
          </span>
        </div>
      ),
      width: 180,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdDate',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      sorter: true,
      render: createdDate => (
        <span className="sub sub-date" style={{ fontSize: '13px' }}>
          {moment(createdDate).format('DD/MM/YYYY HH:mm')}
        </span>
      ),
      width: 180,
      align: 'center',
    },
    {
      title: '',
      dataIndex: '_id',
      render: (_id, record) => {
        const isValid = record.isValid.name === STATUS.VALID.name
        return (
          <>
            <a href={`${ADMIN_PATH}/user-project/${_id}`} className="btn btn-just-icon btn-secondary btn-simple">
              <i className="far fa-eye" />
            </a>
            <button
              disabled={!isValid}
              className="btn btn-simple btn-danger btn-just-icon"
              onClick={() => onDeleteProject(_id)}
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
    getProjectList({ pagination: DEFAULT_PAGINATION.SIZE_10 })
  }, [getProjectList])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Danh sách dự án</h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <AntdTable
                dataObj={getProjectListObj.projectList}
                columns={columns}
                fetchData={getProjectList}
                isLoading={getProjectListObj.isLoading}
                pageSize={DEFAULT_PAGINATION.SIZE_10.pageSize}
                scrollY={700}
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

export default ProjectsPage
