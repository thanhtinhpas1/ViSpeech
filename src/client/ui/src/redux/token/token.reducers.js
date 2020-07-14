import TokenTypes from './token.types'

const INITIAL_STATE = {
  getFreeToken: {
    freeToken: null,
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
  getUserTokenList: {
    userTokenList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
  getTokenList: {
    tokenList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
  // getTotalTokens: {
  //   tokenList: { data: [], count: 0 },
  //   isLoading: false,
  //   isSuccess: null,
  //   errorMessage: null,
  // },
  getProjectTokenList: {
    projectTokenList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
  getTokenTypeList: {
    tokenTypeList: [],
    isLoading: false,
    isSuccess: null,
    errorMessage: null,
  },
  deleteToken: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TokenTypes.CLEAR_TOKEN_STATE:
      return {
        ...INITIAL_STATE,
      }
    // GET USER TOKENS
    case TokenTypes.GET_USER_TOKENS:
      return {
        ...state,
        getUserTokenList: {
          ...INITIAL_STATE.getUserTokenList,
          isLoading: true,
        },
      }
    case TokenTypes.GET_USER_TOKENS_SUCCESS:
      return {
        ...state,
        getUserTokenList: {
          ...INITIAL_STATE.getUserTokenList,
          isLoading: false,
          isSuccess: true,
          userTokenList: action.payload.data,
        },
      }
    case TokenTypes.GET_USER_TOKENS_FAILURE:
      return {
        ...state,
        getUserTokenList: {
          ...INITIAL_STATE.getUserTokenList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET TOKENS
    case TokenTypes.GET_TOKENS:
      return {
        ...state,
        getTokenList: {
          ...INITIAL_STATE.getTokenList,
          isLoading: true,
        },
      }
    // case TokenTypes.GET_TOTAL_TOKENS:
    //   return {
    //     ...state,
    //     getTotalTokens: {
    //       ...state.getTotalTokens,
    //       isLoading: true,
    //     },
    //   }
    case TokenTypes.GET_TOKENS_SUCCESS:
      return {
        ...state,
        getTokenList: {
          ...INITIAL_STATE.getTokenList,
          isLoading: false,
          isSuccess: true,
          tokenList: action.payload.data,
        },
      }
    case TokenTypes.GET_TOKENS_FAILURE:
      return {
        ...state,
        getTokenList: {
          ...INITIAL_STATE.getTokenList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET PROJECT TOKENS
    case TokenTypes.GET_PROJECT_TOKENS:
      return {
        ...state,
        getProjectTokenList: {
          ...INITIAL_STATE.getProjectTokenList,
          isLoading: true,
        },
      }
    case TokenTypes.GET_PROJECT_TOKENS_SUCCESS:
      return {
        ...state,
        getProjectTokenList: {
          ...INITIAL_STATE.getProjectTokenList,
          isLoading: false,
          isSuccess: true,
          projectTokenList: action.payload.data,
        },
      }
    case TokenTypes.GET_PROJECT_TOKENS_FAILURE:
      return {
        ...state,
        getProjectTokenList: {
          ...INITIAL_STATE.getProjectTokenList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET TOKEN TYPES
    case TokenTypes.GET_TOKEN_TYPES:
      return {
        ...state,
        getTokenTypeList: {
          ...INITIAL_STATE.getTokenTypeList,
          isLoading: true,
        },
      }
    case TokenTypes.GET_TOKEN_TYPES_SUCCESS:
      return {
        ...state,
        getTokenTypeList: {
          ...INITIAL_STATE.getTokenTypeList,
          isLoading: false,
          isSuccess: true,
          tokenTypeList: action.payload.data,
        },
      }
    case TokenTypes.GET_TOKEN_TYPES_FAILURE:
      return {
        ...state,
        getTokenTypeList: {
          ...INITIAL_STATE.getTokenTypeList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET FREE TOKEN
    case TokenTypes.GET_FREE_TOKEN:
      return {
        ...state,
        getFreeToken: {
          ...INITIAL_STATE.getFreeToken,
          isLoading: true,
        },
      }
    case TokenTypes.GET_FREE_TOKEN_SUCCESS:
      return {
        ...state,
        getFreeToken: {
          ...INITIAL_STATE.getFreeToken,
          isLoading: false,
          isSuccess: true,
          freeToken: action.payload.data,
        },
      }
    case TokenTypes.GET_FREE_TOKEN_FAILURE:
      return {
        ...state,
        getFreeToken: {
          ...INITIAL_STATE.getFreeToken,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // DELETE TOKEN
    case TokenTypes.DELETE_TOKEN:
      return {
        ...state,
        deleteToken: {
          ...INITIAL_STATE.deleteToken,
          isLoading: true,
        },
      }
    case TokenTypes.DELETE_TOKEN_SUCCESS:
      return {
        ...state,
        deleteToken: {
          ...INITIAL_STATE.deleteToken,
          isLoading: false,
          isSuccess: true,
        },
      }
    case TokenTypes.DELETE_TOKEN_FAILURE:
      return {
        ...state,
        deleteToken: {
          ...INITIAL_STATE.deleteToken,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default tokenReducer
