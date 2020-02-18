import { connect } from 'react-redux'
import Header from './Header.component'
import { authenticate } from '../../../redux/user/user.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  onAuthenticate: token => dispatch(authenticate(token)),
})

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
