import { connect } from 'react-redux'
import { getTokenTypes } from 'redux/token/token.actions'
import TokenStatistics from './TokenStatistics.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenTypeListObj: state.token.getTokenTypeList,
})

const mapDispatchToProps = dispatch => ({
  getTokenTypes: () => dispatch(getTokenTypes()),
})

const TokenStatisticsContainer = connect(mapStateToProps, mapDispatchToProps)(TokenStatistics)

export default TokenStatisticsContainer
