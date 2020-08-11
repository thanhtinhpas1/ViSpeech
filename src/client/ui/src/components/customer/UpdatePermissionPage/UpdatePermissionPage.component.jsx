/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, DatePicker } from 'antd'
import * as moment from 'moment'
import { TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE, STATUS } from '../../../utils/constant'
import Utils from '../../../utils'
import SocketService from '../../../services/socket.service'
import PermissionService from '../../../services/permission.service'
import SocketUtils from '../../../utils/socket.util'
import InfoModal from '../../common/InfoModal/InfoModal.component'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const {
  PERMISSION_EXPIRATION_DATE_UPDATED_SUCCESS_EVENT,
  PERMISSION_EXPIRATION_DATE_UPDATED_FAILED_EVENT,
} = KAFKA_TOPIC

const UpdatePermissionPage = ({
  findPermissionForAssigneeObj,
  updatePermissionExpirationDateObj,
  findPermissionForAssignee,
  updatePermissionExpirationDate,
  updatePermissionExpirationDateSuccess,
  updatePermissionExpirationDateFailure,
  clearUpdatePermissionExpirationDateState,
}) => {
  const history = useHistory()
  const query = Utils.useQuery()
  const projectId = query.get('projectId')
  const assignerId = query.get('assignerId')
  const assigneeId = query.get('assigneeId')
  const username = query.get('username')
  const projectName = query.get('projectName')
  const [form] = Form.useForm()
  const [infoModal, setInfoModal] = useState({})
  const loadingRef = useRef(updatePermissionExpirationDateObj.isLoading)
  loadingRef.current = updatePermissionExpirationDateObj.isLoading

  useEffect(() => {
    return () => clearUpdatePermissionExpirationDateState()
  }, [clearUpdatePermissionExpirationDateState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(PERMISSION_EXPIRATION_DATE_UPDATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_EXPIRATION_DATE_UPDATED_FAILED_EVENT)
  }, [])

  const closeInfoModal = useCallback(() => {
    setInfoModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  useEffect(() => {
    if (projectId && assignerId && assigneeId) {
      findPermissionForAssignee(projectId, assignerId, assigneeId, STATUS.ACCEPTED.name)
    }
  }, [projectId, assignerId, assigneeId, findPermissionForAssignee])

  useEffect(() => {
    let timer = null
    if (updatePermissionExpirationDateObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          updatePermissionExpirationDateFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (updatePermissionExpirationDateObj.isLoading === false && updatePermissionExpirationDateObj.isSuccess != null) {
      if (updatePermissionExpirationDateObj.isSuccess === true) {
        if (projectId && assignerId && assigneeId) {
          findPermissionForAssignee(projectId, assignerId, assigneeId, STATUS.ACCEPTED.name)
        }
        setInfoModal({
          visible: true,
          title: 'Cập nhật thời hạn tham gia dự án',
          message: 'Thành công',
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
          title: 'Cập nhật thời hạn tham gia dự án',
          message: Utils.buildFailedMessage(updatePermissionExpirationDateObj.message, 'Thất bại'),
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
  }, [
    projectId,
    assignerId,
    assigneeId,
    updatePermissionExpirationDateObj,
    closeInfoModal,
    findPermissionForAssignee,
    updatePermissionExpirationDateFailure,
  ])

  const onSubmit = async values => {
    if (!projectId || !assignerId || !assigneeId) return

    const { expiresIn } = values

    setInfoModal({
      visible: true,
      title: 'Cập nhật thời hạn tham gia dự án',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
      onCancel: () => closeInfoModal(),
    })

    const expiresInValue = expiresIn.valueOf()
    updatePermissionExpirationDate(projectId, assignerId, assigneeId, expiresInValue)
    try {
      await PermissionService.updatePermissionExpirationDate(projectId, assignerId, assigneeId, expiresInValue)
      const unsubscribe$ = invokeCheckSubject.PermissionExpirationDateUpdated.subscribe(data => {
        if (data.error != null) {
          updatePermissionExpirationDateFailure(data.errorObj)
        } else {
          updatePermissionExpirationDateSuccess()
          form.resetFields()
        }
        unsubscribe$.unsubscribe()
        unsubscribe$.complete()
      })
    } catch (err) {
      updatePermissionExpirationDateFailure({ message: err.message })
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
              <h4 className="card-title mb-0">Chi tiết lời mời tham gia dự án</h4>
              <a href="#!" onClick={history.goBack} className="btn btn-auto btn-primary d-sm-block d-none">
                <em className="fas fa-arrow-left" style={{ marginRight: '10px' }} />
                Trở lại
              </a>
              <a href="#!" onClick={history.goBack} className="btn btn-icon btn-primary d-sm-none">
                <em className="fas fa-arrow-left" />
              </a>
            </div>
            <div className="gaps-2x" />
            <div className="data-details d-md-flex">
              <div className="fake-class">
                <span className="data-details-title">Tên dự án</span>
                <span className="data-details-info">
                  <strong>{projectName}</strong>
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thành viên</span>
                <span className="data-details-info">
                  <strong>{username}</strong>
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Ngày bắt đầu tham gia dự án</span>
                <span className="data-details-info">
                  {moment(findPermissionForAssigneeObj.data?.updatedDate).format('DD/MM/YYYY HH:mm')}
                </span>
              </div>
              <div className="fake-class">
                <span className="data-details-title">Thời hạn tham gia dự án</span>
                <span className="data-details-info">
                  {moment(findPermissionForAssigneeObj.data?.expiresIn).format('DD/MM/YYYY HH:mm')}
                </span>
              </div>
            </div>
            <div className="gaps-4x" />
            <div style={{ fontSize: '20px', marginBottom: '20px' }}>Cập nhật thời hạn tham gia dự án</div>
            <Form form={form} onFinish={onSubmit} size="large">
              <div className="row justify-content-center">
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-3">
                  <Form.Item>
                    <Button htmlType="submit" loading={updatePermissionExpirationDateObj.isLoading} type="primary">
                      Cập nhật
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

export default UpdatePermissionPage
