import { connect } from 'react-redux'
import { getMyProjectList } from 'redux/project/project.actions'
import { assignPermission } from 'redux/permission/permission.actions'
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
})

const AssignPermissionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignPermissionPage)

export default AssignPermissionPageContainer
