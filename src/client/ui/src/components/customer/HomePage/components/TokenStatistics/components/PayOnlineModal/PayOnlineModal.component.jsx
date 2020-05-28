/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { STRIPE_PUBLIC_KEY } from 'utils/constant'
import PayReviewModal from './components/PayReviewModal/PayReviewModal.component'
import CheckoutForm from './components/CheckoutForm/CheckoutForm.container'

const PayOnlineModal = ({ payOnlineModal, myProjectList }) => {
  const [payReview, setPayReview] = useState({})
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_PUBLIC_KEY))
  }, [])

  const onOrderSuccess = useCallback(orderData => {
    setPayReview({
      minutes: orderData.minutes,
      token: orderData.tokenValue,
    })
  }, [])

  return (
    <>
      <div className="modal fade" id="pay-online" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-md modal-dialog-centered">
          <div className="modal-content pb-0">
            <div className="popup-body">
              <h4 className="popup-title">Thanh toán mua token</h4>
              <p className="lead" style={{ color: '#495463' }}>
                Mua token và sử dụng trong vòng{' '}
                {payOnlineModal.tokenType && (
                  <>
                    <strong>{payOnlineModal.tokenType.minutes} phút</strong> với số tiền{' '}
                    <strong>{payOnlineModal.tokenType.saleOffPrice} $</strong>.
                  </>
                )}
              </p>
              <div className="mgt-1-5x">
                {stripePromise && (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      checkoutInfo={payOnlineModal}
                      onOrderSuccess={onOrderSuccess}
                      myProjectList={myProjectList.data}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PayReviewModal payReviewModal={payReview} />
    </>
  )
}

export default PayOnlineModal
