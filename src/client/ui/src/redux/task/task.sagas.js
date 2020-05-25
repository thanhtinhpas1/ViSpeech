/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import { ORDER_STATUS } from 'utils/constant'
import TaskService from 'services/task.service'
import TaskTypes from './task.types'
import { getTaskListSuccess, getTaskListFailure } from './task.actions'

// get task list
const formatTaskList = taskList => {
  const mapFunc = task => {
    return {
      ...task,
      previousRunStatus: {
        status: task.previousRunStatus,
        name: ORDER_STATUS[task.previousRunStatus]
          ? ORDER_STATUS[task.previousRunStatus].viText
          : task.previousRunStatus,
        class: ORDER_STATUS[task.previousRunStatus] ? ORDER_STATUS[task.previousRunStatus].cssClass : 'badge-success',
      },
    }
  }
  return taskList.map(mapFunc)
}

function* getList({ payload: filterConditions }) {
  try {
    const taskList = yield TaskService.getTaskList(filterConditions)
    taskList.data = formatTaskList(taskList.data)
    yield put(getTaskListSuccess(taskList))
  } catch (err) {
    console.error(err.message)
    yield put(getTaskListFailure(err.message))
  }
}
export function* getTaskListSaga() {
  yield takeLatest(TaskTypes.GET_TASK_LIST, getList)
}

// =================================

export function* taskSaga() {
  yield all([call(getTaskListSaga)])
}
