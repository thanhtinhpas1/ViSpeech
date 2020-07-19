/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { Modal } from 'antd'
import { MONETARY_UNIT } from 'utils/constant'
import Utils from 'utils'
import CheckoutForm from './components/CheckoutForm/CheckoutForm.container'

const PayOnlineModal = ({ stripePromise, payOnlineModal, myProjectList, onOrderSuccess }) => {
  return (
    <>
      <Modal visible={ payOnlineModal.visible } footer={ null } centered width={ 600 }
             onCancel={ payOnlineModal.onCancel }>
        <div className="popup-body">
          <h4 className="popup-title">Thanh toán mua API key</h4>
          <p className="lead" style={ { color: '#495463' } }>
            Mua API key và sử dụng trong vòng{ ' ' }
            { payOnlineModal.data.tokenType && (
              <>
                <strong>{ payOnlineModal.data.tokenType.minutes } phút</strong> với số tiền{ ' ' }
                <strong>
                  { Utils.formatPrice(payOnlineModal.data.tokenType.saleOffPrice) } { MONETARY_UNIT }
                </strong>
                .
              </>
            ) }
          </p>
          <div className="mgt-1-5x">
            { stripePromise && (
              <Elements stripe={ stripePromise }>
                <CheckoutForm
                  checkoutInfo={ payOnlineModal }
                  onOrderSuccess={ onOrderSuccess }
                  myProjectList={ myProjectList.data }
                />
              </Elements>
            ) }
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PayOnlineModal
