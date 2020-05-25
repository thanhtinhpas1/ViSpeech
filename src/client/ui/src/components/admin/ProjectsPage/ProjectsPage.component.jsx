/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import InfoModal from 'components/admin/InfoModal/InfoModal.component'
import { ADMIN_PATH, STATUS } from 'utils/constant'
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
  getProjectList,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(PROJECT_DELETED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_DELETED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_PROJECTID_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_DELETED_BY_PROJECTID_FAILED_EVENT)
  }, [])

  useEffect(() => {
    if (deleteProjectObj.isLoading === false && deleteProjectObj.isSuccess != null) {
      if (deleteProjectObj.isSuccess === true) {
        setInfoModal({
          title: 'Xoá dự án',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
              getProjectList({ pagination: { current: 1, pageSize: 10 } })
            },
          },
        })
      } else {
        setInfoModal({
          title: 'Xoá dự án',
          message: Utils.buildFailedMessage(deleteProjectObj.message, 'Thất bại'),
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
  }, [deleteProjectObj, getProjectList])

  const onDeleteProject = async projectId => {
    if (!projectId) return

    setInfoModal({
      title: 'Xoá dự án',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    })
    window.$('#info-modal').modal('show')

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
              <i className="zmdi zmdi-eye" />
            </a>
            {isValid ? (
              <a href="#" className="btn btn-simple btn-danger btn-just-icon" onClick={() => onDeleteProject(_id)}>
                <i className="zmdi zmdi-close-circle-o" />
              </a>
            ) : null}
          </>
        )
      },
      width: 120,
      align: 'right',
    },
  ]

  useEffect(() => {
    const pagination = {
      pageSize: 10,
      current: 1,
    }
    getProjectList({ pagination })
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
                pageSize={10}
                scrollY={700}
              />
            </div>
          </div>
        </div>
      </div>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default ProjectsPage
