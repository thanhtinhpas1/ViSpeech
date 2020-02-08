/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import UserTypes from './user.types'
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  activeEmailSuccess,
  activeEmailFailure,
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
import UserService from '../../services/user.service'
import { JWT_TOKEN } from '../../utils/constant'

// ==== login
export function* login({ payload: user }) {
  try {
    const loginUser = yield UserService.login(user)
    yield put(loginSuccess(loginUser))
  } catch (err) {
    yield put(loginFailure(err.message))
  }
}

export function* loginStartSagas() {
  yield takeLatest(UserTypes.LOGIN_START, login)
}

// ===authen with social
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

export function* register({ payload: user }) {
  try {
    const registerUser = yield UserService.register(user)
    yield put(registerSuccess(registerUser))
  } catch (err) {
    yield put(registerFailure(err.message))
  }
}

export function* logout() {
  UserService.removePreferences(JWT_TOKEN)
  yield put(onClearUserState())
}

export function* authenticate({ payload: token }) {
  try {
    const user = yield UserService.authenticate(token)
    if (user) {
      yield put(updateCurrentUser(user))
    } else {
      yield put(updateCurrentUser(null))
    }
  } catch (err) {
    console.log('ERR AUTHENTICATE ', err)
    yield put(updateCurrentUser(null))
  }
}

export function* registerStartSaga() {
  yield takeLatest(UserTypes.REGISTER_START, register)
}

// === active account by email
function* activeEmail({ payload }) {
  try {
    yield UserService.activeEmail(payload)
    yield put(activeEmailSuccess())
  } catch (err) {
    yield put(activeEmailFailure(err.message))
  }
}

function* activeEmailSaga() {
  yield takeLatest(UserTypes.ACTIVE_EMAIL, activeEmail)
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

// =================================

export function* logoutSaga() {
  yield takeLatest(UserTypes.LOGOUT, logout)
}

export function* authenticateSaga() {
  yield takeLatest(UserTypes.AUTHENTICATE, authenticate)
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
    call(loginStartSagas),
    call(authenWithSocialSaga),
    call(activeEmailSaga),
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
