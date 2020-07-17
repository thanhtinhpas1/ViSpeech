import { connect } from 'react-redux'
import { getTotalStatistics } from 'redux/report/report.actions'
import TotalChart from './TotalChart.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTotalStatisticsObj: state.report.getTotalStatistics,
})

const mapDispatchToProps = dispatch => ({
  getTotalStatistics: (timeType, queryParams) => dispatch(getTotalStatistics(timeType, queryParams)),
})

const TotalChartContainer = connect(mapStateToProps, mapDispatchToProps)(TotalChart)

export default TotalChartContainer
