/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import { Tabs } from 'antd'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import { ADMIN_PATH, STATUS } from 'utils/constant'

const { TabPane } = Tabs

const ProjectsTab = ({
  userInfoObj,
  getMyProjectListObj,
  getAcceptedProjectListObj,
  getMyProjects,
  getAcceptedProjects,
}) => {
  const userProjectTableColumns = [
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
      render: _id => (
        <a href={`${ADMIN_PATH}/user-project/${_id}`} className="btn btn-just-icon btn-secondary btn-simple">
          <i className="zmdi zmdi-eye" />
        </a>
      ),
      width: 60,
      align: 'right',
    },
  ]

  const userAcceptedProjectTableColumns = [
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
      title: 'Tạo bởi',
      dataIndex: 'ownerName',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      canSearch: true,
      render: ownerName => <span className="lead tnx-id">{ownerName}</span>,
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
      render: _id => (
        <a href={`${ADMIN_PATH}/user-accepted-project/${_id}`} className="btn btn-just-icon btn-secondary btn-simple">
          <i className="zmdi zmdi-eye" />
        </a>
      ),
      width: 60,
      align: 'right',
    },
  ]

  useEffect(() => {
    const userId = userInfoObj.user._id
    if (userId) {
      const pagination = {
        pageSize: 5,
        current: 1,
      }
      getMyProjects({ userId, pagination })
      getAcceptedProjects({ userId, pagination })
    }
  }, [userInfoObj.user._id, getMyProjects, getAcceptedProjects])

  const getUserProjectList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = userInfoObj.user._id
      if (userId) {
        getMyProjects({ userId, pagination, sortField, sortOrder, filters })
      }
    },
    [userInfoObj.user._id, getMyProjects]
  )

  const getUserAcceptedProjectList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = userInfoObj.user._id
      if (userId) {
        getAcceptedProjects({ userId, pagination, sortField, sortOrder, filters })
      }
    },
    [userInfoObj.user._id, getAcceptedProjects]
  )

  return (
    <div>
      <Tabs size="large">
        <TabPane tab="Dự án của tôi" key="1">
          <AntdTable
            dataObj={getMyProjectListObj.myProjectList}
            columns={userProjectTableColumns}
            fetchData={getUserProjectList}
            isLoading={getMyProjectListObj.isLoading}
            pageSize={5}
            scrollY={500}
          />
        </TabPane>
        <TabPane tab="Dự án đã tham gia" key="2">
          <AntdTable
            dataObj={getAcceptedProjectListObj.acceptedProjectList}
            columns={userAcceptedProjectTableColumns}
            fetchData={getUserAcceptedProjectList}
            isLoading={getAcceptedProjectListObj.isLoading}
            pageSize={5}
            scrollY={500}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ProjectsTab
