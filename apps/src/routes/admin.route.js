/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ADMIN_PATH } from 'utils/constant'
import AdminLayout from 'components/admin/AdminLayout'
import AdminHomePage from 'components/admin/HomePage/HomePage.container'

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

export default RouteAdmin
