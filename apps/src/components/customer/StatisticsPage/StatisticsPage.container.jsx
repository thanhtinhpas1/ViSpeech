import { connect } from 'react-redux'
import { getUserTotalStatistics, getAdminTotalStatistics } from 'redux/report/report.actions'
import StatisticsPage from './StatisticsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserTotalStatisticsObj: state.report.getUserTotalStatistics,
  getAdminTotalStatisticsObj: state.report.getAdminTotalStatistics,
})

const mapDispatchToProps = dispatch => ({
  getUserTotalStatistics: (userId, totalType) =>
    dispatch(getUserTotalStatistics(userId, totalType)),
  getAdminTotalStatistics: totalType => dispatch(getAdminTotalStatistics(totalType)),
})

const StatisticsPageContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticsPage)

export default StatisticsPageContainer
