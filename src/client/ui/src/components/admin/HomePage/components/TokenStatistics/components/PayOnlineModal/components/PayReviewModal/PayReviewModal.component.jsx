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
            <p style={{ color: '#495463' }}>Thời hạn dùng key là {payReviewModal.time}. Xin cảm ơn.</p>
            {/* <span
    class="badge badge-outline badge-md badge-success"
    style="word-break: break-all; white-space: normal"
    >eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWaVNwZWVjaCIsInVzZXJJbmZvIjp7IklEIjo3LCJVU0VSTkFNRSI6InRrbGluaCJ9LCJpYXQiOjE1NzM4NzM2MjQxMDh9.YsrL08aZbZOKiCE6-SlwGjbpQJiOLxctSatzC5F0ur8</span
  > */}
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
