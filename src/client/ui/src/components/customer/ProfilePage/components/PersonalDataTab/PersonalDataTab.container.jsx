import { connect } from 'react-redux'
import { updateCurrentUser, updateCurrentUserSuccess, updateCurrentUserFailure } from 'redux/user/user.actions'
import PersonalDataTab from './PersonalDataTab.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  updateCurrentUserObj: state.user.updateCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: (userId, userInfo) => dispatch(updateCurrentUser(userId, userInfo)),
  updateCurrentUserSuccess: user => dispatch(updateCurrentUserSuccess(user)),
  updateCurrentUserFailure: message => dispatch(updateCurrentUserFailure(message)),
})

const PersonalDataTabContainer = connect(mapStateToProps, mapDispatchToProps)(PersonalDataTab)

export default PersonalDataTabContainer
