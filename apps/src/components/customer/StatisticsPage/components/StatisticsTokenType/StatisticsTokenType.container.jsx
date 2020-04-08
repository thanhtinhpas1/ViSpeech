import { connect } from 'react-redux'
import { getUserTokenTypeStatistics } from 'redux/report/report.actions'
import { getTokenTypes } from 'redux/token/token.actions'
import StatisticsTokenType from './StatisticsTokenType.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserTokenTypeStatisticsObj: state.report.getUserTokenTypeStatistics,
  getTokenTypeListObj: state.token.getTokenTypeList,
})

const mapDispatchToProps = dispatch => ({
  getUserTokenTypeStatistics: (id, userId, timeType, queryParams) =>
    dispatch(getUserTokenTypeStatistics(id, userId, timeType, queryParams)),
  getTokenTypes: () => dispatch(getTokenTypes()),
})

const StatisticsTokenTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsTokenType)

export default StatisticsTokenTypeContainer
