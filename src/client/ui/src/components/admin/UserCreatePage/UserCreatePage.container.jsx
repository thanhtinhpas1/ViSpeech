import { connect } from 'react-redux'
import { createUser, createUserSuccess, createUserFailure } from 'redux/user/user.actions'
import UserCreatePage from './UserCreatePage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  createUserObj: state.user.createUser,
})

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(createUser(data)),
  createUserSuccess: () => dispatch(createUserSuccess()),
  createUserFailure: message => dispatch(createUserFailure(message)),
})

const UserCreatePageContainer = connect(mapStateToProps, mapDispatchToProps)(UserCreatePage)

export default UserCreatePageContainer
