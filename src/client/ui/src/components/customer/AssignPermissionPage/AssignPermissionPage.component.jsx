/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { PERMISSIONS } from 'utils/constant'
import Utils from 'utils'
import SocketService from 'services/socket.service'
import PermissionService from 'services/permission.service'
import SocketUtils from 'utils/socket.util'
import InfoModal from 'components/customer/InfoModal/InfoModal.component'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT, PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT } = KAFKA_TOPIC

const AssignPermissionPage = ({
  currentUser,
  getMyProjectListObj,
  assignPermissionObj,
  getMyProjects,
  assignPermission,
  assignPermissionSuccess,
  assignPermissionFailure,
}) => {
  const query = Utils.useQuery()
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT)
  }, [])

  const emptyAllInputField = () => {
    window.$('#assign-permission-form')[0].reset()
  }

  useEffect(() => {
    if (assignPermissionObj.isLoading === false && assignPermissionObj.isSuccess != null) {
      if (assignPermissionObj.isSuccess === true) {
        emptyAllInputField()
        setInfoModal({
          title: 'Mời tham gia dự án',
          message: 'Gửi mail thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
            },
          },
        })
      } else {
        setInfoModal({
          title: 'Mời tham gia dự án',
          message: Utils.buildFailedMessage(assignPermissionObj.message, 'Gửi mail thất bại.'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              window.$('#info-modal').modal('hide')
            },
          },
        })
      }
    }
  }, [assignPermissionObj])

  useEffect(() => {
    if (currentUser._id) {
      getMyProjects({ userId: currentUser._id })
    }
  }, [currentUser._id, getMyProjects])

  const onSubmit = async event => {
    event.preventDefault()
    if (!currentUser._id) return

    const form = event.target
    const permission = {
      assigneeUsername: form.elements.username.value.trim(),
      projectId: form.elements.projectId.value,
      permissions: [PERMISSIONS.CSR_USER],
      assignerId: currentUser._id,
    }

    setInfoModal({
      title: 'Mời tham gia dự án',
      message: 'Đang gửi mail. Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    })
    window.$('#info-modal').modal('show')

    assignPermission(permission)
    try {
      await PermissionService.sendAssignPermissionEmail(permission)
      invokeCheckSubject.PermissionAssignEmailSent.subscribe(data => {
        if (data.error != null) {
          assignPermissionFailure(data.errorObj)
        } else {
          assignPermissionSuccess(permission)
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
            <div className="gaps-1x" />
            <form onSubmit={onSubmit} id="assign-permission-form" style={{ overflow: 'auto' }}>
              <div className="input-item input-with-label">
                <label className="input-item-label text-exlight">Username *</label>
                <input className="input-bordered" type="text" name="username" required />
              </div>
              <div className="input-item input-with-label">
                <label className="input-item-label text-exlight">Tên dự án *</label>
                <select
                  className="custom-select input-item__select-project"
                  name="projectId"
                  required
                  id="selected-project"
                >
                  {getMyProjectListObj.myProjectList.data.map(project => {
                    if (query.get('projectName') === project.name) {
                      return (
                        <option value={project._id} selected>
                          {project.name}
                        </option>
                      )
                    }
                    return <option value={project._id}>{project.name}</option>
                  })}
                </select>
              </div>
              <div className="gaps-1x" />
              <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>
                Mời
              </button>
            </form>
          </div>
        </div>
      </div>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default AssignPermissionPage
