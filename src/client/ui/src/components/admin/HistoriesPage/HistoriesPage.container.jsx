import { connect } from 'react-redux'
import { getRequestList } from 'redux/request/request.actions'
import HistoriesPage from './HistoriesPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  requestListObj: state.request.getList,
})

const mapDispatchToProps = dispatch => ({
  getRequestList: ({ pagination, sortField, sortOrder, filters }) =>
    dispatch(getRequestList({ pagination, sortField, sortOrder, filters })),
})

const HistoriesPageContainer = connect(mapStateToProps, mapDispatchToProps)(HistoriesPage)

export default HistoriesPageContainer
