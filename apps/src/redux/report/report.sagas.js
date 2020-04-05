/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import ReportService from 'services/report.service'
import ReportTypes from './report.types'
import {
  getUserTotalStatisticsSuccess,
  getUserTotalStatisticsFailure,
  getAdminTotalStatisticsSuccess,
  getAdminTotalStatisticsFailure,
} from './report.actions'

// get user total statistics
function* getUserTotalStatistics({ payload: { userId, totalType } }) {
  try {
    const data = yield ReportService.getUserTotalStatistics(userId, totalType)
    yield put(getUserTotalStatisticsSuccess(data))
  } catch (err) {
    yield put(getUserTotalStatisticsFailure(err.message))
  }
}
export function* getUserTotalStatisticsSaga() {
  yield takeLatest(ReportTypes.GET_USER_TOTAL_STATISTICS, getUserTotalStatistics)
}

// get user total statistics
function* getAdminTotalStatistics({ payload: { totalType } }) {
  try {
    const data = yield ReportService.getAdminTotalStatistics(totalType)
    yield put(getAdminTotalStatisticsSuccess(data))
  } catch (err) {
    yield put(getAdminTotalStatisticsFailure(err.message))
  }
}
export function* getAdminTotalStatisticsSaga() {
  yield takeLatest(ReportTypes.GET_ADMIN_TOTAL_STATISTICS, getAdminTotalStatistics)
}

// =================================

export function* reportSaga() {
  yield all([call(getUserTotalStatisticsSaga), call(getAdminTotalStatisticsSaga)])
}
