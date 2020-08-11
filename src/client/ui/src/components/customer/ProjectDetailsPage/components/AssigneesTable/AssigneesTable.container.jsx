import { connect } from 'react-redux'
import AssigneesTable from './AssigneesTable.component'
import { getProjectAssigneeList } from '../../../../../redux/user/user.actions'
import {
  deletePermissionForAssignee,
  onClearDeletePermissionForAssigneeState,
  deletePermissionForAssigneeSuccess,
  deletePermissionForAssigneeFailure,
} from '../../../../../redux/permission/permission.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getProjectAssigneeListObj: state.user.getProjectAssigneeList,
  deletePermissionForAssigneeObj: state.permission.deletePermissionForAssignee,
})

const mapDispatchToProps = dispatch => ({
  getProjectAssignees: projectId => dispatch(getProjectAssigneeList(projectId)),
  clearDeletePermissionForAssigneeState: () => dispatch(onClearDeletePermissionForAssigneeState()),
  deletePermissionForAssignee: (projectId, assignerId, assigneeId) =>
    dispatch(deletePermissionForAssignee(projectId, assignerId, assigneeId)),
  deletePermissionForAssigneeSuccess: () => dispatch(deletePermissionForAssigneeSuccess()),
  deletePermissionForAssigneeFailure: message => dispatch(deletePermissionForAssigneeFailure(message)),
})

const AssigneesTableContainer = connect(mapStateToProps, mapDispatchToProps)(AssigneesTable)

export default AssigneesTableContainer
