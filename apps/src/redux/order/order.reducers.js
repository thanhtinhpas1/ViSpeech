import OrderTypes from './order.types'

const INITIAL_STATE = {
  getList: {
    orderList: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  newOrder: {},
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderTypes.CLEAR_ORDER_STATE:
      return {
        ...INITIAL_STATE,
      }
    case OrderTypes.GET_ORDER_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case OrderTypes.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: true,
          orderList: action.payload.orderList,
        },
      }
    case OrderTypes.GET_ORDER_LIST_FAILURE:
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

export default orderReducer
