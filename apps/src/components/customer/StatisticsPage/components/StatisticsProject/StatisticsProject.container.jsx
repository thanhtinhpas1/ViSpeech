import { connect } from 'react-redux'
import { getStatisticsById } from 'redux/report/report.actions'
import { getMyProjectList } from 'redux/project/project.actions'
import StatisticsProject from './StatisticsProject.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getStatisticsByprojectIdObj: state.report.getStatisticsByprojectId,
  getMyProjectListObj: state.project.getMyProjectList,
})

const mapDispatchToProps = dispatch => ({
  getStatisticsById: (id, statisticsType, timeType, queryParams) =>
    dispatch(getStatisticsById(id, statisticsType, timeType, queryParams)),
  getMyProjects: ({ userId }) => dispatch(getMyProjectList({ userId })),
})

const StatisticsProjectContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticsProject)

export default StatisticsProjectContainer
