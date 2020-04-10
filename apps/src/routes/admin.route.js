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
import StatisticsPage from 'components/admin/StatisticsPage/StatisticsPage.component'

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
          <Route path={`${ADMIN_PATH}/users`}>
            <AdminLayout>
              <AdminUserListPage />
            </AdminLayout>
          </Route>
          <Route
            path={`${ADMIN_PATH}/user-info/:id`}
            render={props => (
              <AdminLayout>
                <AdminUserInfoPage {...props} />
              </AdminLayout>
            )}
          />
          <Route path={`${ADMIN_PATH}/create-user`}>
            <AdminLayout>
              <AdminUserCreatePage />
            </AdminLayout>
          </Route>
          <Route path={`${ADMIN_PATH}/reports`}>
            <AdminLayout>
              <StatisticsPage />
            </AdminLayout>
          </Route>
        </>
      ) : (
        <>
          <Route exact path={ADMIN_PATH}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/users`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/user-info/:id`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/create-user`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${ADMIN_PATH}/reports`}>
            <Redirect to="/" />
          </Route>
        </>
      )}
    </Switch>
  )
}

export default RouteAdmin
