import { connect } from 'react-redux'
import { getStatisticsById } from '../../../../../redux/report/report.actions'
import { getUserList } from '../../../../../redux/user/user.actions'
import StatisticsUser from './StatisticsUser.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getUserListObj: state.user.getList,
  getStatisticsByuserIdObj: state.report.getStatisticsByuserId,
})

const mapDispatchToProps = dispatch => ({
  getStatisticsById: (id, statisticsType, timeType, queryParams) =>
    dispatch(getStatisticsById(id, statisticsType, timeType, queryParams)),
  getUserList: ({ filters }) => dispatch(getUserList({ filters })),
})

const StatisticsUserContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticsUser)

export default StatisticsUserContainer
