import React from 'react'
import { CUSTOMER_PATH } from 'utils/constant'

const TokenCalculator = ({ keyQuantity }) => {
  return (
    <div className="card-innr">
      <div className="card-head">
        <h4 className="card-title">Tổng số key đã giao dịch</h4>
      </div>
      <h1 className="token-info-head text-light">
        <em className="pay-icon">
          <i className="fas fa-key" />
        </em>
        {keyQuantity}
      </h1>
      <div className="token-buy">
        <a href={`${CUSTOMER_PATH}/tokens-wallet`} className="btn btn-primary">
          Xem ví key
        </a>
      </div>
    </div>
  )
}

export default TokenCalculator
