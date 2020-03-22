/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { CUSTOMER_PATH } from 'utils/constant'

const TransactionDetailsPage = () => {
  const [transactionDetails, setTransactionDetails] = useState({})

  useEffect(() => {
    const transactionDetailsObj = {
      id: 'TNX1001',
      date: '24 tháng 7, 2018 10:11PM',
      state: {
        name: 'Thành công',
        class: 'badge-success',
      },
      type: 'Mua',
      paymentGateway: 'Paypal',
      key:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8',
    }
    setTransactionDetails(transactionDetailsObj)
  }, [])

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Chi tiết giao dịch</h4>
              <a
                href={`${CUSTOMER_PATH}/transactions`}
                className="btn btn-sm btn-auto btn-primary d-sm-block d-none"
              >
                <em className="fas fa-arrow-left mr-3" />
                Trở lại
              </a>
              <a
                href={`${CUSTOMER_PATH}/transactions`}
                className="btn btn-icon btn-sm btn-primary d-sm-none"
              >
                <em className="fas fa-arrow-left" />
              </a>
            </div>
            <div className="gaps-1-5x" />
            <div className="data-details d-md-flex">
              <div className="fake-class">
                <span className="data-details-title">Mã giao dịch</span>
                <span className="data-details-info">
                  <strong>{transactionDetails.id}</strong>
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thời gian</span>
                <span className="data-details-info">{transactionDetails.date}</span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Trạng thái</span>
                <span
                  className={`badge ${transactionDetails.state &&
                    transactionDetails.state.class} ucap`}
                >
                  {transactionDetails.state && transactionDetails.state.name}
                </span>
              </div>
            </div>
            <div className="gaps-3x" />
            <h6 className="card-sub-title">Chi tiết</h6>
            <ul className="data-details-list">
              <li>
                <div className="data-details-head">Loại giao dịch</div>
                <div className="data-details-des">
                  <strong>{transactionDetails.type}</strong>
                </div>
              </li>
              <li>
                <div className="data-details-head">Cổng thanh toán</div>
                <div className="data-details-des">
                  <strong>
                    {transactionDetails.paymentGateway} <small>- Thanh toán online</small>
                  </strong>
                </div>
              </li>
              <li>
                <div className="data-details-head">Key</div>
                <div
                  className="data-details-des"
                  style={{ wordBreak: 'break-all', whiteSpace: 'nowrap' }}
                >
                  <div className="copy-wrap mgb-1-5x mgt-1-5x w-100">
                    <span className="copy-feedback" />
                    <em className="fas fa-key" />
                    <input
                      type="text"
                      className="copy-address"
                      defaultValue={transactionDetails.key}
                      disabled
                    />
                    <button
                      className="copy-trigger copy-clipboard"
                      data-clipboard-text={transactionDetails.key}
                    >
                      <em className="ti ti-files" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div className="gaps-3x" />
            <h6 className="card-sub-title">Token Details</h6>
            <ul className="data-details-list">
              <li>
                <div className="data-details-head">Stage Name</div>
                <div className="data-details-des">
                  <strong>ICO Phase 3</strong>
                </div>
              </li>
              <li>
                <div className="data-details-head">Contribution</div>
                <div className="data-details-des">
                  <span>
                    <strong>1.000 ETH</strong>
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      data-original-title="1 ETH = 100 TWZ"
                    />
                  </span>
                  <span>
                    <em
                      className="fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      data-original-title="1 ETH = 100 TWZ"
                    />
                    $2540.65
                  </span>
                </div>
              </li>
              <li>
                <div className="data-details-head">Tokens Added To</div>
                <div className="data-details-des">
                  <strong>
                    UD1020001 <small>- infoicox@gmail..com</small>
                  </strong>
                </div>
              </li>
              <li>
                <div className="data-details-head">Token (T)</div>
                <div className="data-details-des">
                  <span>4,780.00</span>
                  <span>(4780 * 1)</span>
                </div>
              </li>
              <li>
                <div className="data-details-head">Bonus Tokens (B)</div>
                <div className="data-details-des">
                  <span>956.00</span>
                  <span>(956 * 1)</span>
                </div>
              </li>
              <li>
                <div className="data-details-head">Total Tokens</div>
                <div className="data-details-des">
                  <span>
                    <strong>5,736.00</strong>
                  </span>
                  <span>(T+B)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetailsPage
