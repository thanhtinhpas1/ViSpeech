/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { CUSTOMER_PATH, STATUS } from 'utils/constant'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import * as moment from 'moment'
import Utils from 'utils'
import InfoModal from '../InfoModal/InfoModal.component'

const ProjectPage = ({
  currentUser,
  getMyProjectListObj,
  getAcceptedProjectListObj,
  getMyProjects,
  getAcceptedProjects,
}) => {
  const [infoModal, setInfoModal] = useState({})
  const history = useHistory()

  const myProjectTableColumns = [
    {
      title: 'Tên dự án',
      dataIndex: 'name',
      style: { paddingRight: '30px' },
      canSearch: true,
      render: name => (
        <span className="lead tnx-id" style={{ color: '#2c80ff' }}>
          {name}
        </span>
      ),
      width: 180,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      headerClassName: 'dt-type',
      className: 'dt-type',
      style: { paddingRight: '30px' },
      render: description => <div className="d-flex align-items-center">{description}</div>,
      width: 200,
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
      render: _id => {
        return (
          <Link to={`${CUSTOMER_PATH}/my-project/${_id}`} className="btn btn-light-alt btn-xs btn-icon">
            <em className="ti ti-eye" />
          </Link>
        )
      },
      width: 60,
      align: 'right',
    },
  ]

  const acceptedProjectTableColumns = [
    {
      title: 'Tên dự án',
      dataIndex: 'name',
      style: { paddingRight: '30px' },
      canSearch: true,
      render: name => (
        <span className="lead tnx-id" style={{ color: '#2c80ff' }}>
          {name}
        </span>
      ),
      width: 180,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      headerClassName: 'dt-type',
      className: 'dt-type',
      style: { paddingRight: '30px' },
      render: description => <div className="d-flex align-items-center">{description}</div>,
      width: 200,
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'ownerName',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      canSearch: true,
      render: ownerName => <span className="lead tnx-id">{ownerName}</span>,
      width: 180,
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
      title: 'Trạng thái',
      dataIndex: 'status',
      headerClassName: 'dt-token',
      className: 'dt-token',
      filters: [
        { text: STATUS.ACCEPTED.viText, value: STATUS.ACCEPTED.name },
        { text: STATUS.REJECTED.viText, value: STATUS.REJECTED.name },
      ],
      filterMultiple: false,
      render: status => (
        <div className="d-flex align-items-center">
          <div className={`data-state ${status.class}`} />
          <span className="sub sub-s2" style={{ paddingTop: 0 }}>
            {status.name}
          </span>
        </div>
      ),
      width: 180,
      align: 'left',
    },
    {
      title: '',
      dataIndex: '_id',
      render: (_id, record) => {
        const isRejected = record.status.value === STATUS.REJECTED.name
        const isProjectValid = record.isValid.name === STATUS.VALID.name
        const disableBtn = isRejected || !isProjectValid
        return (
          <Link
            to={disableBtn ? '#!' : `${CUSTOMER_PATH}/accepted-project/${_id}`}
            className={`btn btn-light-alt btn-xs btn-icon ${disableBtn ? 'disabled' : ''}`}
          >
            <em className="ti ti-eye" />
          </Link>
        )
      },
      width: 60,
      align: 'right',
    },
  ]

  useEffect(() => {
    const userId = currentUser._id
    if (userId) {
      const pagination = {
        pageSize: 5,
        current: 1,
      }
      getMyProjects({ userId, pagination })
      getAcceptedProjects({ userId, pagination })
    }
  }, [currentUser._id, getMyProjects, getAcceptedProjects])

  const getMyProjectList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = currentUser._id
      if (userId) {
        getMyProjects({ userId, pagination, sortField, sortOrder, filters })
      }
    },
    [currentUser._id, getMyProjects]
  )

  const getAcceptedProjectList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = currentUser._id
      if (userId) {
        getAcceptedProjects({ userId, pagination, sortField, sortOrder, filters })
      }
    },
    [currentUser._id, getAcceptedProjects]
  )

  const onClickCreateProject = () => {
    const infoObj = {
      title: 'Không thể thực hiện tác vụ',
      message:
        'Tài khoản của bạn chưa được kích hoạt. Vui lòng thực hiện xác thực email tại trang cá nhân để kích hoạt tài khoản.',
      icon: {
        isSuccess: false,
      },
      button: {
        content: 'Đến trang cá nhân',
        clickFunc: () => {
          window.$('#info-modal').modal('hide')
          history.push(`${CUSTOMER_PATH}/profile`)
        },
      },
    }
    setInfoModal(infoObj)
    window.$('#info-modal').modal('show')
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Danh sách dự án</h4>
              {currentUser &&
                (Utils.isEmailVerified(currentUser.roles) ? (
                  <>
                    <Link
                      to={`${CUSTOMER_PATH}/create-project`}
                      className="btn btn-sm btn-auto btn-primary d-sm-block d-none"
                    >
                      Tạo mới
                      <em className="fas fa-plus ml-3" />
                    </Link>
                    <Link to={`${CUSTOMER_PATH}/create-project`} className="btn btn-icon btn-sm btn-primary d-sm-none">
                      <em className="fas fa-plus" />
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={onClickCreateProject}
                      className="btn btn-icon btn-sm btn-primary d-sm-block d-none"
                    >
                      Tạo mới
                      <em className="fas fa-plus ml-3" />
                    </button>
                    <button onClick={onClickCreateProject} className="btn btn-icon btn-sm btn-primary d-sm-none">
                      Tạo mới
                      <em className="fas fa-plus" />
                    </button>
                    <InfoModal infoModal={infoModal} />
                  </>
                ))}
            </div>
            <div className="gaps-1x" />
            <ul className="nav nav-tabs nav-tabs-line" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#my-project-list">
                  Dự án của bạn
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#accepted-project-list">
                  Dự án đã tham gia
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="my-project-list">
                <div className="gaps-1x" />
                <AntdTable
                  dataObj={getMyProjectListObj.myProjectList}
                  columns={myProjectTableColumns}
                  fetchData={getMyProjectList}
                  isLoading={getMyProjectListObj.isLoading}
                  pageSize={5}
                  scrollY={500}
                />
              </div>
              <div className="tab-pane fade" id="accepted-project-list">
                <div className="gaps-1x" />
                <AntdTable
                  dataObj={getAcceptedProjectListObj.acceptedProjectList}
                  columns={acceptedProjectTableColumns}
                  fetchData={getAcceptedProjectList}
                  isLoading={getAcceptedProjectListObj.isLoading}
                  pageSize={5}
                  scrollY={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
