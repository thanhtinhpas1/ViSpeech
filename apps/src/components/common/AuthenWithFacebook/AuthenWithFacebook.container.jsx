import { connect } from 'react-redux'
import AuthenWithFacebook from './AuthenWithFacebook.component'
import { authenWithSocial } from '../../../redux/user/user.actions'

const mapDispatchToProps = dispatch => ({
  authenWithSocial: user => dispatch(authenWithSocial(user)),
})

const AuthenWithFacebookContainer = connect(null, mapDispatchToProps)(AuthenWithFacebook)

export default AuthenWithFacebookContainer
