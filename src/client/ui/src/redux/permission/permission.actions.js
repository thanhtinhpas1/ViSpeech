import PermissionTypes from './permission.types'

export const onClearPermissionState = () => ({
  type: PermissionTypes.CLEAR_PERMISSION_STATE,
})

// assign permission
export const assignPermission = ({ assigneeUsername, projectId, permissions, assignerId }) => ({
  type: PermissionTypes.ASSIGN_PERMISSION,
  payload: { assigneeUsername, projectId, permissions, assignerId },
})

export const assignPermissionSuccess = ({ assigneeUsername, projectId, permissions, assignerId }) => ({
  type: PermissionTypes.ASSIGN_PERMISSION_SUCCESS,
  payload: { assigneeUsername, projectId, permissions, assignerId },
})

export const assignPermissionFailure = message => ({
  type: PermissionTypes.ASSIGN_PERMISSION_FAILURE,
  payload: message,
})

// reply permission assign
export const replyPermissionAssign = ({ emailToken, status }) => ({
  type: PermissionTypes.REPLY_PERMISSION_ASSIGN,
  payload: { emailToken, status },
})

export const replyPermissionAssignSuccess = ({ emailToken, status }) => ({
  type: PermissionTypes.REPLY_PERMISSION_ASSIGN_SUCCESS,
  payload: { emailToken, status },
})

export const replyPermissionAssignFailure = message => ({
  type: PermissionTypes.REPLY_PERMISSION_ASSIGN_FAILURE,
  payload: message,
})

// find permission by email token
export const findPermissionByEmailToken = token => ({
  type: PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN,
  payload: token,
})

export const findPermissionByEmailTokenSuccess = data => ({
  type: PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN_SUCCESS,
  payload: data,
})

export const findPermissionByEmailTokenFailure = message => ({
  type: PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN_FAILURE,
  payload: message,
})
