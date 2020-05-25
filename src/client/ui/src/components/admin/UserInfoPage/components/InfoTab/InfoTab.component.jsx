/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { Form, Input, Button, Alert, Radio, Empty } from 'antd'
import { ROLES } from 'utils/constant'
import Utils from 'utils'
import SocketService from 'services/socket.service'
import UserService from 'services/user.service'
import SocketUtils from 'utils/socket.util'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'
import './InfoTab.style.scss'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { USER_UPDATED_SUCCESS_EVENT, USER_UPDATED_FAILED_EVENT } = KAFKA_TOPIC

const InfoTab = ({ userInfoObj, updateInfoObj, updateUserInfo, updateUserInfoSuccess, updateUserInfoFailure }) => {
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
    SocketService.socketOnListeningEvent(USER_UPDATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(USER_UPDATED_FAILED_EVENT)
  }, [])

  const onSubmit = async values => {
    const userId = userInfoObj.user._id
    if (!userId) {
      return
    }

    const { firstName, lastName, email, role } = values

    const user = {
      firstName,
      lastName,
      email,
      roles: [{ name: role }],
    }

    updateUserInfo(userId, user)
    try {
      await UserService.updateUserInfo(userId, user)
      invokeCheckSubject.UserUpdated.subscribe(data => {
        if (data.error != null) {
          updateUserInfoFailure(data.errorObj)
        } else {
          updateUserInfoSuccess()
        }
      })
    } catch (err) {
      updateUserInfoFailure({ message: err.message })
    }
  }

  return (
    <div className="info-tab">
      {userInfoObj.isLoading && (
        <div className="info-tab__loading">
          <LoadingIcon />
        </div>
      )}
      {(userInfoObj.isLoading || userInfoObj.isSuccess === false) && <Empty />}
      {!userInfoObj.isLoading && userInfoObj.isSuccess === true && (
        <Form
          form={form}
          onFinish={onSubmit}
          initialValues={{
            lastName: userInfoObj.user.lastName,
            firstName: userInfoObj.user.firstName,
            email: userInfoObj.user.email,
            role: Array.isArray(userInfoObj.user.roles) && userInfoObj.user.roles[0].name,
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
          <Form.Item {...formItemLayout} label="Tên đăng nhập">
            <div>{userInfoObj.user.username}</div>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Email"
            name="email"
            hasFeedback
            rules={[{ type: 'email', required: true, message: 'Vui lòng nhập email!' }]}
          >
            {Utils.isEmailVerified(userInfoObj.user.roles) ? <div>{userInfoObj.user.email}</div> : <Input />}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="role"
            label="Vai trò"
            hasFeedback
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Radio.Group disabled>
              {Object.values(ROLES).map(role => {
                return (
                  <Radio value={role} key={role}>
                    {role}
                  </Radio>
                )
              })}
            </Radio.Group>
          </Form.Item>
          {!updateInfoObj.isLoading && updateInfoObj.isSuccess === false && (
            <Form.Item {...tailLayout}>
              <Alert message={Utils.buildFailedMessage(updateInfoObj.message)} type="error" showIcon closable />
            </Form.Item>
          )}
          {!updateInfoObj.isLoading && updateInfoObj.isSuccess === true && (
            <Form.Item {...tailLayout}>
              <Alert message="Cập nhật thông tin thành công" type="success" showIcon closable />
            </Form.Item>
          )}
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" loading={updateInfoObj.isLoading} type="primary" size="middle">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default InfoTab
