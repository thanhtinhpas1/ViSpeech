/* eslint-disable no-restricted-globals */
import { call, all, takeLatest, put } from 'redux-saga/effects'
import ProjectTypes from './project.types'
import {
  getMyProjectListSuccess,
  getMyProjectListFailure,
  getAcceptedProjectListSuccess,
  getAcceptedProjectListFailure,
  createProjectSuccess,
  createProjectFailure,
  getProjectInfoSuccess,
  getProjectInfoFailure,
} from './project.actions'
import ProjectService from '../../services/project.service'

// get my project list
function* getMyProjectList({ payload: filterConditions }) {
  try {
    const myProjectList = yield ProjectService.getMyProjectList(filterConditions)
    yield put(getMyProjectListSuccess(myProjectList || []))
  } catch (err) {
    yield put(getMyProjectListFailure(err.message))
  }
}
export function* getMyProjectListSaga() {
  yield takeLatest(ProjectTypes.GET_MY_PROJECT_LIST, getMyProjectList)
}

// get accepted project list
function* getAcceptedProjectList({ payload: filterConditions }) {
  try {
    const myProjectList = yield ProjectService.getAcceptedProjectList(filterConditions)
    yield put(getAcceptedProjectListSuccess(myProjectList || []))
  } catch (err) {
    yield put(getAcceptedProjectListFailure(err.message))
  }
}
export function* getAcceptedProjectListSaga() {
  yield takeLatest(ProjectTypes.GET_ACCEPTED_PROJECT_LIST, getAcceptedProjectList)
}

// create new project
function* createProject({ payload: project }) {
  try {
    yield ProjectService.createProject(project)
    yield put(createProjectSuccess(project))
  } catch (err) {
    yield put(createProjectFailure(err.message))
  }
}
export function* createProjectSaga() {
  yield takeLatest(ProjectTypes.CREATE_PROJECT, createProject)
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
    call(getMyProjectListSaga),
    call(getAcceptedProjectListSaga),
    call(createProjectSaga),
    call(getProjectInfoSaga),
  ])
}
