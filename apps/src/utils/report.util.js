import * as moment from 'moment'

const ReportUtils = {
  TIME_TYPE: {
    DATE: 'date',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  },
  STATISTICS_TYPE: {
    TOKEN: 'token',
    USER: 'user',
    PROJECT: 'project',
    TOKEN_TYPE: 'tokenType',
    USER_TOKEN_TYPE: 'userTokenType',
  },
  ONE_DAY_IN_MILLISECONDS: 86400000,
  RANGE_PICKER_LIMIT: 12,
  getDateNow: () => {
    return moment(new Date(Date.now()))
  },
  getTenDatesFromNow: () => {
    return moment(
      new Date(
        Date.now() + ReportUtils.ONE_DAY_IN_MILLISECONDS * (ReportUtils.RANGE_PICKER_LIMIT - 3)
      )
    )
  },
  getOnlyDate: date => {
    let formattedDate = JSON.parse(JSON.stringify(date)) // string
    formattedDate = new Date(formattedDate)
    formattedDate.setHours(0)
    formattedDate.setMinutes(0)
    formattedDate.setSeconds(0)
    formattedDate.setMilliseconds(0)
    return formattedDate
  },
  getWeek: date => {
    const firstDateOfYear = new Date(date.getFullYear(), 0, 1)
    const onlyDate = new Date(ReportUtils.getOnlyDate(date))
    const dayNumberOfYear =
      (onlyDate.valueOf() - firstDateOfYear.valueOf() + ReportUtils.ONE_DAY_IN_MILLISECONDS) /
      ReportUtils.ONE_DAY_IN_MILLISECONDS
    return Math.ceil((dayNumberOfYear + firstDateOfYear.getDay()) / 7)
  },
  getTotalWeeksOfYear: year => {
    const lastDateOfYear = new Date(year, 11, 31)
    let lastWeekOfYear = ReportUtils.getWeek(lastDateOfYear)
    if (lastDateOfYear.getDay() !== 6) {
      lastWeekOfYear -= 1
    }
    return lastWeekOfYear
  },
  getTotalQuarters: (fromQuarter, fromYear, toQuarter, toYear) => {
    let totalQuarters = 0
    for (let i = fromQuarter; i <= 4; i += 1) {
      totalQuarters += 1
    }
    for (let j = fromYear + 1; j < toYear; j += 1) {
      for (let i = 1; i <= 4; i += 1) {
        totalQuarters += 1
      }
    }
    for (let i = 1; i <= toQuarter; i += 1) {
      totalQuarters += 1
    }
    return totalQuarters
  },
}

export default ReportUtils
