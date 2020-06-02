/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import RequestService from 'services/request.service'
import RequestTypes from './request.types'
import {
  getRequestListSuccess,
  getRequestListFailure,
  getRequestListByUserIdSuccess,
  getRequestListByUserIdFailure,
} from './request.actions'

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

// get request list by userId
function* getListByUserId({ payload: { userId, filterConditions } }) {
  try {
    const requestList = yield RequestService.getRequestListByUserId(userId, filterConditions)
    yield put(getRequestListByUserIdSuccess(requestList))
  } catch (err) {
    yield put(getRequestListByUserIdFailure(err.message))
  }
}
export function* getRequestListByUserIdSaga() {
  yield takeLatest(RequestTypes.GET_REQUEST_LIST_BY_USERID, getListByUserId)
}

// =================================

export function* requestSaga() {
  yield all([call(getRequestListSaga), call(getRequestListByUserIdSaga)])
}
