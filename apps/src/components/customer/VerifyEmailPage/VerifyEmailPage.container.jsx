import { connect } from 'react-redux'
import { verifyEmail, authenticate } from 'redux/user/user.actions'
import VerifyEmailPage from './VerifyEmailPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  verifyEmailObj: state.user.verifyEmail,
})

const mapDispatchToProps = dispatch => ({
  verifyEmail: emailToken => dispatch(verifyEmail(emailToken)),
  onAuthenticate: token => dispatch(authenticate(token)),
})

const VerifyEmailPageContainer = connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage)

export default VerifyEmailPageContainer
