/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put, takeEvery } from 'redux-saga/effects'
import ReportService from '../../services/report.service'
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
  getTotalStatisticsSuccess,
  getTotalStatisticsFailure,
  getStatisticsForAssignersSuccess,
  getStatisticsForAssignersFailure,
  getTotalStatisticsForAssignersSuccess,
  getTotalStatisticsForAssignersFailure,
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

// get statistics for assigners
function* getStatisticsForAssigners({ payload: { ids, statisticsType, timeType, queryParams } }) {
  try {
    const data = yield ReportService.getStatisticsForAssigners(ids, statisticsType, timeType, queryParams)
    yield put(getStatisticsForAssignersSuccess(data, statisticsType))
  } catch (err) {
    yield put(getStatisticsForAssignersFailure(err.message, statisticsType))
  }
}
export function* getStatisticsForAssignersSaga() {
  yield takeEvery(ReportTypes.GET_STATISTICS_FOR_ASSIGNERS, getStatisticsForAssigners)
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

// get total statistics for assigners
function* getTotalStatisticsForAssigners({
  payload: { assignerId, projectId, statisticsType, timeType, queryParams },
}) {
  try {
    const data = yield ReportService.getTotalStatisticsForAssigners(
      assignerId,
      projectId,
      statisticsType,
      timeType,
      queryParams
    )
    yield put(getTotalStatisticsForAssignersSuccess(data, statisticsType))
  } catch (err) {
    yield put(getTotalStatisticsForAssignersFailure(err.message, statisticsType))
  }
}
export function* getTotalStatisticsForAssignersSaga() {
  yield takeEvery(ReportTypes.GET_TOTAL_STATISTICS_FOR_ASSIGNERS, getTotalStatisticsForAssigners)
}

// get total statistics
function* getTotalStatistics({ payload: { timeType, queryParams } }) {
  try {
    const data = yield ReportService.getTotalStatistics(timeType, queryParams)
    yield put(getTotalStatisticsSuccess(data))
  } catch (err) {
    yield put(getTotalStatisticsFailure(err.message))
  }
}
export function* getTotalStatisticsSaga() {
  yield takeEvery(ReportTypes.GET_TOTAL_STATISTICS, getTotalStatistics)
}

// =================================

export function* reportSaga() {
  yield all([
    call(getStatisticsByIdSaga),
    call(getUserTokenTypeStatisticsSaga),
    call(getStatisticsForAssignersSaga),
    call(getUserTotalStatisticsSaga),
    call(getAdminTotalStatisticsSaga),
    call(getTotalStatisticsForAssignersSaga),
    call(getTotalStatisticsSaga),
  ])
}
