import ContractTypes from './contract.types'

const INITIAL_STATE = {
  getList: {
    contractList: [],
    numberOfContracts: 0,
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  getListForTeacher: {
    contractList: [],
    numberOfContracts: 0,
    isLoading: false,
    isSuccess: null,
    message: null,
  },
  newContract: {},
  currentContract: {},
}

const contractReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContractTypes.CLEAR_CONTRACT_STATE:
      return {
        ...INITIAL_STATE,
      }
    case ContractTypes.GET_CONTRACT_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
        },
      }
    case ContractTypes.GET_CONTRACT_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: true,
          contractList: action.payload.contractList,
          numberOfContracts: action.payload.numberOfContracts,
        },
      }
    case ContractTypes.GET_CONTRACT_LIST_FAILURE:
      return {
        ...state,
        getList: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    case ContractTypes.GET_CONTRACT_LIST_FOR_TEACHER:
      return {
        ...state,
        getListForTeacher: {
          ...state.getListForTeacher,
          isLoading: true,
        },
      }
    case ContractTypes.GET_CONTRACT_LIST_FOR_TEACHER_SUCCESS:
      return {
        ...state,
        getListForTeacher: {
          isLoading: false,
          isSuccess: true,
          contractList: action.payload.contractList,
          numberOfContracts: action.payload.numberOfContracts,
        },
      }
    case ContractTypes.GET_CONTRACT_LIST_FOR_TEACHER_FAILURE:
      return {
        ...state,
        getListForTeacher: {
          isLoading: false,
          isSuccess: false,
          message: action.payload,
        },
      }
    case ContractTypes.UPDATE_CONTRACT:
      return {
        ...state,
        newContract: action.payload,
      }
    default:
      return state
  }
}

export default contractReducer
