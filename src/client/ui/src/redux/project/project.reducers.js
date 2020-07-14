import ProjectTypes from './project.types'

const INITIAL_STATE = {
  createProject: {
    data: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getProjectList: {
    projectList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getMyProjectList: {
    myProjectList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getAcceptedProjectList: {
    acceptedProjectList: { data: [], count: 0 },
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getInfo: {
    project: {},
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  updateInfo: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  deleteProject: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
}

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectTypes.CLEAR_PROJECT_STATE:
      return {
        ...INITIAL_STATE,
      }
    // CREATE PROJECT
    case ProjectTypes.CLEAR_CREATE_PROJECT_STATE:
      return {
        ...state,
        createProject: {
          ...INITIAL_STATE.createProject,
        },
      }
    case ProjectTypes.CREATE_PROJECT:
      return {
        ...state,
        createProject: {
          ...INITIAL_STATE.createProject,
          isLoading: true,
        },
      }
    case ProjectTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        createProject: {
          ...INITIAL_STATE.createProject,
          data: action.payload.data,
          isLoading: false,
          isSuccess: true,
        },
      }
    case ProjectTypes.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        createProject: {
          ...INITIAL_STATE.createProject,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET PROJECT LIST
    case ProjectTypes.GET_PROJECT_LIST:
      return {
        ...state,
        getProjectList: {
          ...INITIAL_STATE.getProjectList,
          isLoading: true,
        },
      }
    case ProjectTypes.GET_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        getProjectList: {
          ...INITIAL_STATE.getProjectList,
          isLoading: false,
          isSuccess: true,
          projectList: action.payload.data,
        },
      }
    case ProjectTypes.GET_PROJECT_LIST_FAILURE:
      return {
        ...state,
        getProjectList: {
          ...INITIAL_STATE.getProjectList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET MY PROJECT LIST
    case ProjectTypes.GET_MY_PROJECT_LIST:
      return {
        ...state,
        getMyProjectList: {
          ...INITIAL_STATE.getMyProjectList,
          isLoading: true,
        },
      }
    case ProjectTypes.GET_MY_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        getMyProjectList: {
          ...INITIAL_STATE.getMyProjectList,
          isLoading: false,
          isSuccess: true,
          myProjectList: action.payload.data,
        },
      }
    case ProjectTypes.GET_MY_PROJECT_LIST_FAILURE:
      return {
        ...state,
        getMyProjectList: {
          ...INITIAL_STATE.getMyProjectList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET ACCEPTED PROJECT LIST
    case ProjectTypes.GET_ACCEPTED_PROJECT_LIST:
      return {
        ...state,
        getAcceptedProjectList: {
          ...INITIAL_STATE.getAcceptedProjectList,
          isLoading: true,
        },
      }
    case ProjectTypes.GET_ACCEPTED_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        getAcceptedProjectList: {
          ...INITIAL_STATE.getAcceptedProjectList,
          isLoading: false,
          isSuccess: true,
          acceptedProjectList: action.payload.data,
        },
      }
    case ProjectTypes.GET_ACCEPTED_PROJECT_LIST_FAILURE:
      return {
        ...state,
        getAcceptedProjectList: {
          ...INITIAL_STATE.getAcceptedProjectList,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // GET INFO
    case ProjectTypes.GET_PROJECT_INFO:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
          isLoading: true,
        },
      }
    case ProjectTypes.GET_PROJECT_INFO_SUCCESS:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
          project: action.payload.data,
          isLoading: false,
          isSuccess: true,
        },
      }
    case ProjectTypes.GET_PROJECT_INFO_FAILURE:
      return {
        ...state,
        getInfo: {
          ...INITIAL_STATE.getInfo,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // UPDATE INFO
    case ProjectTypes.CLEAR_UPDATE_PROJECT_INFO_STATE:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
        },
      }
    case ProjectTypes.UPDATE_PROJECT_INFO:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
          isLoading: true,
        },
      }
    case ProjectTypes.UPDATE_PROJECT_INFO_SUCCESS:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
          isLoading: false,
          isSuccess: true,
        },
      }
    case ProjectTypes.UPDATE_PROJECT_INFO_FAILURE:
      return {
        ...state,
        updateInfo: {
          ...INITIAL_STATE.updateInfo,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    // DELETE PROJECT
    case ProjectTypes.CLEAR_DELETE_PROJECT_STATE:
      return {
        ...state,
        deleteProject: {
          ...INITIAL_STATE.deleteProject,
        },
      }
    case ProjectTypes.DELETE_PROJECT:
      return {
        ...state,
        deleteProject: {
          ...INITIAL_STATE.deleteProject,
          isLoading: true,
        },
      }
    case ProjectTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        deleteProject: {
          ...INITIAL_STATE.deleteProject,
          isLoading: false,
          isSuccess: true,
        },
      }
    case ProjectTypes.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        deleteProject: {
          ...INITIAL_STATE.deleteProject,
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    default:
      return state
  }
}

export default projectReducer
