/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
// import { Redirect } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import { Row, Spin, Select, DatePicker, Button, Empty } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import STORAGE from 'utils/storage'
import { STATISTICS_TYPE, TOTAL_STATISTICS_TYPE } from 'utils/constant'
import * as moment from 'moment'
import './StatisticsPage.style.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Option } = Select
const { RangePicker, WeekPicker } = DatePicker

const StatisticsPage = ({
  currentUser,
  getUserTotalStatisticsObj,
  getAdminTotalStatisticsObj,
  getUserTotalStatistics,
  getAdminTotalStatistics,
}) => {
  const [currentType, setCurrentType] = useState(STATISTICS_TYPE.DATE)
  const [format, setFormat] = useState('DD/MM/YYYY')
  const [mode, setMode] = useState([STATISTICS_TYPE.DATE, STATISTICS_TYPE.DATE])
  const [labels, setLabels] = useState(['Ngày bắt đầu', 'Ngày kết thúc'])
  const [valueRangePicker, setValueRangePicker] = useState([])
  const [quarterData, setQuarterData] = useState(1)
  const [fromWeek, setFromWeek] = useState({})
  const [toWeek, setToWeek] = useState({})
  const [chartData, setChartData] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {})

  useEffect(() => {
    if (getUserTotalStatisticsObj.data.length > 0) {
      const data = []
      getUserTotalStatisticsObj.data.forEach(element => {
        data.push({
          time: element.data.name,
          value: element.usedMinutes,
        })
      })
      setChartData(data)
      // if (currentType === STATISTICS_TYPE.DATE) {
      //   getUserTotalStatisticsObj.data.forEach(element => {
      //     data.push({
      //       time: moment(element.date).format('DD/MM/YYYY'),
      //       value: element.value,
      //     })
      //   })
      //   setChartData(data)
      // } else if (currentType === STATISTICS_TYPE.WEEK) {
      //   getUserTotalStatisticsObj.data.forEach(element => {
      //     data.push({
      //       time: `Tuần ${element.week} - ${element.year}`,
      //       value: element.value,
      //     })
      //   })
      //   setChartData(data)
      // } else if (currentType === STATISTICS_TYPE.MONTH) {
      //   getUserTotalStatisticsObj.data.forEach(element => {
      //     data.push({
      //       time: `${parseInt(element.month) + 1}/${element.year}`,
      //       value: element.value,
      //     })
      //   })
      //   setChartData(data)
      // } else if (currentType === STATISTICS_TYPE.YEAR) {
      //   getUserTotalStatisticsObj.data.forEach(element => {
      //     data.push({
      //       time: `${element.year}`,
      //       value: element.value,
      //     })
      //   })
      //   setChartData(data)
      // }
    }
  }, [getUserTotalStatisticsObj])

  const executeFilter = filterConditions => {
    STORAGE.setPreferences('vispeech-user-total-statistics', JSON.stringify(filterConditions))
    getUserTotalStatistics(filterConditions.userId, filterConditions.totalType)
  }

  const resetStatistics = () => {
    setValueRangePicker([])
    setFromWeek({})
    setToWeek({})
    setChartData([])
    setIsDisabled(true)
  }

  const onChangeTotalType = value => {}

  const onChangeStatisticalType = value => {
    setCurrentType(value)
    resetStatistics()

    let selectedFormat = 'DD/MM/YYYY'
    let selectedMode = ['date', 'date']
    let selectedLabels = ['Ngày bắt đầu', 'Ngày kết thúc']
    if (value === 'year') {
      selectedFormat = 'YYYY'
      selectedMode = ['year', 'year']
      selectedLabels = ['Năm bắt đầu', 'Năm kết thúc']
    } else if (value === 'month') {
      selectedFormat = 'MM/YYYY'
      selectedMode = ['month', 'month']
      selectedLabels = ['Tháng bắt đầu', 'Tháng kết thúc']
    }
    setFormat(selectedFormat)
    setMode(selectedMode)
    setLabels(selectedLabels)
  }

  const checkDisabledBtn = (value, type) => {
    // type: "start" / "end"
    const oneDayInMiliSeconds = 86400000
    const tenDaysInMiliSeconds = 864000000
    if (value.length === 0) {
      setIsDisabled(true)
    }
    if (currentType === 'date') {
      const fromDate = value[0]
      const toDate = value[1]
      if (toDate - fromDate + oneDayInMiliSeconds > tenDaysInMiliSeconds) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    } else if (currentType === 'week') {
      if (type === 'start' && toWeek.date) {
        const startWeek = parseInt(value.week)
        const endWeek = parseInt(toWeek.week)
        if (startWeek >= endWeek) {
          setIsDisabled(true)
        } else if (parseInt(value.year) !== parseInt(toWeek.year)) {
          setIsDisabled(true)
        } else if (endWeek - startWeek + 1 > 10) {
          setIsDisabled(true)
        } else if (endWeek - startWeek + 1 <= 10) {
          setIsDisabled(false)
        }
      } else if (type === 'end' && fromWeek.date) {
        const startWeek = parseInt(fromWeek.week)
        const endWeek = parseInt(value.week)
        if (startWeek >= endWeek) {
          setIsDisabled(true)
        } else if (parseInt(value.year) !== parseInt(fromWeek.year)) {
          setIsDisabled(true)
        } else if (endWeek - startWeek + 1 > 10) {
          setIsDisabled(true)
        } else if (endWeek - startWeek + 1 <= 10) {
          setIsDisabled(false)
        }
      }
    } else if (currentType === 'month') {
      const fromDate = new Date(value[0])
      const toDate = new Date(value[1])
      if (toDate.getFullYear() - fromDate.getFullYear() > 1) {
        setIsDisabled(true)
      } else if (toDate.getFullYear() - fromDate.getFullYear() === 1) {
        const count = 12 - fromDate.getMonth() + toDate.getMonth() + 1
        if (count > 12) {
          setIsDisabled(true)
        } else {
          setIsDisabled(false)
        }
      } else {
        setIsDisabled(false)
      }
    } else if (currentType === 'year') {
      const fromDate = new Date(value[0])
      const toDate = new Date(value[1])
      if (toDate.getFullYear() - fromDate.getFullYear() + 1 > 10) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    }
  }

  const onChangeFromWeekData = value => {
    console.log('onChangeFromWeekData = ', value.format('w - YYYY'))
    const fromWeekObj = {
      week: value.format('w'),
      year: value.format('YYYY'),
      date: value,
    }
    setFromWeek(fromWeekObj)
    checkDisabledBtn(fromWeekObj, 'start')
  }

  const onChangeToWeekData = value => {
    console.log('onChangeToWeekData = ', value.format('w - YYYY'))
    const toWeekObj = {
      week: value.format('w'),
      year: value.format('YYYY'),
      date: value,
    }
    setToWeek(toWeekObj)
    checkDisabledBtn(toWeekObj, 'end')
  }

  const onChangeData = value => {
    setValueRangePicker(value)
    checkDisabledBtn(value)
  }

  const onPanelChangeData = value => {
    setValueRangePicker(value)
    checkDisabledBtn(value)
  }

  const onOkData = () => {
    // const filterConditions = {
    //   userId: currentUser._id,
    //   currentType,
    // }
    // if (currentType === 'date') {
    //   console.log('ok from date ', valueRangePicker[0].format('DD/MM/YYYY'))
    //   console.log('ok to date ', valueRangePicker[1].format('DD/MM/YYYY'))
    //   filterConditions.currentFromDate = valueRangePicker[0].valueOf()
    //   filterConditions.currentToDate = valueRangePicker[1].valueOf()
    // } else if (currentType === 'week') {
    //   console.log('ok from week ', fromWeek)
    //   console.log('ok to week ', toWeek)
    //   filterConditions.currentWeekObj = {
    //     weekObj: {
    //       start: {
    //         week: fromWeek.week,
    //         year: fromWeek.year,
    //       },
    //       end: {
    //         week: toWeek.week,
    //         year: toWeek.year,
    //       },
    //     },
    //   }
    // } else if (currentType === 'month') {
    //   console.log('ok from month ', valueRangePicker[0].format('MM/YYYY'))
    //   console.log('ok to month ', valueRangePicker[1].format('MM/YYYY'))
    //   const fromDate = new Date(valueRangePicker[0])
    //   const toDate = new Date(valueRangePicker[1])
    //   filterConditions.currentMonthObj = {
    //     monthObj: {
    //       start: {
    //         month: fromDate.getMonth().toString(),
    //         year: fromDate.getFullYear(),
    //       },
    //       end: {
    //         month: toDate.getMonth().toString(),
    //         year: toDate.getFullYear(),
    //       },
    //     },
    //   }
    // } else if (currentType === 'year') {
    //   console.log('ok from year ', valueRangePicker[0].format('YYYY'))
    //   console.log('ok to year ', valueRangePicker[1].format('YYYY'))
    //   const fromDate = new Date(valueRangePicker[0])
    //   const toDate = new Date(valueRangePicker[1])
    //   filterConditions.currentFromYear = fromDate.getFullYear()
    //   filterConditions.currentToYear = toDate.getFullYear()
    // }
    executeFilter({ userId: currentUser._id, totalType: TOTAL_STATISTICS_TYPE.TOKEN_TYPE })
  }

  // if (!getStatisticalDataObj.isLoading && getStatisticalDataObj.isSuccess === false) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: '/error-page',
  //         state: { message: `${getStatisticalDataObj.message}` },
  //       }}
  //     />
  //   )
  // }

  // const cols = {
  //   value: { min: 0, alias: 'Doanh thu (vnđ)' },
  //   time: { alias: 'Thời gian' },
  // }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    responsive: true,
  }

  const dataChart = {
    labels: chartData.map(item => item.time),
    datasets: [
      {
        label: 'Số phút đã dùng (phút)',
        data: chartData.map(item => item.value),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },
    ],
  }

  return (
    <div className="page-content statistics-page">
      <div className="container">
        <div className="card content-area">
          <div className="card-innr">
            <div className="card-head">
              <h4 className="card-title">Thống kê</h4>
            </div>
            <div className="gaps-1x" />
            {getUserTotalStatisticsObj.isLoading && (
              <div className="statistics-page__loading">
                <Spin indicator={antIcon} />
              </div>
            )}
            <Row>
              <div className="statistics-page__select-type">
                <Select
                  defaultValue={TOTAL_STATISTICS_TYPE.TOKEN_TYPE}
                  style={{ minWidth: 180 }}
                  onChange={onChangeTotalType}
                >
                  <Option value={TOTAL_STATISTICS_TYPE.TOKEN_TYPE}>Theo Loại token</Option>
                  <Option value={TOTAL_STATISTICS_TYPE.PROJECT}>Theo dự án</Option>
                  <Option value={TOTAL_STATISTICS_TYPE.TOKEN}>Theo token</Option>
                </Select>
                <Select
                  defaultValue={currentType}
                  style={{ minWidth: 180 }}
                  onChange={onChangeStatisticalType}
                >
                  <Option value="date">Theo ngày</Option>
                  <Option value="week">Theo tuần</Option>
                  <Option value="month">Theo tháng</Option>
                  <Option value="year">Theo năm</Option>
                </Select>
                {currentType === STATISTICS_TYPE.WEEK ? (
                  <>
                    <WeekPicker
                      format="Tuần w YYYY"
                      onChange={onChangeFromWeekData}
                      placeholder="Tuần bắt đầu"
                    />
                    <div>&ensp;đến&ensp;</div>
                    <WeekPicker
                      format="Tuần w YYYY"
                      onChange={onChangeToWeekData}
                      placeholder="Tuần kết thúc"
                    />
                  </>
                ) : (
                  <RangePicker
                    placeholder={labels}
                    format={format}
                    mode={mode}
                    separator="-"
                    value={valueRangePicker}
                    onChange={onChangeData}
                    onPanelChange={onPanelChangeData}
                  />
                )}
                <Button onClick={onOkData} disabled={false} type="primary">
                  Thống kê
                </Button>
              </div>
            </Row>
            <Row>
              {getUserTotalStatisticsObj.isLoading === false &&
                getUserTotalStatisticsObj.isSuccess === null && (
                  <div className="statistics-page__chart">
                    {chartData.length === 0 && <Empty />}
                  </div>
                )}
              {getUserTotalStatisticsObj.isLoading === false &&
                getUserTotalStatisticsObj.isSuccess === true && (
                  <div className="statistics-page__chart">
                    {chartData.length === 0 && <Empty />}
                    {chartData.length > 0 && <Bar data={dataChart} options={options} />}
                  </div>
                )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

StatisticsPage.propTypes = {}

export default StatisticsPage
