import { connect } from 'react-redux'
import { updateUserInfo, updateUserInfoSuccess, updateUserInfoFailure } from 'redux/user/user.actions'
import InfoTab from './InfoTab.component'

const mapStateToProps = state => ({
  updateInfoObj: state.user.updateInfo,
})

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (id, userInfo) => dispatch(updateUserInfo(id, userInfo)),
  updateUserInfoSuccess: () => dispatch(updateUserInfoSuccess()),
  updateUserInfoFailure: message => dispatch(updateUserInfoFailure(message)),
})

const InfoTabContainer = connect(mapStateToProps, mapDispatchToProps)(InfoTab)

export default InfoTabContainer
