/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import PermissionService from 'services/permission.service'
import PermissionTypes from './permission.types'
import { assignPermissionSuccess, assignPermissionFailure } from './permission.actions'

// assign permission
function* assignPermission({ payload: { assigneeUsername, projectId, permissions, assignerId } }) {
  try {
    yield PermissionService.sendAssignPermissionEmail({
      assigneeUsername,
      projectId,
      permissions,
      assignerId,
    })
    yield put(assignPermissionSuccess({ assigneeUsername, projectId, permissions, assignerId }))
  } catch (err) {
    yield put(assignPermissionFailure(err.message))
  }
}
export function* assignPermissionSaga() {
  yield takeLatest(PermissionTypes.ASSIGN_PERMISSION, assignPermission)
}

// =================================

export function* permissionSaga() {
  yield all([call(assignPermissionSaga)])
}
