import { connect } from 'react-redux'
import {
  onClearUpdatePermissionExpirationDateState,
  findPermissionForAssignee,
  updatePermissionExpirationDate,
  updatePermissionExpirationDateSuccess,
  updatePermissionExpirationDateFailure,
} from '../../../redux/permission/permission.actions'
import UpdatePermissionPage from './UpdatePermissionPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  findPermissionForAssigneeObj: state.permission.findPermissionForAssignee,
  updatePermissionExpirationDateObj: state.permission.updatePermissionExpirationDate,
})

const mapDispatchToProps = dispatch => ({
  clearUpdatePermissionExpirationDateState: () => dispatch(onClearUpdatePermissionExpirationDateState()),
  findPermissionForAssignee: (projectId, assignerId, assigneeId, status) =>
    dispatch(findPermissionForAssignee(projectId, assignerId, assigneeId, status)),
  updatePermissionExpirationDate: (projectId, assignerId, assigneeId, expiresIn) =>
    dispatch(updatePermissionExpirationDate(projectId, assignerId, assigneeId, expiresIn)),
  updatePermissionExpirationDateSuccess: () => dispatch(updatePermissionExpirationDateSuccess()),
  updatePermissionExpirationDateFailure: message => dispatch(updatePermissionExpirationDateFailure(message)),
})

const UpdatePermissionPageContainer = connect(mapStateToProps, mapDispatchToProps)(UpdatePermissionPage)

export default UpdatePermissionPageContainer
