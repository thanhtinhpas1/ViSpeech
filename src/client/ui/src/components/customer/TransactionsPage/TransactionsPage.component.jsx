/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import { CUSTOMER_PATH, STATUS, TOKEN_TYPE } from 'utils/constant'
import * as moment from 'moment'

const TransactionsPage = ({ currentUser, getUserOrderListObj, getUserOrderList }) => {
  const columns = [
    {
      title: 'Mã',
      dataIndex: '_id',
      canSearch: true,
      render: _id => <span className="lead tnx-id">{_id}</span>,
      width: 150,
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
      title: 'Token',
      dataIndex: 'token',
      headerClassName: 'dt-account',
      className: 'dt-account',
      render: token => (
        <span className="lead tnx-id">
          <div className="copy-wrap w-100">
            <span className="copy-feedback" />
            <em className="fas fa-key" />
            <input type="text" className="copy-address" defaultValue={token} disabled />
            <button type="button" className="copy-trigger copy-clipboard" data-clipboard-text={token}>
              <em className="ti ti-files" />
            </button>
          </div>
        </span>
      ),
      width: 250,
    },
    {
      title: () => <div className="dt-type-text">Loại token</div>,
      dataIndex: 'tokenType',
      filters: [
        { text: TOKEN_TYPE['50-MINUTES'].viText, value: TOKEN_TYPE['50-MINUTES'].name },
        { text: TOKEN_TYPE['200-MINUTES'].viText, value: TOKEN_TYPE['200-MINUTES'].name },
        { text: TOKEN_TYPE['500-MINUTES'].viText, value: TOKEN_TYPE['500-MINUTES'].name },
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
      title: '',
      dataIndex: '_id',
      render: _id => (
        <Link to={`${CUSTOMER_PATH}/transaction-details?id=${_id}`} className="btn btn-light-alt btn-xs btn-icon">
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
      getUserOrderList({ userId, pagination })
    }
  }, [currentUser._id, getUserOrderList])

  const getList = useCallback(
    // eslint-disable-next-line no-unused-vars
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = currentUser._id
      if (userId) {
        getUserOrderList({ userId, pagination, sortField, sortOrder, filters })
      }
    },
    [currentUser._id, getUserOrderList]
  )

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Lịch sử giao dịch</h4>
            </div>
            <AntdTable
              dataObj={getUserOrderListObj.userOrderList}
              columns={columns}
              fetchData={getList}
              isLoading={getUserOrderListObj.isLoading}
              pageSize={5}
              scrollY={500}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
