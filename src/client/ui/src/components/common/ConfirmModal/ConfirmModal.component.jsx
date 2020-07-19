/* eslint-disable react/no-danger */
import React from 'react'
import { Modal } from 'antd'

const ConfirmModal = ({ confirmModal }) => {
  return (
    <Modal
      visible={ confirmModal.visible }
      onOk={ confirmModal.onOk }
      onCancel={ confirmModal.onCancel }
      okText="Có"
      cancelText="Không"
      centered
      maskClosable={ false }
    >
      <div className="popup-body text-center">
        <div className="gaps-2x"/>
        <div className="pay-status pay-status-warning">
          <em className="ti ti-alert"
              style={ { height: '60px', width: '60px', lineHeight: '50px', fontSize: '35px' } }/>
        </div>
        <div className="gaps-1x"/>
        <h4 style={ { color: '#495463' } }>Xác nhận</h4>
        <p style={ { color: '#495463' } } dangerouslySetInnerHTML={ { __html: confirmModal.message } }/>
      </div>
    </Modal>
  )
}

export default ConfirmModal
