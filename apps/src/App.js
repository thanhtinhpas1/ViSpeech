/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import loadScript from 'utils/loadScript'
// import ChangePasswordContainer from 'components/common/ChangePassword/ChangePassword.container'
import { connect } from 'react-redux'
import { CUSTOMER_PATH, ADMIN_PATH, ROLES } from 'utils/constant'
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
import TokensWalletPage from 'components/customer/TokensWalletPage/TokensWalletPage.container'
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
      {currentUser ? (
        <>
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

const RouteAdmin = ({ currentUser }) => {
  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      {currentUser ? (
        <>
          <Route exact path={ADMIN_PATH}>
            <AdminLayout>
              <AdminHomePage />
            </AdminLayout>
          </Route>
        </>
      ) : (
        <>
          <Route exact path={ADMIN_PATH}>
            <Redirect to="/" />
          </Route>
        </>
      )}
    </Switch>
  )
}

const App = ({ currentUser }) => {
  useEffect(() => {
    if (!currentUser) {
      // load script
      loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
        'customer-bootstrap.min.js',
        'on'
      )
        .then(script => {
          console.log(`script ${script.id} is loaded`)
        })
        .catch(err => {
          console.error(err.message)
        })
      // load script
      loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/custom.js`,
        'customer-custom.js',
        'on'
      )
        .then(script => {
          console.log(`script ${script.id} is loaded`)
        })
        .catch(err => {
          console.error(err.message)
        })
      // load script
      loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/particles/particles-app.js`,
        'customer-particles-app.js',
        'on'
      )
        .then(script => {
          console.log(`script ${script.id} is loaded`)
        })
        .catch(err => {
          console.error(err.message)
        })
    }

    if (currentUser && Array.isArray(currentUser.roles)) {
      const isCustomer = currentUser.roles.findIndex(role => role.name.includes('customer')) !== -1
      if (isCustomer) {
        // load script
        loadScript(
          `${process.env.PUBLIC_URL}/assets/js/customer/DataTables/jquery.dataTables.min.js`,
          'customer-jquery.dataTables.min.js',
          'on'
        )
          .then(script => {
            console.log(`script ${script.id} is loaded`)
            // load script
            loadScript(
              `${process.env.PUBLIC_URL}/assets/js/customer/DataTables/dataTables.bootstrap4.min.js`,
              'customer-dataTables.bootstrap4.min.js',
              'on'
            )
              .then(script1 => {
                console.log(`script ${script1.id} is loaded`)
              })
              .catch(err => {
                console.error(err.message)
              })
          })
          .catch(err => {
            console.error(err.message)
          })
        // load script
        loadScript(
          `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
          'customer-bootstrap.min.js',
          'on'
        )
          .then(script => {
            console.log(`script ${script.id} is loaded`)
            // load script
            loadScript(
              `${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`,
              'customer-scripta5f5.js',
              'on'
            )
              .then(script1 => {
                console.log(`script ${script1.id} is loaded`)
              })
              .catch(err => {
                console.error(err.message)
              })
          })
          .catch(err => {
            console.error(err.message)
          })
      } else {
        // load script
        loadScript(
          `${process.env.PUBLIC_URL}/assets/vendors/bootstrap.min.js`,
          'admin-bootstrap.min.js',
          'on'
        )
          .then(script => {
            console.log(`script ${script.id} is loaded`)
          })
          .catch(err => {
            console.error(err.message)
          })
        // load script
        loadScript(
          `${process.env.PUBLIC_URL}/assets/vendors/jquery.datatables.js`,
          'admin-jquery.datatables.js',
          'on'
        )
          .then(script => {
            console.log(`script ${script.id} is loaded`)
          })
          .catch(err => {
            console.error(err.message)
          })
        // load script
        loadScript(
          `${process.env.PUBLIC_URL}/assets/vendors/charts/flot/jquery.flot.js`,
          'admin-jquery.flot.js',
          'on'
        )
          .then(script => {
            console.log(`script ${script.id} is loaded`)
            // load script
            loadScript(
              `${process.env.PUBLIC_URL}/assets/js/admin/charts/flot-charts.js`,
              'admin-flot-charts.js',
              'on'
            )
              .then(script1 => {
                console.log(`script ${script1.id} is loaded`)
              })
              .catch(err => {
                console.error(err.message)
              })
            // load script
            loadScript(
              `${process.env.PUBLIC_URL}/assets/js/admin/charts/chartjs-charts.js`,
              'admin-chartjs-charts.js',
              'on'
            )
              .then(script2 => {
                console.log(`script ${script2.id} is loaded`)
              })
              .catch(err => {
                console.error(err.message)
              })
          })
          .catch(err => {
            console.error(err.message)
          })
        // load script
        loadScript(`${process.env.PUBLIC_URL}/assets/js/admin/turbo.js`, 'admin-turbo.js', 'on')
          .then(script => {
            console.log(`script ${script.id} is loaded`)
          })
          .catch(err => {
            console.error(err.message)
          })
      }
    }
  }, [currentUser])

  return (
    <>
      <Switch>
        <Route path={CUSTOMER_PATH} render={() => <RouteCustomer currentUser={currentUser} />} />
        <Route path={ADMIN_PATH} render={() => <RouteAdmin currentUser={currentUser} />} />
        {currentUser ? (
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
          <>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </>
        )}
      </Switch>
    </>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App)
