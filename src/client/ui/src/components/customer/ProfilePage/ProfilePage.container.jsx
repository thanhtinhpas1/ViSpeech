import { connect } from 'react-redux'
import { sendVerifyEmail, sendVerifyEmailSuccess, sendVerifyEmailFailure, authenticate } from 'redux/user/user.actions'
import ProfilePage from './ProfilePage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  sendVerifyEmailObj: state.user.sendVerifyEmail,
})

const mapDispatchToProps = dispatch => ({
  sendVerifyEmail: userId => dispatch(sendVerifyEmail(userId)),
  sendVerifyEmailSuccess: () => dispatch(sendVerifyEmailSuccess()),
  sendVerifyEmailFailure: message => dispatch(sendVerifyEmailFailure(message)),
  onAuthenticate: token => dispatch(authenticate(token)),
})

const ProfilePageContainer = connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

export default ProfilePageContainer
