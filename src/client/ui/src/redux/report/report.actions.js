import ReportTypes from './report.types'

export const onClearReportState = () => ({
  type: ReportTypes.CLEAR_REPORT_STATE,
})

// get statistics by id
export const getStatisticsById = (id, statisticsType, timeType, queryParams) => ({
  type: ReportTypes.GET_STATISTICS_BY_ID,
  payload: { id, statisticsType, timeType, queryParams },
})

export const getStatisticsByIdSuccess = (data, statisticsType) => ({
  type: ReportTypes.GET_STATISTICS_BY_ID_SUCCESS,
  payload: { data, statisticsType },
})

export const getStatisticsByIdFailure = (message, statisticsType) => ({
  type: ReportTypes.GET_STATISTICS_BY_ID_FAILURE,
  payload: { message, statisticsType },
})

// get user token type statistics
export const getUserTokenTypeStatistics = (id, userId, timeType, queryParams) => ({
  type: ReportTypes.GET_USER_TOKEN_TYPE_STATISTICS,
  payload: { id, userId, timeType, queryParams },
})

export const getUserTokenTypeStatisticsSuccess = data => ({
  type: ReportTypes.GET_USER_TOKEN_TYPE_STATISTICS_SUCCESS,
  payload: { data },
})

export const getUserTokenTypeStatisticsFailure = message => ({
  type: ReportTypes.GET_USER_TOKEN_TYPE_STATISTICS_FAILURE,
  payload: message,
})

// get user total statistics
export const getUserTotalStatistics = (userId, statisticsType, timeType, queryParams) => ({
  type: ReportTypes.GET_USER_TOTAL_STATISTICS,
  payload: { userId, statisticsType, timeType, queryParams },
})

export const getUserTotalStatisticsSuccess = (data, statisticsType) => ({
  type: ReportTypes.GET_USER_TOTAL_STATISTICS_SUCCESS,
  payload: { data, statisticsType },
})

export const getUserTotalStatisticsFailure = (message, statisticsType) => ({
  type: ReportTypes.GET_USER_TOTAL_STATISTICS_FAILURE,
  payload: { message, statisticsType },
})

// get admin total statistics
export const getAdminTotalStatistics = (statisticsType, timeType, queryParams) => ({
  type: ReportTypes.GET_ADMIN_TOTAL_STATISTICS,
  payload: { statisticsType, timeType, queryParams },
})

export const getAdminTotalStatisticsSuccess = (data, statisticsType) => ({
  type: ReportTypes.GET_ADMIN_TOTAL_STATISTICS_SUCCESS,
  payload: { data, statisticsType },
})

export const getAdminTotalStatisticsFailure = (message, statisticsType) => ({
  type: ReportTypes.GET_ADMIN_TOTAL_STATISTICS_FAILURE,
  payload: { message, statisticsType },
})
