import ReportTypes from './report.types'

const INITIAL_STATE = {
  getUserTotalStatistics: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getAdminTotalStatistics: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const reportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReportTypes.CLEAR_REPORT_STATE:
      return {
        ...INITIAL_STATE,
      }
    // GET USER TOTAL STATISTICS
    case ReportTypes.GET_USER_TOTAL_STATISTICS:
      return {
        ...state,
        getUserTotalStatistics: {
          ...state.getUserTotalStatistics,
          isLoading: true,
        },
      }
    case ReportTypes.GET_USER_TOTAL_STATISTICS_SUCCESS:
      return {
        ...state,
        getUserTotalStatistics: {
          isLoading: false,
          isSuccess: true,
          data: action.payload.data,
        },
      }
    case ReportTypes.GET_USER_TOTAL_STATISTICS_FAILURE:
      return {
        ...state,
        getUserTotalStatistics: {
          ...state.getUserTotalStatistics,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET ADMIN TOTAL STATISTICS
    case ReportTypes.GET_ADMIN_TOTAL_STATISTICS:
      return {
        ...state,
        getAdminTotalStatistics: {
          ...state.getAdminTotalStatistics,
          isLoading: true,
        },
      }
    case ReportTypes.GET_ADMIN_TOTAL_STATISTICS_SUCCESS:
      return {
        ...state,
        getAdminTotalStatistics: {
          isLoading: false,
          isSuccess: true,
          data: action.payload.data,
        },
      }
    case ReportTypes.GET_ADMIN_TOTAL_STATISTICS_FAILURE:
      return {
        ...state,
        getAdminTotalStatistics: {
          ...state.getAdminTotalStatistics,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default reportReducer
