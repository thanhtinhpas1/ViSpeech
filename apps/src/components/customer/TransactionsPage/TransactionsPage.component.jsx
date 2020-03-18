/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { CUSTOMER_PATH } from 'utils/constant'
import ReactTable from 'components/customer/ReactTable/ReactTable.component'

const TransactionsPage = ({ transactionListObj, getTransactionList }) => {
  const columns = [
    {
      Header: 'Mã',
      accessor: 'id',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      Cell: props => {
        const { cell } = props
        return <span className="lead tnx-id">{cell.value}</span>
      },
    },
    {
      Header: 'Trạng thái',
      accessor: 'state',
      headerClassName: 'data-col dt-token',
      className: 'data-col dt-token',
      Cell: props => {
        const { cell } = props
        return (
          <div className="d-flex align-items-center">
            <div className={`data-state ${cell.value.class}`} />
            <span className="sub sub-s2">{cell.value.name}</span>
          </div>
        )
      },
    },
    {
      Header: 'Thời gian',
      accessor: 'date',
      headerClassName: 'data-col dt-amount',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return <span className="sub sub-date">{cell.value}</span>
      },
    },
    {
      Header: 'Key',
      accessor: 'key',
      headerClassName: 'data-col dt-usd-account',
      className: 'data-col dt-account',
      Cell: props => {
        const { cell } = props
        return (
          <span className={`${cell.value !== 'Trống' ? 'lead' : 'sub sub-s2'} user-info`}>
            {cell.value}
          </span>
        )
      },
    },
    {
      Header: () => <div className="dt-type-text">Loại</div>,
      accessor: 'type',
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

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Lịch sử giao dịch</h4>
            </div>
            <ReactTable
              columns={columns}
              data={transactionListObj.transactionList}
              fetchData={getTransactionList}
              loading={transactionListObj.isLoading}
              pageCount={8}
              defaultPageSize={5}
              pageSize={5}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
