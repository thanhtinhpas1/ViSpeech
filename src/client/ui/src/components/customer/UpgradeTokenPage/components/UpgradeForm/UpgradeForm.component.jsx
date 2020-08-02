/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Alert, Button, Checkbox, Col, Form, Radio, Row } from 'antd'
import Utils from 'utils'
import { TOKEN_TYPE, TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import TokenType from 'components/customer/HomePage/components/TokenStatistics/components/TokenType/TokenType.component'
import SocketService from 'services/socket.service'
import OrderService from 'services/order.service'
import SocketUtils from 'utils/socket.util'
import SelectTokenForm from './components/SelectTokenForm/SelectTokenForm.container'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { TOKEN_UPGRADED_SUCCESS_EVENT, TOKEN_UPGRADED_FAILED_EVENT, ORDER_TO_UPGRADE_CREATED_FAILED_EVENT } = KAFKA_TOPIC

const UpgradeForm = ({
  currentUser,
  getTokenTypeListObj,
  createOrderToUpgradeObj,
  getTokenTypes,
  createOrderToUpgrade,
  createOrderToUpgradeSuccess,
  createOrderToUpgradeFailure,
  clearCreateOrderToUpgradeState,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentTokenTypeMinutes, setCurrentTokenTypeMinutes] = useState(0)
  const [tokenTypeToUpgradeList, setTokenTypeToUpgradeList] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [selectedTokenId, setSelectedTokenId] = useState(null)
  const [selectedTokenTypeId, setSelectedTokenTypeId] = useState(null)
  const loadingRef = useRef(createOrderToUpgradeObj.isLoading)
  loadingRef.current = createOrderToUpgradeObj.isLoading

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

  useEffect(() => {
    return () => clearCreateOrderToUpgradeState()
  }, [clearCreateOrderToUpgradeState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(ORDER_TO_UPGRADE_CREATED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_UPGRADED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(TOKEN_UPGRADED_FAILED_EVENT)
  }, [])

  useEffect(() => {
    getTokenTypes()
  }, [getTokenTypes])

  useEffect(() => {
    window.$(`.token-currency-choose .pay-option label.pay-option-check-select`).removeClass('pay-option-check-select')
    window
      .$(`.token-currency-choose .pay-option input[value=${selectedTokenTypeId}]`)
      .parent()
      .parent()
      .siblings('label')
      .addClass('pay-option-check-select')
  }, [selectedTokenTypeId])

  useEffect(() => {
    if (
      getTokenTypeListObj.isLoading === false &&
      getTokenTypeListObj.isSuccess === true &&
      getTokenTypeListObj.tokenTypeList.length > 0
    ) {
      const tokenTypeIds = Utils.sortAndFilterTokenTypeList(
        getTokenTypeListObj.tokenTypeList,
        [TOKEN_TYPE.FREE.name],
        'price',
        true,
        currentTokenTypeMinutes
      )
      setTokenTypeToUpgradeList(tokenTypeIds)
      if (tokenTypeIds.length > 0) {
        const id = tokenTypeIds[0]._id
        setSelectedTokenTypeId(id)
      } else {
        setSelectedTokenTypeId(null)
      }
    }
  }, [getTokenTypeListObj, currentTokenTypeMinutes])

  const onSubmit = () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    async function upgradeToken(projectId, tokenId, tokenTypeToUpgrade) {
      const cardElement = elements.getElement(CardElement)
      let result = null
      // const paymentMethodReq = null
      let confirmedCardPayment = null

      try {
        let usd = 0.000043 * tokenTypeToUpgrade.saleOffPrice
        usd = usd < 0.5 ? 0.5 : usd // Amount must be at least $0.50 usd
        result = await OrderService.createPaymentIntent(usd * 100)

        // paymentMethodReq = await stripe.createPaymentMethod({
        //   type: 'card',
        //   card: cardElement,
        //   billing_details: {
        //     name: `${user.firstName} ${user.lastName}`,
        //     email: user.email,
        //   },
        // })
        // if (paymentMethodReq.error) {
        //   setErrorMessage(paymentMethodReq.error.message)
        //   setIsLoading(false)
        //   return
        // }

        confirmedCardPayment = await stripe.confirmCardPayment(result.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${currentUser.firstName} ${currentUser.lastName}`,
              email: currentUser.email,
            },
          },
        })
        if (confirmedCardPayment.error) {
          setErrorMessage(confirmedCardPayment.error.message)
          setIsLoading(false)
          return
        }
      } catch (err) {
        setErrorMessage(err.message || err)
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
        createOrderToUpgrade(order)
        try {
          await OrderService.createOrderToUpgradeToken(order, paymentIntent)
          invokeCheckSubject.OrderToUpgradeCreated.subscribe(data => {
            if (data.error != null) {
              createOrderToUpgradeFailure(data.errorObj)
            }
          })
          invokeCheckSubject.TokenUpgraded.subscribe(data => {
            if (data.error != null) {
              createOrderToUpgradeFailure(data.errorObj)
            } else {
              createOrderToUpgradeSuccess({ order })
              form.resetFields()
            }
          })
        } catch (err) {
          createOrderToUpgradeFailure({ message: err.message })
        }
      }
    }

    setIsLoading(true)

    // check ids
    if (!selectedProjectId || !selectedTokenId) {
      setErrorMessage('Vui lòng chọn dự án và API key!')
      setIsLoading(false)
      return
    }
    if (!selectedTokenTypeId) {
      setErrorMessage('Vui lòng chọn loại API key để nâng cấp!')
      setIsLoading(false)
      return
    }

    // start upgrade token process
    let selectedType = getTokenTypeListObj.tokenTypeList.find(x => x._id === selectedTokenTypeId)
    selectedType = Utils.removePropertiesFromObject(selectedType, ['createdDate', 'updatedDate'])
    upgradeToken(selectedProjectId, selectedTokenId, selectedType)
  }

  useEffect(() => {
    let timer = null
    if (createOrderToUpgradeObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          createOrderToUpgradeFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (createOrderToUpgradeObj.isLoading === false && createOrderToUpgradeObj.isSuccess != null) {
      setIsLoading(false)
      if (createOrderToUpgradeObj.isSuccess === false) {
        setErrorMessage(Utils.buildFailedMessage(createOrderToUpgradeObj.message, 'Nâng cấp API key thất bại'))
      }
    }
    return () => clearTimeout(timer)
  }, [createOrderToUpgradeObj, createOrderToUpgradeFailure])

  const onTokenTypeChange = e => {
    const tokenTypeId = e.target.value
    setSelectedTokenTypeId(tokenTypeId)
  }

  const onSelectTokenFormValuesChange = (projectId, tokenId) => {
    setSelectedProjectId(projectId)
    setSelectedTokenId(tokenId)
  }

  return (
    <>
      <SelectTokenForm
        onSelectTokenFormValuesChange={onSelectTokenFormValuesChange}
        setCurrentTokenTypeMinutes={setCurrentTokenTypeMinutes}
      />
      <Row gutter={24} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <h5 className="font-mid">Nâng cấp lên gói</h5>
          <div className="token-balance token-balance-s2">
            <div className="token-currency-choose" style={{ color: '#495463' }}>
              {tokenTypeToUpgradeList.length === 0 && <p>API key đã được nâng cấp lên gói cao nhất</p>}
              {(getTokenTypeListObj.tokenTypeList || []).length > 0 && (
                <Radio.Group
                  name="radiogroup"
                  style={{ width: '100%', fontSize: 'inherit' }}
                  onChange={onTokenTypeChange}
                >
                  <div className="row guttar-15px" style={{ display: 'flex' }}>
                    {tokenTypeToUpgradeList.map(tokenType => {
                      return (
                        <div className="col-12 col-md-6 col-lg-4 mt-2" key={tokenType._id}>
                          <TokenType tokenType={tokenType} />
                        </div>
                      )
                    })}
                  </div>
                </Radio.Group>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Form form={form} onFinish={onSubmit}>
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
            <strong> điều khoản giao dịch mua bán key</strong> của VietSpeech.
          </Checkbox>
        </Form.Item>
        <ul className="d-flex flex-wrap align-items-center guttar-30px">
          <li>
            {createOrderToUpgradeObj.isLoading === false && createOrderToUpgradeObj.isSuccess === true && (
              <Alert
                message="Nâng cấp API key thành công"
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
                tokenTypeToUpgradeList.length === 0 || !selectedProjectId || !selectedTokenId || !selectedTokenTypeId
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
    </>
  )
}

export default UpgradeForm
