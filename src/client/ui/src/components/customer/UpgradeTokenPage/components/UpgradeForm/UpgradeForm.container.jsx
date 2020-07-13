import { connect } from 'react-redux'
import { getProjectTokenList } from 'redux/token/token.actions'
import {
  onClearCreateOrderToUpgradeState,
  createOrderToUpgrade,
  createOrderToUpgradeSuccess,
  createOrderToUpgradeFailure,
} from 'redux/order/order.actions'
import UpgradeForm from './UpgradeForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenTypeListObj: state.token.getTokenTypeList,
  getMyProjectListObj: state.project.getMyProjectList,
  getProjectTokenListObj: state.token.getProjectTokenList,
  createOrderToUpgradeObj: state.order.createOrderToUpgrade,
})

const mapDispatchToProps = dispatch => ({
  clearCreateOrderToUpgradeState: () => dispatch(onClearCreateOrderToUpgradeState()),
  getProjectTokenList: ({ userId, projectId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, pagination, filters })),
  createOrderToUpgrade: order => dispatch(createOrderToUpgrade(order)),
  createOrderToUpgradeSuccess: order => dispatch(createOrderToUpgradeSuccess({ order })),
  createOrderToUpgradeFailure: message => dispatch(createOrderToUpgradeFailure(message)),
})

const UpgradeFormContainer = connect(mapStateToProps, mapDispatchToProps)(UpgradeForm)

export default UpgradeFormContainer
