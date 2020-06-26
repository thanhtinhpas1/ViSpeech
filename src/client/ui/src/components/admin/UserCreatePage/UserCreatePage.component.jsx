/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { Form, Input, Button, Alert, Radio, Row } from 'antd'
import { ROLES } from 'utils/constant'
import Utils from 'utils'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { USER_CREATED_SUCCESS_EVENT, USER_CREATED_FAILED_EVENT } = KAFKA_TOPIC

const UserCreatePage = ({ createUserObj, createUser, createUserSuccess, createUserFailure }) => {
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  }
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  }

  useEffect(() => {
    SocketService.socketOnListeningEvent(USER_CREATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(USER_CREATED_FAILED_EVENT)
  }, [])

  const onSubmit = async values => {
    const { firstName, lastName, username, password, email, role } = values

    const user = {
      firstName,
      lastName,
      username,
      password,
      email,
      roles: [{ name: role }],
    }

    createUser(user)
    try {
      await UserService.createUser(user)
      invokeCheckSubject.UserCreated.subscribe(data => {
        if (data.error != null) {
          createUserFailure(data.errorObj)
        } else {
          createUserSuccess()
          form.resetFields()
        }
      })
    } catch (err) {
      createUserFailure({ message: err.message })
    }
  }

  return (
    <Row>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Thêm khách hàng mới</h4>
        </div>
        <div className="card-content">
          <Form
            form={form}
            onFinish={onSubmit}
            initialValues={{
              role: ROLES.USER,
            }}
          >
            <Form.Item
              {...formItemLayout}
              name="lastName"
              label="Họ"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ khách hàng!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="firstName"
              label="Tên"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên khách hàng!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="username"
              label="Tên đăng nhập"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="password"
              label="Mật khẩu"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="confirmedPassword"
              label="Nhập lại mật khẩu"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng xác nhận mật khẩu!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Mật khẩu không khớp. Vui lòng nhập lại!')
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="email"
              label="Email"
              hasFeedback
              rules={[{ type: 'email', required: true, message: 'Vui lòng nhập email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="role"
              label="Vai trò"
              hasFeedback
              rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
            >
              <Radio.Group>
                {Object.values(ROLES).map(role => {
                  return (
                    <Radio value={role} key={role}>
                      {role}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Form.Item>
            {!createUserObj.isLoading && createUserObj.isSuccess === false && (
              <Form.Item {...tailLayout}>
                <Alert message={Utils.buildFailedMessage(createUserObj.message)} type="error" showIcon closable />
              </Form.Item>
            )}
            {!createUserObj.isLoading && createUserObj.isSuccess === true && (
              <Form.Item {...tailLayout}>
                <Alert message="Thêm khách hàng thành công" type="success" showIcon closable />
              </Form.Item>
            )}
            <Form.Item {...tailLayout}>
              <Button htmlType="submit" loading={createUserObj.isLoading} type="primary" size="middle">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Row>
  )
}

export default UserCreatePage
