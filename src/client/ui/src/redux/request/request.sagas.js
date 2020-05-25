/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import RequestService from 'services/request.service'
import RequestTypes from './request.types'
import { getRequestListSuccess, getRequestListFailure } from './request.actions'

// get request list
function* getList({ payload: filterConditions }) {
  try {
    const requestList = yield RequestService.getRequestList(filterConditions)
    yield put(getRequestListSuccess(requestList))
  } catch (err) {
    yield put(getRequestListFailure(err.message))
  }
}
export function* getRequestListSaga() {
  yield takeLatest(RequestTypes.GET_REQUEST_LIST, getList)
}

// =================================

export function* requestSaga() {
  yield all([call(getRequestListSaga)])
}
