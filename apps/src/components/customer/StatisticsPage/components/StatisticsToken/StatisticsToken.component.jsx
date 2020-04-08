/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ReportUtils from 'utils/report.util'
import StatisticsTemplate from '../StatisticsTemplate/StatisticsTemplate.component'

const StatisticsToken = ({
  currentUser,
  chartOptions,
  getUserTokenListObj,
  getStatisticsBytokenIdObj,
  getUserTokens,
  getStatisticsById,
}) => {
  const [tokenList, setTokenList] = useState([])
  const placeHolderSelectId = {
    found: 'Chọn token',
    notFound: 'Không tìm thấy token',
  }

  useEffect(() => {
    if (currentUser._id) {
      getUserTokens({ userId: currentUser._id })
    }
  }, [currentUser._id, getUserTokens])

  useEffect(() => {
    if (getUserTokenListObj.userTokenList.length > 0) {
      const tokens = getUserTokenListObj.userTokenList.map(token => {
        return {
          ...token,
          display: token._id,
        }
      })
      setTokenList(tokens)
    }
  }, [getUserTokenListObj])

  return (
    <div>
      {currentUser._id && (
        <StatisticsTemplate
          chartOptions={chartOptions}
          statisticsType={ReportUtils.STATISTICS_TYPE.TOKEN}
          data={tokenList}
          placeHolderSelectId={placeHolderSelectId}
          getStatisticsByIdObj={getStatisticsBytokenIdObj}
          getStatisticsById={getStatisticsById}
        />
      )}
    </div>
  )
}

export default StatisticsToken
