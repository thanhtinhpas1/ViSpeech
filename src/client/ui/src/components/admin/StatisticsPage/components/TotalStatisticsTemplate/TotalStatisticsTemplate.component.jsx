/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { Row, Select, DatePicker, Button, Empty } from 'antd'
import STORAGE from '../../../../../utils/storage'
import ReportUtils from '../../../../../utils/report.util'
import LoadingIcon from '../../../../common/LoadingIcon/LoadingIcon.component'

const { Option } = Select
const { RangePicker } = DatePicker
const {
  TIME_TYPE,
  ONE_DAY_IN_MILLISECONDS,
  RANGE_PICKER_LIMIT,
  getDateNow,
  getPreviousTenDatesFromNow,
  getTotalWeeksOfYear,
  getTotalQuarters,
  getOnlyDate,
} = ReportUtils

const TotalStatisticsTemplate = ({
  userId,
  chartOptions,
  statisticsType,
  getTotalStatisticsObj,
  getTotalStatistics,
}) => {
  // for antd range picker
  const [pickerType, setPickerType] = useState(TIME_TYPE.DATE)
  const [formatRangePicker, setFormatRangePicker] = useState('DD/MM/YYYY')
  const [placeHolderRangePicker, setPlaceHolderRangePicker] = useState(['Ngày bắt đầu', 'Ngày kết thúc'])
  const [valueRangePicker, setValueRangePicker] = useState([getPreviousTenDatesFromNow(), getDateNow()])

  const defaultQuarterData = {
    from: { quarter: 0, year: 2020 },
    to: { quarter: 1, year: 2020 },
  }
  const [quarterData, setQuarterData] = useState(defaultQuarterData)
  const [chartData, setChartData] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    if (userId) {
      const fromDate = getPreviousTenDatesFromNow().valueOf()
      const toDate = getDateNow().valueOf()
      setIsButtonDisabled(false)
      getTotalStatistics(userId, statisticsType, TIME_TYPE.DATE, { fromDate, toDate })
    }
  }, [userId, statisticsType, getTotalStatistics])

  useEffect(() => {
    const { isLoading, isSuccess, data } = getTotalStatisticsObj
    if (isLoading === false && isSuccess === true) {
      const dataChart = []
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(element => {
          dataChart.push({
            display: element.data.display,
            value1: element.usedMinutes,
            value2: element.totalRequests,
          })
        })
      }
      setChartData(dataChart)
    }
  }, [getTotalStatisticsObj])

  useEffect(() => {
    setChartData([])
    setIsButtonDisabled(true)

    const from = valueRangePicker && valueRangePicker[0]
    const to = valueRangePicker && valueRangePicker[1]
    let fromYear = from && parseInt(from.format('YYYY'))
    let toYear = to && parseInt(to.format('YYYY'))

    if (pickerType !== TIME_TYPE.QUARTER && (!from || !to)) {
      return
    }

    if (pickerType === TIME_TYPE.DATE) {
      const fromDate = new Date(getOnlyDate(from))
      const toDate = new Date(getOnlyDate(to))
      const totalDates = toDate.valueOf() - fromDate.valueOf() + ONE_DAY_IN_MILLISECONDS
      if (totalDates <= ONE_DAY_IN_MILLISECONDS * (RANGE_PICKER_LIMIT - 2)) {
        setIsButtonDisabled(false)
      }
    } else if (pickerType === TIME_TYPE.WEEK) {
      const fromWeek = parseInt(from.format('w'))
      const toWeek = parseInt(to.format('w'))

      if (fromWeek && toWeek && fromYear && toYear) {
        let totalWeeks = toWeek - fromWeek + 1
        if (fromYear === toYear && fromWeek < toWeek && totalWeeks <= RANGE_PICKER_LIMIT) {
          setIsButtonDisabled(false)
        }
        if (fromYear + 1 === toYear) {
          const totalWeekOfFromYear = getTotalWeeksOfYear(fromYear)
          totalWeeks = totalWeekOfFromYear - fromWeek + 1 + toWeek
          if (totalWeeks <= RANGE_PICKER_LIMIT) {
            setIsButtonDisabled(false)
          }
        }
      }
    } else if (pickerType === TIME_TYPE.MONTH) {
      const fromMonth = parseInt(from.format('M'))
      const toMonth = parseInt(to.format('M'))

      if (fromMonth != null && toMonth != null && fromYear && toYear) {
        let totalMonths = toMonth - fromMonth + 1
        if (fromYear === toYear && fromMonth < toMonth && totalMonths <= RANGE_PICKER_LIMIT) {
          setIsButtonDisabled(false)
        }
        if (fromYear + 1 === toYear) {
          totalMonths = 11 - fromMonth + 1 + toMonth + 1
          if (totalMonths <= RANGE_PICKER_LIMIT) {
            setIsButtonDisabled(false)
          }
        }
      }
    } else if (pickerType === TIME_TYPE.QUARTER) {
      if (quarterData.from && quarterData.to) {
        const fromQuarter = quarterData.from.quarter
        fromYear = quarterData.from.year
        const toQuarter = quarterData.to.quarter
        toYear = quarterData.to.year
        if (fromQuarter && fromYear && toQuarter && toYear) {
          let totalQuarters = toQuarter - fromQuarter + 1
          if (fromYear === toYear && fromQuarter < toQuarter && totalQuarters <= RANGE_PICKER_LIMIT) {
            setIsButtonDisabled(false)
          }
          if (fromYear !== toYear) {
            totalQuarters = getTotalQuarters(fromQuarter, fromYear, toQuarter, toYear)
            if (totalQuarters <= RANGE_PICKER_LIMIT) {
              setIsButtonDisabled(false)
            }
          }
        }
      }
    } else if (pickerType === TIME_TYPE.YEAR) {
      const totalYears = toYear - fromYear + 1
      if (fromYear < toYear && totalYears <= RANGE_PICKER_LIMIT) {
        setIsButtonDisabled(false)
      }
    }
  }, [valueRangePicker, pickerType, quarterData])

  const getStatistics = (timeType, queryParams) => {
    STORAGE.setPreferences(`'vispeech-admin-total-statistics-${statisticsType}'`, JSON.stringify(queryParams))
    getTotalStatistics(userId, statisticsType, timeType, queryParams)
  }

  const resetData = () => {
    setValueRangePicker([])
    setQuarterData({})
    setChartData([])
    setIsButtonDisabled(true)
  }

  const onChangePickerType = value => {
    setPickerType(value)
    resetData()

    let format = ''
    let placeHolder = []

    if (value === TIME_TYPE.DATE) {
      format = 'DD/MM/YYYY'
      placeHolder = ['Ngày bắt đầu', 'Ngày kết thúc']
    } else if (value === TIME_TYPE.WEEK) {
      format = 'Tuần ww / YYYY'
      placeHolder = ['Tuần bắt đầu', 'Tuần kết thúc']
    } else if (value === TIME_TYPE.MONTH) {
      format = 'MM/YYYY'
      placeHolder = ['Tháng bắt đầu', 'Tháng kết thúc']
    } else if (value === TIME_TYPE.YEAR) {
      format = 'YYYY'
      placeHolder = ['Năm bắt đầu', 'Năm kết thúc']
    }

    setFormatRangePicker(format)
    setPlaceHolderRangePicker(placeHolder)
  }

  const onChangeFromQuarter = value => {
    console.debug('onChangeFromQuarter = ', value && value.format('Q/YYYY'))
    const quarterObj = {
      ...quarterData,
      from: { quarter: value && parseInt(value.format('Q')), year: value && parseInt(value.format('YYYY')) },
    }
    setQuarterData(quarterObj)
  }

  const onChangeToQuarter = value => {
    console.debug('onChangeToQuarter = ', value && value.format('Q/YYYY'))
    const quarterObj = {
      ...quarterData,
      to: { quarter: value && parseInt(value.format('Q')), year: value && parseInt(value.format('YYYY')) },
    }
    setQuarterData(quarterObj)
  }

  const onChangeRangePicker = value => {
    setValueRangePicker(value)
  }

  const onClickGetStatistics = () => {
    setChartData([])

    const queryParams = {}

    const from = valueRangePicker[0]
    const to = valueRangePicker[1]
    const fromYear = from && parseInt(from.format('YYYY'))
    const toYear = to && parseInt(to.format('YYYY'))

    if (pickerType === TIME_TYPE.DATE) {
      console.debug('get total statistics from date ', from.format('DD/MM/YYYY'))
      console.debug('get total statistics to date ', to.format('DD/MM/YYYY'))
      queryParams.fromDate = from.valueOf()
      queryParams.toDate = to.valueOf()
    } else if (pickerType === TIME_TYPE.WEEK) {
      const fromWeek = parseInt(from.format('w'))
      const toWeek = parseInt(to.format('w'))
      console.debug('get total statistics from week ', fromWeek, ', from year', fromYear)
      console.debug('get total statistics to week ', toWeek, ', to year', toYear)
      queryParams.weekObj = {
        from: {
          data: fromWeek,
          year: fromYear,
        },
        to: {
          data: toWeek,
          year: toYear,
        },
      }
    } else if (pickerType === TIME_TYPE.MONTH) {
      const fromMonth = parseInt(from.format('M')) - 1
      const toMonth = parseInt(to.format('M')) - 1
      console.debug('get total statistics from month ', fromMonth, ', from year', fromYear)
      console.debug('get total statistics to month ', toMonth, ', to year', toYear)
      queryParams.monthObj = {
        from: {
          data: fromMonth,
          year: fromYear,
        },
        to: {
          data: toMonth,
          year: toYear,
        },
      }
    } else if (pickerType === TIME_TYPE.QUARTER) {
      const fromQuarter = quarterData.from.quarter
      const quarterFromYear = quarterData.from.year
      const toQuarter = quarterData.to.quarter
      const quarterToYear = quarterData.to.year
      console.debug('get total statistics from quarter ', fromQuarter, ', from year', quarterFromYear)
      console.debug('get total statistics to quarter ', toQuarter, ', to year', quarterToYear)
      queryParams.quarterObj = {
        from: {
          data: fromQuarter,
          year: quarterFromYear,
        },
        to: {
          data: toQuarter,
          year: quarterToYear,
        },
      }
    } else if (pickerType === TIME_TYPE.YEAR) {
      console.debug('get total statistics from year ', fromYear)
      console.debug('get total statistics to year ', toYear)
      queryParams.fromYear = fromYear
      queryParams.toYear = toYear
    }

    getStatistics(pickerType, queryParams)
  }

  const dataChart = {
    labels: chartData.map(item => item.display),
    datasets: [
      {
        type: 'horizontalBar',
        label: 'Số phút đã dùng (phút)',
        data: chartData.map(item => item.value1),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 206, 86, 0.4)',
        hoverBorderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        xAxisID: 'x-axis-1',
        barPercentage: 0.9,
        categoryPercentage: 0.9,
      },
      {
        type: 'horizontalBar',
        label: 'Số lần sử dụng dịch vụ (lần)',
        data: chartData.map(item => item.value2),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        xAxisID: 'x-axis-2',
      },
    ],
  }

  return (
    <div style={{ position: 'relative' }}>
      {getTotalStatisticsObj.isLoading && (
        <div className="admin-statistics-page__loading">
          <LoadingIcon />
        </div>
      )}

      <div className="admin-statistics-page__total-select-type">
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 mt-2">
          <Select defaultValue={pickerType} style={{ width: '100%' }} onChange={onChangePickerType}>
            <Option value={TIME_TYPE.DATE}>Theo ngày</Option>
            <Option value={TIME_TYPE.WEEK}>Theo tuần</Option>
            <Option value={TIME_TYPE.MONTH}>Theo tháng</Option>
            <Option value={TIME_TYPE.QUARTER}>Theo quý</Option>
            <Option value={TIME_TYPE.YEAR}>Theo năm</Option>
          </Select>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 mt-2">
          {pickerType === TIME_TYPE.QUARTER ? (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DatePicker
                style={{ width: '45%' }}
                picker="quarter"
                onChange={onChangeFromQuarter}
                format="quý 0Q/YYYY"
                placeholder="Quý bắt đầu"
              />
              <div style={{ margin: '0px 5px', width: '10%' }}>đến</div>
              <DatePicker
                style={{ width: '45%' }}
                picker="quarter"
                onChange={onChangeToQuarter}
                format="quý 0Q/YYYY"
                placeholder="Quý kết thúc"
              />
            </div>
          ) : (
            <RangePicker
              style={{ width: '100%' }}
              picker={pickerType}
              onChange={onChangeRangePicker}
              format={formatRangePicker}
              placeholder={placeHolderRangePicker}
              value={valueRangePicker}
            />
          )}
        </div>
        <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 mt-2">
          <Button onClick={onClickGetStatistics} disabled={isButtonDisabled} type="primary" style={{ width: '100%' }}>
            Thống kê
          </Button>
        </div>
      </div>
      <Row justify="center">
        <div className="admin-statistics-page__total-chart">
          {(chartData.length === 0 || getTotalStatisticsObj.isLoading) && <Empty />}
          {chartData.length > 0 && <HorizontalBar data={dataChart} options={chartOptions} />}
        </div>
      </Row>
    </div>
  )
}

export default TotalStatisticsTemplate
