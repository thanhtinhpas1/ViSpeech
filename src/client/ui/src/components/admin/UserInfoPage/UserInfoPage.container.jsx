import { connect } from 'react-redux'
import { getUserInfo, deleteUser } from 'redux/user/user.actions'
import UserInfoPage from './UserInfoPage.component'

const mapStateToProps = state => ({
  userInfoObj: state.user.getInfo,
  deleteUserObj: state.user.deleteUser,
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: id => dispatch(getUserInfo(id)),
  deleteUser: id => dispatch(deleteUser(id)),
})

const UserInfoPageContainer = connect(mapStateToProps, mapDispatchToProps)(UserInfoPage)

export default UserInfoPageContainer
