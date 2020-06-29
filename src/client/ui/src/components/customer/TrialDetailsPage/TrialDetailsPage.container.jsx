import { connect } from 'react-redux'
import { getRequestInfo, onClearRequestInfo } from 'redux/request/request.actions'
import TrialDetailsPage from './TrialDetailsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getRequestInfoObj: state.request.getInfo,
})

const mapDispatchToProps = dispatch => ({
  getRequestInfo: id => dispatch(getRequestInfo(id)),
  clearRequestInfo: () => dispatch(onClearRequestInfo()),
})

const TrialDetailsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TrialDetailsPage)

export default TrialDetailsPageContainer
