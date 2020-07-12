import React, { useEffect } from 'react'
import { DEFAULT_PAGINATION, ADMIN_PATH } from 'utils/constant'
import TokenSaleGraph from '../TokenSaleGraph/TokenSaleGraph.component'

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
    getUserList({ pagination: DEFAULT_PAGINATION.SIZE_5 })
    getTokenList({ pagination: DEFAULT_PAGINATION.SIZE_5 })
    getOrderList({ pagination: DEFAULT_PAGINATION.SIZE_MAX_INT })
    getProjectList({ pagination: DEFAULT_PAGINATION.SIZE_5 })
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
                <strong>Tổng số khách hàng</strong>
              </p>
              <h3 className="card-title">{getUserListObj?.userList.count ?? 0}</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <a href={`${ADMIN_PATH}/users`}>Xem danh sách</a>
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
                <strong>Tổng số API key</strong>
              </p>
              <h3 className="card-title">{getTokenListObj?.tokenList?.count ?? 0}</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <a href={`${ADMIN_PATH}/tokens`}>Xem danh sách</a>
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
                <a href={`${ADMIN_PATH}/projects`}>Xem danh sách</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TokenSaleGraph orderListObj={getOrderListObj} />
    </>
  )
}

export default HomePage
