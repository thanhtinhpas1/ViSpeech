import { connect } from 'react-redux'
import { authenticate } from 'redux/user/user.actions'
import {
  replyPermissionAssign,
  replyPermissionAssignSuccess,
  replyPermissionAssignFailure,
  findPermissionByEmailToken,
} from 'redux/permission/permission.actions'
import ReplyPermissionAssignPage from './ReplyPermissionAssignPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  findPermissionByEmailTokenObj: state.permission.findPermissionByEmailToken,
  replyPermissionAssignObj: state.permission.replyPermissionAssign,
})

const mapDispatchToProps = dispatch => ({
  findPermissionByEmailToken: queryParams => dispatch(findPermissionByEmailToken(queryParams)),
  replyPermissionAssign: ({ emailToken, status }) => dispatch(replyPermissionAssign({ emailToken, status })),
  replyPermissionAssignSuccess: ({ emailToken, status }) =>
    dispatch(replyPermissionAssignSuccess({ emailToken, status })),
  replyPermissionAssignFailure: ({ emailToken, status }) =>
    dispatch(replyPermissionAssignFailure({ emailToken, status })),
  onAuthenticate: token => dispatch(authenticate(token)),
})

const ReplyPermissionAssignPageContainer = connect(mapStateToProps, mapDispatchToProps)(ReplyPermissionAssignPage)

export default ReplyPermissionAssignPageContainer
