import { connect } from 'react-redux'
import { getUserTotalStatistics } from 'redux/report/report.actions'
import TotalStatisticsProject from './TotalStatisticsProject.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserTotalStatisticsByprojectObj: state.report.getUserTotalStatisticsByproject,
})

const mapDispatchToProps = dispatch => ({
  getUserTotalStatistics: (userId, statisticsType, timeType, queryParams) =>
    dispatch(getUserTotalStatistics(userId, statisticsType, timeType, queryParams)),
})

const TotalStatisticsProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TotalStatisticsProject)

export default TotalStatisticsProjectContainer
