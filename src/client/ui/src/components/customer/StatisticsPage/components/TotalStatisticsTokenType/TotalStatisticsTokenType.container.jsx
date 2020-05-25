import { connect } from 'react-redux'
import { getUserTotalStatistics } from 'redux/report/report.actions'
import TotalStatisticsTokenType from './TotalStatisticsTokenType.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserTotalStatisticsBytokenTypeObj: state.report.getUserTotalStatisticsBytokenType,
})

const mapDispatchToProps = dispatch => ({
  getUserTotalStatistics: (userId, statisticsType, timeType, queryParams) =>
    dispatch(getUserTotalStatistics(userId, statisticsType, timeType, queryParams)),
})

const TotalStatisticsTokenTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TotalStatisticsTokenType)

export default TotalStatisticsTokenTypeContainer
