/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import RequestService from 'services/request.service'
import { STATUS } from 'utils/constant'
import RequestTypes from './request.types'
import {
  getRequestListSuccess,
  getRequestListFailure,
  getRequestListByUserIdSuccess,
  getRequestListByUserIdFailure,
} from './request.actions'

const formatRequestList = requests => {
  const mapFunc = request => {
    return {
      ...request,
      status: {
        value: request.status,
        name: STATUS[request.status].viText,
        class: STATUS[request.status].cssClass,
      },
    }
  }
  return requests.map(mapFunc)
}

// get request list
function* getList({ payload: filterConditions }) {
  try {
    const requestList = yield RequestService.getRequestList(filterConditions)
    requestList.data = formatRequestList(requestList.data)
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
    requestList.data = formatRequestList(requestList.data)
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
