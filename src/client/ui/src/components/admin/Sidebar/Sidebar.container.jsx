import { connect } from 'react-redux'
import { authenticate, logout } from 'redux/user/user.actions'
import Sidebar from './Sidebar.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  onAuthenticate: token => dispatch(authenticate(token)),
  logout: () => dispatch(logout()),
})

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer
