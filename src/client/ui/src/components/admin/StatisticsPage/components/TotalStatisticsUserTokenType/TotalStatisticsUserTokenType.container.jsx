import { connect } from 'react-redux'
import { getUserTotalStatistics } from 'redux/report/report.actions'
import TotalStatisticsUserTokenType from './TotalStatisticsUserTokenType.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserTotalStatisticsBytokenTypeObj: state.report.getUserTotalStatisticsBytokenType,
})

const mapDispatchToProps = dispatch => ({
  getUserTotalStatistics: (userId, statisticsType, timeType, queryParams) =>
    dispatch(getUserTotalStatistics(userId, statisticsType, timeType, queryParams)),
})

const TotalStatisticsUserTokenTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TotalStatisticsUserTokenType)

export default TotalStatisticsUserTokenTypeContainer
