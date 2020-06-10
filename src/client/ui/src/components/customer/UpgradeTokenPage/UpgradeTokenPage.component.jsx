/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useEffect } from 'react'
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY } from 'utils/constant'
import Utils from 'utils'
import UpgradeForm from './components/UpgradeForm/UpgradeForm.container'
import InfoModal from '../InfoModal/InfoModal.component'

const UpgradeTokenPage = ({ currentUser }) => {
  const [infoModal, setInfoModal] = useState({})
  const [stripePromise, setStripePromise] = useState(null)
  // const stripe = useStripe()
  // const elements = useElements()

  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_PUBLIC_KEY))
  }, [])

  const onSubmit = values => {
    // if (!stripe || !elements) {
    //   // Stripe.js has not yet loaded.
    //   // Make sure to disable form submission until Stripe.js has loaded.
    //   return
    // }
    // async function createToken(projectId, tokenName) {
    //   const cardElement = elements.getElement(CardElement)
    //   const { user, tokenType } = checkoutInfo
    //   let result = null
    //   try {
    //     result = await OrderService.createPaymentIntent(tokenType.saleOffPrice * 100)
    //   } catch (err) {
    //     setErrorMessage(err.message || err)
    //     setIsLoading(false)
    //     return
    //   }
    //   const paymentMethodReq = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card: cardElement,
    //     billing_details: {
    //       name: `${user.firstName} ${user.lastName}`,
    //       email: user.email,
    //     },
    //   })
    //   if (paymentMethodReq.error) {
    //     setErrorMessage(paymentMethodReq.error.message)
    //     setIsLoading(false)
    //     return
    //   }
    //   const confirmedCardPayment = await stripe.confirmCardPayment(result.clientSecret, {
    //     payment_method: paymentMethodReq.paymentMethod.id,
    //   })
    //   if (confirmedCardPayment.error) {
    //     setErrorMessage(confirmedCardPayment.error.message)
    //     setIsLoading(false)
    //     return
    //   }
    //   if (confirmedCardPayment.paymentIntent && confirmedCardPayment.paymentIntent.status === 'succeeded') {
    //     // The payment has been processed!
    //     const paymentIntent = {
    //       id: confirmedCardPayment.paymentIntent.id,
    //     }
    //     const order = {
    //       userId: user._id,
    //       tokenType: Utils.removePropertyFromObject(tokenType, 'saleOffPrice'),
    //       token: {
    //         userId: user._id,
    //         projectId,
    //         name: tokenName,
    //       },
    //     }
    //     createOrder(order, paymentIntent)
    //     try {
    //       await OrderService.createOrder(order, paymentIntent)
    //       invokeCheckSubject.OrderCreated.subscribe(data => {
    //         if (data.error != null) {
    //           createOrderFailure(data.errorObj)
    //         }
    //       })
    //       invokeCheckSubject.OrderedTokenCreated.subscribe(data => {
    //         if (data.error != null) {
    //           createOrderFailure(data.errorObj)
    //         } else {
    //           createOrderSuccess({ order, token: data.formattedToken })
    //         }
    //       })
    //     } catch (err) {
    //       createOrderFailure({ message: err.message })
    //     }
    //   }
    // }
    // setIsLoading(true)
    // const { projectId, tokenName } = values
    // createToken(projectId, tokenName)
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Nâng cấp token</h4>
            </div>
            <div className="gaps-1x" />
            {stripePromise && (
              <Elements stripe={stripePromise}>
                <UpgradeForm onSubmit={onSubmit} />
              </Elements>
            )}
          </div>
        </div>
      </div>
      <InfoModal id="upgradeToken-modal" infoModal={infoModal} />
    </div>
  )
}

export default UpgradeTokenPage
