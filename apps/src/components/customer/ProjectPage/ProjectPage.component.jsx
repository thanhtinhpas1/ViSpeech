/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react'
import { CUSTOMER_PATH, STATUS } from 'utils/constant'
import ReactTable from 'components/customer/ReactTable/ReactTable.component'
import { Link } from 'react-router-dom'
import * as moment from 'moment'
import Utils from 'utils'
import InfoModal from '../InfoModal/InfoModal.component'

const ProjectPage = ({
  history,
  currentUser,
  getMyProjectListObj,
  getAcceptedProjectListObj,
  getMyProjects,
  getAcceptedProjects,
}) => {
  const [infoModal, setInfoModal] = useState({})

  const myProjectTableColumns = [
    {
      Header: 'Tên project',
      accessor: 'name',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return (
          <span className="lead tnx-id" style={{ color: '#2c80ff' }}>
            {cell.value}
          </span>
        )
      },
    },
    {
      Header: 'Mô tả',
      accessor: 'description',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return <div className="d-flex align-items-center">{cell.value}</div>
      },
    },
    {
      Header: 'Thời gian tạo',
      accessor: 'createdDate',
      headerClassName: 'data-col dt-amount',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return (
          <span className="sub sub-date" style={{ fontSize: '13px' }}>
            {moment(cell.value).format('DD/MM/YYYY HH:mm')}
          </span>
        )
      },
    },
    {
      Header: '',
      accessor: '_id',
      id: 'my-project-detail',
      headerClassName: 'data-col',
      className: 'data-col text-right',
      Cell: props => {
        const { cell } = props
        return (
          <Link
            to={`${CUSTOMER_PATH}/my-project/${cell.value}`}
            className="btn btn-light-alt btn-xs btn-icon"
          >
            <em className="ti ti-eye" />
          </Link>
        )
      },
    },
  ]

  const acceptedProjectTableColumns = [
    {
      Header: 'Tên project',
      accessor: 'name',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return (
          <span className="lead tnx-id" style={{ color: '#2c80ff' }}>
            {cell.value}
          </span>
        )
      },
    },
    {
      Header: 'Mô tả',
      accessor: 'description',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return <div className="d-flex align-items-center">{cell.value}</div>
      },
    },
    {
      Header: 'Tạo bởi',
      accessor: 'ownerName',
      headerClassName: 'data-col dt-amount',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return <span className="lead tnx-id">{cell.value}</span>
      },
    },
    {
      Header: 'Thời gian tạo',
      accessor: 'createdDate',
      headerClassName: 'data-col dt-amount',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return (
          <span className="sub sub-date" style={{ fontSize: '13px' }}>
            {moment(cell.value).format('DD/MM/YYYY HH:mm')}
          </span>
        )
      },
    },
    {
      Header: 'Trạng thái',
      accessor: 'status',
      headerClassName: 'data-col dt-token',
      className: 'data-col dt-token',
      Cell: props => {
        const { cell } = props
        return (
          <div className="d-flex align-items-center">
            <div className={`data-state ${cell.value.class}`} />
            <span className="sub sub-s2" style={{ paddingTop: 0 }}>
              {cell.value.name}
            </span>
          </div>
        )
      },
    },
    {
      Header: '',
      accessor: '_id',
      id: 'accepted-project-detail',
      headerClassName: 'data-col',
      className: 'data-col text-right',
      Cell: props => {
        const { cell } = props
        const isRejected = cell.row.values.status.status === STATUS.REJECTED.name
        return (
          <Link
            to={isRejected ? '#!' : `${CUSTOMER_PATH}/accepted-project/${cell.value}`}
            className={`btn btn-light-alt btn-xs btn-icon ${isRejected ? 'disabled' : ''}`}
          >
            <em className="ti ti-eye" />
          </Link>
        )
      },
    },
  ]

  const getMyProjectList = useCallback(
    ({ pageIndex, pageSize }) => {
      const userId = currentUser._id
      getMyProjects({ userId, pageIndex, pageSize })
    },
    [currentUser._id, getMyProjects]
  )

  const getAcceptedProjectList = useCallback(
    ({ pageIndex, pageSize }) => {
      const userId = currentUser._id
      getAcceptedProjects({ userId, pageIndex, pageSize })
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
              <h4 className="card-title mb-0">Danh sách project</h4>
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
                    <Link
                      to={`${CUSTOMER_PATH}/create-project`}
                      className="btn btn-icon btn-sm btn-primary d-sm-none"
                    >
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
                    <button
                      onClick={onClickCreateProject}
                      className="btn btn-icon btn-sm btn-primary d-sm-none"
                    >
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
                  Project của bạn
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#accepted-project-list">
                  Project đã tham gia
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="my-project-list">
                <div className="gaps-1x" />
                {currentUser._id && (
                  <ReactTable
                    columns={myProjectTableColumns}
                    data={getMyProjectListObj.myProjectList}
                    fetchData={getMyProjectList}
                    loading={getMyProjectListObj.isLoading}
                    pageCount={Math.ceil(getMyProjectListObj.myProjectList.length / 5)}
                    defaultPageSize={5}
                    pageSize={5}
                  />
                )}
              </div>
              <div className="tab-pane fade" id="accepted-project-list">
                <div className="gaps-1x" />
                {currentUser._id && (
                  <ReactTable
                    columns={acceptedProjectTableColumns}
                    data={getAcceptedProjectListObj.acceptedProjectList}
                    fetchData={getAcceptedProjectList}
                    loading={getAcceptedProjectListObj.isLoading}
                    pageCount={Math.ceil(getAcceptedProjectListObj.acceptedProjectList.length / 5)}
                    defaultPageSize={5}
                    pageSize={5}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
