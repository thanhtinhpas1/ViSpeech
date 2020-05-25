/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ADMIN_PATH } from 'utils/constant'
import AdminLayout from 'components/admin/AdminLayout'
import AdminHomePage from 'components/admin/HomePage/HomePage.container'
import AdminUserListPage from 'components/admin/UserListPage/UserListPage.container'
import AdminUserInfoPage from 'components/admin/UserInfoPage/UserInfoPage.container'
import AdminUserCreatePage from 'components/admin/UserCreatePage/UserCreatePage.container'
import AdminProjectDetailsPage from 'components/admin/ProjectDetailsPage/ProjectDetailsPage.container'
import AdminTransactionDetailsPage from 'components/admin/TransactionDetailsPage/TransactionDetailsPage.container'
import AdminHistoriesPage from 'components/admin/HistoriesPage/HistoriesPage.container'
import AdminTasksPage from 'components/admin/TasksPage/TasksPage.container'
import StatisticsPage from 'components/admin/StatisticsPage/StatisticsPage.component'
import ProjectsPage from 'components/admin/ProjectsPage/ProjectsPage.container'
import TokensPage from 'components/admin/TokensPage/TokensPage.container'
import TransactionsPage from 'components/admin/TransactionsPage/TransactionsPage.container'

const RouteAdmin = ({ currentUser }) => {
  return (
    <>
      {/* WITHOUT login, user can access those links */}
      {currentUser && (
        <AdminLayout>
          <Switch>
            <Route exact path={ADMIN_PATH}>
              <AdminHomePage />
            </Route>
            <Route path={`${ADMIN_PATH}/users`}>
              <AdminUserListPage />
            </Route>
            <Route path={`${ADMIN_PATH}/user-info/:id`}>
              <AdminUserInfoPage />
            </Route>
            <Route path={`${ADMIN_PATH}/create-user`}>
              <AdminUserCreatePage />
            </Route>
            <Route path={`${ADMIN_PATH}/reports`}>
              <StatisticsPage />
            </Route>
            <Route path={`${ADMIN_PATH}/transaction-details`}>
              <AdminTransactionDetailsPage />
            </Route>
            <Route path={`${ADMIN_PATH}/user-project/:id`}>
              <AdminProjectDetailsPage />
            </Route>
            <Route path={`${ADMIN_PATH}/user-accepted-project/:id`}>
              <AdminProjectDetailsPage />
            </Route>
            <Route path={`${ADMIN_PATH}/projects`}>
              <ProjectsPage />
            </Route>
            <Route path={`${ADMIN_PATH}/tokens`}>
              <TokensPage />
            </Route>
            <Route path={`${ADMIN_PATH}/transactions`}>
              <TransactionsPage />
            </Route>
            <Route path={`${ADMIN_PATH}/histories`}>
              <AdminHistoriesPage />
            </Route>
            <Route path={`${ADMIN_PATH}/tasks`}>
              <AdminTasksPage />
            </Route>
            <Route path={`${ADMIN_PATH}/*`}>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </AdminLayout>
      )}

      {!currentUser && (
        <Switch>
          <Route exact path={ADMIN_PATH}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/*`}>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default RouteAdmin
