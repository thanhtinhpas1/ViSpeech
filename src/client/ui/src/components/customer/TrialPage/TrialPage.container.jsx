import { connect } from 'react-redux'
import {
  getRequestListByUserId,
  updateRequestInfo,
  updateRequestInfoSuccess,
  updateRequestInfoFailure,
  onClearUpdateRequestInfo,
  createRequest,
  createRequestSuccess,
  createRequestFailure,
  onClearCreateRequestState,
} from '../../../redux/request/request.actions'
import TrialPage from './TrialPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  updateRequestInfoObj: state.request.updateInfo,
  createRequestObj: state.request.createRequest,
  getAcceptedProjectListObj: state.project.getAcceptedProjectList,
})

const mapDispatchToProps = dispatch => ({
  clearCreateRequestState: () => dispatch(onClearCreateRequestState()),
  clearUpdateRequestInfo: () => dispatch(onClearUpdateRequestInfo()),
  createRequest: () => dispatch(createRequest()),
  createRequestSuccess: () => dispatch(createRequestSuccess()),
  createRequestFailure: () => dispatch(createRequestFailure()),
  updateRequestInfo: requestId => dispatch(updateRequestInfo(requestId)),
  updateRequestInfoSuccess: () => dispatch(updateRequestInfoSuccess()),
  updateRequestInfoFailure: message => dispatch(updateRequestInfoFailure(message)),
  getRequestListByUserId: (userId, { pagination, sortField, sortOrder, filters }) =>
    dispatch(getRequestListByUserId(userId, { pagination, sortField, sortOrder, filters })),
})

const TrialPageContainer = connect(mapStateToProps, mapDispatchToProps)(TrialPage)

export default TrialPageContainer
