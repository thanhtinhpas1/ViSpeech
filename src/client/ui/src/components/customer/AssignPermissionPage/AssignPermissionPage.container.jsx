import { connect } from 'react-redux'
import { getMyProjectList } from 'redux/project/project.actions'
import { assignPermission, assignPermissionSuccess, assignPermissionFailure } from 'redux/permission/permission.actions'
import AssignPermissionPage from './AssignPermissionPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getMyProjectListObj: state.project.getMyProjectList,
  assignPermissionObj: state.permission.assignPermission,
})

const mapDispatchToProps = dispatch => ({
  getMyProjects: ({ userId }) => dispatch(getMyProjectList({ userId })),
  assignPermission: ({ assigneeUsername, projectId, permissions, assignerId }) =>
    dispatch(assignPermission({ assigneeUsername, projectId, permissions, assignerId })),
  assignPermissionSuccess: ({ assigneeUsername, projectId, permissions, assignerId }) =>
    dispatch(assignPermissionSuccess({ assigneeUsername, projectId, permissions, assignerId })),
  assignPermissionFailure: message => dispatch(assignPermissionFailure(message)),
})

const AssignPermissionPageContainer = connect(mapStateToProps, mapDispatchToProps)(AssignPermissionPage)

export default AssignPermissionPageContainer
