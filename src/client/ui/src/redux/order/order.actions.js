import OrderTypes from './order.types'

export const onClearOrderState = () => ({
  type: OrderTypes.CLEAR_ORDER_STATE,
})

export const onClearCreateOrderState = () => ({
  type: OrderTypes.CLEAR_CREATE_ORDER_STATE,
})

// get order list
export const getOrderList = filterConditions => ({
  type: OrderTypes.GET_ORDER_LIST,
  payload: filterConditions,
})

export const getOrderListSuccess = data => ({
  type: OrderTypes.GET_ORDER_LIST_SUCCESS,
  payload: { data },
})

export const getOrderListFailure = message => ({
  type: OrderTypes.GET_ORDER_LIST_FAILURE,
  payload: message,
})

// get user order list
export const getUserOrderList = filterConditions => ({
  type: OrderTypes.GET_USER_ORDER_LIST,
  payload: filterConditions,
})

export const getUserOrderListSuccess = data => ({
  type: OrderTypes.GET_USER_ORDER_LIST_SUCCESS,
  payload: { data },
})

export const getUserOrderListFailure = message => ({
  type: OrderTypes.GET_USER_ORDER_LIST_FAILURE,
  payload: message,
})

// get order info
export const getOrderInfo = ({ id, tokenId }) => ({
  type: OrderTypes.GET_ORDER_INFO,
  payload: { id, tokenId },
})

export const getOrderInfoSuccess = data => ({
  type: OrderTypes.GET_ORDER_INFO_SUCCESS,
  payload: { data },
})

export const getOrderInfoFailure = message => ({
  type: OrderTypes.GET_ORDER_INFO_FAILURE,
  payload: message,
})

// create order
export const createOrder = data => ({
  type: OrderTypes.CREATE_ORDER,
  payload: data,
})

export const createOrderSuccess = ({ order, token }) => ({
  type: OrderTypes.CREATE_ORDER_SUCCESS,
  payload: { order, token },
})

export const createOrderFailure = message => ({
  type: OrderTypes.CREATE_ORDER_FAILURE,
  payload: message,
})
