/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import AntdTable from '../../../../common/AntdTable/AntdTable.component'
import { STATUS, DEFAULT_PAGINATION } from '../../../../../utils/constant'

const AssigneesTable = ({ projectId, getProjectAssigneeListObj, getProjectAssignees }) => {
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
    // {
    //   title: '',
    //   dataIndex: '_id',
    //   render: _id => {
    //     const acceptedProject = pathname.includes('accepted-project')
    //     return (
    //       <Link
    //         to={`${CUSTOMER_PATH}/transaction-details?tokenId=${_id}`}
    //         className={`btn btn-light-alt btn-xs btn-icon ${acceptedProject ? 'disabled' : ''}`}
    //       >
    //         <em className="ti ti-eye" />
    //       </Link>
    //     )
    //   },
    //   width: 60,
    //   align: 'right',
    // },
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
    </div>
  )
}

export default AssigneesTable
