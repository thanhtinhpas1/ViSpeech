/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import loadScript from 'utils/loadScript'
// import ChangePasswordContainer from 'components/common/ChangePassword/ChangePassword.container'
import { connect } from 'react-redux'
import { CUSTOMER_PATH, ADMIN_PATH } from 'utils/constant'
// import NotFound404 from 'components/common/NotFound404/NotFound404.component'
// import ErrorPage from 'components/common/ErrorPage/ErrorPage.component'
import CustomerLayout from 'components/customer/CustomerLayout'
import AdminLayout from 'components/admin/AdminLayout'

import LandingPage from 'components/common/LandingPage/LandingPage.container'
import LoginPage from 'components/common/LoginPage/LoginPage.container'
import RegisterPage from 'components/common/RegisterPage/RegisterPage.container'

import CustomerHomePage from 'components/customer/HomePage/HomePage.container'
import TransactionsPage from 'components/customer/TransactionsPage/TransactionsPage.component'
import TransactionDetailsPage from 'components/customer/TransactionDetailsPage/TransactionDetailsPage.component'
import TokensWalletPage from 'components/customer/TokensWalletPage/TokensWalletPage.component'
import ProfilePage from 'components/customer/ProfilePage/ProfilePage.component'

import AdminHomePage from 'components/admin/HomePage/HomePage.container'
// import ActiveEmailContainer from 'components/common/ActiveEmail/ActiveEmail.container'
// import ForgetPasswordContainer from 'components/common/ForgetPassword/ForgetPassword.container'
// import ResetPasswordContainer from 'components/common/ResetPassword/ResetPassword.container'
// import RegisterPageContainer from 'components/common/RegisterPage/RegisterPage.container'

const RouteCustomer = ({ currentUser }) => {
  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      {/* {currentUser ? (
        <> */}
      <Route exact path={CUSTOMER_PATH}>
        <CustomerLayout>
          <CustomerHomePage />
        </CustomerLayout>
      </Route>
      <Route
        path={`${CUSTOMER_PATH}/transactions`}
        render={props => (
          <CustomerLayout>
            <TransactionsPage />
          </CustomerLayout>
        )}
      />
      <Route
        path={`${CUSTOMER_PATH}/transaction-details`}
        render={props => (
          <CustomerLayout>
            <TransactionDetailsPage />
          </CustomerLayout>
        )}
      />
      <Route
        path={`${CUSTOMER_PATH}/tokens-wallet`}
        render={props => (
          <CustomerLayout>
            <TokensWalletPage />
          </CustomerLayout>
        )}
      />
      <Route
        path={`${CUSTOMER_PATH}/profile`}
        render={props => (
          <CustomerLayout>
            <ProfilePage />
          </CustomerLayout>
        )}
      />
      {/* </>
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
        </> */}
      )}
    </Switch>
  )
}

const RouteAdmin = ({ currentUser }) => {
  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      {/* {currentUser ? (
        <> */}
      <Route exact path={ADMIN_PATH}>
        <AdminLayout>
          <AdminHomePage />
        </AdminLayout>
      </Route>

      {/* </>
      ) : (
        <>
          <Route exact path={ADMIN_PATH}>
            <AdminLayout>
              <AdminHomePage />
            </AdminLayout>
          </Route>
        </>
      )} */}
    </Switch>
  )
}

const App = ({ currentUser }) => {
  useEffect(() => {
    // loadScript(`${process.env.PUBLIC_URL}/assets/js/all/bootstrap.min.js`)
    //   .then(script1 => {
    //     console.log('script bootstrap.min.js is loaded')
    //   })
    //   .catch(err => {
    //     console.error(err.message)
    //   })
    loadScript(`${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`)
      .then(script1 => {
        console.log('script scripta5f5.js is loaded')
      })
      .catch(err => {
        console.error(err.message)
      })
    loadScript(`${process.env.PUBLIC_URL}/assets/js/customer/custom.js`)
      .then(script1 => {
        console.log('script custom.js is loaded')
      })
      .catch(err => {
        console.error(err.message)
      })
    loadScript(`${process.env.PUBLIC_URL}/assets/js/customer/particles/particles-app.js`)
      .then(script1 => {
        console.log('script particles-app.js is loaded')
      })
      .catch(err => {
        console.error(err.message)
      })
    loadScript(`${process.env.PUBLIC_URL}/assets/js/admin/turbo.js`)
      .then(script1 => {
        console.log('script turbo.js is loaded')
      })
      .catch(err => {
        console.error(err.message)
      })
    loadScript(`${process.env.PUBLIC_URL}/assets/js/admin/charts/flot-charts.js`)
      .then(script1 => {
        console.log('script flot-charts.js is loaded')
      })
      .catch(err => {
        console.error(err.message)
      })
    loadScript(`${process.env.PUBLIC_URL}/assets/js/admin/charts/chartjs-charts.js`)
      .then(script1 => {
        console.log('script chartjs-charts.js is loaded')
      })
      .catch(err => {
        console.error(err.message)
      })
  }, [])

  return (
    <>
      <Switch>
        <Route path={CUSTOMER_PATH} render={() => <RouteCustomer currentUser={currentUser} />} />
        <Route path={ADMIN_PATH} render={() => <RouteAdmin currentUser={currentUser} />} />
        {/* {currentUser ? (
          <>
            <Route exact path="/">
              <Redirect to={CUSTOMER_PATH} />
            </Route>
            <Route path="/login">
              <Redirect to={CUSTOMER_PATH} />
            </Route>
            <Route path="/register">
              <Redirect to={CUSTOMER_PATH} />
            </Route>
          </>
        ) : (
          <> */}
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        {/* </>
        )} */}
      </Switch>
    </>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App)
