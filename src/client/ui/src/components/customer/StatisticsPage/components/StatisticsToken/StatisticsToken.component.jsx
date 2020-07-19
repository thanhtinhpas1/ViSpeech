/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ReportUtils from 'utils/report.util'
import { FREE_TOKEN } from 'utils/constant'
import StatisticsTemplate from '../StatisticsTemplate/StatisticsTemplate.component'

const StatisticsToken = ({
                           currentUser,
                           chartOptions,
                           getUserTokenListObj,
                           getStatisticsBytokenIdObj,
                           getUserTokens,
                           getStatisticsById,
                         }) => {
  const [ tokenList, setTokenList ] = useState([])
  const placeHolderSelectId = {
    found: 'Chọn API key',
    notFound: 'Không tìm thấy API key',
  }

  useEffect(() => {
    if (currentUser._id) {
      getUserTokens({ userId: currentUser._id })
    }
  }, [ currentUser._id, getUserTokens ])

  useEffect(() => {
    if (getUserTokenListObj.userTokenList.data.length > 0) {
      const tokens = getUserTokenListObj.userTokenList.data
        .filter(token => token.isValid === true)
        .map(token => {
          return {
            ...token,
            display: token.name.includes(FREE_TOKEN) ? token.name : `${ token.projectName } - ${ token.name }`,
          }
        })
      setTokenList(tokens)
    }
  }, [ getUserTokenListObj ])

  return (
    <div>
      { currentUser._id && (
        <StatisticsTemplate
          chartOptions={ chartOptions }
          statisticsType={ ReportUtils.STATISTICS_TYPE.TOKEN }
          data={ tokenList }
          placeHolderSelectId={ placeHolderSelectId }
          getStatisticsByIdObj={ getStatisticsBytokenIdObj }
          getStatisticsById={ getStatisticsById }
        />
      ) }
    </div>
  )
}

export default StatisticsToken
