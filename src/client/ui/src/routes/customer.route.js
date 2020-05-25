/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CUSTOMER_PATH } from 'utils/constant'
import CustomerLayout from 'components/customer/CustomerLayout'
import CustomerHomePage from 'components/customer/HomePage/HomePage.container'
import TransactionsPage from 'components/customer/TransactionsPage/TransactionsPage.container'
import TransactionDetailsPage from 'components/customer/TransactionDetailsPage/TransactionDetailsPage.container'
import ProjectDetailsPage from 'components/customer/ProjectDetailsPage/ProjectDetailsPage.container'
import ProfilePage from 'components/customer/ProfilePage/ProfilePage.container'
import VerifyEmailPage from 'components/customer/VerifyEmailPage/VerifyEmailPage.container'
import ProjectPage from 'components/customer/ProjectPage/ProjectPage.container'
import CreateProjectPage from 'components/customer/CreateProjectPage/CreateProjectPage.container'
import AssignPermissionPage from 'components/customer/AssignPermissionPage/AssignPermissionPage.container'
import ReplyPermissionAssignPage from 'components/customer/ReplyPermissionAssignPage/ReplyPermissionAssignPage.container'
import StatisticsPage from 'components/customer/StatisticsPage/StatisticsPage.container'

const RouteCustomer = ({ currentUser }) => {
  return (
    <>
      {/* WITHOUT login, user can access those links */}
      {currentUser && (
        <CustomerLayout>
          <Switch>
            <Route exact path={CUSTOMER_PATH}>
              <CustomerHomePage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/transactions`}>
              <TransactionsPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/transaction-details`}>
              <TransactionDetailsPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/profile`}>
              <ProfilePage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/verify-email/:emailToken`}>
              <VerifyEmailPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/projects`}>
              <ProjectPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/create-project`}>
              <CreateProjectPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/my-project/:id`}>
              <ProjectDetailsPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/accepted-project/:id`}>
              <ProjectDetailsPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/assign-permission`}>
              <AssignPermissionPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/reply-permission-assign/:emailToken`}>
              <ReplyPermissionAssignPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/reports`}>
              <StatisticsPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/*`}>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </CustomerLayout>
      )}

      {!currentUser && (
        <Switch>
          <Route exact path={CUSTOMER_PATH}>
            <Redirect to="/" />
          </Route>
          <Route path={`${CUSTOMER_PATH}/*`}>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default RouteCustomer
