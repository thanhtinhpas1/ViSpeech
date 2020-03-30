import PermissionTypes from './permission.types'

const INITIAL_STATE = {
  assignPermission: {
    permission: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const orderReducer = (state = INITIAL_STATE, action) => {
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
          ...state.assignPermission,
          isLoading: true,
        },
      }
    case PermissionTypes.ASSIGN_PERMISSION_SUCCESS:
      return {
        ...state,
        assignPermission: {
          isLoading: false,
          isSuccess: true,
          permission: action.payload,
        },
      }
    case PermissionTypes.ASSIGN_PERMISSION_FAILURE:
      return {
        ...state,
        assignPermission: {
          ...state.assignPermission,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default orderReducer
