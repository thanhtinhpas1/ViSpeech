/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CUSTOMER_PATH } from '../../../../../utils/constant'
import moment from 'moment'

const TokenTransaction = ({ userOrderListObj }) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const transactionsArray = userOrderListObj.userOrderList.data.map(item => {
      return {
        id: item._id,
        name: item.tokenName,
        state: item.status,
        date: moment(item.createdDate).format('YYYY-MM-DD HH:mm'),
        type: { name: item.tokenType.name, class: item.tokenType.class },
      }
    })
    setTableData(transactionsArray)
  }, [userOrderListObj])

  return (
    <div className="card-innr" style={{ overflow: 'auto' }}>
      <div className="card-head has-aside">
        <h4 className="card-title">Lịch sử giao dịch</h4>
        <div className="card-opt">
          <Link to={`${CUSTOMER_PATH}/transactions`} className="link ucap">
            Xem tất cả <em className="fas fa-angle-right ml-2" />
          </Link>
        </div>
      </div>
      <table className="table tnx-table">
        <thead>
          <tr>
            <th>Tên API key</th>
            <th>Trạng thái</th>
            <th className="d-none d-sm-table-cell tnx-date">Thời gian</th>
            <th className="tnx-type">
              <div className="tnx-type-text">Loại</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(rowData => {
            return (
              <tr key={rowData.id}>
                <td style={{ maxWidth: '280px', display: 'inline-block', whiteSpace: 'break-spaces' }}>
                  <span className="lead tnx-id">{rowData.name}</span>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className={`data-state ${rowData.state.class}`} />
                    <span className="sub sub-s2">{rowData.state.name}</span>
                  </div>
                </td>
                <td className="d-none d-sm-table-cell tnx-date">
                  <span className="sub sub-s2">{rowData.date}</span>
                </td>
                <td className="tnx-type">
                  <span className={`tnx-type-md badge badge-outline ${rowData.type.class} badge-md`}>
                    {rowData.type.name}
                  </span>
                  <span className={`tnx-type-sm badge badge-sq badge-outline ${rowData.type.class} badge-md`}>
                    {rowData.type.name}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TokenTransaction
