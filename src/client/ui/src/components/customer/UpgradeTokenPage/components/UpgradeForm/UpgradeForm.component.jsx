/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, {useEffect, useState} from 'react'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {Alert, Button, Checkbox, Col, Form, Input, Radio, Row, Select} from 'antd'
import Utils from 'utils'
import {DEFAULT_PAGINATION, TOKEN_TYPE} from 'utils/constant'
import TokenType from 'components/customer/HomePage/components/TokenStatistics/components/TokenType/TokenType.component'
import SocketService from 'services/socket.service'
import OrderService from 'services/order.service'
import SocketUtils from 'utils/socket.util'

const { Option } = Select

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const {
  TOKEN_UPGRADED_SUCCESS_EVENT,
  TOKEN_UPGRADED_FAILED_EVENT,
  UPGRADE_TOKEN_ORDER_CREATED_FAILED_EVENT,
} = KAFKA_TOPIC

const UpgradeForm = ({
  currentUser,
  getMyProjectListObj,
  getTokenTypeListObj,
  getProjectTokenListObj,
  createUpgradeTokenOrderObj,
  getProjectTokenList,
  createUpgradeTokenOrder,
  createUpgradeTokenOrderSuccess,
  createUpgradeTokenOrderFailure,
  clearCreateUpgradeTokenOrderState,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentTokenTypeMinutes, setCurrentTokenTypeMinutes] = useState(0)
  const [defaultTokenTypeId, setDefaultTokenTypeId] = useState(null)

  const cardElementOptions = {
    iconStyle: 'solid',
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '18px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
    hidePostalCode: true,
  }

  const changeTokenTypeCss = selectedId => {
    window.$(`.token-currency-choose .pay-option label.pay-option-check-select`).removeClass('pay-option-check-select')
    window
      .$(`.token-currency-choose .pay-option input[value=${selectedId}]`)
      .parent()
      .parent()
      .siblings('label')
      .addClass('pay-option-check-select')
  }

  useEffect(() => {
    if (
      getTokenTypeListObj.isLoading === false &&
      getTokenTypeListObj.isSuccess != null &&
      getTokenTypeListObj.tokenTypeList.length > 0
    ) {
      const tokenTypeIds = Utils.sortAndFilterTokenTypeList(
        getTokenTypeListObj.tokenTypeList,
        [TOKEN_TYPE.FREE.name],
        'price',
        true,
        currentTokenTypeMinutes
      )
      if (tokenTypeIds.length > 0) {
        const id = tokenTypeIds[0]._id
        changeTokenTypeCss(id)
        setDefaultTokenTypeId(id)
      }
    }
  }, [getTokenTypeListObj, currentTokenTypeMinutes])

  useEffect(() => {
    clearCreateUpgradeTokenOrderState()
    SocketService.socketOnListeningEvent(UPGRADE_TOKEN_ORDER_CREATED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_UPGRADED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_UPGRADED_FAILED_EVENT)
  }, [clearCreateUpgradeTokenOrderState])

  const onSubmit = values => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    async function upgradeToken(projectId, tokenId, tokenTypeToUpgrade) {
      const cardElement = elements.getElement(CardElement)
      let result = null

      try {
        result = await OrderService.createPaymentIntent(tokenTypeToUpgrade.saleOffPrice * 100)
      } catch (err) {
        setErrorMessage(err.message || err)
        setIsLoading(false)
        return
      }

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
        },
      })
      if (paymentMethodReq.error) {
        setErrorMessage(paymentMethodReq.error.message)
        setIsLoading(false)
        return
      }

      const confirmedCardPayment = await stripe.confirmCardPayment(result.clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })
      if (confirmedCardPayment.error) {
        setErrorMessage(confirmedCardPayment.error.message)
        setIsLoading(false)
        return
      }
      if (confirmedCardPayment.paymentIntent && confirmedCardPayment.paymentIntent.status === 'succeeded') {
        // The payment has been processed!
        const paymentIntent = {
          id: confirmedCardPayment.paymentIntent.id,
        }
        const order = {
          userId: currentUser._id,
          tokenType: Utils.removePropertyFromObject(tokenTypeToUpgrade, 'saleOffPrice'),
          token: {
            _id: tokenId,
            userId: currentUser._id,
            projectId,
          },
        }
        createUpgradeTokenOrder(order)
        try {
          await OrderService.createUpgradeTokenOrder(order, paymentIntent)
          invokeCheckSubject.UpgradeTokenOrderCreated.subscribe(data => {
            if (data.error != null) {
              createUpgradeTokenOrderFailure(data.errorObj)
            }
          })
          invokeCheckSubject.TokenUpgraded.subscribe(data => {
            if (data.error != null) {
              createUpgradeTokenOrderFailure(data.errorObj)
            } else {
              createUpgradeTokenOrderSuccess({ order })
            }
          })
        } catch (err) {
          createUpgradeTokenOrderFailure({ message: err.message })
        }
      }
    }

    setIsLoading(true)
    const { projectId, tokenId, tokenTypeId } = values
    let selectedType = getTokenTypeListObj.tokenTypeList.find(x => x._id === tokenTypeId)
    selectedType = Utils.removePropertiesFromObject(selectedType, ['createdDate', 'updatedDate'])
    upgradeToken(projectId, tokenId, selectedType)
  }

  useEffect(() => {
    if (createUpgradeTokenOrderObj.isLoading === false && createUpgradeTokenOrderObj.isSuccess != null) {
      setIsLoading(false)
      if (createUpgradeTokenOrderObj.isSuccess === true) {
        form.resetFields()
      } else {
        setErrorMessage(Utils.buildFailedMessage(createUpgradeTokenOrderObj.message, 'Nâng cấp token thất bại'))
      }
    }
  }, [createUpgradeTokenOrderObj, form])

  const onProjectIdChange = async value => {
    const userId = currentUser && currentUser._id
    if (userId) {
      const filters = {
        isValid: ['true'],
      }
      getProjectTokenList({ userId, projectId: value, pagination: DEFAULT_PAGINATION, filters })
      form.resetFields(['tokenId'])
      form.resetFields(['currentTokenType'])
      setCurrentTokenTypeMinutes(0)
    }
  }

  const onTokenIdChange = async value => {
    const token = getProjectTokenListObj.projectTokenList.data.find(item => item._id === value)
    const tokenTypes = Object.keys(TOKEN_TYPE)
    const findIndexFunc = tokenType => TOKEN_TYPE[tokenType].minutes === token.minutes
    const index = tokenTypes[tokenTypes.findIndex(findIndexFunc)]
    setCurrentTokenTypeMinutes(TOKEN_TYPE[index].minutes)
    form.setFieldsValue({ currentTokenType: TOKEN_TYPE[index].viText })
  }

  const onTokenTypeChange = e => {
    changeTokenTypeCss(e.target.value)
  }

  return (
    <Form form={form} onFinish={onSubmit}>
      <Row gutter={24}>
        <Col span={8}>
          <h5 className="font-mid">Dự án</h5>
          <Form.Item name="projectId" rules={[{ required: true, message: 'Vui lòng chọn một dự án.' }]}>
            <Select
              style={{ width: '100%' }}
              placeholder={
                (getMyProjectListObj.myProjectList.data || []).length > 0 ? 'Chọn một dự án' : 'Không tìm thấy dự án'
              }
              onChange={onProjectIdChange}
            >
              {(getMyProjectListObj.myProjectList.data || []).map(project => {
                return (
                  <Option value={project._id} key={project._id}>
                    {project.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <h5 className="font-mid">Tên Api Key</h5>
          <Form.Item
            name="tokenId"
            dependencies={['projectId']}
            rules={[
              { required: true, message: 'Vui lòng chọn một token.' },
              ({ getFieldValue }) => ({
                async validator() {
                  const projectId = getFieldValue('projectId')
                  if (!projectId) {
                    return Promise.reject('Vui lòng chọn một dự án')
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Select
              style={{ minWidth: 180 }}
              placeholder={
                (getProjectTokenListObj.projectTokenList.data || []).length > 0
                  ? 'Chọn một token'
                  : 'Không tìm thấy token'
              }
              onChange={onTokenIdChange}
            >
              {(getProjectTokenListObj.projectTokenList.data || []).map(item => {
                return (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <h5 className="font-mid">Gói token hiện tại</h5>
          <Form.Item name="currentTokenType">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <h5 className="font-mid">Nâng cấp lên gói</h5>
          <Form.Item name="tokenTypeId">
            <div className="token-balance token-balance-s2">
              <div className="token-currency-choose" style={{ color: '#495463' }}>
                {Utils.sortAndFilterTokenTypeList(
                  getTokenTypeListObj.tokenTypeList,
                  [TOKEN_TYPE.FREE.name],
                  'price',
                  true,
                  currentTokenTypeMinutes
                ).length === 0 ? (
                  <p>Token đã được nâng cấp lên gói cao nhất</p>
                ) : (
                  (getTokenTypeListObj.tokenTypeList || []).length > 0 && (
                    <Radio.Group
                      name="radiogroup"
                      style={{ width: '100%' }}
                      onChange={onTokenTypeChange}
                      defaultValue={defaultTokenTypeId}
                    >
                      <div className="row guttar-15px" style={{ display: 'flex' }}>
                        {Utils.sortAndFilterTokenTypeList(
                          getTokenTypeListObj.tokenTypeList,
                          [TOKEN_TYPE.FREE.name],
                          'price',
                          true,
                          currentTokenTypeMinutes
                        ).map(tokenType => {
                          return (
                            <div className="col-3" key={tokenType._id}>
                              <TokenType tokenType={tokenType} />
                            </div>
                          )
                        })}
                      </div>
                    </Radio.Group>
                  )
                )}
              </div>
            </div>
          </Form.Item>
        </Col>
      </Row>
      <h5 className="font-mid">Thông tin thẻ</h5>
      <Form.Item name="cardElement" rules={[{ required: true, message: 'Vui lòng nhập thông tin thẻ.' }]}>
        <CardElement options={cardElementOptions} />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              // eslint-disable-next-line prefer-promise-reject-errors
              value ? Promise.resolve() : Promise.reject('Vui lòng đồng ý điều khoản giao dịch'),
          },
        ]}
      >
        <Checkbox>
          Tôi đồng ý với
          <strong> điều khoản giao dịch mua bán key</strong> của Softia.
        </Checkbox>
      </Form.Item>
      <ul className="d-flex flex-wrap align-items-center guttar-30px">
        <li>
          {createUpgradeTokenOrderObj.isLoading === false && createUpgradeTokenOrderObj.isSuccess === true && (
            <Alert
              message="Nâng cấp token thành công"
              type="success"
              showIcon
              closable
              style={{ marginBottom: '20px' }}
            />
          )}
          {errorMessage != null && (
            <Alert
              message={Utils.buildFailedMessage({ message: errorMessage })}
              type="error"
              showIcon
              closable
              style={{ marginBottom: '20px' }}
            />
          )}
          <Button
            htmlType="submit"
            loading={isLoading}
            type="primary"
            size="large"
            disabled={
              Utils.sortAndFilterTokenTypeList(
                getTokenTypeListObj.tokenTypeList,
                [TOKEN_TYPE.FREE.name],
                'price',
                true,
                currentTokenTypeMinutes
              ).length === 0
            }
          >
            Nâng cấp <i className="ti ti-arrow-up mgl-1x" />
          </Button>
        </li>
      </ul>
      <div className="gaps-1x d-none d-sm-block" />
      {/* <div className="note note-plane note-light mgb-1x">
        <em className="fas fa-info-circle" />
        <p className="text-light">Sau khi giao dịch thành công, trang web sẽ hiển thị key cho bạn.</p>
      </div> */}
    </Form>
  )
}

export default UpgradeForm
