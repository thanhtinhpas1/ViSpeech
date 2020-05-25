/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import RouteCustomer from 'routes/customer.route'
import RouteAdmin from 'routes/admin.route'
import loadScript from 'utils/loadScript'
import loadLink from 'utils/loadLink'
import { connect } from 'react-redux'
import Utils from 'utils'
import { CUSTOMER_PATH, ADMIN_PATH } from 'utils/constant'

import LandingPage from 'components/common/LandingPage/LandingPage.container'
import LoginPage from 'components/common/LoginPage/LoginPage.container'
import RegisterPage from 'components/common/RegisterPage/RegisterPage.container'
import NotFound404 from 'components/common/NotFound404/NotFound404.component'

const App = ({ currentUser }) => {
  const [isCssLoaded, setIsCssLoaded] = useState(false)
  const [isUser, setIsUser] = useState(null)

  useEffect(() => {
    async function loadAllLibraries() {
      const currentPath = window.location.pathname
      if (!currentUser) {
        // loadLink
        let link = await loadLink(
          `${process.env.PUBLIC_URL}/assets/css/customer/bootstrap.min.css`,
          'customer-bootstrap.min.css',
          'on'
        )
        console.log(`${link.id} is loaded`)
        if (currentPath !== '/login' && currentPath !== '/register') {
          // load link
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/style-2.css`,
            'customer-style-2.css',
            'on'
          )
          console.log(`${link.id} is loaded`)
          setIsCssLoaded(true)
        } else {
          // load link
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`,
            'customer-style-1.css',
            'on'
          )
          console.log(`${link.id} is loaded`)
          setIsCssLoaded(true)
        }
        // if (isCssLoaded) {
        // load script
        let script = await loadScript(
          `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
          'customer-bootstrap.min.js',
          'on'
        )
        console.log(`${script.id} is loaded`)
        if (currentPath !== '/login' && currentPath !== '/register') {
          // load script
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/custom.js`,
            'customer-custom.js',
            'on'
          )
          console.log(`${script.id} is loaded`)
          // load script
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/particles/particles-app.js`,
            'customer-particles-app.js',
            'on'
          )
          console.log(`${script.id} is loaded`)
        }
        // }
      }

      if (currentUser) {
        const isUserRole = Utils.checkIfIsUser(currentUser.roles)
        setIsUser(isUserRole)

        if (isUser) {
          // load link
          let link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/bootstrap.min.css`,
            'customer-bootstrap.min.css',
            'on'
          )
          console.log(`${link.id} is loaded`)
          // load link
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`,
            'customer-style-1.css',
            'on'
          )
          console.log(`${link.id} is loaded`)
          // load link
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/style-emaila5f5.css`,
            'customer-style-emaila5f5.css',
            'on'
          )
          console.log(`${link.id} is loaded`)
          setIsCssLoaded(true)
          // if (isCssLoaded) {
          // load script
          // let script = await loadScript(
          //   `${process.env.PUBLIC_URL}/assets/js/customer/DataTables/jquery.dataTables.min.js`,
          //   'customer-jquery.dataTables.min.js',
          //   'on'
          // )
          // console.log(`${script.id} is loaded`)
          // // load script
          // script = await loadScript(
          //   `${process.env.PUBLIC_URL}/assets/js/customer/DataTables/dataTables.bootstrap4.min.js`,
          //   'customer-dataTables.bootstrap4.min.js',
          //   'on'
          // )
          // console.log(`${script.id} is loaded`)
          // load script
          let script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
            'customer-bootstrap.min.js',
            'on'
          )
          console.log(`${script.id} is loaded`)
          // load script
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`,
            'customer-scripta5f5.js',
            'on'
          )
          console.log(`${script.id} is loaded`)
          // }
        } else {
          // load link
          let link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/admin/bootstrap.min.css`,
            'admin-bootstrap.min.css',
            'on'
          )
          console.log(`${link.id} is loaded`)
          // load link
          link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/admin/react-table.css`, 'react-table.css', 'on')
          console.log(`${link.id} is loaded`)
          // load link
          link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/admin/turbo.css`, 'admin-turbo.css', 'on')
          console.log(`${link.id} is loaded`)
          // setIsCssLoaded(true)
          // load link
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/admin/material-design-iconic-font/dist/css/material-design-iconic-font.min.css`,
            'admin-material-design-iconic-font.min.css',
            'on'
          )
          console.log(`${link.id} is loaded`)
          // load link
          link = await loadLink(
            `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons`,
            'admin-fonts.googleapis.com',
            'on'
          )
          console.log(`${link.id} is loaded`)
          setIsCssLoaded(true)
          // if (isCssLoaded) {
          // load script
          // let script = await loadScript(
          //   `${process.env.PUBLIC_URL}/assets/vendors/jquery.datatables.js`,
          //   'admin-jquery.datatables.js',
          //   'on'
          // )
          // console.log(`${script.id} is loaded`)
          // load script
          let script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/vendors/bootstrap.min.js`,
            'admin-bootstrap.min.js',
            'on'
          )
          console.log(`${script.id} is loaded`)
          // load script
          script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/admin/turbo.js`, 'admin-turbo.js', 'on')
          console.log(`${script.id} is loaded`)
          // load script because of ClipboardJS
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`,
            'customer-scripta5f5.js',
            'on'
          )
          console.log(`${script.id} is loaded`)
          // load script
          // script = await loadScript(
          //   `${process.env.PUBLIC_URL}/assets/vendors/charts/flot/jquery.flot.js`,
          //   'admin-jquery.flot.js',
          //   'on'
          // )
          // console.log(`${script.id} is loaded`)
          // load script
          // script = await loadScript(
          //   `${process.env.PUBLIC_URL}/assets/js/admin/charts/flot-charts.js`,
          //   'admin-flot-charts.js',
          //   'on'
          // )
          // console.log(`${script.id} is loaded`)
          // load script
          // script = await loadScript(
          //   `${process.env.PUBLIC_URL}/assets/js/admin/charts/chartjs-charts.js`,
          //   'admin-chartjs-charts.js',
          //   'on'
          // )
          // console.log(`${script.id} is loaded`)
          // }
        }
      }
    }

    async function loadJsFiles(isLoadJsFiles) {
      const action = isLoadJsFiles ? 'on' : 'off'
      const status = isLoadJsFiles ? 'loaded' : 'unloaded'

      let script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
        'customer-bootstrap.min.js',
        action
      )
      console.log(`${script.id} is ${status}`)

      script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/customer/custom.js`, 'customer-custom.js', action)
      console.log(`${script.id} is ${status}`)

      script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/particles/particles-app.js`,
        'customer-particles-app.js',
        action
      )
      console.log(`${script.id} is ${status}`)

      // script = await loadScript(
      //   `${process.env.PUBLIC_URL}/assets/js/customer/DataTables/jquery.dataTables.min.js`,
      //   'customer-jquery.dataTables.min.js',
      //   action
      // )
      // console.log(`${script.id} is ${status}`)

      // script = await loadScript(
      //   `${process.env.PUBLIC_URL}/assets/js/customer/DataTables/dataTables.bootstrap4.min.js`,
      //   'customer-dataTables.bootstrap4.min.js',
      //   action
      // )
      // console.log(`${script.id} is ${status}`)

      // script = await loadScript(
      //   `${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`,
      //   'customer-scripta5f5.js',
      //   action
      // )
      // console.log(`${script.id} is ${status}`)

      script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/vendors/bootstrap.min.js`,
        'admin-bootstrap.min.js',
        action
      )
      console.log(`${script.id} is ${status}`)

      script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/admin/turbo.js`, 'admin-turbo.js', action)
      console.log(`${script.id} is ${status}`)

      // script = await loadScript(
      //   `${process.env.PUBLIC_URL}/assets/vendors/jquery.datatables.js`,
      //   'admin-jquery.datatables.js',
      //   action
      // )
      // console.log(`${script.id} is ${status}`)

      // script = await loadScript(
      //   `${process.env.PUBLIC_URL}/assets/vendors/charts/flot/jquery.flot.js`,
      //   'admin-jquery.flot.js',
      //   action
      // )
      // console.log(`${script.id} is ${status}`)

      // script = await loadScript(
      //   `${process.env.PUBLIC_URL}/assets/js/admin/charts/flot-charts.js`,
      //   'admin-flot-charts.js',
      //   action
      // )
      // console.log(`${script.id} is ${status}`)

      // script = await loadScript(
      //   `${process.env.PUBLIC_URL}/assets/js/admin/charts/chartjs-charts.js`,
      //   'admin-chartjs-charts.js',
      //   action
      // )
      // console.log(`${script.id} is ${status}`)

      loadAllLibraries()
    }

    async function loadCssFiles(isLoadCssFiles) {
      const action = isLoadCssFiles ? 'on' : 'off'
      const status = isLoadCssFiles ? 'loaded' : 'unloaded'
      let link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/bootstrap.min.css`,
        'customer-bootstrap.min.css',
        action
      )
      console.log(`${link.id} is ${status}`)

      link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`, 'customer-style-1.css', action)
      console.log(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/style-emaila5f5.css`,
        'customer-style-emaila5f5.css',
        action
      )

      link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/customer/style-2.css`, 'customer-style-2.css', action)
      console.log(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/admin/bootstrap.min.css`,
        'admin-bootstrap.min.css',
        action
      )
      console.log(`${link.id} is ${status}`)

      link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/admin/turbo.css`, 'admin-turbo.css', action)
      console.log(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/admin/material-design-iconic-font/dist/css/material-design-iconic-font.min.css`,
        'admin-material-design-iconic-font.min.css',
        action
      )
      console.log(`${link.id} is ${status}`)

      link = await loadLink(
        `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons`,
        'admin-fonts.googleapis.com',
        action
      )
      console.log(`${link.id} is ${status}`)

      loadJsFiles(false)
    }

    loadCssFiles(false)
  }, [currentUser, isUser])

  return (
    <>
      {isCssLoaded && (
        <Switch>
          <Route path="/404">
            <NotFound404 />
          </Route>
          <Route path={CUSTOMER_PATH} render={() => <RouteCustomer currentUser={currentUser} />} />
          <Route path={ADMIN_PATH} render={() => <RouteAdmin currentUser={currentUser} />} />
          {currentUser && isUser != null ? (
            <Switch>
              <Route path="/*">
                <Redirect to={isUser ? CUSTOMER_PATH : ADMIN_PATH} />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="*">
                <Redirect to="/404" />
              </Route>
            </Switch>
          )}
        </Switch>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App)
