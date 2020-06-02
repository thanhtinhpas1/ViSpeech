/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row } from 'antd'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import { STATUS, CUSTOMER_PATH } from 'utils/constant'
import * as moment from 'moment'

const RequestTable = ({ currentUser, getListByUserIdObj, getListByUserId }) => {
  const columns = [
    {
      title: 'Tên dự án',
      dataIndex: 'projectName',
      canSearch: true,
      render: projectName => <span className="lead tnx-id">{projectName}</span>,
      width: 180,
    },
    {
      title: 'Tên token',
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
    {
      title: '',
      dataIndex: '_id',
      render: _id => (
        <Link to={`${CUSTOMER_PATH}/request-details?id=${_id}`} className="btn btn-light-alt btn-xs btn-icon">
          <em className="ti ti-eye" />
        </Link>
      ),
      align: 'right',
      width: 60,
    },
  ]

  useEffect(() => {
    const userId = currentUser._id
    if (userId) {
      const pagination = {
        pageSize: 5,
        current: 1,
      }
      getListByUserId(userId, { pagination })
    }
  }, [currentUser._id, getListByUserId])

  return (
    <Row>
      <AntdTable
        dataObj={getListByUserIdObj.requestList}
        columns={columns}
        fetchData={getListByUserId}
        isLoading={getListByUserIdObj.isLoading}
        pageSize={5}
        scrollY={500}
      />
    </Row>
  )
}

export default RequestTable
