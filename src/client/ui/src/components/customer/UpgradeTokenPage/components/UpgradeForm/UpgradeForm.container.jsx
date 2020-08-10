import { connect } from 'react-redux'
import { getTokenTypes, getProjectTokenList } from '../../../../../redux/token/token.actions'
import {
  onClearCreateOrderToUpgradeState,
  createOrderToUpgrade,
  createOrderToUpgradeSuccess,
  createOrderToUpgradeFailure,
} from '../../../../../redux/order/order.actions'
import UpgradeForm from './UpgradeForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenTypeListObj: state.token.getTokenTypeList,
  createOrderToUpgradeObj: state.order.createOrderToUpgrade,
  getProjectTokenListObj: state.token.getProjectTokenList,
})

const mapDispatchToProps = dispatch => ({
  clearCreateOrderToUpgradeState: () => dispatch(onClearCreateOrderToUpgradeState()),
  getTokenTypes: () => dispatch(getTokenTypes()),
  createOrderToUpgrade: order => dispatch(createOrderToUpgrade(order)),
  createOrderToUpgradeSuccess: order => dispatch(createOrderToUpgradeSuccess({ order })),
  createOrderToUpgradeFailure: message => dispatch(createOrderToUpgradeFailure(message)),
  getProjectTokenList: ({ userId, projectId, pagination, filters }) =>
  dispatch(getProjectTokenList({ userId, projectId, pagination, filters })),
})

const UpgradeFormContainer = connect(mapStateToProps, mapDispatchToProps)(UpgradeForm)

export default UpgradeFormContainer
