import PermissionTypes from './permission.types'

export const onClearPermissionState = () => ({
  type: PermissionTypes.CLEAR_PERMISSION_STATE,
})

// assign permission
export const assignPermission = ({ assigneeUsername, projectId, permissions, assignerId }) => ({
  type: PermissionTypes.ASSIGN_PERMISSION,
  payload: { assigneeUsername, projectId, permissions, assignerId },
})

export const assignPermissionSuccess = ({
  assigneeUsername,
  projectId,
  permissions,
  assignerId,
}) => ({
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
