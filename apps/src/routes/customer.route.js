/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CUSTOMER_PATH } from 'utils/constant'
import CustomerLayout from 'components/customer/CustomerLayout'
import CustomerHomePage from 'components/customer/HomePage/HomePage.container'
import TransactionsPage from 'components/customer/TransactionsPage/TransactionsPage.container'
import TransactionDetailsPage from 'components/customer/TransactionDetailsPage/TransactionDetailsPage.component'
import TokensWalletPage from 'components/customer/TokensWalletPage/TokensWalletPage.container'
import ProfilePage from 'components/customer/ProfilePage/ProfilePage.container'
import VerifyEmailPage from 'components/customer/VerifyEmailPage/VerifyEmailPage.container'
import ProjectPage from 'components/customer/ProjectPage/ProjectPage.container'
import CreateProjectPage from 'components/customer/CreateProjectPage/CreateProjectPage.container'
import AssignPermissionPage from 'components/customer/AssignPermissionPage/AssignPermissionPage.container'
import ReplyPermissionAssignPage from 'components/customer/ReplyPermissionAssignPage/ReplyPermissionAssignPage.container'
import StatisticsPage from 'components/customer/StatisticsPage/StatisticsPage.container'

const RouteCustomer = ({ currentUser }) => {
  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      {currentUser ? (
        <>
          <Route
            exact
            path={CUSTOMER_PATH}
            render={props => (
              <CustomerLayout>
                <CustomerHomePage {...props} />
              </CustomerLayout>
            )}
          />
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
            path={`${CUSTOMER_PATH}/profile`}
            render={() => (
              <CustomerLayout>
                <ProfilePage />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/verify-email/:emailToken`}
            render={props => (
              <CustomerLayout>
                <VerifyEmailPage {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/projects`}
            render={props => (
              <CustomerLayout>
                <ProjectPage {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/create-project`}
            render={() => (
              <CustomerLayout>
                <CreateProjectPage />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/my-project/:id`}
            render={props => (
              <CustomerLayout>
                <TokensWalletPage {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/accepted-project/:id`}
            render={props => (
              <CustomerLayout>
                <TokensWalletPage {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/assign-permission`}
            render={() => (
              <CustomerLayout>
                <AssignPermissionPage />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/reply-permission-assign/:emailToken`}
            render={props => (
              <CustomerLayout>
                <ReplyPermissionAssignPage {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            path={`${CUSTOMER_PATH}/reports`}
            render={() => (
              <CustomerLayout>
                <StatisticsPage />
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
          <Route path={`${CUSTOMER_PATH}/profile`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/verify-email/:emailToken`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/projects`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/create-project`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/my-project/:id`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/accepted-project/:id`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/assign-permission`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/reply-permission-assign/:emailToken`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/reports`}>
            <Redirect to="/" />
          </Route>
        </>
      )}
    </Switch>
  )
}

export default RouteCustomer
