import TaskTypes from './task.types'

const INITIAL_STATE = {
  getList: {
    taskList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TaskTypes.CLEAR_TASK_STATE:
      return {
        ...INITIAL_STATE,
      }
    // GET TASK LIST
    case TaskTypes.GET_TASK_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case TaskTypes.GET_TASK_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: true,
          taskList: action.payload.data,
        },
      }
    case TaskTypes.GET_TASK_LIST_FAILURE:
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

export default taskReducer
