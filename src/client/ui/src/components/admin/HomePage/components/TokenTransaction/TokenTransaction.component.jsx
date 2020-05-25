/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { CUSTOMER_PATH } from 'utils/constant'

const TokenTransaction = () => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const tableDataArr = [
      {
        id: 'TNX1001',
        state: { name: 'Có vấn đề', class: 'data-state-pending' },
        date: '2018-08-24 10:20 PM',
        type: { name: 'Mua', class: 'badge-success' },
      },
      {
        id: 'TNX1002',
        state: { name: 'Đang xử lý', class: 'data-state-progress' },
        date: '2018-08-24 10:20 PM',
        type: { name: 'Tặng', class: 'badge-warning' },
      },
      {
        id: 'TNX1003',
        state: { name: 'Thành công', class: 'data-state-approved' },
        date: '2018-08-24 10:20 PM',
        type: { name: 'Miễn phí', class: 'badge-warning' },
      },
    ]
    setTableData(tableDataArr)
  }, [])

  return (
    <div className="card-innr">
      <div className="card-head has-aside">
        <h4 className="card-title">Lịch sử giao dịch</h4>
        <div className="card-opt">
          <a href={`${CUSTOMER_PATH}/transactions`} className="link ucap">
            Xem tất cả <em className="fas fa-angle-right ml-2" />
          </a>
        </div>
      </div>
      <table className="table tnx-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Trạng thái</th>
            <th className="d-none d-sm-table-cell tnx-date">Thời gian</th>
            <th className="tnx-type">
              <div className="tnx-type-text">Loại</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(rowData => {
            return (
              <tr key={rowData.id}>
                <td>
                  <span className="lead tnx-id">{rowData.id}</span>
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
                  <span className="tnx-type-sm badge badge-sq badge-outline badge-success badge-md">
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
