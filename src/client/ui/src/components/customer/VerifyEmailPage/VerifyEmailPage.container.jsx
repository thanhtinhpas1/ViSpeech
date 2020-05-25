import { connect } from 'react-redux'
import { verifyEmail, verifyEmailSuccess, verifyEmailFailure, authenticate } from 'redux/user/user.actions'
import VerifyEmailPage from './VerifyEmailPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  verifyEmailObj: state.user.verifyEmail,
})

const mapDispatchToProps = dispatch => ({
  verifyEmail: emailToken => dispatch(verifyEmail(emailToken)),
  verifyEmailSuccess: () => dispatch(verifyEmailSuccess()),
  verifyEmailFailure: message => dispatch(verifyEmailFailure(message)),
  onAuthenticate: token => dispatch(authenticate(token)),
})

const VerifyEmailPageContainer = connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage)

export default VerifyEmailPageContainer
