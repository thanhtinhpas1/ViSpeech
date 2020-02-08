import { connect } from 'react-redux'
import RegisterPage from './RegisterPage.component'
import { registerStart, onClearUserState } from '../../../redux/user/user.actions'

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(registerStart(user)),
  onClearUserState: () => dispatch(onClearUserState()),
})

const RegisterPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterPage)

export default RegisterPageContainer
