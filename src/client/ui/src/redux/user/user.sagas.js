/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { all, call, put, takeLatest } from 'redux-saga/effects'
import UserService from '../../services/user.service'
import { JWT_TOKEN, STATUS } from '../../utils/constant'
import STORAGE from '../../utils/storage'
import UserTypes from './user.types'
import {
  authenticateFailure,
  authenticateSuccess,
  getUserInfoFailure,
  getUserInfoSuccess,
  getUserListFailure,
  getUserListSuccess,
  getUsernameListFailure,
  getUsernameListSuccess,
  loginFailure,
  loginSuccess,
  onClearUserState,
  getProjectAssigneeListFailure,
  getProjectAssigneeListSuccess,
} from './user.actions'

// ==== login
export function* login({ payload: user }) {
  try {
    const loginUser = yield UserService.login(user)
    yield put(loginSuccess(loginUser))
  } catch (err) {
    yield put(loginFailure(err.message))
  }
}

export function* loginStartSaga() {
  yield takeLatest(UserTypes.LOGIN_START, login)
}

// ==== logout
export function* logout() {
  STORAGE.removePreferences(JWT_TOKEN)
  yield put(onClearUserState())
}

export function* logoutSaga() {
  yield takeLatest(UserTypes.LOGOUT, logout)
}

// ==== authenticate JWT
export function* authenticate({ payload: token }) {
  try {
    const user = yield UserService.authenticate(token)
    yield put(authenticateSuccess(user || null))
  } catch (err) {
    yield put(authenticateFailure(err))
  }
}

export function* authenticateSaga() {
  yield takeLatest(UserTypes.UPDATE_CURRENT_USER_ON_AUTHENTICATE, authenticate)
}

// ==== get user list
const formatUserList = userList => {
  const mapFunc = user => {
    return {
      ...user,
      isActive: user.isActive ? STATUS.ACTIVE : STATUS.INACTIVE,
    }
  }
  return userList.map(mapFunc)
}

export function* getUserList({ payload: filterConditions }) {
  try {
    const userList = yield UserService.getUserList(filterConditions)
    userList.data = formatUserList(userList.data)
    yield put(getUserListSuccess(userList))
  } catch (err) {
    yield put(getUserListFailure(err.message))
  }
}

export function* getUserListSaga() {
  yield takeLatest(UserTypes.GET_USER_LIST, getUserList)
}

// ==== get username list
export function* getUsernameList({ payload: filterConditions }) {
  try {
    const usernameList = yield UserService.getUsernameList(filterConditions)
    yield put(getUsernameListSuccess(usernameList))
  } catch (err) {
    yield put(getUsernameListFailure(err.message))
  }
}

export function* getUsernameListSaga() {
  yield takeLatest(UserTypes.GET_USERNAME_LIST, getUsernameList)
}

// ==== get user info
export function* getUserInfo({ payload: id }) {
  try {
    const userInfo = yield UserService.getUserInfo(id)
    yield put(getUserInfoSuccess(userInfo))
  } catch (err) {
    yield put(getUserInfoFailure(err.message))
  }
}

export function* getUserInfoSaga() {
  yield takeLatest(UserTypes.GET_USER_INFO, getUserInfo)
}

// ==== get project assignee list
export function* getProjectAssigneeList({ payload: filterConditions }) {
  try {
    const assignees = yield UserService.getProjectAssignees(filterConditions)
    assignees.data = formatUserList(assignees.data)
    yield put(getProjectAssigneeListSuccess(assignees))
  } catch (err) {
    yield put(getProjectAssigneeListFailure(err.message))
  }
}

export function* getProjectAssigneeListSaga() {
  yield takeLatest(UserTypes.GET_PROJECT_ASSIGNEES, getProjectAssigneeList)
}

export function* userSaga() {
  yield all([
    call(loginStartSaga),
    call(getUserListSaga),
    call(getUsernameListSaga),
    call(getUserInfoSaga),
    call(getProjectAssigneeListSaga),
    call(logoutSaga),
    call(authenticateSaga),
  ])
}
