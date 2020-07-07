/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ReportUtils from 'utils/report.util'
import { MONETARY_UNIT } from 'utils/constant'
import Utils from 'utils'
import TotalStatisticsTemplate from '../TotalStatisticsTemplate/TotalStatisticsTemplate.component'

const TotalStatisticsUserTokenType = ({
  currentUser,
  chartOptions,
  getUserTotalStatisticsBytokenTypeObj,
  getUserTotalStatistics,
}) => {
  const [userTotalStatistics, setUserTotalStatistics] = useState({ data: [] })

  useEffect(() => {
    if (getUserTotalStatisticsBytokenTypeObj.data.length > 0) {
      const formatStatisticsData = getUserTotalStatisticsBytokenTypeObj.data.map(item => {
        return {
          ...item,
          data: {
            ...item.data,
            display: `${Utils.formatPrice(item.data.price)} ${MONETARY_UNIT} / ${item.data.minutes} phút`,
          },
        }
      })
      setUserTotalStatistics({
        ...getUserTotalStatisticsBytokenTypeObj,
        data: formatStatisticsData,
      })
    }
  }, [getUserTotalStatisticsBytokenTypeObj])

  return (
    <div>
      {currentUser._id && (
        <TotalStatisticsTemplate
          userId={currentUser._id}
          chartOptions={chartOptions}
          statisticsType={ReportUtils.STATISTICS_TYPE.TOKEN_TYPE}
          getTotalStatisticsObj={userTotalStatistics}
          getTotalStatistics={getUserTotalStatistics}
        />
      )}
    </div>
  )
}

export default TotalStatisticsUserTokenType
