/* eslint-disable react/button-has-type */
import React from 'react'
import { CUSTOMER_PATH } from 'utils/constant'

const PayReviewModal = ({ payReviewModal }) => {
  return (
    <div className="modal fade" id="pay-review" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-md modal-dialog-centered">
        <div className="modal-content">
          <div className="popup-body text-center">
            <div className="gaps-2x" />
            <div className="pay-status pay-status-success">
              <em className="ti ti-check" />
            </div>
            <div className="gaps-2x" />
            <h3 style={{ color: '#495463' }}>Giao dịch thành công.</h3>
            <p style={{ color: '#495463' }}>Thời hạn sử dụng token là {payReviewModal.minutes} phút. Xin cảm ơn.</p>
            <div className="copy-wrap mgb-1-5x mgt-1-5x">
              <span className="copy-feedback" />
              <em className="fas fa-key" />
              <input type="text" className="copy-address" defaultValue={payReviewModal.token} disabled />
              <button className="copy-trigger copy-clipboard" data-clipboard-text={payReviewModal.token}>
                <em className="ti ti-files" />
              </button>
            </div>
            <div className="gaps-2x" />
            <a href={`${CUSTOMER_PATH}/transactions`} className="btn btn-primary">
              Xem lịch sử giao dịch
            </a>
            <div className="gaps-1x" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayReviewModal
