import { connect } from 'react-redux'
import { getAdminTotalStatistics } from 'redux/report/report.actions'
import TotalStatisticsTokenType from './TotalStatisticsTokenType.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getAdminTotalStatisticsBytokenTypeObj: state.report.getAdminTotalStatisticsBytokenType,
})

const mapDispatchToProps = dispatch => ({
  getAdminTotalStatistics: (statisticsType, timeType, queryParams) =>
    dispatch(getAdminTotalStatistics(statisticsType, timeType, queryParams)),
})

const TotalStatisticsTokenTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TotalStatisticsTokenType)

export default TotalStatisticsTokenTypeContainer
