import { connect } from 'react-redux'
import { getMyProjectList } from 'redux/project/project.actions'
import {
  assignPermission,
  assignPermissionFailure,
  assignPermissionSuccess,
  onClearAssignPermissionState,
} from 'redux/permission/permission.actions'
import { getUserList } from 'redux/user/user.actions'
import AssignPermissionPage from './AssignPermissionPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
  getUserListObj: state.user.getList,
  assignPermissionObj: state.permission.assignPermission,
})

const mapDispatchToProps = dispatch => ({
  clearAssignPermissionState: () => dispatch(onClearAssignPermissionState()),
  getUserList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getUserList({ pagination, sortField, sortOrder, filters })),
  getMyProjects: ({ userId }) => dispatch(getMyProjectList({ userId })),
  assignPermission: ({ assigneeUsername, projectId, permissions, assignerId }) =>
    dispatch(assignPermission({ assigneeUsername, projectId, permissions, assignerId })),
  assignPermissionSuccess: ({ assigneeUsername, projectId, permissions, assignerId }) =>
    dispatch(assignPermissionSuccess({ assigneeUsername, projectId, permissions, assignerId })),
  assignPermissionFailure: message => dispatch(assignPermissionFailure(message)),
})

const AssignPermissionPageContainer = connect(mapStateToProps, mapDispatchToProps)(AssignPermissionPage)

export default AssignPermissionPageContainer
