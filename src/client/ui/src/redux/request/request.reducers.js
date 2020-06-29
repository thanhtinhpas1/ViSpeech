import RequestTypes from './request.types'

const INITIAL_STATE = {
  getInfo: {
    request: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getList: {
    requestList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getListByUserId: {
    requestList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  updateInfo: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RequestTypes.CLEAR_REQUEST_STATE:
      return {
        ...INITIAL_STATE,
      }
    case RequestTypes.CLEAR_REQUEST_INFO:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
        },
      }
    // GET INFO
    case RequestTypes.GET_REQUEST_INFO:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          isLoading: true,
        },
      }
    case RequestTypes.GET_REQUEST_INFO_SUCCESS:
      return {
        ...state,
        getInfo: {
          request: action.payload.data,
          isLoading: false,
          isSuccess: true,
        },
      }
    case RequestTypes.GET_REQUEST_INFO_FAILURE:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET REQUEST LIST
    case RequestTypes.GET_REQUEST_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case RequestTypes.GET_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: true,
          requestList: action.payload.data,
        },
      }
    case RequestTypes.GET_REQUEST_LIST_FAILURE:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET REQUEST LIST BY USERID
    case RequestTypes.GET_REQUEST_LIST_BY_USERID:
      return {
        ...state,
        getListByUserId: {
          ...state.getListByUserId,
          isLoading: true,
        },
      }
    case RequestTypes.GET_REQUEST_LIST_BY_USERID_SUCCESS:
      return {
        ...state,
        getListByUserId: {
          isLoading: false,
          isSuccess: true,
          requestList: action.payload.data,
        },
      }
    case RequestTypes.GET_REQUEST_LIST_BY_USERID_FAILURE:
      return {
        ...state,
        getListByUserId: {
          ...state.getListByUserId,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // UPDATE INFO
    case RequestTypes.UPDATE_REQUEST_INFO:
      return {
        ...state,
        updateInfo: {
          ...state.updateInfo,
          isLoading: true,
        },
      }
    case RequestTypes.UPDATE_REQUEST_INFO_SUCCESS:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: true,
        },
      }
    case RequestTypes.UPDATE_REQUEST_INFO_FAILURE:
      return {
        ...state,
        updateInfo: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default requestReducer
