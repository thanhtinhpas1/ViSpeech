import ContractTypes from './contract.types'

export const onClearContractState = () => ({
  type: ContractTypes.CLEAR_CONTRACT_STATE,
})

//= == get contract list
export const getContractList = filterConditions => ({
  type: ContractTypes.GET_CONTRACT_LIST,
  payload: filterConditions,
})
export const getContractListSuccess = (contractList, numberOfContracts) => ({
  type: ContractTypes.GET_CONTRACT_LIST_SUCCESS,
  payload: { contractList, numberOfContracts },
})
export const getContractListFailure = message => ({
  type: ContractTypes.GET_CONTRACT_LIST_FAILURE,
  payload: message,
})

//= == get contract list for teacher page
export const getContractListForTeacher = filterConditions => ({
  type: ContractTypes.GET_CONTRACT_LIST_FOR_TEACHER,
  payload: filterConditions,
})
export const getContractListForTeacherSuccess = (contractList, numberOfContracts) => ({
  type: ContractTypes.GET_CONTRACT_LIST_FOR_TEACHER_SUCCESS,
  payload: { contractList, numberOfContracts },
})
export const getContractListForTeacherFailure = message => ({
  type: ContractTypes.GET_CONTRACT_LIST_FOR_TEACHER_FAILURE,
  payload: message,
})

export const createContract = contract => ({
  type: ContractTypes.CREATE_CONTRACT,
  payload: contract,
})

export const updateContract = contract => ({
  type: ContractTypes.UPDATE_CONTRACT,
  payload: contract,
})
