import { connect } from 'react-redux'
import PayOnlineModal from './PayOnlineModal.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

// const mapDispatchToProps = dispatch => ({})

const PayOnlineModalContainer = connect(mapStateToProps)(PayOnlineModal)

export default PayOnlineModalContainer
