import MonitorTypes from './monitor.types'

export const onClearMonitorState = () => ({
  type: MonitorTypes.CLEAR_Monitor_STATE,
})

// get monitor list
export const getMonitorList = filterConditions => ({
  type: MonitorTypes.GET_MONITORS,
  payload: filterConditions,
})

export const getMonitorListSuccess = data => ({
  type: MonitorTypes.GET_MONITORS_SUCCESS,
  payload: data,
})

export const getMonitorListFailure = message => ({
  type: MonitorTypes.GET_MONITORS_FAILURE,
  payload: message,
})
