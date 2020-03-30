import ProjectTypes from './project.types'

export const onClearOrderState = () => ({
  type: ProjectTypes.CLEAR_PROJECT_STATE,
})

// get my project list
export const getMyProjectList = filterConditions => ({
  type: ProjectTypes.GET_MY_PROJECT_LIST,
  payload: filterConditions,
})

export const getMyProjectListSuccess = myProjectList => ({
  type: ProjectTypes.GET_MY_PROJECT_LIST_SUCCESS,
  payload: { myProjectList },
})

export const getMyProjectListFailure = message => ({
  type: ProjectTypes.GET_MY_PROJECT_LIST_FAILURE,
  payload: message,
})

// get accepted project list
export const getAcceptedProjectList = filterConditions => ({
  type: ProjectTypes.GET_ACCEPTED_PROJECT_LIST,
  payload: filterConditions,
})

export const getAcceptedProjectListSuccess = acceptedProjectList => ({
  type: ProjectTypes.GET_ACCEPTED_PROJECT_LIST_SUCCESS,
  payload: { acceptedProjectList },
})

export const getAcceptedProjectListFailure = message => ({
  type: ProjectTypes.GET_ACCEPTED_PROJECT_LIST_FAILURE,
  payload: message,
})

// create project
export const createProject = data => ({
  type: ProjectTypes.CREATE_PROJECT,
  payload: data,
})

export const createProjectSuccess = project => ({
  type: ProjectTypes.CREATE_PROJECT_SUCCESS,
  payload: { project },
})

export const createProjectFailure = message => ({
  type: ProjectTypes.CREATE_PROJECT_FAILURE,
  payload: message,
})

// get project info
export const getProjectInfo = id => ({
  type: ProjectTypes.GET_PROJECT_INFO,
  payload: id,
})

export const getProjectInfoSuccess = data => ({
  type: ProjectTypes.GET_PROJECT_INFO_SUCCESS,
  payload: data,
})

export const getProjectInfoFailure = message => ({
  type: ProjectTypes.GET_PROJECT_INFO_FAILURE,
  payload: message,
})
