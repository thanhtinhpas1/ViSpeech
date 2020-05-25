/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import { CUSTOMER_PATH, TOKEN_TYPE, STATUS } from 'utils/constant'

const ProjectDetailsPage = ({
  currentUser,
  getProjectInfoObj,
  getProjectTokenListObj,
  getProjectInfo,
  getProjectTokens,
}) => {
  const { id } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    getProjectInfo(id)
  }, [id, getProjectInfo])

  const columns = [
    {
      title: 'Token',
      dataIndex: 'value',
      style: { paddingRight: '30px' },
      render: value => (
        <span className="lead tnx-id">
          <div className="copy-wrap w-100">
            <span className="copy-feedback" />
            <em className="fas fa-key" />
            <input type="text" className="copy-address" defaultValue={value} disabled />
            <button className="copy-trigger copy-clipboard" data-clipboard-text={value}>
              <em className="ti ti-files" />
            </button>
          </div>
        </span>
      ),
      width: 250,
    },
    {
      title: 'Loại token',
      dataIndex: 'tokenType',
      headerClassName: 'dt-type',
      className: 'dt-type',
      style: { paddingRight: '30px' },
      filters: [
        { text: TOKEN_TYPE.FREE.viText, value: TOKEN_TYPE.FREE.name },
        { text: TOKEN_TYPE['50-MINS'].viText, value: TOKEN_TYPE['50-MINS'].name },
        { text: TOKEN_TYPE['200-MINS'].viText, value: TOKEN_TYPE['200-MINS'].name },
        { text: TOKEN_TYPE['500-MINS'].viText, value: TOKEN_TYPE['500-MINS'].name },
      ],
      filterMultiple: false,
      render: tokenType => (
        <>
          <span className={`dt-type-md badge badge-outline ${tokenType.class} badge-md`}>{tokenType.name}</span>
          <span className={`dt-type-sm badge badge-sq badge-outline ${tokenType.class} badge-md`}>
            {tokenType.name}
          </span>
        </>
      ),
      width: 150,
      align: 'center',
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
      title: 'Thời gian còn lại',
      dataIndex: 'minutesLeft',
      headerClassName: 'dt-amount',
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      className: 'dt-amount',
      render: minutesLeft => <span className="lead">{minutesLeft} phút</span>,
      width: 200,
      align: 'center',
    },
    {
      title: '',
      dataIndex: '_id',
      render: _id => (
        <Link to={`${CUSTOMER_PATH}/transaction-details?tokenId=${_id}`} className="btn btn-light-alt btn-xs btn-icon">
          <em className="ti ti-eye" />
        </Link>
      ),
      width: 60,
      align: 'right',
    },
  ]

  useEffect(() => {
    const projectOwnerId = getProjectInfoObj.project.userId
    const pagination = {
      pageSize: 5,
      current: 1,
    }
    if (pathname.includes('accepted-project') && projectOwnerId) {
      getProjectTokens({ userId: projectOwnerId, projectId: id, pagination })
    }
    if (pathname.includes('my-project')) {
      getProjectTokens({ userId: currentUser._id, projectId: id, pagination })
    }
  }, [getProjectInfoObj.project.userId, currentUser._id, id, pathname, getProjectTokens])

  const getProjectTokensList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      const projectOwnerId = getProjectInfoObj.project.userId
      if (pathname.includes('accepted-project') && projectOwnerId) {
        getProjectTokens({ userId: projectOwnerId, projectId: id, pagination, sortField, sortOrder, filters })
      }
      if (pathname.includes('my-project')) {
        getProjectTokens({ userId: currentUser._id, projectId: id, pagination, sortField, sortOrder, filters })
      }
    },
    [getProjectInfoObj.project.userId, currentUser._id, id, pathname, getProjectTokens]
  )

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head d-flex justify-content-between align-items-center">
              {getProjectInfoObj.project && (
                <>
                  <h4 className="card-title mb-0">{getProjectInfoObj.project.name}</h4>
                  {currentUser && getProjectInfoObj.project.userId === currentUser._id && (
                    <>
                      <Link
                        to={`${CUSTOMER_PATH}/assign-permission?projectName=${getProjectInfoObj.project.name}`}
                        className="btn btn-sm btn-auto btn-primary d-sm-block d-none"
                      >
                        Mời tham gia
                        <em className="fas fa-user-plus ml-3" />
                      </Link>
                      <Link
                        to={`${CUSTOMER_PATH}/assign-permission?projectName=${getProjectInfoObj.project.name}`}
                        className="btn btn-icon btn-sm btn-primary d-sm-none"
                      >
                        <em className="fas fa-user-plus" />
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="gaps-2x" />
            <div className="data-details d-md-flex">
              <div className="fake-class">
                <span className="data-details-title">Tên dự án</span>
                <span className="data-details-info">
                  <strong>{getProjectInfoObj.project.name}</strong>
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Mô tả</span>
                <span className="data-details-info">
                  <strong>{getProjectInfoObj.project.description}</strong>
                </span>
              </div>
              {}
              <div className="fake-class">
                <span className="data-details-title">Thành viên</span>
                <span className="data-details-info">
                  {getProjectInfoObj.project &&
                    getProjectInfoObj.project.assignees &&
                    getProjectInfoObj.project.assignees.map(assignee => (
                      <h5 key={assignee.username}>{assignee.username}</h5>
                    ))}
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thời gian tạo</span>
                <span className="data-details-info">
                  {moment(getProjectInfoObj.project.createdDate).format('DD/MM/YYYY hh:mm:ss')}
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thời gian cập nhật</span>
                <span className="data-details-info">
                  {moment(getProjectInfoObj.project.updatedDate).format('DD/MM/YYYY hh:mm:ss')}
                </span>
              </div>
            </div>
            <div className="gaps-5x" />
            <AntdTable
              dataObj={getProjectTokenListObj.projectTokenList}
              columns={columns}
              fetchData={getProjectTokensList}
              isLoading={getProjectTokenListObj.isLoading}
              pageSize={5}
              scrollY={500}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage
