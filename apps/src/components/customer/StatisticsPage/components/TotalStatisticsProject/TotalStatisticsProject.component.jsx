/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ReportUtils from 'utils/report.util'
import TotalStatisticsTemplate from '../TotalStatisticsTemplate/TotalStatisticsTemplate.component'

const TotalStatisticsProject = ({
  currentUser,
  chartOptions,
  getUserTotalStatisticsByprojectObj,
  getUserTotalStatistics,
}) => {
  const [userTotalStatistics, setUserTotalStatistics] = useState({ data: [] })

  useEffect(() => {
    if (getUserTotalStatisticsByprojectObj.data.length > 0) {
      const formatStatisticsData = getUserTotalStatisticsByprojectObj.data.map(item => {
        return {
          ...item,
          data: {
            ...item.data,
            display: item.data.name,
          },
        }
      })
      setUserTotalStatistics({ ...getUserTotalStatisticsByprojectObj, data: formatStatisticsData })
    }
  }, [getUserTotalStatisticsByprojectObj])

  return (
    <div>
      {currentUser._id && (
        <TotalStatisticsTemplate
          userId={currentUser._id}
          chartOptions={chartOptions}
          statisticsType={ReportUtils.STATISTICS_TYPE.PROJECT}
          getUserTotalStatisticsObj={userTotalStatistics}
          getUserTotalStatistics={getUserTotalStatistics}
        />
      )}
    </div>
  )
}

export default TotalStatisticsProject
