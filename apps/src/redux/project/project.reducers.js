import ProjectTypes from './project.types'

const INITIAL_STATE = {
  createProject: {
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getMyProjectList: {
    myProjectList: [],
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getAcceptedProjectList: {
    acceptedProjectList: [],
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
}

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectTypes.CLEAR_PROJECT_STATE:
      return {
        ...INITIAL_STATE,
      }
    // CREATE PROJECT
    case ProjectTypes.CREATE_PROJECT:
      return {
        ...state,
        createProject: {
          ...state.createProject,
          isLoading: true,
        },
      }
    case ProjectTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        createProject: {
          isLoading: false,
          isSuccess: true,
        },
      }
    case ProjectTypes.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        createProject: {
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
          ...state.getMyProjectList,
          isLoading: true,
        },
      }
    case ProjectTypes.GET_MY_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        getMyProjectList: {
          isLoading: false,
          isSuccess: true,
          myProjectList: action.payload.myProjectList,
        },
      }
    case ProjectTypes.GET_MY_PROJECT_LIST_FAILURE:
      return {
        ...state,
        getMyProjectList: {
          ...state.getMyProjectList,
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
          ...state.getAcceptedProjectList,
          isLoading: true,
        },
      }
    case ProjectTypes.GET_ACCEPTED_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        getAcceptedProjectList: {
          isLoading: false,
          isSuccess: true,
          acceptedProjectList: action.payload.acceptedProjectList,
        },
      }
    case ProjectTypes.GET_ACCEPTED_PROJECT_LIST_FAILURE:
      return {
        ...state,
        getAcceptedProjectList: {
          ...state.getAcceptedProjectList,
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
          ...state.getInfo,
          isLoading: true,
        },
      }
    case ProjectTypes.GET_PROJECT_INFO_SUCCESS:
      return {
        ...state,
        getInfo: {
          project: action.payload,
          isLoading: false,
          isSuccess: true,
        },
      }
    case ProjectTypes.GET_PROJECT_INFO_FAILURE:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
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
