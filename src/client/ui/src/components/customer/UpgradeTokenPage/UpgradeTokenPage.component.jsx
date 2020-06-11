/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY, DEFAULT_PAGINATION } from 'utils/constant'
import Utils from 'utils'
import UpgradeForm from './components/UpgradeForm/UpgradeForm.container'

const UpgradeTokenPage = ({ currentUser, getMyProjects, getTokenTypes }) => {
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_PUBLIC_KEY))
  }, [])

  useEffect(() => {
    getTokenTypes()
  }, [getTokenTypes])

  useEffect(() => {
    if (currentUser._id && Utils.isEmailVerified(currentUser.roles)) {
      const filters = {
        isValid: ['true'],
      }
      getMyProjects({ userId: currentUser._id, pagination: DEFAULT_PAGINATION, filters })
    }
  }, [currentUser._id, currentUser.roles, getMyProjects])

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
                <UpgradeForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradeTokenPage
