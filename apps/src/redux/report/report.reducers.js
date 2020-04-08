import ReportTypes from './report.types'

const INITIAL_STATE = {
  getStatisticsByprojectId: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getStatisticsBytokenId: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getStatisticsBytokenTypeId: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getUserTokenTypeStatistics: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getUserTotalStatisticsBytoken: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getUserTotalStatisticsByproject: {
    data: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getUserTotalStatisticsBytokenType: {
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
  const returnObj = {
    ...state,
  }
  const returnObjSuccess = {
    ...state,
  }
  const returnObjFailure = {
    ...state,
  }
  // Only for get statistics by id
  if (
    action.type === ReportTypes.GET_STATISTICS_BY_ID ||
    action.type === ReportTypes.GET_STATISTICS_BY_ID_SUCCESS ||
    action.type === ReportTypes.GET_STATISTICS_BY_ID_FAILURE
  ) {
    const getStatisticsById = `getStatisticsBy${action.payload.statisticsType}Id`
    returnObj[getStatisticsById] = {
      ...state[getStatisticsById],
      isLoading: true,
    }
    returnObjSuccess[getStatisticsById] = {
      isLoading: false,
      isSuccess: true,
      data: action.payload.data,
    }
    returnObjFailure[getStatisticsById] = {
      ...state[getStatisticsById],
      isLoading: false,
      isSuccess: false,
      message: action.payload.message,
    }
  }
  // Only for get user total statistics
  if (
    action.type === ReportTypes.GET_USER_TOTAL_STATISTICS ||
    action.type === ReportTypes.GET_USER_TOTAL_STATISTICS_SUCCESS ||
    action.type === ReportTypes.GET_USER_TOTAL_STATISTICS_FAILURE
  ) {
    const getUserTotalStatistics = `getUserTotalStatisticsBy${action.payload.statisticsType}`
    returnObj[getUserTotalStatistics] = {
      ...state[getUserTotalStatistics],
      isLoading: true,
    }
    returnObjSuccess[getUserTotalStatistics] = {
      isLoading: false,
      isSuccess: true,
      data: action.payload.data,
    }
    returnObjFailure[getUserTotalStatistics] = {
      ...state[getUserTotalStatistics],
      isLoading: false,
      isSuccess: false,
      message: action.payload.message,
    }
  }

  switch (action.type) {
    case ReportTypes.CLEAR_REPORT_STATE:
      return {
        ...INITIAL_STATE,
      }
    // GET STATISTICS BY ID
    case ReportTypes.GET_STATISTICS_BY_ID:
      return returnObj
    case ReportTypes.GET_STATISTICS_BY_ID_SUCCESS:
      return returnObjSuccess
    case ReportTypes.GET_STATISTICS_BY_ID_FAILURE:
      return returnObjFailure
    // GET USER TOKEN TYPE STATISTICS
    case ReportTypes.GET_USER_TOKEN_TYPE_STATISTICS:
      return {
        ...state,
        getUserTokenTypeStatistics: {
          ...state.getUserTokenTypeStatistics,
          isLoading: true,
        },
      }
    case ReportTypes.GET_USER_TOKEN_TYPE_STATISTICS_SUCCESS:
      return {
        ...state,
        getUserTokenTypeStatistics: {
          isLoading: false,
          isSuccess: true,
          data: action.payload.data,
        },
      }
    case ReportTypes.GET_USER_TOKEN_TYPE_STATISTICS_FAILURE:
      return {
        ...state,
        getUserTokenTypeStatistics: {
          ...state.getUserTokenTypeStatistics,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET USER TOTAL STATISTICS
    case ReportTypes.GET_USER_TOTAL_STATISTICS:
      return returnObj
    case ReportTypes.GET_USER_TOTAL_STATISTICS_SUCCESS:
      return returnObjSuccess
    case ReportTypes.GET_USER_TOTAL_STATISTICS_FAILURE:
      return returnObjFailure
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
          message: action.payload.message,
        },
      }
    default:
      return state
  }
}

export default reportReducer
