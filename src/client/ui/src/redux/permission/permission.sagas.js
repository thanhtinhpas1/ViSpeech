/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import PermissionService from 'services/permission.service'
import PermissionTypes from './permission.types'
import { findPermissionByEmailTokenSuccess, findPermissionByEmailTokenFailure } from './permission.actions'

// find permission by email token
function* findPermissionByEmailToken({ payload: token }) {
  try {
    const data = yield PermissionService.findPermissionByEmailToken(token)
    yield put(findPermissionByEmailTokenSuccess(data || []))
  } catch (err) {
    yield put(findPermissionByEmailTokenFailure(err.message))
  }
}
export function* findPermissionByEmailTokenSaga() {
  yield takeLatest(PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN, findPermissionByEmailToken)
}

// assign permission
// function* assignPermission({ payload: { assigneeUsername, projectId, permissions, assignerId } }) {
//   try {
//     yield PermissionService.sendAssignPermissionEmail({
//       assigneeUsername,
//       projectId,
//       permissions,
//       assignerId,
//     })
//     yield put(assignPermissionSuccess({ assigneeUsername, projectId, permissions, assignerId }))
//   } catch (err) {
//     yield put(assignPermissionFailure(err.message))
//   }
// }
// export function* assignPermissionSaga() {
//   yield takeLatest(PermissionTypes.ASSIGN_PERMISSION, assignPermission)
// }

// reply permission assign
// function* replyPermissionAssign({ payload: { emailToken, status } }) {
//   try {
//     yield PermissionService.replyPermissionAssign({ emailToken, status })
//     yield put(replyPermissionAssignSuccess({ emailToken, status }))
//   } catch (err) {
//     yield put(replyPermissionAssignFailure(err.message))
//   }
// }
// export function* replyPermissionAssignSaga() {
//   yield takeLatest(PermissionTypes.REPLY_PERMISSION_ASSIGN, replyPermissionAssign)
// }

// =================================

export function* permissionSaga() {
  yield all([call(findPermissionByEmailTokenSaga)])
}
