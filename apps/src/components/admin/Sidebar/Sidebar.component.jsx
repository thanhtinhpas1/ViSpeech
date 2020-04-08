/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { JWT_TOKEN, ADMIN_PATH } from 'utils/constant'
import STORAGE from 'utils/storage'

const Sidebar = ({ currentUser, onAuthenticate }) => {
  useEffect(() => {
    const token = STORAGE.getPreferences(JWT_TOKEN)
    if ((!currentUser && token) || !token) onAuthenticate(token)
  }, [currentUser, onAuthenticate])

  return (
    <div className="sidebar">
      <div className="logo">
        <a href="/" className="simple-text">
          ViSpeech Admin
        </a>
      </div>
      <div className="logo logo-mini">
        <a href="/" className="simple-text">
          T
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className="active">
            <a href="/">
              <i className="material-icons">dashboard</i>
              <p>Trang chủ</p>
            </a>
          </li>
          <li>
            <a data-toggle="collapse" href="#layouts" className="collapsed" aria-expanded="false">
              <i className="zmdi zmdi-accounts" />
              <p>
                Khách hàng
                <b className="caret" />
              </p>
            </a>
            <div className="collapse" id="layouts" aria-expanded="false" style={{ height: '0px' }}>
              <ul className="nav">
                <li>
                  <a href={`${ADMIN_PATH}/users`}>Danh sách</a>
                </li>
                <li>
                  <a href={`${ADMIN_PATH}/create-user`}>Thêm mới</a>
                </li>
                <li>
                  <a href="layouts/horizontal-menu.html">Horizontal Menu</a>
                </li>
                <li>
                  <a href="layouts/rtl-layout.html">RTL</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="active">
            <a href={`${ADMIN_PATH}/reports`}>
              <i className="zmdi zmdi-chart" />
              <p>Thống kê</p>
            </a>
          </li>
          <li>
            <a href="widgets/widgets.html">
              <i className="material-icons">apps</i>
              <p>Widgets</p>
            </a>
          </li>
          <li>
            <a data-toggle="collapse" href="#charts" className="collapsed" aria-expanded="false">
              <i className="material-icons">equalizer</i>
              <p>
                Charts
                <b className="caret" />
              </p>
            </a>
            <div className="collapse" id="charts" aria-expanded="false" style={{ height: '0px' }}>
              <ul className="nav">
                <li>
                  <a href="charts/chart-js-charts.html">ChartJS</a>
                </li>
                <li>
                  <a href="charts/flot-charts.html">Flot</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              data-toggle="collapse"
              href="#ui-elements"
              className="collapsed"
              aria-expanded="false"
            >
              <i className="material-icons">extension</i>
              <p>
                UI Elements
                <b className="caret" />
              </p>
            </a>
            <div
              className="collapse"
              id="ui-elements"
              aria-expanded="false"
              style={{ height: '0px' }}
            >
              <ul className="nav">
                <li>
                  <a href="ui/accordions.html">Accordions</a>
                </li>
                <li>
                  <a href="ui/alerts.html">Alerts</a>
                </li>
                <li>
                  <a href="ui/buttons.html">Buttons</a>
                </li>
                <li>
                  <a href="ui/colors.html">Colors</a>
                </li>
                <li>
                  <a href="ui/grid.html">Grid System</a>
                </li>
                <li>
                  <a href="ui/icons.html">Icons</a>
                </li>
                <li>
                  <a href="ui/modals.html">Modals</a>
                </li>
                <li>
                  <a href="ui/notifications.html">Notifications</a>
                </li>
                <li>
                  <a href="ui/tabs.html">Tabs</a>
                </li>
                <li>
                  <a href="ui/typography.html">Typography</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a data-toggle="collapse" href="#forms" className="collapsed" aria-expanded="false">
              <i className="material-icons">border_color</i>
              <p>
                Forms
                <b className="caret" />
              </p>
            </a>
            <div className="collapse" id="forms" aria-expanded="false" style={{ height: '0px' }}>
              <ul className="nav">
                <li>
                  <a href="forms/basic-elements.html">Basic Elements</a>
                </li>
                <li>
                  <a href="forms/advanced-elements.html">Advanced Elements</a>
                </li>
                <li>
                  <a href="forms/form-validation.html">Form Validation</a>
                </li>
                <li>
                  <a href="forms/form-wizard.html">Form Wizard</a>
                </li>
                <li>
                  <a href="forms/sample-forms.html">Sample Forms</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a data-toggle="collapse" href="#tables" className="collapsed" aria-expanded="false">
              <i className="material-icons">grid_on</i>
              <p>
                Tables
                <b className="caret" />
              </p>
            </a>
            <div className="collapse" id="tables" aria-expanded="false" style={{ height: '0px' }}>
              <ul className="nav">
                <li>
                  <a href="tables/tables.html">Simple Tables</a>
                </li>
                <li>
                  <a href="tables/data-tables.html">Data Tables</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a data-toggle="collapse" href="#pages" className="collapsed" aria-expanded="false">
              <i className="material-icons">content_copy</i>
              <p>
                Pages
                <b className="caret" />
              </p>
            </a>
            <div className="collapse" id="pages" aria-expanded="false" style={{ height: '0px' }}>
              <ul className="nav">
                <li>
                  <a href="sample-pages/template.html">Template</a>
                </li>
                <li>
                  <a href="sample-pages/user-profile.html">User Profile</a>
                </li>
                <li>
                  <a href="sample-pages/login.html">Login</a>
                </li>
                <li>
                  <a href="sample-pages/signup.html">Sign Up</a>
                </li>
                <li>
                  <a href="sample-pages/pricing-table.html">Pricing Table</a>
                </li>
                <li>
                  <a href="sample-pages/invoice.html">Invoice</a>
                </li>
                <li>
                  <a href="sample-pages/help-faqs.html">Help &amp; FAQs</a>
                </li>
                <li>
                  <a href="sample-pages/timeline.html">Timeline</a>
                </li>
                <li>
                  <a href="sample-pages/404.html">404</a>
                </li>
                <li>
                  <a href="sample-pages/500.html">500</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="calendar/calendar.html">
              <i className="material-icons">date_range</i>
              <p>
                Calendar
                <b className="caret" />
              </p>
            </a>
          </li>
          <li>
            <a href="docs/documentation.html">
              <i className="material-icons">library_books</i>
              <p>Documentation</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
