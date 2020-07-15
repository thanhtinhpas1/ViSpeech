import { connect } from 'react-redux'
import { getRequestListByUserId } from 'redux/request/request.actions'
import RequestsPage from './RequestsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getRequestListByUserIdObj: state.request.getListByUserId,
})

const mapDispatchToProps = dispatch => ({
  getRequestListByUserId: (userId, { pagination, sortField, sortOrder, filters }) =>
    dispatch(getRequestListByUserId(userId, { pagination, sortField, sortOrder, filters })),
})

const RequestsPageContainer = connect(mapStateToProps, mapDispatchToProps)(RequestsPage)

export default RequestsPageContainer
