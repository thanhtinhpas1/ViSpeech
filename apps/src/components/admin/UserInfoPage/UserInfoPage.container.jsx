import { connect } from 'react-redux'
import { getUserInfo, updateUserInfo, deleteUser } from 'redux/user/user.actions'
import UserInfoPage from './UserInfoPage.component'

const mapStateToProps = state => ({
  userInfoObj: state.user.getInfo,
  deleteUserObj: state.user.deleteUser,
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: id => dispatch(getUserInfo(id)),
  updateUserInfo: (id, userInfo) => dispatch(updateUserInfo(id, userInfo)),
  deleteUser: id => dispatch(deleteUser(id)),
})

const UserInfoPageContainer = connect(mapStateToProps, mapDispatchToProps)(UserInfoPage)

export default UserInfoPageContainer
