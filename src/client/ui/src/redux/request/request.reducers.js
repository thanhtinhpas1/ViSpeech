import RequestTypes from './request.types'

const INITIAL_STATE = {
  getList: {
    requestList: { data: [], count: 0 },
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
    default:
      return state
  }
}

export default requestReducer
