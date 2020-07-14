import { connect } from 'react-redux'
import {
  getUserInfo,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  onClearDeleteUserState,
} from 'redux/user/user.actions'
import UserInfoPage from './UserInfoPage.component'

const mapStateToProps = state => ({
  userInfoObj: state.user.getInfo,
  deleteUserObj: state.user.deleteUser,
})

const mapDispatchToProps = dispatch => ({
  clearDeleteUserState: () => dispatch(onClearDeleteUserState()),
  getUserInfo: id => dispatch(getUserInfo(id)),
  deleteUser: id => dispatch(deleteUser(id)),
  deleteUserSuccess: () => dispatch(deleteUserSuccess()),
  deleteUserFailure: message => dispatch(deleteUserFailure(message)),
})

const UserInfoPageContainer = connect(mapStateToProps, mapDispatchToProps)(UserInfoPage)

export default UserInfoPageContainer
