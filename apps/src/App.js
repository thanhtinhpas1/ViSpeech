/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import RouteCustomer from 'routes/customer.route'
import RouteAdmin from 'routes/admin.route'
import loadScript from 'utils/loadScript'
import loadLink from 'utils/loadLink'
// import ChangePasswordContainer from 'components/common/ChangePassword/ChangePassword.container'
import { connect } from 'react-redux'
import { CUSTOMER_PATH, ADMIN_PATH, ROLES } from 'utils/constant'
// import NotFound404 from 'components/common/NotFound404/NotFound404.component'
// import ErrorPage from 'components/common/ErrorPage/ErrorPage.component'

import LandingPage from 'components/common/LandingPage/LandingPage.container'
import LoginPage from 'components/common/LoginPage/LoginPage.container'
import RegisterPage from 'components/common/RegisterPage/RegisterPage.container'
// import ActiveEmailContainer from 'components/common/ActiveEmail/ActiveEmail.container'
// import ForgetPasswordContainer from 'components/common/ForgetPassword/ForgetPassword.container'
// import ResetPasswordContainer from 'components/common/ResetPassword/ResetPassword.container'
// import RegisterPageContainer from 'components/common/RegisterPage/RegisterPage.container'

const App = ({ currentUser }) => {
  const [isCssLoaded, setIsCssLoaded] = useState(false)

  useEffect(() => {
    // async function unloadAllCssFile() {
    //   await loadLink(
    //     `${process.env.PUBLIC_URL}/assets/css/customer/bootstrap.min.css`,
    //     'customer-bootstrap.min.css',
    //     'off'
    //   )
    //   await loadLink(
    //     `${process.env.PUBLIC_URL}/assets/css/customer/style-2.css`,
    //     'customer-style-2.css',
    //     'off'
    //   )
    //   await loadLink(
    //     `${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`,
    //     'customer-style-1.css',
    //     'off'
    //   )
    //   await loadLink(
    //     `${process.env.PUBLIC_URL}/assets/css/admin/bootstrap.min.css`,
    //     'admin-bootstrap.min.css',
    //     'off'
    //   )
    //   await loadLink(
    //     `${process.env.PUBLIC_URL}/assets/css/admin/turbo.css`,
    //     'admin-turbo.css',
    //     'off'
    //   )
    //   await loadLink(
    //     `${process.env.PUBLIC_URL}/assets/css/admin/material-design-iconic-font/dist/css/material-design-iconic-font.min.css`,
    //     'admin-material-design-iconic-font.min.css',
    //     'off'
    //   )
    // }
    const currentPath = window.location.pathname
    if (!currentUser) {
      // loadLink
      loadLink(
        `${process.env.PUBLIC_URL}/assets/css/customer/bootstrap.min.css`,
        'customer-bootstrap.min.css',
        'on'
      )
        .then(link => {
          console.log(`${link.id} is loaded`)
          if (currentPath !== '/login' && currentPath !== '/register') {
            // unload link
            loadLink(
              `${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`,
              'customer-style-1.css',
              'off'
            )
              .then(link1 => {
                console.log(`customer-style-1.css is unloaded`)
                // load link
                loadLink(
                  `${process.env.PUBLIC_URL}/assets/css/customer/style-2.css`,
                  'customer-style-2.css',
                  'on'
                )
                  .then(link2 => {
                    console.log(`${link2.id} is loaded`)
                    setIsCssLoaded(true)
                  })
                  .catch(err => {
                    console.error(err.message)
                  })
              })
              .catch(err => {
                console.error(err.message)
              })
          } else {
            // load link
            loadLink(
              `${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`,
              'customer-style-1.css',
              'on'
            )
              .then(link1 => {
                console.log(`${link1.id} is loaded`)
                setIsCssLoaded(true)
              })
              .catch(err => {
                console.error(err.message)
              })
          }
        })
        .catch(err => {
          console.error(err.message)
        })
      if (isCssLoaded) {
        // load script
        loadScript(
          `${process.env.PUBLIC_URL}/assets/js/customer/bootstrap.min.js`,
          'customer-bootstrap.min.js',
          'on'
        )
          .then(script => {
            console.log(`${script.id} is loaded`)
            if (currentPath !== '/login' && currentPath !== '/register') {
              // load script
              loadScript(
                `${process.env.PUBLIC_URL}/assets/js/customer/custom.js`,
                'customer-custom.js',
                'on'
              )
                .then(script1 => {
                  console.log(`${script1.id} is loaded`)
                })
                .catch(err => {
                  console.error(err.message)
                })
            }
          })
          .catch(err => {
            console.error(err.message)
          })
        if (currentPath !== '/login' && currentPath !== '/register') {
          // load script
          loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/particles/particles-app.js`,
            'customer-particles-app.js',
            'on'
          )
            .then(script => {
              console.log(`${script.id} is loaded`)
            })
            .catch(err => {
              console.error(err.message)
            })
        }
      }
    }

    if (currentUser && Array.isArray(currentUser.roles)) {
      const isCustomer =
        currentUser.roles.findIndex(role => role.name.includes(ROLES.customer)) !== -1
      if (isCustomer) {
        // load link
        loadLink(
          `${process.env.PUBLIC_URL}/assets/css/customer/bootstrap.min.css`,
          'customer-bootstrap.min.css',
          'on'
        )
          .then(link => {
            console.log(`${link.id} is loaded`)
            // load link
            loadLink(
              `${process.env.PUBLIC_URL}/assets/css/customer/style-1.css`,
              'customer-style-1.css',
              'on'
            )
              .then(link1 => {
                console.log(`${link1.id} is loaded`)
                setIsCssLoaded(true)
              })
              .catch(err => {
                console.error(err.message)
              })
          })
          .catch(err => {
            console.error(err.message)
          })
        if (isCssLoaded) {
          // load script
          loadScript(
            `${process.env.PUBLIC_URL}/assets/js/customer/DataTables/jquery.dataTables.min.js`,
            'customer-jquery.dataTables.min.js',
            'on'
          )
            .then(script => {
              console.log(`${script.id} is loaded`)
              // load script
              loadScript(
                `${process.env.PUBLIC_URL}/assets/js/customer/DataTables/dataTables.bootstrap4.min.js`,
                'customer-dataTables.bootstrap4.min.js',
                'on'
              )
                .then(script1 => {
                  console.log(`${script1.id} is loaded`)
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
              console.log(`${script.id} is loaded`)
              // load script
              loadScript(
                `${process.env.PUBLIC_URL}/assets/js/customer/scripta5f5.js`,
                'customer-scripta5f5.js',
                'on'
              )
                .then(script1 => {
                  console.log(`${script1.id} is loaded`)
                })
                .catch(err => {
                  console.error(err.message)
                })
            })
            .catch(err => {
              console.error(err.message)
            })
        }
      } else {
        // load link
        loadLink(
          `${process.env.PUBLIC_URL}/assets/css/admin/bootstrap.min.css`,
          'admin-bootstrap.min.css',
          'on'
        )
          .then(link => {
            console.log(`${link.id} is loaded`)
            // load link
            loadLink(
              `${process.env.PUBLIC_URL}/assets/css/admin/turbo.css`,
              'admin-turbo.css',
              'on'
            )
              .then(link1 => {
                console.log(`${link1.id} is loaded`)
                setIsCssLoaded(true)
              })
              .catch(err => {
                console.error(err.message)
              })
            // load link
            loadLink(
              `${process.env.PUBLIC_URL}/assets/css/admin/material-design-iconic-font/dist/css/material-design-iconic-font.min.css`,
              'admin-material-design-iconic-font.min.css',
              'on'
            )
              .then(link1 => {
                console.log(`${link1.id} is loaded`)
              })
              .catch(err => {
                console.error(err.message)
              })
            // load link
            loadLink(
              `https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons`,
              'admin-fonts.googleapis.com',
              'on'
            )
              .then(link1 => {
                console.log(`${link1.id} is loaded`)
              })
              .catch(err => {
                console.error(err.message)
              })
          })
          .catch(err => {
            console.error(err.message)
          })
        if (isCssLoaded) {
          // load script
          loadScript(
            `${process.env.PUBLIC_URL}/assets/vendors/bootstrap.min.js`,
            'admin-bootstrap.min.js',
            'on'
          )
            .then(script => {
              console.log(`${script.id} is loaded`)
              // load script
              loadScript(
                `${process.env.PUBLIC_URL}/assets/js/admin/turbo.js`,
                'admin-turbo.js',
                'on'
              )
                .then(script1 => {
                  console.log(`${script1.id} is loaded`)
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
            `${process.env.PUBLIC_URL}/assets/vendors/jquery.datatables.js`,
            'admin-jquery.datatables.js',
            'on'
          )
            .then(script => {
              console.log(`${script.id} is loaded`)
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
              console.log(`${script.id} is loaded`)
              // load script
              loadScript(
                `${process.env.PUBLIC_URL}/assets/js/admin/charts/flot-charts.js`,
                'admin-flot-charts.js',
                'on'
              )
                .then(script1 => {
                  console.log(`${script1.id} is loaded`)
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
                  console.log(`${script2.id} is loaded`)
                })
                .catch(err => {
                  console.error(err.message)
                })
            })
            .catch(err => {
              console.error(err.message)
            })
        }
      }
    }
  }, [currentUser, isCssLoaded])

  return (
    <Switch>
      {isCssLoaded && (
        <>
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
        </>
      )}
    </Switch>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App)
