/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Utils from 'utils'
import * as moment from 'moment'

const TransactionDetailsPage = ({ getInfoObj, getOrderInfo }) => {
  const history = useHistory()
  const query = Utils.useQuery()
  const orderId = query.get('id')
  const tokenId = query.get('tokenId')

  useEffect(() => {
    if (orderId || tokenId) {
      getOrderInfo({ id: orderId, tokenId })
    }
  }, [orderId, tokenId, getOrderInfo])

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Chi tiết giao dịch</h4>
              <a href="#!" onClick={history.goBack} className="btn btn-sm btn-auto btn-primary d-sm-block d-none">
                <em className="fas fa-arrow-left mr-3" />
                Trở lại
              </a>
              <a href="#!" onClick={history.goBack} className="btn btn-icon btn-sm btn-primary d-sm-none">
                <em className="fas fa-arrow-left" />
              </a>
            </div>
            <div className="gaps-1-5x" />
            <div className="data-details d-md-flex">
              <div className="fake-class">
                <span className="data-details-title">Mã giao dịch</span>
                <span className="data-details-info">
                  <strong>{getInfoObj.order._id}</strong>
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thời gian giao dịch</span>
                <span className="data-details-info">
                  {moment(getInfoObj.order.createdDate).format('DD/MM/YYYY hh:mm:ss')}
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Trạng thái</span>
                <span className={`badge ${getInfoObj.order.status && getInfoObj.order.status.class} ucap`}>
                  {getInfoObj.order.status && getInfoObj.order.status.name}
                </span>
              </div>
            </div>
            <div className="gaps-3x" />
            <h6 className="card-sub-title">Chi tiết</h6>
            <ul className="data-details-list">
              <li>
                <div className="data-details-head">Cổng thanh toán</div>
                <div className="data-details-des">
                  <strong>
                    <b>Stripe</b> - Thanh toán online
                  </strong>
                </div>
              </li>
              <li>
                <div className="data-details-head">Token</div>
                <div className="data-details-des" style={{ wordBreak: 'break-all', whiteSpace: 'nowrap' }}>
                  <div className="copy-wrap mgb-1-5x mgt-1-5x w-100">
                    <span className="copy-feedback" />
                    <em className="fas fa-key" />
                    <input
                      type="text"
                      className="copy-address"
                      defaultValue={getInfoObj.order.token && getInfoObj.order.token.value}
                      disabled
                    />
                    <button
                      className="copy-trigger copy-clipboard"
                      data-clipboard-text={getInfoObj.order.token && getInfoObj.order.token.value}
                    >
                      <em className="ti ti-files" />
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="data-details-head">Loại token</div>
                <div className="data-details-des">
                  {getInfoObj.order.tokenType && (
                    <>
                      <span className={`dt-type-md badge badge-outline ${getInfoObj.order.tokenType.class} badge-md`}>
                        {getInfoObj.order.tokenType.saleOffPrice}$/ {getInfoObj.order.tokenType.name}
                      </span>
                    </>
                  )}
                </div>
              </li>
              <li>
                <div className="data-details-head">Thuộc dự án</div>
                <div className="data-details-des">
                  <strong>{getInfoObj.order.token && getInfoObj.order.token.projectName}</strong>
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
