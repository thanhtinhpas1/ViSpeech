import RequestTypes from './request.types'

export const onClearRequestState = () => ({
  type: RequestTypes.CLEAR_REQUEST_STATE,
})

// get request list
export const getRequestList = filterConditions => ({
  type: RequestTypes.GET_REQUEST_LIST,
  payload: filterConditions,
})

export const getRequestListSuccess = data => ({
  type: RequestTypes.GET_REQUEST_LIST_SUCCESS,
  payload: { data },
})

export const getRequestListFailure = message => ({
  type: RequestTypes.GET_REQUEST_LIST_FAILURE,
  payload: message,
})
