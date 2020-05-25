import TaskTypes from './task.types'

export const onClearTaskState = () => ({
  type: TaskTypes.CLEAR_TASK_STATE,
})

// get task list
export const getTaskList = filterConditions => ({
  type: TaskTypes.GET_TASK_LIST,
  payload: filterConditions,
})

export const getTaskListSuccess = data => ({
  type: TaskTypes.GET_TASK_LIST_SUCCESS,
  payload: { data },
})

export const getTaskListFailure = message => ({
  type: TaskTypes.GET_TASK_LIST_FAILURE,
  payload: message,
})
