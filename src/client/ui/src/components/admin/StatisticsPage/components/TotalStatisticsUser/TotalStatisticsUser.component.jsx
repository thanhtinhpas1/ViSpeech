/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import ReportUtils from 'utils/report.util'
import TotalStatisticsTemplate from '../TotalStatisticsTemplate/TotalStatisticsTemplate.component'

const TotalStatisticsUser = ({
  currentUser,
  chartOptions,
  getAdminTotalStatisticsByuserObj,
  getAdminTotalStatistics,
}) => {
  const [adminTotalStatistics, setAdminTotalStatistics] = useState({ data: [] })

  useEffect(() => {
    if (getAdminTotalStatisticsByuserObj.data.length > 0) {
      const formatStatisticsData = getAdminTotalStatisticsByuserObj.data.map(item => {
        return {
          ...item,
          data: {
            ...item.data,
            display: `${item.data.lastName} ${item.data.firstName} (${item.data.username})`,
          },
        }
      })
      setAdminTotalStatistics({
        ...getAdminTotalStatisticsByuserObj,
        data: formatStatisticsData,
      })
    }
  }, [getAdminTotalStatisticsByuserObj])

  const getTotalStatistics = useCallback(
    (userId, statisticsType, timeType, queryParams) => {
      getAdminTotalStatistics(statisticsType, timeType, queryParams)
    },
    [getAdminTotalStatistics]
  )

  return (
    <div>
      {currentUser._id && (
        <TotalStatisticsTemplate
          userId={currentUser._id}
          chartOptions={chartOptions}
          statisticsType={ReportUtils.STATISTICS_TYPE.USER}
          getTotalStatisticsObj={adminTotalStatistics}
          getTotalStatistics={getTotalStatistics}
        />
      )}
    </div>
  )
}

export default TotalStatisticsUser
