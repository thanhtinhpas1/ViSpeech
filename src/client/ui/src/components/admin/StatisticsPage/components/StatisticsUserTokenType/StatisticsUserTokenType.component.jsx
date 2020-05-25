/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import ReportUtils from 'utils/report.util'
import StatisticsTemplate from '../StatisticsTemplate/StatisticsTemplate.component'

const StatisticsUserTokenType = ({
  currentUser,
  chartOptions,
  getTokenTypeListObj,
  getUserTokenTypeStatisticsObj,
  getTokenTypes,
  getUserTokenTypeStatistics,
}) => {
  const [tokenTypeList, setTokenTypeList] = useState([])
  const [userId, setUserId] = useState('')
  const placeHolderSelectId = {
    found: 'Chọn loại token',
    notFound: 'Không tìm thấy loại token',
  }

  useEffect(() => {
    getTokenTypes()
  }, [getTokenTypes])

  useEffect(() => {
    if (currentUser._id) {
      setUserId(currentUser._id)
    }
  }, [currentUser._id])

  useEffect(() => {
    if (getTokenTypeListObj.tokenTypeList.length > 0) {
      const tokens = getTokenTypeListObj.tokenTypeList.map(tokenType => {
        return {
          ...tokenType,
          display: `${tokenType.price}$ / ${tokenType.minutes} phút`,
        }
      })
      setTokenTypeList(tokens)
    }
  }, [getTokenTypeListObj])

  const getStatisticsById = useCallback(
    (id, statisticsType, timeType, queryParams) => {
      if (userId) {
        getUserTokenTypeStatistics(id, userId, timeType, queryParams)
      }
    },
    [userId, getUserTokenTypeStatistics]
  )

  return (
    <div>
      {currentUser._id && (
        <StatisticsTemplate
          chartOptions={chartOptions}
          statisticsType={ReportUtils.STATISTICS_TYPE.USER_TOKEN_TYPE}
          data={tokenTypeList}
          placeHolderSelectId={placeHolderSelectId}
          getStatisticsByIdObj={getUserTokenTypeStatisticsObj}
          getStatisticsById={getStatisticsById}
        />
      )}
    </div>
  )
}

export default StatisticsUserTokenType
