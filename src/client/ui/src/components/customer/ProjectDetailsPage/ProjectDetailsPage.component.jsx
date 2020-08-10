/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import * as moment from 'moment'
import { CUSTOMER_PATH } from '../../../utils/constant'
import TokensTable from './components/TokensTable/TokensTable.container'
import AssigneesTable from './components/AssigneesTable/AssigneesTable.container'

const ProjectDetailsPage = ({ currentUser, getProjectInfoObj, getProjectInfo }) => {
  const { id } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    getProjectInfo(id)
  }, [id, getProjectInfo])

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head d-flex justify-content-between align-items-center">
              {getProjectInfoObj.project && (
                <>
                  <h4 className="card-title mb-0">{getProjectInfoObj.project.name}</h4>
                  {currentUser &&
                    getProjectInfoObj.project.userId === currentUser._id &&
                    getProjectInfoObj.project.isValid && (
                      <>
                        <Link
                          to={`${CUSTOMER_PATH}/assign-permission?projectId=${getProjectInfoObj.project._id}`}
                          className="btn btn-sm btn-auto btn-primary d-sm-block d-none"
                        >
                          Mời tham gia
                          <em className="fas fa-user-plus ml-3" />
                        </Link>
                        <Link
                          to={`${CUSTOMER_PATH}/assign-permission?projectId=${getProjectInfoObj.project._id}`}
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
                  <strong>{getProjectInfoObj.project?.name}</strong>
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Mô tả</span>
                <span className="data-details-info">
                  <strong>{getProjectInfoObj.project?.description}</strong>
                </span>
              </div>
              {/* <div className="fake-class">
                <span className="data-details-title">Thành viên</span>
                <span className="data-details-info">
                  {(getProjectInfoObj.project?.assignees || []).map(assignee => (
                    <h5 key={assignee._id}>{assignee.username}</h5>
                  ))}
                </span>
              </div> */}
              <div className="fake-class">
                <span className="data-details-title">Thời gian tạo</span>
                <span className="data-details-info">
                  {moment(getProjectInfoObj.project?.createdDate).format('DD/MM/YYYY hh:mm:ss')}
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thời gian cập nhật</span>
                <span className="data-details-info">
                  {moment(getProjectInfoObj.project?.updatedDate).format('DD/MM/YYYY hh:mm:ss')}
                </span>
              </div>
            </div>
            <div className="gaps-4x" />
            <div style={{ fontSize: '20px', marginBottom: '20px' }}>Danh sách API key</div>
            <TokensTable projectId={id} projectOwnerId={getProjectInfoObj.project?.userId} />
            {pathname.includes('my-project') && (
              <>
                <div className="gaps-4x" />
                <div style={{ fontSize: '20px', marginBottom: '20px' }}>Danh sách thành viên</div>
                <AssigneesTable projectId={id} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage
