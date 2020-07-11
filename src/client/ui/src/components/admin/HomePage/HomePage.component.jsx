import React, { useEffect } from 'react'
import TokenSaleGraph from '../TokenSaleGraph/TokenSaleGraph.component'

const MAX_INT = 2147483647
const Home = ({
  getOrderListObj,
  getOrderList,
  getUserList,
  userListObj,
  getTokenListObj,
  getTokenList,
  getProjectListObj,
  getProjectList,
}) => {
  useEffect(() => {
    getUserList({ pagination: { current: 1, pageSize: MAX_INT } })
    getTokenList({ pagination: { current: 1, pageSize: MAX_INT } })
    getOrderList({ pagination: { current: 1, pageSize: MAX_INT } })
    getProjectList({ pagination: { current: 1, pageSize: MAX_INT } })
  }, [getUserList, getTokenList, getOrderList, getProjectList])

  useEffect(() => {}, [getOrderList])

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-warning">
                <i className="zmdi zmdi-account" />
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Tổng số Users</strong>
              </p>
              <h3 className="card-title">{userListObj?.userList.count ?? 0}</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons text-info">info</i>
                <a href="/admin/users">Xem báo cáo chi tiết</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-rose">
                <i className="zmdi zmdi-key" />
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Tổng số Key</strong>
              </p>
              <h3 className="card-title">{getTokenListObj?.tokenList?.count ?? 0}</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">local_offer</i>
                <a href="/admin/tokens">Xem chi tiết</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-info">
                <i className="zmdi zmdi-badge-check" />
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Tổng số dự án</strong>
              </p>
              <h3 className="card-title">{getProjectListObj?.projectList?.count ?? 0}</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">update</i>
                <a href="/admin/projects">Xem chi tiết</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TokenSaleGraph orderListObj={getOrderListObj} />
    </>
  )
}

export default Home
