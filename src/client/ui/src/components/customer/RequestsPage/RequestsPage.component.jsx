/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useCallback } from 'react'
import * as moment from 'moment'
import AntdTable from '../../../components/common/AntdTable/AntdTable.component'
import { DEFAULT_PAGINATION, SORT_ORDER, STATUS } from '../../../utils/constant'

const RequestsPage = ({ currentUser, getRequestListByUserIdObj, getRequestListByUserId }) => {
  const columns = [
    {
      title: 'Tên dự án',
      dataIndex: 'projectName',
      canSearch: true,
      render: projectName => <span className="lead tnx-id">{projectName}</span>,
      width: 180,
    },
    {
      title: 'Tên API key',
      dataIndex: 'tokenName',
      canSearch: true,
      render: tokenName => <span className="lead tnx-id">{tokenName}</span>,
      width: 180,
    },
    {
      title: 'Tên file',
      dataIndex: 'fileName',
      canSearch: true,
      render: fileName => <span className="lead tnx-id">{fileName}</span>,
      width: 180,
    },
    {
      title: 'Kích thước file (phút)',
      dataIndex: 'duration',
      sorter: true,
      render: duration => <span className="lead tnx-id">{duration}</span>,
      width: 180,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      headerClassName: 'dt-token',
      className: 'dt-token',
      filters: [
        { text: STATUS.PENDING.viText, value: STATUS.PENDING.name },
        { text: STATUS.IN_PROGRESS.viText, value: STATUS.IN_PROGRESS.name },
        { text: STATUS.SUCCESS.viText, value: STATUS.SUCCESS.name },
        { text: STATUS.FAILURE.viText, value: STATUS.FAILURE.name },
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
      width: 240,
      align: 'center',
    },
  ]

  useEffect(() => {
    const userId = currentUser._id
    if (userId) {
      getRequestListByUserId(userId, {
        pagination: DEFAULT_PAGINATION.SIZE_10,
        sortField: 'createdDate',
        sortOrder: SORT_ORDER.DESC,
      })
    }
  }, [currentUser._id, getRequestListByUserId])

  const getList = useCallback(
    // eslint-disable-next-line no-unused-vars
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = currentUser._id
      if (userId) {
        getRequestListByUserId(userId, {
          pagination,
          sortField,
          sortOrder,
          filters,
        })
      }
    },
    [currentUser._id, getRequestListByUserId]
  )

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Lịch sử sử dụng dịch vụ</h4>
            </div>
            <AntdTable
              dataObj={getRequestListByUserIdObj.requestList}
              columns={columns}
              fetchData={getList}
              isLoading={getRequestListByUserIdObj.isLoading}
              pageSize={DEFAULT_PAGINATION.SIZE_10.pageSize}
              scrollY={700}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestsPage
