import { connect } from 'react-redux'
import { getRequestListByUserId } from 'redux/request/request.actions'
import RequestTable from './RequestTable.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getListByUserIdObj: state.request.getListByUserId,
})

const mapDispatchToProps = dispatch => ({
  getRequestListByUserId: (userId, { pagination, sortField, sortOrder, filters }) =>
    dispatch(getRequestListByUserId(userId, { pagination, sortField, sortOrder, filters })),
})

const RequestTableContainer = connect(mapStateToProps, mapDispatchToProps)(RequestTable)

export default RequestTableContainer
