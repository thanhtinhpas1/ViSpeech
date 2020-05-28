/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import * as moment from 'moment'
import AntdTable from 'components/common/AntdTable/AntdTable.component'
import { ADMIN_PATH, STATUS, TOKEN_TYPE } from 'utils/constant'

const TransactionsPage = ({ getOrderListObj, getOrderList }) => {
  const columns = [
    {
      title: 'Mã đơn hàng',
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
      title: 'Khách hàng',
      dataIndex: 'username',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      canSearch: true,
      render: username => <span className="lead tnx-id">{username}</span>,
      width: 180,
    },
    {
      title: 'Dự án',
      dataIndex: 'projectName',
      headerClassName: 'dt-amount',
      className: 'dt-amount',
      canSearch: true,
      render: projectName => <span className="lead tnx-id">{projectName}</span>,
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
        <a href={`${ADMIN_PATH}/transaction-details?id=${_id}`} className="btn btn-just-icon btn-secondary btn-simple">
          <i className="zmdi zmdi-eye" />
        </a>
      ),
      align: 'right',
      width: 60,
    },
  ]

  useEffect(() => {
    const pagination = {
      pageSize: 10,
      current: 1,
    }
    getOrderList({ pagination })
  }, [getOrderList])

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Lịc sử giao dịch</h4>
          </div>
          <div className="card-content">
            <div className="material-datatables">
              <AntdTable
                dataObj={getOrderListObj.orderList}
                columns={columns}
                fetchData={getOrderList}
                isLoading={getOrderListObj.isLoading}
                pageSize={10}
                scrollY={700}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
