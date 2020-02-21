/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CUSTOMER_PATH } from 'utils/constant'
import CustomerLayout from 'components/customer/CustomerLayout'
import CustomerHomePage from 'components/customer/HomePage/HomePage.container'
import TransactionsPage from 'components/customer/TransactionsPage/TransactionsPage.component'
import TransactionDetailsPage from 'components/customer/TransactionDetailsPage/TransactionDetailsPage.component'
import TokensWalletPage from 'components/customer/TokensWalletPage/TokensWalletPage.container'
import ProfilePage from 'components/customer/ProfilePage/ProfilePage.component'

const RouteCustomer = ({ currentUser }) => {
  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      {currentUser ? (
        <>
          <Route exact path={CUSTOMER_PATH}>
            <CustomerLayout>
              <CustomerHomePage />
            </CustomerLayout>
          </Route>
          <Route
            path={`${CUSTOMER_PATH}/transactions`}
            render={() => (
              <CustomerLayout>
                <TransactionsPage />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/transaction-details`}
            render={() => (
              <CustomerLayout>
                <TransactionDetailsPage />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/tokens-wallet`}
            render={() => (
              <CustomerLayout>
                <TokensWalletPage />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/profile`}
            render={() => (
              <CustomerLayout>
                <ProfilePage />
              </CustomerLayout>
            )}
          />
        </>
      ) : (
        <>
          <Route exact path={CUSTOMER_PATH}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/transactions`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/transaction-details`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/tokens-wallet`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/profile`}>
            <Redirect to="/" />
          </Route>
        </>
      )}
    </Switch>
  )
}

export default RouteCustomer
