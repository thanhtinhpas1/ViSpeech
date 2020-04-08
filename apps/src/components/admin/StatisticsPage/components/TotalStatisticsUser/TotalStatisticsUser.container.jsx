import { connect } from 'react-redux'
import { getAdminTotalStatistics } from 'redux/report/report.actions'
import TotalStatisticsUser from './TotalStatisticsUser.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getAdminTotalStatisticsByuserObj: state.report.getAdminTotalStatisticsByuser,
})

const mapDispatchToProps = dispatch => ({
  getAdminTotalStatistics: (statisticsType, timeType, queryParams) =>
    dispatch(getAdminTotalStatistics(statisticsType, timeType, queryParams)),
})

const TotalStatisticsUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TotalStatisticsUser)

export default TotalStatisticsUserContainer
