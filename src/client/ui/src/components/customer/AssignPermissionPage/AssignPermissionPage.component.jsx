/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from 'react'
import { Form, Select, Button } from 'antd'
import { PERMISSIONS, DEFAULT_PAGINATION, TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE } from 'utils/constant'
import Utils from 'utils'
import SocketService from 'services/socket.service'
import PermissionService from 'services/permission.service'
import SocketUtils from 'utils/socket.util'
import InfoModal from 'components/common/InfoModal/InfoModal.component'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT, PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT } = KAFKA_TOPIC

const { Option } = Select

const AssignPermissionPage = ({
  currentUser,
  getMyProjectListObj,
  getUserListObj,
  assignPermissionObj,
  getMyProjects,
  getUserList,
  assignPermission,
  assignPermissionSuccess,
  assignPermissionFailure,
}) => {
  const query = Utils.useQuery()
  const [form] = Form.useForm()
  const [infoModal, setInfoModal] = useState({})

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
    SocketService.socketOnListeningEvent(PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT)
  }, [])

  const closeInfoModal = useCallback(() => {
    setInfoModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  useEffect(() => {
    if (assignPermissionObj.isLoading === true) {
      setTimeout(() => {
        if (assignPermissionObj.isLoading === true) {
          assignPermissionFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (assignPermissionObj.isLoading === false && assignPermissionObj.isSuccess != null) {
      if (assignPermissionObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Mời tham gia dự án',
          message: 'Gửi mail thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
            },
          },
          onCancel: () => closeInfoModal(),
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Mời tham gia dự án',
          message: Utils.buildFailedMessage(assignPermissionObj.message, 'Gửi mail thất bại.'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
            },
          },
          onCancel: () => closeInfoModal(),
        })
      }
    }
  }, [assignPermissionObj, closeInfoModal, assignPermissionFailure])

  useEffect(() => {
    if (currentUser._id) {
      getMyProjects({ userId: currentUser._id })
    }
    const filters = {
      isActive: ['true'],
    }
    getUserList({ pagination: DEFAULT_PAGINATION.SIZE_100, filters })
  }, [currentUser._id, getMyProjects, getUserList])

  const onSubmit = async values => {
    if (!currentUser._id) return

    const userId = currentUser._id
    const { username, projectId } = values

    const permission = {
      assigneeUsername: username.trim(),
      projectId,
      permissions: [PERMISSIONS.CSR_USER],
      assignerId: userId,
    }

    setInfoModal({
      visible: true,
      title: 'Mời tham gia dự án',
      message: 'Đang gửi mail. Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
      onCancel: () => closeInfoModal(),
    })

    assignPermission(permission)
    try {
      await PermissionService.sendAssignPermissionEmail(permission)
      invokeCheckSubject.PermissionAssignEmailSent.subscribe(data => {
        if (data.error != null) {
          assignPermissionFailure(data.errorObj)
        } else {
          assignPermissionSuccess(permission)
          form.resetFields()
        }
      })
    } catch (err) {
      assignPermissionFailure({ message: err.message })
    }
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="content-area card">
          <div className="card-innr card-innr-fix">
            <div className="card-head">
              <h4 className="card-title mb-0">Mời tham gia dự án</h4>
            </div>
            <div className="gaps-2x" />
            <Form
              form={form}
              onFinish={onSubmit}
              initialValues={{
                projectId: query.get('projectId'),
              }}
            >
              <Form.Item
                {...formItemLayout}
                name="username"
                label="Tên tài khoản"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn một tài khoản.',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder={
                    (getUserListObj.userList.data || []).length > 0 ? 'Chọn một tài khoản' : 'Không tìm thấy tài khoản'
                  }
                >
                  {(getUserListObj.userList.data || [])
                    .filter(user => user.username !== currentUser.username)
                    .map(item => {
                      return (
                        <Option key={item._id} value={item.username}>
                          {item.username}
                        </Option>
                      )
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                name="projectId"
                label="Dự án"
                rules={[{ required: true, message: 'Vui lòng chọn một dự án.' }]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder={
                    (getMyProjectListObj.myProjectList.data || []).length > 0
                      ? 'Chọn một dự án'
                      : 'Không tìm thấy dự án'
                  }
                >
                  {(getMyProjectListObj.myProjectList.data || []).map(item => {
                    return (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button htmlType="submit" loading={assignPermissionObj.isLoading} type="primary" size="middle">
                  Mời
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      {infoModal.visible && <InfoModal infoModal={infoModal} />}
    </div>
  )
}

export default AssignPermissionPage
