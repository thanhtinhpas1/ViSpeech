/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import UserService from 'services/user.service'
import { JWT_TOKEN } from 'utils/constant'
import STORAGE from 'utils/storage'
import Utils from 'utils'
import UserTypes from './user.types'
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  getUserListSuccess,
  getUserListFailure,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  createUserSuccess,
  createUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  sendVerifyEmailSuccess,
  sendVerifyEmailFailure,
  verifyEmailSuccess,
  verifyEmailFailure,
  sendEmailResetPasswordSuccess,
  sendEmailResetPasswordFailure,
  verifyTokenResetPasswordSuccess,
  verifyTokenResetPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  onClearUserState,
  updateCurrentUser,
  changePasswordSuccess,
  changePasswordFailure,
  updateAvatarSuccess,
  updateAvatarFailure,
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

// === authen with social
/**
 *
 * @param {Object} payload is user
 */
export function* authenWithSocial({ payload }) {
  try {
    const user = yield UserService.authenWithSocial(payload)
    yield put(loginSuccess(user))
  } catch (err) {
    yield put(loginFailure(err.message))
  }
}

export function* authenWithSocialSaga() {
  yield takeLatest(UserTypes.AUTHEN_WITH_SOCIAL, authenWithSocial)
}

// ==== register
export function* register({ payload: user }) {
  try {
    yield UserService.register(user)
    yield put(registerSuccess(user))
  } catch (err) {
    yield put(registerFailure(err.message))
  }
}

export function* registerStartSaga() {
  yield takeLatest(UserTypes.REGISTER_START, register)
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
    yield put(updateCurrentUser(user || null))
  } catch (err) {
    yield put(updateCurrentUser(null))
  }
}

export function* authenticateSaga() {
  yield takeLatest(UserTypes.AUTHENTICATE, authenticate)
}

// ==== get user list
const formatUserList = userList => {
  const mapFunc = user => {
    return {
      ...user,
      fullName: `${user.lastName} ${user.firstName}`,
      rolesInText: Utils.getRolesInText(user.roles),
    }
  }
  return userList.map(mapFunc)
}

export function* getUserList() {
  try {
    let userList = yield UserService.getUserList()
    userList = formatUserList(userList)
    yield put(getUserListSuccess(userList))
  } catch (err) {
    yield put(getUserListFailure(err.message))
  }
}

export function* getUserListSaga() {
  yield takeLatest(UserTypes.GET_USER_LIST, getUserList)
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

// ==== update user info
function* updateUserInfo({ payload: { id, userInfo } }) {
  try {
    yield UserService.updateUserInfo(id, userInfo)
    yield put(updateUserInfoSuccess({ ...userInfo, _id: id }))
  } catch (err) {
    yield put(updateUserInfoFailure(err.message))
  }
}
function* updateUserInfoSaga() {
  yield takeLatest(UserTypes.UPDATE_USER_INFO, updateUserInfo)
}

// ==== create user
function* createUser({ payload: data }) {
  try {
    yield UserService.createUser(data)
    yield put(createUserSuccess(data))
  } catch (err) {
    yield put(createUserFailure(err.message))
  }
}
function* createUserSaga() {
  yield takeLatest(UserTypes.CREATE_USER, createUser)
}

// ==== delete user
function* deleteUser({ payload: id }) {
  try {
    yield UserService.deleteUser(id)
    yield put(deleteUserSuccess(id))
  } catch (err) {
    yield put(deleteUserFailure(err.message))
  }
}
function* deleteUserSaga() {
  yield takeLatest(UserTypes.DELETE_USER, deleteUser)
}

// send verify email
function* sendVerifyEmail({ payload }) {
  try {
    yield UserService.sendVerifyEmail(payload)
    yield put(sendVerifyEmailSuccess())
  } catch (err) {
    yield put(sendVerifyEmailFailure(err.message))
  }
}

function* sendVerifyEmailSaga() {
  yield takeLatest(UserTypes.SEND_VERIFY_EMAIL, sendVerifyEmail)
}

// verify email
function* verifyEmail({ payload }) {
  try {
    yield UserService.verifyEmail(payload)
    yield put(verifyEmailSuccess())
  } catch (err) {
    yield put(verifyEmailFailure(err.message))
  }
}

function* verifyEmailSaga() {
  yield takeLatest(UserTypes.VERIFY_EMAIL, verifyEmail)
}

// send email reset password
// payload is email
function* sendEmailResetPassword({ payload }) {
  try {
    yield UserService.sendEmailResetPassword(payload)
    yield put(sendEmailResetPasswordSuccess())
  } catch (err) {
    yield put(sendEmailResetPasswordFailure(err.message))
  }
}

function* sendEmailResetPasswordSaga() {
  yield takeLatest(UserTypes.SEND_EMAIL_RESET_PASSWORD, sendEmailResetPassword)
}

// verifyTokenResetPassword
// payload is token
function* verifyTokenResetPassword({ payload }) {
  try {
    const result = yield UserService.verifyTokenResetPassword(payload)
    yield put(verifyTokenResetPasswordSuccess(result))
  } catch (err) {
    yield put(verifyTokenResetPasswordFailure(err.message))
  }
}

function* verifyTokenResetPasswordSaga() {
  yield takeLatest(UserTypes.VERIFY_TOKEN_RESET_PASSWORD, verifyTokenResetPassword)
}

/**
 * Reset password
 * payload: {token, userId}
 */
function* resetPassword({ payload }) {
  try {
    yield UserService.resetPassword(payload)
    yield put(resetPasswordSuccess())
  } catch (err) {
    yield put(resetPasswordFailure(err.message))
  }
}

function* resetPasswordSaga() {
  yield takeLatest(UserTypes.RESET_PASSWORD, resetPassword)
}

// ===========
function* changePassword({ payload }) {
  try {
    yield UserService.changePassword(payload)
    yield put(changePasswordSuccess())
  } catch (err) {
    yield put(changePasswordFailure(err.message))
  }
}
function* changePasswordSaga() {
  yield takeLatest(UserTypes.CHANGE_PASSPWORD, changePassword)
}

// ===========
function* updateAvatar({ payload }) {
  try {
    const result = yield UserService.updateAvatar(payload)
    console.log('result after update avatar: ', result)
    yield put(updateAvatarSuccess(payload.avatar))
  } catch (err) {
    yield put(updateAvatarFailure(err.message))
  }
}
function* updateAvatarSaga() {
  yield takeLatest(UserTypes.UPDATE_AVATAR, updateAvatar)
}

export function* userSaga() {
  yield all([
    call(loginStartSaga),
    call(getUserListSaga),
    call(getUserInfoSaga),
    call(updateUserInfoSaga),
    call(createUserSaga),
    call(deleteUserSaga),
    call(authenWithSocialSaga),
    call(sendVerifyEmailSaga),
    call(verifyEmailSaga),
    call(sendEmailResetPasswordSaga),
    call(verifyTokenResetPasswordSaga),
    call(resetPasswordSaga),
    call(registerStartSaga),
    call(logoutSaga),
    call(authenticateSaga),
    call(changePasswordSaga),
    call(updateAvatarSaga),
  ])
}
