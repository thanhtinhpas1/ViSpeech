/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CUSTOMER_PATH } from 'utils/constant'
import SocketService from 'services/socket.service'
import ProjectService from 'services/project.service'
import SocketUtils from 'utils/socket.util'
import InfoModal from 'components/customer/InfoModal/InfoModal.component'
import Utils from 'utils'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PROJECT_CREATED_SUCCESS_EVENT, PROJECT_CREATED_FAILED_EVENT } = KAFKA_TOPIC

const CreateProjectPage = ({
  currentUser,
  createProjectObj,
  createProject,
  createProjectSuccess,
  createProjectFailure,
}) => {
  const [infoModal, setInfoModal] = useState({})

  useEffect(() => {
    SocketService.socketOnListeningEvent(PROJECT_CREATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_CREATED_FAILED_EVENT)
  }, [])

  const emptyAllInputField = () => {
    window.$('#create-project-form')[0].reset()
  }

  useEffect(() => {
    if (createProjectObj.isLoading === false && createProjectObj.isSuccess != null) {
      if (createProjectObj.isSuccess === true) {
        emptyAllInputField()
        setInfoModal({
          title: 'Tạo dự án',
          message: 'Thành công',
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
          title: 'Tạo dự án',
          message: Utils.buildFailedMessage(createProjectObj.message, 'Thất bại'),
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
  }, [createProjectObj])

  const onSubmit = async event => {
    event.preventDefault()
    if (!currentUser._id) return

    const form = event.target
    const project = {
      name: form.elements.name.value.trim(),
      description: form.elements.description.value.trim(),
      userId: currentUser._id,
    }

    setInfoModal({
      title: 'Tạo dự án',
      message: 'Vui lòng chờ giây lát...',
      icon: {
        isLoading: true,
      },
    })
    window.$('#info-modal').modal('show')

    createProject(project)
    try {
      await ProjectService.createProject(project)
      invokeCheckSubject.ProjectCreated.subscribe(data => {
        if (data.error != null) {
          createProjectFailure(data.errorObj)
        } else {
          createProjectSuccess(project)
        }
      })
    } catch (err) {
      createProjectFailure({ message: err.message })
    }
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="content-area card">
          <div className="card-innr card-innr-fix">
            <div className="card-head d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Tạo dự án</h4>
              <Link to={`${CUSTOMER_PATH}/projects`} className="btn btn-sm btn-auto btn-primary d-sm-block d-none">
                <em className="fas fa-arrow-left mr-3" />
                Trở lại
              </Link>
              <Link to={`${CUSTOMER_PATH}/projects`} className="btn btn-icon btn-sm btn-primary d-sm-none">
                <em className="fas fa-arrow-left" />
              </Link>
            </div>
            <div className="gaps-1x" />
            <form onSubmit={onSubmit} id="create-project-form" style={{ overflow: 'auto' }}>
              <div className="input-item input-with-label">
                <label className="input-item-label text-exlight">Tên dự án *</label>
                <input className="input-bordered" type="text" name="name" required />
              </div>
              <div className="input-item input-with-label">
                <label className="input-item-label text-exlight">Mô tả</label>
                <textarea className="input-bordered input-textarea" defaultValue="" name="description" />
              </div>
              <div className="gaps-1x" />
              <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>
                Tạo
              </button>
            </form>
          </div>
        </div>
      </div>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default CreateProjectPage
