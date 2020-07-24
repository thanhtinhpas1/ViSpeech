/* eslint-disable no-restricted-globals */
import { all, call, put, takeLatest } from 'redux-saga/effects'
import RequestService from 'services/request.service'
import { STATUS, TOKEN_TYPE } from 'utils/constant'
import RequestTypes from './request.types'
import {
  getRequestInfoFailure,
  getRequestInfoSuccess,
  getRequestListByUserIdFailure,
  getRequestListByUserIdSuccess,
  getRequestListFailure,
  getRequestListSuccess,
} from './request.actions'

// get request info
const formatRequestInfo = request => {
  const formatRequest = {
    ...request,
    status: {
      value: request.status,
      name: STATUS[request.status].viText,
      class: STATUS[request.status].cssClass,
    },
  }
  return formatRequest
}

export function* getRequestInfo({ payload: id }) {
  try {
    let requestInfo = yield RequestService.getRequestInfo(id)
    requestInfo = formatRequestInfo(requestInfo)
    yield put(getRequestInfoSuccess(requestInfo))
  } catch (err) {
    yield put(getRequestInfoFailure(err.message))
  }
}

export function* getRequestInfoSaga() {
  yield takeLatest(RequestTypes.GET_REQUEST_INFO, getRequestInfo)
}

const formatRequestList = requests => {
  const mapFunc = request => {
    return {
      ...request,
      status: {
        value: request.status,
        name: STATUS[request.status].viText,
        class: STATUS[request.status].cssClass,
      },
      tokenType: {
        ...request.tokenTypeName,
        name: TOKEN_TYPE[request.tokenTypeName]?.viText,
        class: TOKEN_TYPE[request.tokenTypeName]?.cssClass,
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
  yield all([ call(getRequestInfoSaga), call(getRequestListSaga), call(getRequestListByUserIdSaga) ])
}
