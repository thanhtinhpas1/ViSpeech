import MonitorTypes from './monitor.types'

const INITIAL_STATE = {
  getMonitorList: {
    monitorList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const MonitorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MonitorTypes.CLEAR_MONITOR_STATE:
      return {
        ...INITIAL_STATE,
      }
    // get monitors
    case MonitorTypes.GET_MONITORS:
      return {
        ...state,
        getMonitorList: {
          ...INITIAL_STATE.getMonitorList,
          isLoading: true,
        },
      }
    case MonitorTypes.GET_MONITORS_SUCCESS:
      return {
        ...state,
        getMonitorList: {
          ...INITIAL_STATE.getMonitorList,
          isLoading: false,
          isSuccess: true,
          monitorList: action.payload,
        },
      }
    case MonitorTypes.GET_MONITORS_FAILURE:
      return {
        ...state,
        getMonitorList: {
          ...INITIAL_STATE.getMonitorList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default MonitorReducer
