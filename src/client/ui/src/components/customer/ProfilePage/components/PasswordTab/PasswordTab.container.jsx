import { connect } from 'react-redux'
import { changePassword, changePasswordSuccess, changePasswordFailure, logout } from 'redux/user/user.actions'
import PasswordTab from './PasswordTab.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  changePasswordObj: state.user.changePassword,
})

const mapDispatchToProps = dispatch => ({
  changePassword: ({ userId, oldPassword, newPassword }) =>
    dispatch(changePassword({ userId, oldPassword, newPassword })),
  changePasswordSuccess: () => dispatch(changePasswordSuccess()),
  changePasswordFailure: message => dispatch(changePasswordFailure(message)),
  logout: () => dispatch(logout()),
})

const PasswordTabContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordTab)

export default PasswordTabContainer
