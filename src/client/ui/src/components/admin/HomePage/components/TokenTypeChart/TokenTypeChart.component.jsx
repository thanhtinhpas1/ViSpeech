/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import { Pie } from '@ant-design/charts'
import ReportUtils from 'utils/report.util'
import Utils from 'utils'
import { MONETARY_UNIT } from 'utils/constant'

const TokenTypeChart = ({ getAdminTotalStatisticsBytokenTypeObj, getAdminTotalStatistics }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const { from, to } = ReportUtils.getPreviousSixMonthsFromNow()
    const queryParams = {
      monthObj: {
        from: {
          data: from.month,
          year: from.year,
        },
        to: {
          data: to.month,
          year: to.year,
        },
      },
    }
    getAdminTotalStatistics(ReportUtils.STATISTICS_TYPE.TOKEN_TYPE, ReportUtils.TIME_TYPE.MONTH, queryParams)
  }, [getAdminTotalStatistics])

  useEffect(() => {
    if (
      getAdminTotalStatisticsBytokenTypeObj.isLoading === false &&
      getAdminTotalStatisticsBytokenTypeObj.isSuccess === true
    ) {
      const chartData = getAdminTotalStatisticsBytokenTypeObj.data.map(item => {
        return {
          value: Math.round((item.usedMinutes + Number.EPSILON) * 100) / 100,
          type: `${Utils.formatPrice(item.data.price)} ${MONETARY_UNIT}/${item.data.minutes} phút`,
        }
      })
      setData(chartData)
    }
  }, [getAdminTotalStatisticsBytokenTypeObj])

  const onRefreshData = () => {
    const { from, to } = ReportUtils.getPreviousSixMonthsFromNow()
    const queryParams = {
      monthObj: {
        from: {
          data: from.month,
          year: from.year,
        },
        to: {
          data: to.month,
          year: to.year,
        },
      },
    }
    getAdminTotalStatistics(ReportUtils.STATISTICS_TYPE.TOKEN_TYPE, ReportUtils.TIME_TYPE.MONTH, queryParams)
  }

  const DEFAULT_STYLE = {
    fill: 'rgba(0, 0, 0, 0.9)',
    stroke: '#ffffff',
    lineWidth: 2,
    fontSize: 15,
  }

  const config = {
    title: {
      visible: false,
    },
    description: {
      visible: false,
    },
    padding: 'auto',
    forceFit: true,
    data,
    radius: 0.8,
    angleField: 'value',
    colorField: 'type',
    meta: {
      value: {
        formatter: v => {
          return `${v} phút`
        },
      },
      type: {},
    },
    label: {
      visible: true,
      type: 'outer',
      offset: 40,
      style: DEFAULT_STYLE,
    },
    legend: {
      position: 'bottom-center',
      text: {
        style: DEFAULT_STYLE,
      },
    },
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">Biểu đồ</h4>
            <button type="button" onClick={onRefreshData} className="btn btn-just-icon btn-simple btn-primary m-0">
              <i className="fas fa-redo" />
            </button>
          </div>
          <div className="card-content">{data.length > 0 && <Pie {...config} />}</div>
        </div>
      </div>
    </div>
  )
}
export default TokenTypeChart
