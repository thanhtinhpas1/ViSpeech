/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react'
import { CUSTOMER_PATH } from 'utils/constant'
import ReactTable from 'components/customer/ReactTable/ReactTable.component'
import * as moment from 'moment'

const TransactionsPage = ({ currentUser, orderListObj, getOrderList }) => {
  const columns = [
    {
      Header: 'Mã',
      accessor: '_id',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      Cell: props => {
        const { cell } = props
        return <span className="lead tnx-id">{cell.value}</span>
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
      Header: 'Token',
      accessor: 'token',
      headerClassName: 'data-col dt-usd-account',
      className: 'data-col dt-account',
      Cell: props => {
        const { cell } = props
        return (
          <span className="lead tnx-id">
            <div className="copy-wrap w-100">
              <span className="copy-feedback" />
              <em className="fas fa-key" />
              <input type="text" className="copy-address" defaultValue={cell.value} disabled />
              <button
                type="button"
                className="copy-trigger copy-clipboard"
                data-clipboard-text={cell.value}
              >
                <em className="ti ti-files" />
              </button>
            </div>
          </span>
        )
      },
    },
    {
      Header: () => <div className="dt-type-text">Loại token</div>,
      accessor: 'tokenType',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-type',
      Cell: props => {
        const { cell } = props
        return (
          <>
            <span className={`dt-type-md badge badge-outline ${cell.value.class} badge-md`}>
              {cell.value.name}
            </span>
            <span
              className={`dt-type-sm badge badge-sq badge-outline ${cell.value.class} badge-md`}
            >
              {cell.value.name}
            </span>
          </>
        )
      },
    },
    {
      Header: '',
      accessor: '',
      id: 'transaction-detail',
      headerClassName: 'data-col',
      className: 'data-col text-right',
      Cell: () => {
        return (
          <a
            href={`${CUSTOMER_PATH}/transaction-details`}
            className="btn btn-light-alt btn-xs btn-icon"
          >
            <em className="ti ti-eye" />
          </a>
        )
      },
    },
  ]

  const getList = useCallback(
    ({ pageSize, pageIndex }) => {
      const userId = currentUser._id
      getOrderList({ userId, pageIndex, pageSize })
    },
    [currentUser._id, getOrderList]
  )

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Lịch sử giao dịch</h4>
            </div>
            {currentUser._id && (
              <ReactTable
                columns={columns}
                data={orderListObj.orderList}
                fetchData={getList}
                loading={orderListObj.isLoading}
                pageCount={Math.ceil(orderListObj.orderList.length / 5)}
                defaultPageSize={5}
                pageSize={5}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
