/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react'
import { CUSTOMER_PATH } from 'utils/constant'
import ReactTable from 'components/customer/ReactTable/ReactTable.component'

const TokensWalletPage = ({ currentUser, token, getTokens }) => {
  const columns = [
    {
      Header: 'Token',
      accessor: 'value',
      headerClassName: 'data-col dt-tnxno',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return (
          <span className="lead tnx-id">
            <div className="copy-wrap w-100">
              <span className="copy-feedback" />
              <em className="fas fa-key" />
              <input type="text" className="copy-address" defaultValue={cell.value} disabled />
              <button className="copy-trigger copy-clipboard" data-clipboard-text={cell.value}>
                <em className="ti ti-files" />
              </button>
            </div>
          </span>
        )
      },
    },
    {
      Header: 'Loại token',
      accessor: 'tokenType',
      headerClassName: 'data-col dt-type',
      className: 'data-col dt-tnxno',
      style: { paddingRight: '30px' },
      Cell: props => {
        const { cell } = props
        return <div className="d-flex align-items-center">{cell.value}</div>
      },
    },
    {
      Header: 'Trạng thái',
      accessor: 'isValid',
      headerClassName: 'data-col dt-token',
      className: 'data-col dt-amount',
      Cell: props => {
        const { cell } = props
        return (
          <div className="d-flex align-items-center">
            <div
              className={`data-state ${cell.value ? 'data-state-approved' : 'data-state-canceled'}`}
            />
            <span className="sub sub-s2" style={{ paddingTop: '0' }}>
              {cell.value ? 'Hợp lệ' : 'Có vấn đề'}
            </span>
          </div>
        )
      },
    },
    {
      Header: 'Thời gian còn lại',
      accessor: 'minutesLeft',
      headerClassName: 'data-col dt-amount',
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      className: 'data-col dt-account',
      Cell: props => {
        const { cell } = props
        return <span className="lead">{cell.value} phút</span>
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

  const getUserTokens = useCallback(({ pageIndex, pageSize }) => {
    // const userId = currentUser._id
    // getTokens({ userId, pageIndex, pageSize })
  }, [])

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Ví token</h4>
            </div>
            {currentUser._id && (
              <ReactTable
                columns={columns}
                data={token.tokenList}
                fetchData={getUserTokens}
                loading={token.isLoading}
                pageCount={Math.ceil(token.tokenList.length / 5)}
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

export default TokensWalletPage
