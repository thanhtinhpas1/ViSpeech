import { connect } from 'react-redux'
import { getStatisticsById } from 'redux/report/report.actions'
import { getUserTokenList } from 'redux/token/token.actions'
import StatisticsToken from './StatisticsToken.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getStatisticsBytokenIdObj: state.report.getStatisticsBytokenId,
  getUserTokenListObj: state.token.getUserTokenList,
})

const mapDispatchToProps = dispatch => ({
  getStatisticsById: (id, statisticsType, timeType, queryParams) =>
    dispatch(getStatisticsById(id, statisticsType, timeType, queryParams)),
  getUserTokens: ({ userId }) => dispatch(getUserTokenList({ userId })),
})

const StatisticsTokenContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticsToken)

export default StatisticsTokenContainer
