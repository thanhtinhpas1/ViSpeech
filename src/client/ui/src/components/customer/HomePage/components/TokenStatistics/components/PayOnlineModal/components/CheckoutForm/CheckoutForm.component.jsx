/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Alert, Button, Select, Form, Checkbox } from 'antd'
import Utils from 'utils'
import SocketService from 'services/socket.service'
import OrderService from 'services/order.service'
import SocketUtils from 'utils/socket.util'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const {
  ORDERED_TOKEN_CREATED_SUCCESS_EVENT,
  ORDERED_TOKEN_CREATED_FAILED_EVENT,
  ORDER_CREATED_FAILED_EVENT,
} = KAFKA_TOPIC

const { Option } = Select

const CheckoutForm = ({
  checkoutInfo,
  myProjectList,
  createOrderObj,
  onOrderSuccess,
  createOrder,
  createOrderSuccess,
  createOrderFailure,
  clearCreateOrderState,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    clearCreateOrderState()
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

    async function createToken(projectId) {
      const cardElement = elements.getElement(CardElement)
      const { user, tokenType } = checkoutInfo
      let result = null

      try {
        result = await OrderService.createPaymentIntent(tokenType.saleOffPrice * 100)
      } catch (err) {
        setErrorMessage(err.message || err)
        setIsLoading(false)
        return
      }

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
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
          userId: user._id,
          tokenType: Utils.removePropertyFromObject(tokenType, 'saleOffPrice'),
          token: {
            userId: user._id,
            projectId,
          },
        }
        createOrder(order, paymentIntent)
        try {
          await OrderService.createOrder(order, paymentIntent)
          invokeCheckSubject.OrderCreated.subscribe(data => {
            if (data.error != null) {
              createOrderFailure(data.errorObj)
            }
          })
          invokeCheckSubject.OrderedTokenCreated.subscribe(data => {
            if (data.error != null) {
              createOrderFailure(data.errorObj)
            } else {
              createOrderSuccess({ order, token: data.formattedToken })
            }
          })
        } catch (err) {
          createOrderFailure({ message: err.message })
        }
      }
    }

    setIsLoading(true)
    const { projectId } = values
    createToken(projectId)
  }

  useEffect(() => {
    if (createOrderObj.isLoading === false && createOrderObj.isSuccess != null) {
      setIsLoading(false)
      if (createOrderObj.isSuccess === true) {
        const { token } = createOrderObj.data
        onOrderSuccess({
          minutes: token.minutes,
          tokenValue: token.value,
        })
        window.$('#pay-online').modal('hide')
        window.$('#pay-review').modal('show')
      } else {
        setErrorMessage(Utils.buildFailedMessage(createOrderObj.message, 'Giao dịch thất bại'))
      }
    }
  }, [createOrderObj, onOrderSuccess])

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

  return (
    <Form form={form} onFinish={onSubmit}>
      <h5 className="font-mid">Dự án</h5>
      <Form.Item name="projectId" rules={[{ required: true, message: 'Vui lòng chọn một dự án.' }]}>
        <Select style={{ width: '100%' }} placeholder="Chọn một dự án">
          {myProjectList.map(project => {
            return (
              <Option value={project._id} key={project._id}>
                {project.name}
              </Option>
            )
          })}
        </Select>
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
          <strong> điều khoản giao dịch mua bán key</strong> của Softia.
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
      <div className="gaps-1x d-none d-sm-block" />
      <div className="note note-plane note-light mgb-1x">
        <em className="fas fa-info-circle" />
        <p className="text-light">Sau khi giao dịch thành công, trang web sẽ hiển thị key cho bạn.</p>
      </div>
    </Form>
  )
}

export default CheckoutForm
