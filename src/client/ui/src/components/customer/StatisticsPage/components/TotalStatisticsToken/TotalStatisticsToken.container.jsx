import { connect } from 'react-redux'
import { getUserTotalStatistics } from 'redux/report/report.actions'
import TotalStatisticsToken from './TotalStatisticsToken.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserTotalStatisticsBytokenObj: state.report.getUserTotalStatisticsBytoken,
})

const mapDispatchToProps = dispatch => ({
  getUserTotalStatistics: (userId, statisticsType, timeType, queryParams) =>
    dispatch(getUserTotalStatistics(userId, statisticsType, timeType, queryParams)),
})

const TotalStatisticsTokenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TotalStatisticsToken)

export default TotalStatisticsTokenContainer
