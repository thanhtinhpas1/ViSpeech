import { connect } from 'react-redux'
import { getStatisticsForAssigners } from '../../../../../redux/report/report.actions'
import { getMyProjectList } from '../../../../../redux/project/project.actions'
import StatisticsForAssigners from './StatisticsForAssigners.component'
import { getProjectAssigneeList } from '../../../../../redux/user/user.actions'
import { getProjectTokenList } from '../../../../../redux/token/token.actions'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getStatisticsForAssignersObj: state.report.getStatisticsForAssigners,
  getMyProjectListObj: state.project.getMyProjectList,
  getProjectAssigneeListObj: state.user.getProjectAssigneeList,
  getProjectTokenListObj: state.token.getProjectTokenList,
})

const mapDispatchToProps = dispatch => ({
  getStatisticsForAssigners: ({ projectId, assignerId, assigneeId, tokenId }, statisticsType, timeType, queryParams) =>
    dispatch(
      getStatisticsForAssigners({ projectId, assignerId, assigneeId, tokenId }, statisticsType, timeType, queryParams)
    ),
  getMyProjects: ({ userId, pagination, filters }) => dispatch(getMyProjectList({ userId, pagination, filters })),
  getProjectAssignees: projectId => dispatch(getProjectAssigneeList(projectId)),
  getProjectTokens: ({ userId, projectId, assigneeId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, assigneeId, pagination, filters })),
})

const StatisticsForAssignersContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticsForAssigners)

export default StatisticsForAssignersContainer
