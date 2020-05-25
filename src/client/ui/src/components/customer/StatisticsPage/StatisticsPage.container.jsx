import { connect } from 'react-redux'
import { getUserTotalStatistics, getStatisticsById, getUserTokenTypeStatistics } from 'redux/report/report.actions'
import { getMyProjectList } from 'redux/project/project.actions'
import StatisticsPage from './StatisticsPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getStatisticsByIdObj: state.report.getStatisticsById,
  getUserTokenTypeStatisticsObj: state.report.getUserTokenTypeStatistics,
  getUserTotalStatisticsObj: state.report.getUserTotalStatistics,
  getMyProjectListObj: state.project.getMyProjectList,
})

const mapDispatchToProps = dispatch => ({
  getStatisticsById: (id, statisticsType, timeType, queryParams) =>
    dispatch(getStatisticsById(id, statisticsType, timeType, queryParams)),
  getUserTokenTypeStatistics: (id, userId, timeType, queryParams) =>
    dispatch(getUserTokenTypeStatistics(id, userId, timeType, queryParams)),
  getUserTotalStatistics: (userId, totalType, queryParams) =>
    dispatch(getUserTotalStatistics(userId, totalType, queryParams)),

  //
  getMyProjects: ({ userId }) => dispatch(getMyProjectList({ userId })),
})

const StatisticsPageContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticsPage)

export default StatisticsPageContainer
