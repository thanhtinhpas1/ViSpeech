import { connect } from 'react-redux'
import { getMyProjectList } from 'redux/project/project.actions'
import {
  assignPermission,
  assignPermissionSuccess,
  assignPermissionFailure,
  onClearAssignPermissionState,
} from 'redux/permission/permission.actions'
import { getUsernameList } from 'redux/user/user.actions'
import AssignPermissionPage from './AssignPermissionPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
  getUsernameListObj: state.user.getUsernameList,
  assignPermissionObj: state.permission.assignPermission,
})

const mapDispatchToProps = dispatch => ({
  clearAssignPermissionState: () => dispatch(onClearAssignPermissionState()),
  getUsernameList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getUsernameList({ pagination, sortField, sortOrder, filters })),
  getMyProjects: ({ userId }) => dispatch(getMyProjectList({ userId })),
  assignPermission: ({ assigneeUsername, projectId, permissions, assignerId }) =>
    dispatch(assignPermission({ assigneeUsername, projectId, permissions, assignerId })),
  assignPermissionSuccess: ({ assigneeUsername, projectId, permissions, assignerId }) =>
    dispatch(assignPermissionSuccess({ assigneeUsername, projectId, permissions, assignerId })),
  assignPermissionFailure: message => dispatch(assignPermissionFailure(message)),
})

const AssignPermissionPageContainer = connect(mapStateToProps, mapDispatchToProps)(AssignPermissionPage)

export default AssignPermissionPageContainer
