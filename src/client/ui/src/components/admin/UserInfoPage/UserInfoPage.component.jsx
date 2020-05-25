/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { Tabs } from 'antd'
import { ADMIN_PATH } from 'utils/constant'
import InfoTab from './components/InfoTab/InfoTab.container'
import TransactionsTab from './components/TransactionsTab/TransactionsTab.container'
import ProjectsTab from './components/ProjectsTab/ProjectsTab.container'

const { TabPane } = Tabs

const UserInfoPage = ({ userInfoObj, deleteUserObj, getUserInfo, deleteUser }) => {
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getUserInfo(id)
    }
  }, [id, getUserInfo])

  const onDeleteUser = (e, userId) => {
    deleteUser(userId)
  }

  if (deleteUserObj.isLoading === false && deleteUserObj.isSuccess === true) {
    return <Redirect to={`${ADMIN_PATH}/users`} />
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card" id="profile-main">
          <div className="card-header">
            <h4 className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Thông tin chi tiết khách hàng</span>
              {userInfoObj.isLoading === false && userInfoObj.isSuccess === true && (
                <button
                  className="btn btn-just-icon btn-simple btn-behance m-0"
                  rel="tooltip"
                  title="Xoá khách hàng"
                  onClick={e => onDeleteUser(e, userInfoObj.user._id)}
                >
                  <i className="zmdi zmdi-delete" />
                </button>
              )}
            </h4>
          </div>
          <div className="card-content">
            <Tabs tabPosition="left" size="large">
              <TabPane tab="Thông tin" key="1">
                <InfoTab userInfoObj={userInfoObj} />
              </TabPane>
              <TabPane tab="Dự án" key="2">
                <ProjectsTab userInfoObj={userInfoObj} />
              </TabPane>
              <TabPane tab="Lịch sử giao dịch" key="3">
                <TransactionsTab userInfoObj={userInfoObj} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoPage
