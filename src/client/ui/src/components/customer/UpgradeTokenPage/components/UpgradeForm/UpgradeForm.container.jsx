import { connect } from 'react-redux'
import { getProjectTokenList } from 'redux/token/token.actions'
import {
  onClearCreateUpgradeTokenOrderState,
  createUpgradeTokenOrder,
  createUpgradeTokenOrderSuccess,
  createUpgradeTokenOrderFailure,
} from 'redux/order/order.actions'
import UpgradeForm from './UpgradeForm.component'

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  getTokenTypeListObj: state.token.getTokenTypeList,
  getMyProjectListObj: state.project.getMyProjectList,
  getProjectTokenListObj: state.token.getProjectTokenList,
  createUpgradeTokenOrderObj: state.order.createUpgradeTokenOrder,
})

const mapDispatchToProps = dispatch => ({
  clearCreateUpgradeTokenOrderState: () => dispatch(onClearCreateUpgradeTokenOrderState()),
  getProjectTokenList: ({ userId, projectId, pagination, filters }) =>
    dispatch(getProjectTokenList({ userId, projectId, pagination, filters })),
  createUpgradeTokenOrder: order => dispatch(createUpgradeTokenOrder(order)),
  createUpgradeTokenOrderSuccess: order => dispatch(createUpgradeTokenOrderSuccess({ order })),
  createUpgradeTokenOrderFailure: message => dispatch(createUpgradeTokenOrderFailure(message)),
})

const UpgradeFormContainer = connect(mapStateToProps, mapDispatchToProps)(UpgradeForm)

export default UpgradeFormContainer
