/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import { ADMIN_PATH, TOKEN_TYPE, STATUS } from 'utils/constant'

const TransactionsTab = ({ userInfoObj, getUserOrderListObj, getUserOrderList }) => {
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
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
      width: 160,
    },
    {
      title: 'Token',
      dataIndex: 'token',
      headerClassName: 'dt-type',
      className: 'dt-type',
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
      headerClassName: 'dt-type',
      className: 'dt-type',
      filters: [
        { text: TOKEN_TYPE.FREE.viText, value: TOKEN_TYPE.FREE.name },
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
        <a href={`${ADMIN_PATH}/transaction-details?id=${_id}`} className="btn btn-just-icon btn-secondary btn-simple">
          <i className="zmdi zmdi-eye" />
        </a>
      ),
      align: 'right',
      width: 60,
    },
  ]

  useEffect(() => {
    const userId = userInfoObj.user._id
    if (userId) {
      const pagination = {
        pageSize: 5,
        current: 1,
      }
      getUserOrderList({ userId, pagination })
    }
  }, [userInfoObj.user._id, getUserOrderList])

  const getList = useCallback(
    ({ pagination, sortField, sortOrder, filters }) => {
      const userId = userInfoObj.user._id
      if (userId) {
        getUserOrderList({ userId, pagination, sortField, sortOrder, filters })
      }
    },
    [userInfoObj.user._id, getUserOrderList]
  )

  return (
    <div>
      <AntdTable
        dataObj={getUserOrderListObj.userOrderList}
        columns={columns}
        fetchData={getList}
        isLoading={getUserOrderListObj.isLoading}
        pageSize={5}
        scrollY={500}
      />
    </div>
  )
}

export default TransactionsTab
