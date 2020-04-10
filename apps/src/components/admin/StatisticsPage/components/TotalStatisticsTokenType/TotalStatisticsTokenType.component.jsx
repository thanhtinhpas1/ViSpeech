/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import ReportUtils from 'utils/report.util'
import TotalStatisticsTemplate from '../TotalStatisticsTemplate/TotalStatisticsTemplate.component'

const TotalStatisticsTokenType = ({
  currentUser,
  chartOptions,
  getAdminTotalStatisticsBytokenTypeObj,
  getAdminTotalStatistics,
}) => {
  const [adminTotalStatistics, setAdminTotalStatistics] = useState({ data: [] })

  useEffect(() => {
    if (getAdminTotalStatisticsBytokenTypeObj.data.length > 0) {
      const formatStatisticsData = getAdminTotalStatisticsBytokenTypeObj.data.map(item => {
        return {
          ...item,
          data: {
            ...item.data,
            display: `${item.data.price}$ / ${item.data.minutes} phút`,
          },
        }
      })
      setAdminTotalStatistics({
        ...getAdminTotalStatisticsBytokenTypeObj,
        data: formatStatisticsData,
      })
    }
  }, [getAdminTotalStatisticsBytokenTypeObj])

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
          statisticsType={ReportUtils.STATISTICS_TYPE.TOKEN_TYPE}
          getTotalStatisticsObj={adminTotalStatistics}
          getTotalStatistics={getTotalStatistics}
        />
      )}
    </div>
  )
}

export default TotalStatisticsTokenType
