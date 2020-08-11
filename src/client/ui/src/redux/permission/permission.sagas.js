/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import PermissionService from '../../services/permission.service'
import PermissionTypes from './permission.types'
import {
  findPermissionByEmailTokenSuccess,
  findPermissionByEmailTokenFailure,
  findPermissionForAssigneeSuccess,
  findPermissionForAssigneeFailure,
} from './permission.actions'

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

// find permission for assignee
function* findPermissionForAssignee({ payload: { projectId, assignerId, assigneeId, status } }) {
  try {
    const data = yield PermissionService.findPermissionForAssignee(projectId, assignerId, assigneeId, status)
    yield put(findPermissionForAssigneeSuccess(data.length > 0 ? data[0] : null))
  } catch (err) {
    yield put(findPermissionForAssigneeFailure(err.message))
  }
}
export function* findPermissionForAssigneeSaga() {
  yield takeLatest(PermissionTypes.FIND_PERMISSION_FOR_ASSIGNEE, findPermissionForAssignee)
}

// =================================

export function* permissionSaga() {
  yield all([call(findPermissionByEmailTokenSaga), call(findPermissionForAssigneeSaga)])
}
