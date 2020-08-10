/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import { Bar } from 'react-chartjs-2'
import { Row, Select, DatePicker, Button, Empty, Form } from 'antd'
import * as moment from 'moment'
import STORAGE from '../../../../../utils/storage'
import ReportUtils from '../../../../../utils/report.util'
import LoadingIcon from '../../../../common/LoadingIcon/LoadingIcon.component'
import Utils from '../../../../../utils'
import { DEFAULT_PAGINATION } from '../../../../../utils/constant'

const { Option } = Select
const { RangePicker } = DatePicker
const {
  STATISTICS_TYPE,
  TIME_TYPE,
  ONE_DAY_IN_MILLISECONDS,
  RANGE_PICKER_LIMIT,
  getDateNow,
  getPreviousTenDatesFromNow,
  getTotalWeeksOfYear,
  getTotalQuarters,
  getOnlyDate,
} = ReportUtils

const StatisticsForAssigners = ({
  currentUser,
  chartOptions,
  statisticsType,
  getMyProjectListObj,
  getProjectAssigneeListObj,
  getProjectTokenListObj,
  getStatisticsForAssignersObj,
  getMyProjects,
  getProjectAssignees,
  getProjectTokens,
  getStatisticsForAssigners,
}) => {
  const [form] = Form.useForm()
  const sharedTokenReportType = statisticsType === STATISTICS_TYPE.SHARED_TOKEN

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
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [selectedAssignerId, setSelectedAssignerId] = useState(null)
  const [selectedAssigneeId, setSelectedAssigneeId] = useState(null)
  const [selectedTokenId, setSelectedTokenId] = useState(null)
  const [isBtnGetStatisticsClicked, setIsBtnGetStatisticsClicked] = useState(false)
  const [projectIdSelected, setProjectIdSelected] = useState(false)
  const [firstTimeLoaded, setFirstTimeLoaded] = useState(false)

  useEffect(() => {
    if (currentUser && currentUser._id) {
      setSelectedAssignerId(currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser._id && Utils.isEmailVerified(currentUser.roles)) {
      const filters = {
        isValid: ['true'],
      }
      getMyProjects({ userId: currentUser._id, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
    }
  }, [currentUser._id, currentUser.roles, getMyProjects])

  useEffect(() => {
    setChartData([])
    setIsButtonDisabled(true)

    if (!selectedProjectId || !selectedAssigneeId || !selectedAssignerId) return
    if (sharedTokenReportType && !selectedTokenId) return

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
  }, [
    pickerType,
    valueRangePicker,
    quarterData,
    selectedProjectId,
    selectedAssigneeId,
    selectedAssignerId,
    sharedTokenReportType,
    selectedTokenId,
  ])

  const onProjectIdChange = useCallback(
    value => {
      setSelectedProjectId(value)

      let filters = {
        isActive: ['true'],
      }
      getProjectAssignees({ projectId: value, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
      if (sharedTokenReportType) {
        const userId = currentUser && currentUser._id
        if (userId) {
          filters = {
            isValid: ['true'],
          }
          getProjectTokens({ userId, projectId: value, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
        }
      }
    },
    [currentUser, sharedTokenReportType, getProjectAssignees, getProjectTokens]
  )

  const onAssigneeIdChange = useCallback(value => {
    setSelectedAssigneeId(value)
  }, [])

  const onTokenIdChange = useCallback(value => {
    setSelectedTokenId(value)
  }, [])

  useEffect(() => {
    if (getMyProjectListObj.isLoading === false && getMyProjectListObj.isSuccess === true) {
      let projectId = null
      if (getMyProjectListObj.myProjectList.data.length > 0) {
        projectId = getMyProjectListObj.myProjectList.data[0]._id
      }
      setProjectIdSelected(true)
      onProjectIdChange(projectId)
      form.setFields([{ name: 'projectId', value: projectId }])
    }
  }, [getMyProjectListObj, form, onProjectIdChange])

  useEffect(() => {
    if (
      getProjectAssigneeListObj.isLoading === false &&
      getProjectAssigneeListObj.isSuccess === true &&
      projectIdSelected
    ) {
      let assigneeId = null
      if (getProjectAssigneeListObj.assigneeList.data.length > 0) {
        assigneeId = getProjectAssigneeListObj.assigneeList.data[0]._id
      }
      onAssigneeIdChange(assigneeId)
      form.setFields([{ name: 'assigneeId', value: assigneeId }])
      setProjectIdSelected(false)
    }
  }, [projectIdSelected, getProjectAssigneeListObj, form, onAssigneeIdChange])

  useEffect(() => {
    if (
      sharedTokenReportType &&
      getProjectTokenListObj.isLoading === false &&
      getProjectTokenListObj.isSuccess === true
    ) {
      let tokenId = null
      if (getProjectTokenListObj.projectTokenList.data.length > 0) {
        tokenId = getProjectTokenListObj.projectTokenList.data[0]._id
      }
      onTokenIdChange(tokenId)
      form.setFields([{ name: 'tokenId', value: tokenId }])
    }
  }, [sharedTokenReportType, getProjectTokenListObj, form, onTokenIdChange])

  useEffect(() => {
    if (selectedProjectId && selectedAssignerId && selectedAssigneeId && firstTimeLoaded === false) {
      setFirstTimeLoaded(true)
      const fromDate = getPreviousTenDatesFromNow().valueOf()
      const toDate = getDateNow().valueOf()
      const ids = { projectId: selectedProjectId, assignerId: selectedAssignerId, assigneeId: selectedAssigneeId }
      if (sharedTokenReportType && selectedTokenId) {
        ids.tokenId = selectedTokenId
      }
      setIsButtonDisabled(false)
      setIsBtnGetStatisticsClicked(true)
      getStatisticsForAssigners(ids, statisticsType, TIME_TYPE.DATE, { fromDate, toDate })
    }
  }, [
    selectedProjectId,
    selectedAssignerId,
    selectedAssigneeId,
    firstTimeLoaded,
    sharedTokenReportType,
    statisticsType,
    selectedTokenId,
    getStatisticsForAssigners,
  ])

  useEffect(() => {
    const { isLoading, isSuccess, data } = getStatisticsForAssignersObj
    if (isBtnGetStatisticsClicked && isLoading === false && isSuccess === true) {
      const dataChart = []
      if (Array.isArray(data) && data.length > 0) {
        if (pickerType === TIME_TYPE.DATE) {
          data.forEach(element => {
            dataChart.push({
              display: moment(element.date).format('DD/MM/YYYY'),
              value1: element.usedMinutes,
              value2: element.totalRequests,
            })
          })
        } else if (pickerType === TIME_TYPE.WEEK) {
          data.forEach(element => {
            dataChart.push({
              display: `Tuần ${element.week}/${element.year}`,
              value1: element.usedMinutes,
              value2: element.totalRequests,
            })
          })
        } else if (pickerType === TIME_TYPE.MONTH) {
          data.forEach(element => {
            dataChart.push({
              display: `${parseInt(element.month) + 1}/${element.year}`,
              value1: element.usedMinutes,
              value2: element.totalRequests,
            })
          })
        } else if (pickerType === TIME_TYPE.QUARTER) {
          data.forEach(element => {
            dataChart.push({
              display: `Quý ${element.quarter}/${element.year}`,
              value1: element.usedMinutes,
              value2: element.totalRequests,
            })
          })
        } else if (pickerType === TIME_TYPE.YEAR) {
          data.forEach(element => {
            dataChart.push({
              display: `${element.year}`,
              value1: element.usedMinutes,
              value2: element.totalRequests,
            })
          })
        }
      }
      setChartData(dataChart)
      setIsBtnGetStatisticsClicked(false)
    }
  }, [getStatisticsForAssignersObj, isBtnGetStatisticsClicked, pickerType])

  const getStatistics = (ids, timeType, queryParams) => {
    STORAGE.setPreferences(`'vispeech-statistics-${statisticsType}'`, JSON.stringify(queryParams))
    getStatisticsForAssigners(ids, statisticsType, timeType, queryParams)
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
    setIsBtnGetStatisticsClicked(true)
    setChartData([])

    const queryParams = {}

    const from = valueRangePicker[0]
    const to = valueRangePicker[1]
    const fromYear = from && parseInt(from.format('YYYY'))
    const toYear = to && parseInt(to.format('YYYY'))

    if (pickerType === TIME_TYPE.DATE) {
      console.debug('get statistics from date ', from.format('DD/MM/YYYY'))
      console.debug('get statistics to date ', to.format('DD/MM/YYYY'))
      queryParams.fromDate = from.valueOf()
      queryParams.toDate = to.valueOf()
    } else if (pickerType === TIME_TYPE.WEEK) {
      const fromWeek = parseInt(from.format('w'))
      const toWeek = parseInt(to.format('w'))
      console.debug('get statistics from week ', fromWeek, ', from year', fromYear)
      console.debug('get statistics to week ', toWeek, ', to year', toYear)
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
      console.debug('get statistics from month ', fromMonth, ', from year', fromYear)
      console.debug('get statistics to month ', toMonth, ', to year', toYear)
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
      console.debug('get statistics from quarter ', fromQuarter, ', from year', quarterFromYear)
      console.debug('get statistics to quarter ', toQuarter, ', to year', quarterToYear)
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
      console.debug('get statistics from year ', fromYear)
      console.debug('get statistics to year ', toYear)
      queryParams.fromYear = fromYear
      queryParams.toYear = toYear
    }

    getStatistics(
      {
        projectId: selectedProjectId,
        assignerId: selectedAssignerId,
        assigneeId: selectedAssigneeId,
        tokenId: selectedTokenId,
      },
      pickerType,
      queryParams
    )
  }

  const dataChart = {
    labels: chartData.map(item => item.display),
    datasets: [
      {
        type: 'bar',
        label: 'Số phút đã dùng (phút)',
        data: chartData.map(item => item.value1),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 206, 86, 0.4)',
        hoverBorderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        yAxisID: 'y-axis-1',
        barPercentage: 0.9,
      },
      {
        type: 'line',
        label: 'Số lần sử dụng dịch vụ (lần)',
        data: chartData.map(item => item.value2),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        pointBorderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointHoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        yAxisID: 'y-axis-2',
      },
    ],
  }

  return (
    <div style={{ position: 'relative' }}>
      {isBtnGetStatisticsClicked && getStatisticsForAssignersObj.isLoading && (
        <div className="customer-statistics-page__loading">
          <LoadingIcon />
        </div>
      )}

      <div className="customer-statistics-page__select-type" style={{ display: 'block' }}>
        <Form form={form} className="row guttar-15px">
          {/* select projectId */}
          <div className={`col-12 col-md-6 ${sharedTokenReportType ? 'col-lg-4' : 'col-lg-6'} mt-2`}>
            <Form.Item name="projectId">
              <Select
                style={{ width: '100%' }}
                placeholder={
                  (getMyProjectListObj.myProjectList.data || []).length > 0 ? 'Chọn một dự án' : 'Không tìm thấy dự án'
                }
                onChange={value => {
                  onProjectIdChange(value)
                  setProjectIdSelected(true)
                }}
              >
                {(getMyProjectListObj.myProjectList.data || []).map(project => {
                  return (
                    <Option value={project._id} key={project._id}>
                      {project.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
          {/* select assigneeId */}
          <div className={`col-12 ${sharedTokenReportType ? 'col-md-4 col-lg-4' : 'col-md-6 col-lg-6'} mt-2`}>
            <Form.Item name="assigneeId">
              <Select
                style={{ width: '100%' }}
                placeholder={
                  (getProjectAssigneeListObj.assigneeList.data || []).length > 0
                    ? 'Chọn một thành viên'
                    : 'Không tìm thấy thành viên'
                }
                onChange={onAssigneeIdChange}
              >
                {(getProjectAssigneeListObj.assigneeList.data || []).map(assignee => {
                  return (
                    <Option value={assignee._id} key={assignee._id}>
                      {assignee.username}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </div>
          {/* select tokenId */}
          {sharedTokenReportType && (
            <div className="col-12 col-md-4 col-lg-4 mt-2">
              <Form.Item name="tokenId">
                <Select
                  style={{ width: '100%' }}
                  placeholder={
                    (getProjectTokenListObj.projectTokenList.data || []).length > 0
                      ? 'Chọn một API key'
                      : 'Không tìm thấy API key'
                  }
                  onChange={onTokenIdChange}
                >
                  {(getProjectTokenListObj.projectTokenList.data || []).map(token => {
                    return (
                      <Option value={token._id} key={token._id}>
                        {token.name}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </div>
          )}
        </Form>
        <div className="row guttar-15px">
          <div className="col-12 col-md-3 col-lg-3 mt-2">
            <Select defaultValue={pickerType} style={{ width: '100%' }} onChange={onChangePickerType}>
              <Option value={TIME_TYPE.DATE}>Theo ngày</Option>
              <Option value={TIME_TYPE.WEEK}>Theo tuần</Option>
              <Option value={TIME_TYPE.MONTH}>Theo tháng</Option>
              <Option value={TIME_TYPE.QUARTER}>Theo quý</Option>
              <Option value={TIME_TYPE.YEAR}>Theo năm</Option>
            </Select>
          </div>
          <div className="col-12 col-md-6 col-lg-7 mt-2">
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
          <div className="col-12 col-md-3 col-lg-2 mt-2">
            <Button onClick={onClickGetStatistics} disabled={isButtonDisabled} type="primary" style={{ width: '100%' }}>
              Thống kê
            </Button>
          </div>
        </div>
      </div>

      <Row justify="center">
        <div className="customer-statistics-page__chart">
          {(chartData.length === 0 || (isBtnGetStatisticsClicked && getStatisticsForAssignersObj.isLoading)) && (
            <Empty />
          )}
          {chartData.length > 0 && <Bar data={dataChart} options={chartOptions} />}
        </div>
      </Row>
    </div>
  )
}

export default StatisticsForAssigners
