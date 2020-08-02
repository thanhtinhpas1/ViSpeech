/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ReportUtils from '../../../../../utils/report.util'
import StatisticsTemplate from '../StatisticsTemplate/StatisticsTemplate.component'

const StatisticsUser = ({ chartOptions, getUserListObj, getStatisticsByuserIdObj, getUserList, getStatisticsById }) => {
  const [userList, setUserList] = useState([])
  const placeHolderSelectId = {
    found: 'Chọn người dùng',
    notFound: 'Không tìm thấy người dùng',
  }

  useEffect(() => {
    const filters = {
      isActive: ['true'],
    }
    getUserList({ filters })
  }, [getUserList])

  useEffect(() => {
    if (getUserListObj.userList.data.length > 0) {
      const users = getUserListObj.userList.data.map(user => {
        return {
          ...user,
          display: `${user.lastName || ''} ${user.firstName}`,
        }
      })
      setUserList(users)
    }
  }, [getUserListObj])

  return (
    <div>
      <StatisticsTemplate
        chartOptions={chartOptions}
        statisticsType={ReportUtils.STATISTICS_TYPE.USER}
        data={userList}
        placeHolderSelectId={placeHolderSelectId}
        getStatisticsByIdObj={getStatisticsByuserIdObj}
        getStatisticsById={getStatisticsById}
      />
    </div>
  )
}

export default StatisticsUser
