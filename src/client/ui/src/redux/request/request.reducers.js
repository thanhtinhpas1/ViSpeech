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
    requestId: null,
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  createRequest: {
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
    // GET INFO
    case RequestTypes.CLEAR_REQUEST_INFO:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
        },
      }
    case RequestTypes.GET_REQUEST_INFO:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
          isLoading: true,
        },
      }
    case RequestTypes.GET_REQUEST_INFO_SUCCESS:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
          request: action.payload.data,
          isLoading: false,
          isSuccess: true,
        },
      }
    case RequestTypes.GET_REQUEST_INFO_FAILURE:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
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
          ...INITIAL_STATE.getList,
          isLoading: true,
        },
      }
    case RequestTypes.GET_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          ...INITIAL_STATE.getList,
          isLoading: false,
          isSuccess: true,
          requestList: action.payload.data,
        },
      }
    case RequestTypes.GET_REQUEST_LIST_FAILURE:
      return {
        ...state,
        getList: {
          ...INITIAL_STATE.getList,
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
          ...INITIAL_STATE.getListByUserId,
          isLoading: true,
        },
      }
    case RequestTypes.GET_REQUEST_LIST_BY_USERID_SUCCESS:
      return {
        ...state,
        getListByUserId: {
          ...INITIAL_STATE.getListByUserId,
          isLoading: false,
          isSuccess: true,
          requestList: action.payload.data,
        },
      }
    case RequestTypes.GET_REQUEST_LIST_BY_USERID_FAILURE:
      return {
        ...state,
        getListByUserId: {
          ...INITIAL_STATE.getListByUserId,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // UPDATE INFO
    case RequestTypes.CLEAR_UPDATE_REQUEST_INFO:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
        },
      }
    case RequestTypes.UPDATE_REQUEST_INFO:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
          requestId: action.payload.id,
          isLoading: true,
        },
      }
    case RequestTypes.UPDATE_REQUEST_INFO_SUCCESS:
      return {
        ...state,
        updateInfo: {
          ...state.updateInfo,
          isLoading: false,
          isSuccess: true,
          message: null,
        },
      }
    case RequestTypes.UPDATE_REQUEST_INFO_FAILURE:
      return {
        ...state,
        updateInfo: {
          ...state.updateInfo,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // CREATE REQUEST
    case RequestTypes.CLEAR_CREATE_REQUEST_STATE:
      return {
        ...state,
        createRequest: {
          ...INITIAL_STATE.createRequest,
        },
      }
    case RequestTypes.CREATE_REQUEST:
      return {
        ...state,
        createRequest: {
          ...INITIAL_STATE.createRequest,
          isLoading: true,
        },
      }
    case RequestTypes.CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        createRequest: {
          ...INITIAL_STATE.createRequest,
          isLoading: false,
          isSuccess: true,
        },
      }
    case RequestTypes.CREATE_REQUEST_FAILURE:
      return {
        ...state,
        createRequest: {
          ...INITIAL_STATE.createRequest,
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
