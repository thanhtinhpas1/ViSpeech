import React, { useEffect } from 'react'
import { ADMIN_PATH, DEFAULT_PAGINATION } from 'utils/constant'
import MonitorBeatRateChart from './components/MonitorBeatRateChart/MonitorBeatRateChart.container'
import MonitorBeatTimeChart from './components/MonitorBeatTimeChart/MonitorBeatTimeChart.container'
import TotalChart from './components/TotalChart/TotalChart.container'
import TokenTypeChart from './components/TokenTypeChart/TokenTypeChart.container'

const HomePage = ({
                    getOrderListObj,
                    getOrderList,
                    getUserList,
                    getUserListObj,
                    getTokenListObj,
                    getTokenList,
                    getProjectListObj,
                    getProjectList,
                  }) => {
  useEffect(() => {
    getUserList({ pagination: DEFAULT_PAGINATION.SIZE_TOTAL_COUNT })
    getTokenList({ pagination: DEFAULT_PAGINATION.SIZE_TOTAL_COUNT })
    getOrderList({ pagination: DEFAULT_PAGINATION.SIZE_TOTAL_COUNT })
    getProjectList({ pagination: DEFAULT_PAGINATION.SIZE_TOTAL_COUNT })
  }, [ getUserList, getTokenList, getOrderList, getProjectList ])

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-warning">
                <i className="zmdi zmdi-account"/>
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Tổng tài khoản</strong>
              </p>
              <h3 className="card-title">{ getUserListObj?.userList.count ?? 0 }</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <a href={ `${ ADMIN_PATH }/users` }>Xem danh sách</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-rose">
                <i className="zmdi zmdi-key"/>
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Tổng API key</strong>
              </p>
              <h3 className="card-title">{ getTokenListObj?.tokenList?.count ?? 0 }</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <a href={ `${ ADMIN_PATH }/tokens` }>Xem danh sách</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-success">
                <i className="zmdi zmdi-money"/>
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Tổng giao dịch</strong>
              </p>
              <h3 className="card-title">{ getOrderListObj.orderList?.count || 0 }</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <a href={ `${ ADMIN_PATH }/orders` }>Xem chi tiết</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-info">
                <i className="zmdi zmdi-badge-check"/>
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Tổng số dự án</strong>
              </p>
              <h3 className="card-title">{ getProjectListObj?.projectList?.count ?? 0 }</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <a href={ `${ ADMIN_PATH }/projects` }>Xem danh sách</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <MonitorBeatRateChart/>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <MonitorBeatTimeChart/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-7 col-md-12 col-sm-12">
          <TotalChart/>
        </div>
        <div className="col-lg-5 col-md-12 col-sm-12">
          <TokenTypeChart/>
        </div>
      </div>
    </>
  )
}

export default HomePage
