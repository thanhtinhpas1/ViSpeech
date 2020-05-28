import ProjectTypes from './project.types'

export const onClearProjectState = () => ({
  type: ProjectTypes.CLEAR_PROJECT_STATE,
})

// get project list
export const getProjectList = filterConditions => ({
  type: ProjectTypes.GET_PROJECT_LIST,
  payload: filterConditions,
})

export const getProjectListSuccess = data => ({
  type: ProjectTypes.GET_PROJECT_LIST_SUCCESS,
  payload: { data },
})

export const getProjectListFailure = message => ({
  type: ProjectTypes.GET_PROJECT_LIST_FAILURE,
  payload: message,
})

// get my project list
export const getMyProjectList = filterConditions => ({
  type: ProjectTypes.GET_MY_PROJECT_LIST,
  payload: filterConditions,
})

export const getMyProjectListSuccess = data => ({
  type: ProjectTypes.GET_MY_PROJECT_LIST_SUCCESS,
  payload: { data },
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

export const getAcceptedProjectListSuccess = data => ({
  type: ProjectTypes.GET_ACCEPTED_PROJECT_LIST_SUCCESS,
  payload: { data },
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

export const createProjectSuccess = data => ({
  type: ProjectTypes.CREATE_PROJECT_SUCCESS,
  payload: { data },
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
  payload: { data },
})

export const getProjectInfoFailure = message => ({
  type: ProjectTypes.GET_PROJECT_INFO_FAILURE,
  payload: message,
})

// update project info
export const updateProjectInfo = (id, data) => ({
  type: ProjectTypes.UPDATE_PROJECT_INFO,
  payload: { id, data },
})

export const updateProjectInfoSuccess = data => ({
  type: ProjectTypes.UPDATE_PROJECT_INFO_SUCCESS,
  payload: data,
})

export const updateProjectInfoFailure = message => ({
  type: ProjectTypes.UPDATE_PROJECT_INFO_FAILURE,
  payload: message,
})

// delete project
export const deleteProject = id => ({
  type: ProjectTypes.DELETE_PROJECT,
  payload: id,
})

export const deleteProjectSuccess = () => ({
  type: ProjectTypes.DELETE_PROJECT_SUCCESS,
})

export const deleteProjectFailure = message => ({
  type: ProjectTypes.DELETE_PROJECT_FAILURE,
  payload: message,
})
