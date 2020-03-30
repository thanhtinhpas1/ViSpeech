import { connect } from 'react-redux'
import { authenticate } from 'redux/user/user.actions'
import { replyPermissionAssign } from 'redux/permission/permission.actions'
import ReplyPermissionAssignPage from './ReplyPermissionAssignPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  replyPermissionAssignObj: state.permission.replyPermissionAssign,
})

const mapDispatchToProps = dispatch => ({
  replyPermissionAssign: ({ emailToken, status }) =>
    dispatch(replyPermissionAssign({ emailToken, status })),
  onAuthenticate: token => dispatch(authenticate(token)),
})

const ReplyPermissionAssignPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyPermissionAssignPage)

export default ReplyPermissionAssignPageContainer
