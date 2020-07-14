import RequestTypes from './request.types'

export const onClearRequestState = () => ({
  type: RequestTypes.CLEAR_REQUEST_STATE,
})

export const onClearRequestInfo = () => ({
  type: RequestTypes.CLEAR_REQUEST_INFO,
})

export const onClearUpdateRequestInfo = () => ({
  type: RequestTypes.CLEAR_UPDATE_REQUEST_INFO,
})

// get request info
export const getRequestInfo = id => ({
  type: RequestTypes.GET_REQUEST_INFO,
  payload: id,
})

export const getRequestInfoSuccess = data => ({
  type: RequestTypes.GET_REQUEST_INFO_SUCCESS,
  payload: { data },
})

export const getRequestInfoFailure = message => ({
  type: RequestTypes.GET_REQUEST_INFO_FAILURE,
  payload: message,
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

// get request list by userId
export const getRequestListByUserId = (userId, filterConditions) => ({
  type: RequestTypes.GET_REQUEST_LIST_BY_USERID,
  payload: { userId, filterConditions },
})

export const getRequestListByUserIdSuccess = data => ({
  type: RequestTypes.GET_REQUEST_LIST_BY_USERID_SUCCESS,
  payload: { data },
})

export const getRequestListByUserIdFailure = message => ({
  type: RequestTypes.GET_REQUEST_LIST_BY_USERID_FAILURE,
  payload: message,
})

// update request info
export const updateRequestInfo = (id, data) => ({
  type: RequestTypes.UPDATE_REQUEST_INFO,
  payload: { id, data },
})

export const updateRequestInfoSuccess = data => ({
  type: RequestTypes.UPDATE_REQUEST_INFO_SUCCESS,
  payload: data,
})

export const updateRequestInfoFailure = message => ({
  type: RequestTypes.UPDATE_REQUEST_INFO_FAILURE,
  payload: message,
})

// create request
export const onClearCreateRequestState = () => ({
  type: RequestTypes.CLEAR_CREATE_REQUEST_STATE,
})

export const createRequest = () => ({
  type: RequestTypes.CREATE_REQUEST,
})

export const createRequestSuccess = data => ({
  type: RequestTypes.CREATE_REQUEST_SUCCESS,
  payload: data,
})

export const createRequestFailure = message => ({
  type: RequestTypes.CREATE_REQUEST_FAILURE,
  payload: message,
})
