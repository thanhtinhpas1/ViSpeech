import ReportTypes from './report.types'

export const onClearReportState = () => ({
  type: ReportTypes.CLEAR_REPORT_STATE,
})

// get user total statistics
export const getUserTotalStatistics = (userId, totalType) => ({
  type: ReportTypes.GET_USER_TOTAL_STATISTICS,
  payload: { userId, totalType },
})

export const getUserTotalStatisticsSuccess = data => ({
  type: ReportTypes.GET_USER_TOTAL_STATISTICS_SUCCESS,
  payload: { data },
})

export const getUserTotalStatisticsFailure = message => ({
  type: ReportTypes.GET_USER_TOTAL_STATISTICS_FAILURE,
  payload: message,
})

// get admin total statistics
export const getAdminTotalStatistics = totalType => ({
  type: ReportTypes.GET_ADMIN_TOTAL_STATISTICS,
  payload: { totalType },
})

export const getAdminTotalStatisticsSuccess = data => ({
  type: ReportTypes.GET_ADMIN_TOTAL_STATISTICS_SUCCESS,
  payload: { data },
})

export const getAdminTotalStatisticsFailure = message => ({
  type: ReportTypes.GET_ADMIN_TOTAL_STATISTICS_FAILURE,
  payload: message,
})
