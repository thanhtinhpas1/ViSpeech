import { connect } from 'react-redux'
import { getStatisticsById } from 'redux/report/report.actions'
import { getTokenTypes } from 'redux/token/token.actions'
import StatisticsTokenType from './StatisticsTokenType.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getStatisticsBytokenTypeIdObj: state.report.getStatisticsBytokenTypeId,
  getTokenTypeListObj: state.token.getTokenTypeList,
})

const mapDispatchToProps = dispatch => ({
  getStatisticsById: (id, statisticsType, timeType, queryParams) =>
    dispatch(getStatisticsById(id, statisticsType, timeType, queryParams)),
  getTokenTypes: () => dispatch(getTokenTypes()),
})

const StatisticsTokenTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsTokenType)

export default StatisticsTokenTypeContainer
