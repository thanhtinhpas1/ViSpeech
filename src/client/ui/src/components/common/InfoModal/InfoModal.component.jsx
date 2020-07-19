/* eslint-disable react/no-danger */
import React from 'react'
import { Modal } from 'antd'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'

const InfoModal = ({ infoModal }) => {
  return (
    <Modal visible={ infoModal.visible } footer={ null } centered onCancel={ infoModal.onCancel }>
      <div className="popup-body text-center">
        <div className="gaps-2x"/>
        { infoModal.icon &&
        infoModal.icon.isSuccess != null &&
        (infoModal.icon.isSuccess ? (
          <div className="pay-status pay-status-success">
            <em
              className="ti ti-check"
              style={ { height: '60px', width: '60px', lineHeight: '60px', fontSize: '30px' } }
            />
          </div>
        ) : (
          <div className="pay-status pay-status-error">
            <em
              className="ti ti-alert"
              style={ { height: '60px', width: '60px', lineHeight: '50px', fontSize: '35px' } }
            />
          </div>
        )) }
        { infoModal.icon && infoModal.icon.isLoading != null && <LoadingIcon/> }
        <div className="gaps-2x"/>
        { infoModal.title && <h4 style={ { color: '#495463' } }>{ infoModal.title }</h4> }
        <p style={ { color: '#495463' } } dangerouslySetInnerHTML={ { __html: infoModal.message } }/>
        <div className="gaps-2x"/>
        { infoModal.button && (
          <button
            type="button"
            style={ { color: '#253992', fontWeight: 'bold' } }
            className="btn btn-customer btn-lighter"
            onClick={ infoModal.button.clickFunc }
          >
            { infoModal.button.content }
          </button>
        ) }
      </div>
    </Modal>
  )
}

export default InfoModal
