/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ReportUtils from 'utils/report.util'
import StatisticsTemplate from '../StatisticsTemplate/StatisticsTemplate.component'

const StatisticsTokenType = ({
  currentUser,
  chartOptions,
  getTokenTypeListObj,
  getStatisticsBytokenTypeIdObj,
  getTokenTypes,
  getStatisticsById,
}) => {
  const [tokenTypeList, setTokenTypeList] = useState([])
  const placeHolderSelectId = {
    found: 'Chọn loại token',
    notFound: 'Không tìm thấy loại token',
  }

  useEffect(() => {
    getTokenTypes()
  }, [getTokenTypes])

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

  return (
    <div>
      {currentUser._id && (
        <StatisticsTemplate
          chartOptions={chartOptions}
          statisticsType={ReportUtils.STATISTICS_TYPE.TOKEN_TYPE}
          data={tokenTypeList}
          placeHolderSelectId={placeHolderSelectId}
          getStatisticsByIdObj={getStatisticsBytokenTypeIdObj}
          getStatisticsById={getStatisticsById}
        />
      )}
    </div>
  )
}

export default StatisticsTokenType
