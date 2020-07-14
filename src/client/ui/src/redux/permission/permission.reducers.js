import PermissionTypes from './permission.types'

const INITIAL_STATE = {
  assignPermission: {
    permission: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  replyPermissionAssign: {
    reply: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  findPermissionByEmailToken: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const permissionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PermissionTypes.CLEAR_PERMISSION_STATE:
      return {
        ...INITIAL_STATE,
      }
    // ASSIGN PERMISSION
    case PermissionTypes.ASSIGN_PERMISSION:
      return {
        ...state,
        assignPermission: {
          ...INITIAL_STATE.assignPermission,
          isLoading: true,
        },
      }
    case PermissionTypes.ASSIGN_PERMISSION_SUCCESS:
      return {
        ...state,
        assignPermission: {
          ...INITIAL_STATE.assignPermission,
          isLoading: false,
          isSuccess: true,
          permission: action.payload,
        },
      }
    case PermissionTypes.ASSIGN_PERMISSION_FAILURE:
      return {
        ...state,
        assignPermission: {
          ...INITIAL_STATE.assignPermission,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // REPLY PERMISSION
    case PermissionTypes.REPLY_PERMISSION_ASSIGN:
      return {
        ...state,
        replyPermissionAssign: {
          ...INITIAL_STATE.replyPermissionAssign,
          isLoading: true,
        },
      }
    case PermissionTypes.REPLY_PERMISSION_ASSIGN_SUCCESS:
      return {
        ...state,
        replyPermissionAssign: {
          ...INITIAL_STATE.replyPermissionAssign,
          isLoading: false,
          isSuccess: true,
          reply: action.payload,
        },
      }
    case PermissionTypes.REPLY_PERMISSION_ASSIGN_FAILURE:
      return {
        ...state,
        replyPermissionAssign: {
          ...INITIAL_STATE.replyPermissionAssign,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // FIND PERMISSION BY EMAIL TOKEN
    case PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN:
      return {
        ...state,
        findPermissionByEmailToken: {
          ...INITIAL_STATE.findPermissionByEmailToken,
          isLoading: true,
        },
      }
    case PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN_SUCCESS:
      return {
        ...state,
        findPermissionByEmailToken: {
          ...INITIAL_STATE.findPermissionByEmailToken,
          isLoading: false,
          isSuccess: true,
          data: action.payload,
        },
      }
    case PermissionTypes.FIND_PERMISSION_BY_EMAIL_TOKEN_FAILURE:
      return {
        ...state,
        findPermissionByEmailToken: {
          ...INITIAL_STATE.findPermissionByEmailToken,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default permissionReducer
