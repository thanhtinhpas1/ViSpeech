import { all, call, put, takeLatest } from 'redux-saga/effects'
import MonitorService from 'services/monitor.service'
import MonitorUtils from 'utils/monitor.util'
import MonitorTypes from './monitor.types'
import { getMonitorListFailure, getMonitorListSuccess } from './monitor.actions'

// get monitors
const formatMonitorList = monitorList => {
  return monitorList
    .sort((a, b) => new Date(a.data.createdDate) - new Date(b.data.createdDate))
    .map(MonitorUtils.mapMonitorDataFunc)
}

function* getMonitors({ payload: filterConditions }) {
  try {
    const monitorList = yield MonitorService.getMonitors(filterConditions)
    monitorList.data = formatMonitorList(monitorList.data)
    yield put(getMonitorListSuccess(monitorList))
  } catch (err) {
    yield put(getMonitorListFailure(err.message))
  }
}

export function* getMonitorsSaga() {
  yield takeLatest(MonitorTypes.GET_MONITORS, getMonitors)
}

// =================================

export function* monitorSaga() {
  yield all([ call(getMonitorsSaga) ])
}
