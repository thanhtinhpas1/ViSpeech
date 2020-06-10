/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Alert, Button, Select, Form, Checkbox, Input, Col, Row, Radio } from 'antd'
import Utils from 'utils'
// import OrderService from 'services/order.service'
import { DEFAULT_PAGINATION, TOKEN_TYPE } from 'utils/constant'
import TokenType from 'components/customer/HomePage/components/TokenStatistics/components/TokenType/TokenType.component'

const { Option } = Select

const UpgradeForm = ({
  currentUser,
  errorMessage,
  isLoading,
  getMyProjectListObj,
  getTokenTypeListObj,
  getProjectTokenListObj,
  getMyProjects,
  getTokenTypes,
  getProjectTokenList,
  onSubmit,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [form] = Form.useForm()
  const [currentTokenType, setCurrentTokenType] = useState('')
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

  useEffect(() => {
    getTokenTypes()
  }, [getTokenTypes])

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
      const id = Utils.sortAndFilter(
        getTokenTypeListObj.tokenTypeList,
        (a, b) => a.price - b.price,
        item => ![TOKEN_TYPE.FREE.name, currentTokenType].includes(item.name)
      )[0]._id
      changeTokenTypeCss(id)
      setDefaultTokenTypeId(id)
    }
  }, [getTokenTypeListObj, currentTokenType])

  useEffect(() => {
    if (currentUser._id && Utils.isEmailVerified(currentUser.roles)) {
      const filters = {
        isValid: ['true'],
      }
      getMyProjects({ userId: currentUser._id, pagination: DEFAULT_PAGINATION, filters })
    }
  }, [currentUser._id, currentUser.roles, getMyProjects])

  const onProjectIdChange = async value => {
    const userId = currentUser && currentUser._id
    if (userId) {
      const filters = {
        isValid: ['true'],
      }
      getProjectTokenList({ userId, projectId: value, pagination: DEFAULT_PAGINATION, filters })
      form.resetFields(['tokenId'])
      form.resetFields(['currentTokenType'])
      setCurrentTokenType('')
    }
  }

  const onTokenIdChange = async value => {
    const token = getProjectTokenListObj.projectTokenList.data.find(item => item._id === value)
    const tokenTypes = Object.keys(TOKEN_TYPE)
    const findIndexFunc = tokenType => TOKEN_TYPE[tokenType].minutes === token.minutes
    const index = tokenTypes[tokenTypes.findIndex(findIndexFunc)]
    setCurrentTokenType(TOKEN_TYPE[index].name)
    form.setFieldsValue({ currentTokenType: TOKEN_TYPE[index].viText })
  }

  const onChangeTokenType = e => {
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
          <h5 className="font-mid">Tên token</h5>
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
          <div className="token-balance token-balance-s2">
            <div className="token-currency-choose" style={{ color: '#495463' }}>
              {getTokenTypeListObj.tokenTypeList.length > 0 && (
                <Radio.Group
                  name="radiogroup"
                  style={{ width: '100%' }}
                  onChange={onChangeTokenType}
                  defaultValue={defaultTokenTypeId}
                >
                  <div className="row guttar-15px" style={{ display: 'flex' }}>
                    {Utils.sortAndFilter(
                      getTokenTypeListObj.tokenTypeList,
                      (a, b) => a.price - b.price,
                      item => ![TOKEN_TYPE.FREE.name, currentTokenType].includes(item.name)
                    ).map(tokenType => {
                      return (
                        <div className="col-3" key={tokenType._id}>
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
