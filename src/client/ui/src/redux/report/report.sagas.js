/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put, takeEvery } from 'redux-saga/effects'
import ReportService from 'services/report.service'
import ReportTypes from './report.types'
import {
  getUserTotalStatisticsSuccess,
  getUserTotalStatisticsFailure,
  getAdminTotalStatisticsSuccess,
  getAdminTotalStatisticsFailure,
  getStatisticsByIdSuccess,
  getStatisticsByIdFailure,
  getUserTokenTypeStatisticsSuccess,
  getUserTokenTypeStatisticsFailure,
} from './report.actions'

// get statistics by id
function* getStatisticsById({ payload: { id, statisticsType, timeType, queryParams } }) {
  try {
    const data = yield ReportService.getStatisticsById(id, statisticsType, timeType, queryParams)
    yield put(getStatisticsByIdSuccess(data, statisticsType))
  } catch (err) {
    yield put(getStatisticsByIdFailure(err.message, statisticsType))
  }
}
export function* getStatisticsByIdSaga() {
  yield takeEvery(ReportTypes.GET_STATISTICS_BY_ID, getStatisticsById)
}

// get user token type statistics
function* getUserTokenTypeStatistics({ payload: { id, userId, timeType, queryParams } }) {
  try {
    const data = yield ReportService.getUserTokenTypeStatistics(id, userId, timeType, queryParams)
    yield put(getUserTokenTypeStatisticsSuccess(data))
  } catch (err) {
    yield put(getUserTokenTypeStatisticsFailure(err.message))
  }
}
export function* getUserTokenTypeStatisticsSaga() {
  yield takeLatest(ReportTypes.GET_USER_TOKEN_TYPE_STATISTICS, getUserTokenTypeStatistics)
}

// get user total statistics
function* getUserTotalStatistics({ payload: { userId, statisticsType, timeType, queryParams } }) {
  try {
    const data = yield ReportService.getUserTotalStatistics(userId, statisticsType, timeType, queryParams)
    yield put(getUserTotalStatisticsSuccess(data, statisticsType))
  } catch (err) {
    yield put(getUserTotalStatisticsFailure(err.message, statisticsType))
  }
}
export function* getUserTotalStatisticsSaga() {
  yield takeEvery(ReportTypes.GET_USER_TOTAL_STATISTICS, getUserTotalStatistics)
}

// get admin total statistics
function* getAdminTotalStatistics({ payload: { statisticsType, timeType, queryParams } }) {
  try {
    const data = yield ReportService.getAdminTotalStatistics(statisticsType, timeType, queryParams)
    yield put(getAdminTotalStatisticsSuccess(data, statisticsType))
  } catch (err) {
    yield put(getAdminTotalStatisticsFailure(err.message, statisticsType))
  }
}
export function* getAdminTotalStatisticsSaga() {
  yield takeEvery(ReportTypes.GET_ADMIN_TOTAL_STATISTICS, getAdminTotalStatistics)
}

// =================================

export function* reportSaga() {
  yield all([
    call(getStatisticsByIdSaga),
    call(getUserTokenTypeStatisticsSaga),
    call(getUserTotalStatisticsSaga),
    call(getAdminTotalStatisticsSaga),
  ])
}
