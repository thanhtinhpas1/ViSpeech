/* eslint-disable react/button-has-type */
import React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import { CUSTOMER_PATH } from '../../../../../../../utils/constant'

const PayReviewModal = ({ payReviewModal }) => {
  return (
    <Modal visible={payReviewModal.visible} footer={null} centered width={600} onCancel={payReviewModal.onCancel}>
      <div className="popup-body text-center">
        <div className="gaps-2x" />
        <div className="pay-status pay-status-success">
          <em className="ti ti-check" />
        </div>
        <div className="gaps-2x" />
        <h3 style={{ color: '#495463' }}>Giao dịch thành công.</h3>
        <p style={{ color: '#495463' }}>Thời hạn sử dụng API key là {payReviewModal.data.minutes} phút. Xin cảm ơn.</p>
        <div className="copy-wrap mgb-1-5x mgt-1-5x">
          <span className="copy-feedback" />
          <em className="fas fa-key" />
          <input type="text" className="copy-address" defaultValue={payReviewModal.data.token} disabled />
          <button className="copy-trigger copy-clipboard" data-clipboard-text={payReviewModal.data.token}>
            <em className="ti ti-files" />
          </button>
        </div>
        <div className="gaps-2x" />
        <Link to={`${CUSTOMER_PATH}/transactions`} className="btn btn-primary">
          Xem lịch sử giao dịch
        </Link>
        <div className="gaps-1x" />
      </div>
    </Modal>
  )
}

export default PayReviewModal
