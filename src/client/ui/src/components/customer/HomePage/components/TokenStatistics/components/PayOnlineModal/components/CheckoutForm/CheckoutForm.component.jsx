/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Alert, Button, Checkbox, Form, Input, Select } from 'antd'
import Utils from '../../../../../../../../../utils'
import SocketService from '../../../../../../../../../services/socket.service'
import OrderService from '../../../../../../../../../services/order.service'
import SocketUtils from '../../../../../../../../../utils/socket.util'
import {
  DEFAULT_PAGINATION,
  DEFAULT_ERR_MESSAGE,
  TIMEOUT_MILLISECONDS,
} from '../../../../../../../../../utils/constant'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const {
  ORDERED_TOKEN_CREATED_SUCCESS_EVENT,
  ORDERED_TOKEN_CREATED_FAILED_EVENT,
  ORDER_CREATED_FAILED_EVENT,
} = KAFKA_TOPIC

const { Option } = Select

const CheckoutForm = ({
  currentUser,
  checkoutInfo,
  myProjectList,
  createOrderObj,
  getProjectTokenListObj,
  onOrderSuccess,
  createOrder,
  createOrderSuccess,
  createOrderFailure,
  clearCreateOrderState,
  getProjectTokenList,
  clearGetProjectTokenState,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const loadingRef = useRef(createOrderObj.isLoading)
  loadingRef.current = createOrderObj.isLoading

  useEffect(() => {
    return () => {
      clearCreateOrderState()
      clearGetProjectTokenState()
    }
  }, [clearCreateOrderState, clearGetProjectTokenState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(ORDER_CREATED_FAILED_EVENT)
    SocketService.socketOnListeningEvent(ORDERED_TOKEN_CREATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(ORDERED_TOKEN_CREATED_FAILED_EVENT)
  }, [])

  const onSubmit = values => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    async function createToken(projectId, tokenName) {
      const cardElement = elements.getElement(CardElement)
      const { user, tokenType } = checkoutInfo.data
      let result = null
      // const paymentMethodReq = null
      let confirmedCardPayment = null

      try {
        let usd = 0.000043 * tokenType.saleOffPrice
        usd = usd < 0.5 ? 0.5 : usd // Amount must be at least $0.50 usd
        result = await OrderService.createPaymentIntent(usd * 100)

        confirmedCardPayment = await stripe.confirmCardPayment(result.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
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
          userId: user._id,
          tokenType: Utils.removePropertyFromObject(tokenType, 'saleOffPrice'),
          token: {
            userId: user._id,
            projectId,
            name: tokenName,
          },
        }
        createOrder(order, paymentIntent)
        try {
          await OrderService.createOrder(order, paymentIntent)
          const unsubscribe$ = invokeCheckSubject.OrderCreated.subscribe(data => {
            if (data.error != null) {
              createOrderFailure(data.errorObj)
            }
          })
          const unsubscribe1$ = invokeCheckSubject.OrderedTokenCreated.subscribe(data => {
            if (data.error != null) {
              createOrderFailure(data.errorObj)
            } else {
              createOrderSuccess({ order, token: data.updatedToken })
            }
            unsubscribe$.unsubscribe()
            unsubscribe$.complete()
            unsubscribe1$.unsubscribe()
            unsubscribe1$.complete()
          })
        } catch (err) {
          createOrderFailure({ message: err.message })
        }
      }
    }

    setIsLoading(true)
    const { projectId, tokenName } = values
    createToken(projectId, tokenName)
  }

  useEffect(() => {
    let timer = null
    if (createOrderObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          createOrderFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (createOrderObj.isLoading === false && createOrderObj.isSuccess != null) {
      setIsLoading(false)
      if (createOrderObj.isSuccess === true) {
        const { token } = createOrderObj.data
        onOrderSuccess({
          minutes: token.minutes,
          tokenValue: token.value,
        })
      } else {
        setErrorMessage(Utils.buildFailedMessage(createOrderObj.message, 'Giao dịch thất bại'))
      }
    }
    return () => clearTimeout(timer)
  }, [createOrderObj, onOrderSuccess, createOrderFailure])

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

  const onProjectIdChange = async value => {
    const userId = currentUser && currentUser._id
    if (userId) {
      const filters = {
        isValid: ['true'],
      }
      getProjectTokenList({ userId, projectId: value, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
    }
  }

  return (
    <Form form={form} onFinish={onSubmit}>
      <h5 className="font-mid">Dự án</h5>
      <Form.Item name="projectId" rules={[{ required: true, message: 'Vui lòng chọn một dự án.' }]}>
        <Select style={{ width: '100%' }} placeholder="Chọn một dự án" onChange={onProjectIdChange}>
          {myProjectList.map(project => {
            return (
              <Option value={project._id} key={project._id}>
                {project.name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <h5 className="font-mid">Tên API key</h5>
      <Form.Item
        name="tokenName"
        dependencies={['projectId']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng đặt tên cho API key.',
          },
          () => ({
            async validator(rule, value) {
              if (getProjectTokenListObj.isSuccess === false) {
                return Promise.reject('Đã có lỗi xảy ra. Vui lòng thử lại sau!')
              }
              if (getProjectTokenListObj.projectTokenList.data.some(token => token.name === value)) {
                return Promise.reject('Tên đã tồn tại. Vui lòng đặt tên khác!')
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input placeholder="Nhập tên API key" />
      </Form.Item>
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
          {errorMessage != null && (
            <Alert
              message={Utils.buildFailedMessage({ message: errorMessage })}
              type="error"
              showIcon
              closable
              style={{ marginBottom: '20px' }}
            />
          )}
          <Button htmlType="submit" loading={isLoading} type="primary" size="large">
            Thanh toán <em className="ti ti-arrow-right mgl-2x" />
          </Button>
        </li>
      </ul>
      <div className="gaps-1x" />
      <div className="note note-plane note-light mgb-1x">
        <em className="fas fa-info-circle" />
        <p className="text-light">Sau khi giao dịch thành công, trang web sẽ hiển thị API key cho bạn.</p>
      </div>
    </Form>
  )
}

export default CheckoutForm
