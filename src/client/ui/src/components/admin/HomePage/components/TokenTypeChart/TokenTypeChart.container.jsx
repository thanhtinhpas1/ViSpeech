import { connect } from 'react-redux'
import { getAdminTotalStatistics } from 'redux/report/report.actions'
import TokenTypeChart from './TokenTypeChart.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getAdminTotalStatisticsBytokenTypeObj: state.report.getAdminTotalStatisticsBytokenType,
})

const mapDispatchToProps = dispatch => ({
  getAdminTotalStatistics: (statisticsType, timeType, queryParams) =>
    dispatch(getAdminTotalStatistics(statisticsType, timeType, queryParams)),
})

const TokenTypeChartContainer = connect(mapStateToProps, mapDispatchToProps)(TokenTypeChart)

export default TokenTypeChartContainer
