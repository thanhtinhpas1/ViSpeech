/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import { STATUS } from '../../utils/constant'
import ProjectService from '../../services/project.service'
import ProjectTypes from './project.types'
import {
  getMyProjectListSuccess,
  getMyProjectListFailure,
  getAcceptedProjectListSuccess,
  getAcceptedProjectListFailure,
  getProjectInfoSuccess,
  getProjectInfoFailure,
  getProjectListSuccess,
  getProjectListFailure,
  getProjectNameListSuccess,
  getProjectNameListFailure,
} from './project.actions'

const formatProjectList = projectList => {
  const mapFunc = project => {
    return {
      ...project,
      isValid: project.isValid ? STATUS.VALID : STATUS.INVALID,
    }
  }
  return projectList.map(mapFunc)
}

// get project list
function* getProjectList({ payload: filterConditions }) {
  try {
    const projectList = yield ProjectService.getProjectList(filterConditions)
    projectList.data = formatProjectList(projectList.data)
    yield put(getProjectListSuccess(projectList))
  } catch (err) {
    yield put(getProjectListFailure(err.message))
  }
}
export function* getProjectListSaga() {
  yield takeLatest(ProjectTypes.GET_PROJECT_LIST, getProjectList)
}

// get my project list
function* getMyProjectList({ payload: filterConditions }) {
  try {
    const projectList = yield ProjectService.getMyProjectList(filterConditions)
    projectList.data = formatProjectList(projectList.data)
    yield put(getMyProjectListSuccess(projectList))
  } catch (err) {
    yield put(getMyProjectListFailure(err.message))
  }
}
export function* getMyProjectListSaga() {
  yield takeLatest(ProjectTypes.GET_MY_PROJECT_LIST, getMyProjectList)
}

// get accepted project list
const formatAcceptedProjectList = acceptedProjectList => {
  const mapFunc = project => {
    return {
      ...project,
      status: {
        value: project.status,
        name: STATUS[project.status].viText,
        class: STATUS[project.status].cssClass,
      },
      isValid: project.isValid ? STATUS.VALID : STATUS.INVALID,
    }
  }
  return acceptedProjectList.map(mapFunc)
}

function* getAcceptedProjectList({ payload: filterConditions }) {
  try {
    const projectList = yield ProjectService.getAcceptedProjectList(filterConditions)
    projectList.data = formatAcceptedProjectList(projectList.data)
    yield put(getAcceptedProjectListSuccess(projectList))
  } catch (err) {
    yield put(getAcceptedProjectListFailure(err.message))
  }
}
export function* getAcceptedProjectListSaga() {
  yield takeLatest(ProjectTypes.GET_ACCEPTED_PROJECT_LIST, getAcceptedProjectList)
}

// ==== get project name list
export function* getProjectNameList({ payload: filterConditions }) {
  try {
    const projectNameList = yield ProjectService.getProjectNameList(filterConditions)
    yield put(getProjectNameListSuccess(projectNameList))
  } catch (err) {
    yield put(getProjectNameListFailure(err.message))
  }
}

export function* getProjectNameListSaga() {
  yield takeLatest(ProjectTypes.GET_PROJECT_NAME_LIST, getProjectNameList)
}

// ==== get project info
export function* getProjectInfo({ payload: id }) {
  try {
    const projectInfo = yield ProjectService.getProjectInfo(id)
    yield put(getProjectInfoSuccess(projectInfo))
  } catch (err) {
    yield put(getProjectInfoFailure(err.message))
  }
}

export function* getProjectInfoSaga() {
  yield takeLatest(ProjectTypes.GET_PROJECT_INFO, getProjectInfo)
}

// =================================

export function* projectSaga() {
  yield all([
    call(getProjectListSaga),
    call(getMyProjectListSaga),
    call(getAcceptedProjectListSaga),
    call(getProjectNameListSaga),
    call(getProjectInfoSaga),
  ])
}
