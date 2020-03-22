/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Sidebar from './Sidebar/Sidebar.container'
import Navbar from './Navbar/Navbar.component'
import Footer from './Footer/Footer.container'

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="content">
            <div className="container-fluid">
              <div>{children}</div>
            </div>
          </div>
          <Footer />
        </div>
        {/* <div className="fixed-plugin">
          <div className="dropdown show-dropdown">
            <a href="#" data-toggle="dropdown" aria-expanded="false">
              <i className="fa fa-cog fa-2x"> </i>
            </a>
            <ul className="dropdown-menu">
              <li className="header-title"> Topbar Filters</li>
              <li className="adjustments-line">
                <a href="#" className="switch-trigger active-color">
                  <div className="badge-colors text-center">
                    <span className="badge filter badge-default" data-color="default" />
                    <span className="badge filter badge-blue" data-color="blue" />
                    <span className="badge filter badge-green" data-color="green" />
                    <span className="badge filter badge-yellow" data-color="yellow" />
                    <span className="badge filter badge-red" data-color="red" />
                    <span className="badge filter badge-white" data-color="white" />
                  </div>
                  <div className="clearfix" />
                </a>
              </li>
              <li className="header-title">Sidebar Background</li>
              <li className="adjustments-line">
                <a href="#" className="switch-trigger background-color">
                  <div className="text-center">
                    <span className="badge filter badge-gray" data-color="gray" />
                    <span className="badge filter badge-white" data-color="default" />
                  </div>
                  <div className="clearfix" />
                </a>
              </li>
              <li className="adjustments-line">
                <a href="#" className="switch-trigger">
                  <p>Sidebar Mini</p>
                  <div className="togglebutton switch-sidebar-mini">
                    <label>
                      <input type="checkbox" unchecked />
                    </label>
                  </div>
                  <div className="clearfix" />
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default AdminLayout
