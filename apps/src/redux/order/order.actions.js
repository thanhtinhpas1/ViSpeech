import OrderTypes from './order.types'

export const onClearOrderState = () => ({
  type: OrderTypes.CLEAR_ORDER_STATE,
})

// get order list
export const getOrderList = filterConditions => ({
  type: OrderTypes.GET_ORDER_LIST,
  payload: filterConditions,
})

export const getOrderListSuccess = orderList => ({
  type: OrderTypes.GET_ORDER_LIST_SUCCESS,
  payload: { orderList },
})

export const getOrderListFailure = message => ({
  type: OrderTypes.GET_ORDER_LIST_FAILURE,
  payload: message,
})

export const createOrder = data => ({
  type: OrderTypes.CREATE_ORDER,
  payload: data,
})
