/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { CUSTOMER_PATH } from 'utils/constant'

const TokensWalletPage = () => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const tableDataArr = [
      {
        key:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
        state: {
          name: 'Hợp lệ',
          class: 'data-state-approved',
        },
        timeRemaining: '7 ngày',
      },
      {
        key:
          'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
        state: {
          name: 'Có vấn đề',
          class: 'data-state-pending',
        },
        timeRemaining: '7 ngày',
      },
      {
        key:
          'byJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
        state: {
          name: 'Hợp lệ',
          class: 'data-state-approved',
        },
        timeRemaining: '7 ngày',
      },
      {
        key:
          'cyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
        state: {
          name: 'Có vấn đề',
          class: 'data-state-pending',
        },
        timeRemaining: '7 ngày',
      },
      {
        key:
          'dyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
        state: {
          name: 'Hợp lệ',
          class: 'data-state-approved',
        },
        timeRemaining: '7 ngày',
      },
      {
        key:
          'fyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
        state: {
          name: 'Có vấn đề',
          class: 'data-state-pending',
        },
        timeRemaining: '7 ngày',
      },
      {
        key:
          'gyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
        state: {
          name: 'Hợp lệ',
          class: 'data-state-approved',
        },
        timeRemaining: '7 ngày',
      },
      {
        key:
          'hyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
        state: {
          name: 'Có vấn đề',
          class: 'data-state-pending',
        },
        timeRemaining: '7 ngày',
      },
    ]
    setTableData(tableDataArr)
  }, [])
  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Ví key</h4>
            </div>
            <table className="data-table dt-init user-tnx">
              <thead>
                <tr className="data-item data-head">
                  <th className="data-col dt-tnxno">Key</th>
                  <th className="data-col dt-token">Trạng thái</th>
                  <th className="data-col dt-amount" style={{ textAlign: 'center' }}>
                    Thời gian còn lại
                  </th>
                  <th className="data-col" />
                </tr>
              </thead>
              <tbody>
                {tableData.map(dataItem => {
                  return (
                    <tr className="data-item" key={dataItem.key}>
                      <td className="data-col dt-tnxno" style={{ paddingRight: '30px' }}>
                        <span className="lead tnx-id">
                          <div className="copy-wrap w-100">
                            <span className="copy-feedback" />
                            <em className="fas fa-key" />
                            <input
                              type="text"
                              className="copy-address"
                              defaultValue={dataItem.key}
                              disabled
                            />
                            <button
                              className="copy-trigger copy-clipboard"
                              data-clipboard-text={dataItem.key}
                            >
                              <em className="ti ti-files" />
                            </button>
                          </div>
                        </span>
                      </td>
                      <td className="data-col dt-token">
                        <div className="d-flex align-items-center">
                          <div className={`data-state ${dataItem.state.class}`} />
                          <span className="sub sub-s2" style={{ paddingTop: '0' }}>
                            {dataItem.state.name}
                          </span>
                        </div>
                      </td>
                      <td className="data-col dt-amount" style={{ textAlign: 'center' }}>
                        <span className="sub sub-date">{dataItem.timeRemaining}</span>
                      </td>
                      <td className="data-col text-right">
                        <a
                          href={`${CUSTOMER_PATH}/transaction-details`}
                          className="btn btn-light-alt btn-xs btn-icon"
                        >
                          <em className="ti ti-eye" />
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokensWalletPage
