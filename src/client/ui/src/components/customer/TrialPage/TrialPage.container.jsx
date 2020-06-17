import { connect } from 'react-redux'
import {
  getRequestListByUserId,
  updateRequestInfo,
  updateRequestInfoSuccess,
  updateRequestInfoFailure,
} from 'redux/request/request.actions'
import TrialPage from './TrialPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  updateRequestInfoObj: state.request.updateInfo,
})

const mapDispatchToProps = dispatch => ({
  updateRequestInfo: (requestId, transcriptFileUrl) => dispatch(updateRequestInfo(requestId, transcriptFileUrl)),
  updateRequestInfoSuccess: info => dispatch(updateRequestInfoSuccess(info)),
  updateRequestInfoFailure: message => dispatch(updateRequestInfoFailure(message)),
  getRequestListByUserId: (userId, { pagination, sortField, sortOrder, filters }) =>
    dispatch(getRequestListByUserId(userId, { pagination, sortField, sortOrder, filters })),
})

const TrialPageContainer = connect(mapStateToProps, mapDispatchToProps)(TrialPage)

export default TrialPageContainer
