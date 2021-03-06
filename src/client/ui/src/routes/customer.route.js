/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CUSTOMER_PATH } from '../utils/constant'
import Utils from '../utils'
import CustomerLayout from '../components/customer/CustomerLayout'
import CustomerHomePage from '../components/customer/HomePage/HomePage.container'
import TransactionsPage from '../components/customer/TransactionsPage/TransactionsPage.container'
import TransactionDetailsPage from '../components/customer/TransactionDetailsPage/TransactionDetailsPage.container'
import ProjectDetailsPage from '../components/customer/ProjectDetailsPage/ProjectDetailsPage.container'
import ProfilePage from '../components/customer/ProfilePage/ProfilePage.container'
import VerifyEmailPage from '../components/customer/VerifyEmailPage/VerifyEmailPage.container'
import ProjectPage from '../components/customer/ProjectPage/ProjectPage.container'
import CreateProjectPage from '../components/customer/CreateProjectPage/CreateProjectPage.container'
import AssignPermissionPage from '../components/customer/AssignPermissionPage/AssignPermissionPage.container'
import ReplyPermissionAssignPage from '../components/customer/ReplyPermissionAssignPage/ReplyPermissionAssignPage.container'
import StatisticsPage from '../components/customer/StatisticsPage/StatisticsPage.container'
import TrialPage from '../components/customer/TrialPage/TrialPage.container'
import TrialDetailsPage from '../components/customer/TrialDetailsPage/TrialDetailsPage.container'
import UpgradeTokenPage from '../components/customer/UpgradeTokenPage/UpgradeTokenPage.container'
import RequestsPage from '../components/customer/RequestsPage/RequestsPage.container'
import DocumentsPage from '../components/customer/DocumentsPage/DocumentsPage.component'
import UpdatePermissionPage from '../components/customer/UpdatePermissionPage/UpdatePermissionPage.container'

const RouteCustomer = ({ currentUser }) => {
  return (
    <>
      {/* WITHOUT login, user can access those links */}
      {currentUser && Utils.isUser(currentUser.roles) && (
        <CustomerLayout>
          <Switch>
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
            <Route path={`${CUSTOMER_PATH}/update-permission`}>
              <UpdatePermissionPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/reply-permission-assign/:emailToken`}>
              <ReplyPermissionAssignPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/reports`}>
              <StatisticsPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/documents`}>
              <DocumentsPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/trial`}>
              <TrialPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/request-details/:id`}>
              <TrialDetailsPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/upgrade-token`}>
              <UpgradeTokenPage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/requests`}>
              <RequestsPage />
            </Route>
            <Route exact path={CUSTOMER_PATH}>
              <CustomerHomePage />
            </Route>
            <Route path={`${CUSTOMER_PATH}/*`}>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </CustomerLayout>
      )}

      {(!currentUser || !Utils.isUser(currentUser.roles)) && (
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
