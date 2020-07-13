import { connect } from 'react-redux'
import UpgradeTokenPage from './UpgradeTokenPage.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({})

const UpgradeTokenPageContainer = connect(mapStateToProps, mapDispatchToProps)(UpgradeTokenPage)

export default UpgradeTokenPageContainer
