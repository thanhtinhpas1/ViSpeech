import { connect } from 'react-redux'
import AuthenWithGoogle from './AuthenWithGoogle.component'
import { authenWithSocial } from '../../../redux/user/user.actions'

const mapDispatchToProps = dispatch => ({
  authenWithSocial: user => dispatch(authenWithSocial(user)),
})

const AuthenWithGoogleContainer = connect(null, mapDispatchToProps)(AuthenWithGoogle)

export default AuthenWithGoogleContainer
