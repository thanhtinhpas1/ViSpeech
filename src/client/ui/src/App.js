/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import RouteCustomer from './routes/customer.route'
import RouteAdmin from './routes/admin.route'
import loadScript from './utils/loadScript'
import loadLink from './utils/loadLink'
import Utils from './utils'
import { CUSTOMER_PATH, ADMIN_PATH, LOADING_LARGE_SIZE } from './utils/constant'

import LandingPage from './components/common/LandingPage/LandingPage.container'
import LoginPage from './components/common/LoginPage/LoginPage.container'
import RegisterPage from './components/common/RegisterPage/RegisterPage.container'
import NotFound404 from './components/common/NotFound404/NotFound404.component'
import LoadingIcon from './components/common/LoadingIcon/LoadingIcon.component'
import ForgetPasswordPage from './components/common/ForgetPassword/ForgetPassword.container'
import ResetPasswordPage from './components/common/ResetPassword/ResetPassword.container'
import './App.css'

const App = ({ currentUser, updateCurrentUserOnAuthenticate }) => {
  const [isCssLoaded, setIsCssLoaded] = useState(null)
  const [isUser, setIsUser] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function loadAllLibraries() {
      const currentPath = window.location.pathname
      const isUserRole = (currentUser && Utils.isUser(currentUser.roles)) || false
      const isAdminRole = (currentUser && Utils.isAdmin(currentUser.roles)) || false
      const invalidUser = !isUserRole && !isAdminRole
      setIsUser(isUserRole)
      setIsAdmin(isAdminRole)

      if (!currentUser || invalidUser) {
        const isLandingPage =
          !['/login', '/register', '/forget-password'].includes(currentPath) && !currentPath.includes('/reset-password')
        // load bootstrap css
        let link = await loadLink(
          `${process.env.PUBLIC_URL}/assets/css/customer/bootstrap.min.css`,
          'customer-bootstrap.min.css',
          'on'
        )
        console.debug(`${link.id} is loaded`)
        // Load resources for landing page
        if (isLandingPage) {
          // load customer css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/color/default.css`,
            'customer-default.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          // load customer css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/owl-carousel/owl.carousel.min.css`,
            'customer-owl.carousel.min.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          // load customer css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/style-2.css`,
            'customer-style-2.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          setIsCssLoaded(true)
        } else {
          // load customer css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`,
            'customer-style-1.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          setIsCssLoaded(true)
        }
        // load bootstrap min js
        let script = await loadScript(
          `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
          'customer-bootstrap.min.js',
          'on'
        )
        console.debug(`${script.id} is loaded`)
        if (isLandingPage) {
          // load script
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/particles/particles.min.js`,
            'customer-particles.min.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
          // load script
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/owl-carousel/owl.carousel.min.js`,
            'customer-owl.carousel.min.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
          // load script
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/particles/particles-app.js`,
            'customer-particles-app.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
          // load customer js
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/custom.js`,
            'customer-custom.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
        }
      }

      if (currentUser) {
        if (isUserRole) {
          // load bootstrap css
          let link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/bootstrap.min.css`,
            'customer-bootstrap.min.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          // load icons css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/themify-icons/themify-icons.css`,
            'customer-themify-icons.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          // load bundle css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/vendor.bundlea5f5.css?ver=102`,
            'customer-vendor.bundlea5f5.css?ver=102',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          // load customer style css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`,
            'customer-style-1.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          // load style mail css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/style-emaila5f5.css`,
            'customer-style-emaila5f5.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          // load quill editor css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/quill-editor.css`,
            'customer-quill-editor.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          setIsCssLoaded(true)
          // load bootstrap js
          let script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
            'customer-bootstrap.min.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
          // load clipboard js
          script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/all/clipboard.js`, 'all-clipboard.js', 'on')
          console.debug(`${script.id} is loaded`)
          // load script because of ClipboardJS
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`,
            'customer-scripta5f5.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
        }

        if (isAdminRole) {
          // load bootstrap css
          let link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/admin/bootstrap.min.css`,
            'admin-bootstrap.min.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          // load table css
          link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/admin/react-table.css`, 'react-table.css', 'on')
          console.debug(`${link.id} is loaded`)
          // load turbo css
          link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/admin/turbo.css`, 'admin-turbo.css', 'on')
          console.debug(`${link.id} is loaded`)
          // load icon css
          link = await loadLink(
            `${process.env.PUBLIC_URL}/assets/css/customer/themify-icons/themify-icons.css`,
            'customer-themify-icons.css',
            'on'
          )
          console.debug(`${link.id} is loaded`)
          setIsCssLoaded(true)
          // load scrollbar js
          let script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/vendors/perfect-scrollbar.jquery.min.js`,
            'admin-perfect-scrollbar.jquery.min.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
          // load bootstrap minjs
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/vendors/bootstrap.min.js`,
            'admin-bootstrap.min.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
          // load clipboard js
          script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/all/clipboard.js`, 'all-clipboard.js', 'on')
          console.debug(`${script.id} is loaded`)
          // load turbo js
          script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/admin/turbo.js`, 'admin-turbo.js', 'on')
          console.debug(`${script.id} is loaded`)
          // load script because of ClipboardJS
          script = await loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`,
            'customer-scripta5f5.js',
            'on'
          )
          console.debug(`${script.id} is loaded`)
        }
      }
    }

    async function loadJsFiles(isLoadJsFiles) {
      const action = isLoadJsFiles ? 'on' : 'off'
      const status = isLoadJsFiles ? 'loaded' : 'unloaded'
      // load bootstrap js
      let script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
        'customer-bootstrap.min.js',
        action
      )
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/particles/particles.min.js`,
        'customer-particles.min.js',
        action
      )
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/owl-carousel/owl.carousel.min.js`,
        'customer-owl.carousel.min.js',
        action
      )
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/customer/custom.js`, 'customer-custom.js', action)
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/particles/particles-app.js`,
        'customer-particles-app.js',
        action
      )
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/all/clipboard.js`, 'all-clipboard.js', action)
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`,
        'customer-scripta5f5.js',
        action
      )
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/vendors/perfect-scrollbar.jquery.min.js`,
        'admin-perfect-scrollbar.jquery.min.js',
        action
      )
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(
        `${process.env.PUBLIC_URL}/assets/vendors/bootstrap.min.js`,
        'admin-bootstrap.min.js',
        action
      )
      console.debug(`${script.id} is ${status}`)

      script = await loadScript(`${process.env.PUBLIC_URL}/assets/js/admin/turbo.js`, 'admin-turbo.js', action)
      console.debug(`${script.id} is ${status}`)

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
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/color/default.css`,
        'customer-default.css',
        action
      )
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/owl-carousel/owl.carousel.min.css`,
        'customer-owl.carousel.min.css',
        action
      )
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`, 'customer-style-1.css', action)
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/themify-icons/themify-icons.css`,
        'customer-themify-icons.css',
        action
      )
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/vendor.bundlea5f5.css?ver=102`,
        'customer-vendor.bundlea5f5.css?ver=102',
        action
      )
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/style-emaila5f5.css`,
        'customer-style-emaila5f5.css',
        action
      )
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/quill-editor.css`,
        'customer-quill-editor.css',
        action
      )
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/customer/style-2.css`, 'customer-style-2.css', action)
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/admin/bootstrap.min.css`,
        'admin-bootstrap.min.css',
        action
      )
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(
        `${process.env.PUBLIC_URL}/assets/css/admin/react-table.css`,
        'admin-react-table.css',
        action
      )
      console.debug(`${link.id} is ${status}`)

      link = await loadLink(`${process.env.PUBLIC_URL}/assets/css/admin/turbo.css`, 'admin-turbo.css', action)
      console.debug(`${link.id} is ${status}`)

      loadJsFiles(false)
    }

    setIsUser(false)
    setIsAdmin(false)
    if (updateCurrentUserOnAuthenticate.isLoading === false) {
      if ([null, false].includes(updateCurrentUserOnAuthenticate.isSuccess)) {
        // if reload page
        setIsCssLoaded(false)
        loadCssFiles(false)
      } else if (updateCurrentUserOnAuthenticate.isSuccess === true && currentUser) {
        // if update current user
        const isUserRole = Utils.isUser(currentUser.roles)
        setIsUser(isUserRole)
      }
    }
  }, [currentUser, updateCurrentUserOnAuthenticate])

  return (
    <>
      {!isCssLoaded && (
        <div className="app-loading">
          <LoadingIcon size={LOADING_LARGE_SIZE} />
        </div>
      )}
      {isCssLoaded && (
        <Switch>
          <Route path="/404">
            <NotFound404 />
          </Route>
          <Route path={CUSTOMER_PATH} render={() => <RouteCustomer currentUser={currentUser} />} />
          <Route path={ADMIN_PATH} render={() => <RouteAdmin currentUser={currentUser} />} />

          {currentUser && (isUser || isAdmin) && (
            <Switch>
              <Route path="/*">
                {isUser && <Redirect to={CUSTOMER_PATH} />}
                {isAdmin && <Redirect to={ADMIN_PATH} />}
              </Route>
            </Switch>
          )}

          {((currentUser && !isUser && !isAdmin) || !currentUser) && (
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
              <Route path="/forget-password">
                <ForgetPasswordPage />
              </Route>
              <Route path="/reset-password/:emailToken">
                <ResetPasswordPage />
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
  updateCurrentUserOnAuthenticate: state.user.updateCurrentUserOnAuthenticate,
})

export default connect(mapStateToProps)(App)
