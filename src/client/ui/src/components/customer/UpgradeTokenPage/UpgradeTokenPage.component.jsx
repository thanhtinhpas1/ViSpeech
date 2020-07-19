/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { Row } from 'antd'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY } from 'utils/constant'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'
import UpgradeForm from './components/UpgradeForm/UpgradeForm.container'

const UpgradeTokenPage = () => {
  const [ stripePromise, setStripePromise ] = useState(null)

  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_PUBLIC_KEY))
  }, [])

  return (
    <div className="page-content">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr" style={ { minHeight: '500px' } }>
            <div className="card-head d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Nâng cấp API key</h4>
            </div>
            <div className="gaps-1x"/>
            { stripePromise ? (
              <Elements stripe={ stripePromise }>
                <UpgradeForm/>
              </Elements>
            ) : (
              <Row style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' } }>
                <LoadingIcon size={ 50 }/>
              </Row>
            ) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradeTokenPage
