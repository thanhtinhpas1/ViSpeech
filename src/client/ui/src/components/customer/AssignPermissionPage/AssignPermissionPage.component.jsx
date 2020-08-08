/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Select, Button, DatePicker } from 'antd'
import * as moment from 'moment'
import { DEFAULT_PAGINATION, TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE } from '../../../utils/constant'
import Utils from '../../../utils'
import SocketService from '../../../services/socket.service'
import PermissionService from '../../../services/permission.service'
import SocketUtils from '../../../utils/socket.util'
import InfoModal from '../../common/InfoModal/InfoModal.component'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT, PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT } = KAFKA_TOPIC

const { Option } = Select

const AssignPermissionPage = ({
  currentUser,
  getMyProjectListObj,
  getUsernameListObj,
  assignPermissionObj,
  clearAssignPermissionState,
  getMyProjects,
  getUsernameList,
  assignPermission,
  assignPermissionSuccess,
  assignPermissionFailure,
}) => {
  const history = useHistory()
  const query = Utils.useQuery()
  const [form] = Form.useForm()
  const [infoModal, setInfoModal] = useState({})
  const loadingRef = useRef(assignPermissionObj.isLoading)
  loadingRef.current = assignPermissionObj.isLoading

  useEffect(() => {
    return () => clearAssignPermissionState()
  }, [clearAssignPermissionState])

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
    let timer = null
    if (assignPermissionObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
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
          message: Utils.buildFailedMessage(assignPermissionObj.message, 'Gửi mail thất bại'),
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
    return () => clearTimeout(timer)
  }, [assignPermissionObj, closeInfoModal, assignPermissionFailure])

  useEffect(() => {
    if (currentUser._id) {
      getMyProjects({ userId: currentUser._id })
    }
    const filters = {
      isActive: ['true'],
    }
    getUsernameList({ pagination: DEFAULT_PAGINATION.SIZE_100, filters })
  }, [currentUser._id, getMyProjects, getUsernameList])

  const onSubmit = async values => {
    if (!currentUser._id) return

    const userId = currentUser._id
    const { usernames, projectId, expiresIn } = values

    const permission = {
      assigneeUsernames: usernames,
      projectId,
      expiresIn: expiresIn.valueOf(),
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
      const unsubscribe$ = invokeCheckSubject.PermissionAssignEmailSent.subscribe(data => {
        if (data.error != null) {
          assignPermissionFailure(data.errorObj)
        } else {
          assignPermissionSuccess(permission)
          form.resetFields()
        }
        unsubscribe$.unsubscribe()
        unsubscribe$.complete()
      })
    } catch (err) {
      assignPermissionFailure({ message: err.message })
    }
  }

  const disabledDate = current => {
    const now = new Date()
    return current && current <= moment(now)
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="content-area card">
          <div className="card-innr card-innr-fix">
            <div className="card-head d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Mời tham gia dự án</h4>
              <a href="#!" onClick={history.goBack} className="btn btn-auto btn-primary d-sm-block d-none">
                <em className="fas fa-arrow-left" style={{ marginRight: '10px' }} />
                Trở lại
              </a>
              <a href="#!" onClick={history.goBack} className="btn btn-icon btn-primary d-sm-none">
                <em className="fas fa-arrow-left" />
              </a>
            </div>
            <div className="gaps-2x" />
            <Form
              form={form}
              onFinish={onSubmit}
              initialValues={{
                projectId: query.get('projectId'),
              }}
              size="large"
            >
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <Form.Item
                    name="usernames"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ít nhất một tài khoản.',
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder={
                        (getUsernameListObj.usernameList.data || []).length > 0
                          ? 'Chọn ít nhất một tài khoản'
                          : 'Không tìm thấy tài khoản'
                      }
                    >
                      {(getUsernameListObj.usernameList.data || [])
                        .filter(user => user.username !== currentUser.username)
                        .map(user => {
                          return (
                            <Option key={user._id} value={user.username}>
                              {user.username}
                            </Option>
                          )
                        })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <Form.Item name="projectId" rules={[{ required: true, message: 'Vui lòng chọn một dự án.' }]}>
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
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <Form.Item name="expiresIn" rules={[{ required: true, message: 'Vui lòng chọn thời gian.' }]}>
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="Cho phép tham gia đến ngày"
                      picker="date"
                      format="DD/MM/YYYY"
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <Form.Item>
                    <Button htmlType="submit" loading={assignPermissionObj.isLoading} type="primary">
                      Mời tham gia
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {infoModal.visible && <InfoModal infoModal={infoModal} />}
    </div>
  )
}

export default AssignPermissionPage
