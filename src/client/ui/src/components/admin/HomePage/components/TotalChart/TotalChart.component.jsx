/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { ColumnLine } from '@ant-design/charts'
import ReportUtils from 'utils/report.util'

const TotalChart = ({ getTotalStatisticsObj, getTotalStatistics }) => {
  const [ data, setData ] = useState([])
  const USED_MINUTES = 'Số phút đã dùng'
  const TOTAL_REQUESTS = 'Số lần sử dụng dịch vụ'
  const TIME = 'time'

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
    getTotalStatistics(ReportUtils.TIME_TYPE.MONTH, queryParams)
  }, [ getTotalStatistics ])

  useEffect(() => {
    if (getTotalStatisticsObj.isLoading === false && getTotalStatisticsObj.isSuccess === true) {
      const chartData = getTotalStatisticsObj.data.map(data => {
        const obj = {}
        obj[USED_MINUTES] = data.usedMinutes
        obj[TOTAL_REQUESTS] = data.totalRequests
        obj[TIME] = `${ parseInt(data.month) + 1 }/${ data.year }`
        return obj
      })
      setData(chartData)
    }
  }, [ getTotalStatisticsObj ])

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
    getTotalStatistics(ReportUtils.TIME_TYPE.MONTH, queryParams)
  }

  const DEFAULT_STYLE = {
    fill: 'rgba(0, 0, 0, 0.9)',
    stroke: '#ffffff',
    lineWidth: 2,
    fontSize: 15,
  }

  const metaObj = {}
  metaObj[USED_MINUTES] = {
    formatter: v => {
      return `${ v } phút`
    },
    style: DEFAULT_STYLE,
  }
  metaObj[TOTAL_REQUESTS] = {
    formatter: v => {
      return `${ v } lần`
    },
    style: DEFAULT_STYLE,
  }
  metaObj[TIME] = {
    alias: '6 tháng gần đây',
    style: DEFAULT_STYLE,
  }

  const config = {
    title: {
      visible: false,
    },
    description: {
      visible: false,
    },
    data: [ data, data ],
    xField: TIME,
    yField: [ USED_MINUTES, TOTAL_REQUESTS ],
    xAxis: {
      label: { autoHide: false, style: DEFAULT_STYLE },
      title: { style: DEFAULT_STYLE },
    },
    yAxis: {},
    meta: { ...metaObj },
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">Biểu đồ</h4>
            <button type="button" onClick={ onRefreshData } className="btn btn-just-icon btn-simple btn-primary m-0">
              <i className="fas fa-redo"/>
            </button>
          </div>
          <div className="card-content">
            <ColumnLine forceFit { ...config } />
          </div>
        </div>
      </div>
    </div>
  )
}
export default TotalChart
