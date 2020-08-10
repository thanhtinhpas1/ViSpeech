/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as moment from 'moment'
import { TIMEOUT_MILLISECONDS, DEFAULT_ERR_MESSAGE } from '../../../utils/constant'
import InfoModal from '../../common/InfoModal/InfoModal.component'
import ConfirmModal from '../../common/ConfirmModal/ConfirmModal.component'
import ProjectService from '../../../services/project.service'
import SocketUtils from '../../../utils/socket.util'
import SocketService from '../../../services/socket.service'
import Utils from '../../../utils'
import TokensTable from './components/TokensTable/TokensTable.container'
import AssigneesTable from './components/AssigneesTable/AssigneesTable.container'

const { KAFKA_TOPIC, invokeCheckSubject } = SocketUtils
const { PROJECT_UPDATED_SUCCESS_EVENT, PROJECT_UPDATED_FAILED_EVENT } = KAFKA_TOPIC

const ProjectDetailsPage = ({
  getProjectInfoObj,
  updateInfoObj,
  clearUpdateProjectInfoState,
  getProjectInfo,
  updateProjectInfo,
  updateProjectInfoSuccess,
  updateProjectInfoFailure,
}) => {
  const history = useHistory()
  const { id } = useParams()
  const [infoModal, setInfoModal] = useState({})
  const [confirmModal, setConfirmModal] = useState({})
  const loadingRef = useRef(updateInfoObj.isLoading)
  loadingRef.current = updateInfoObj.isLoading

  useEffect(() => {
    return () => {
      clearUpdateProjectInfoState()
    }
  }, [clearUpdateProjectInfoState])

  useEffect(() => {
    SocketService.socketOnListeningEvent(PROJECT_UPDATED_SUCCESS_EVENT)
    SocketService.socketOnListeningEvent(PROJECT_UPDATED_FAILED_EVENT)
  }, [])

  const closeInfoModal = useCallback(() => {
    setInfoModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  const closeConfirmModal = useCallback(() => {
    setConfirmModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  useEffect(() => {
    getProjectInfo(id)
  }, [id, getProjectInfo])

  useEffect(() => {
    let timer = null
    if (updateInfoObj.isLoading === true) {
      timer = setTimeout(() => {
        if (loadingRef.current === true) {
          updateProjectInfoFailure({ message: DEFAULT_ERR_MESSAGE })
        }
      }, TIMEOUT_MILLISECONDS)
    }
    if (updateInfoObj.isLoading === false && updateInfoObj.isSuccess != null) {
      if (updateInfoObj.isSuccess === true) {
        setInfoModal({
          visible: true,
          title: 'Cập nhật thông tin dự án',
          message: 'Thành công',
          icon: { isSuccess: true },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
              getProjectInfo(id)
            },
          },
          onCancel: () => {
            closeInfoModal()
            getProjectInfo(id)
          },
        })
      } else {
        setInfoModal({
          visible: true,
          title: 'Cập nhật thông tin dự án',
          message: Utils.buildFailedMessage(updateInfoObj.message, 'Thất bại'),
          icon: { isSuccess: false },
          button: {
            content: 'Đóng',
            clickFunc: () => {
              closeInfoModal()
              getProjectInfo(id)
            },
          },
          onCancel: () => {
            closeInfoModal()
            getProjectInfo(id)
          },
        })
      }
    }
    return () => clearTimeout(timer)
  }, [id, updateInfoObj, getProjectInfo, closeInfoModal, updateProjectInfoFailure])

  const onSubmit = event => {
    event.preventDefault()
    const form = event.target
    const { userId, _id } = getProjectInfoObj.project
    const projectId = _id
    if (!projectId || !userId) {
      return
    }

    setConfirmModal({
      visible: true,
      message: 'Bạn có chắc muốn cập nhật thông tin dự án?',
      onCancel: () => closeConfirmModal(),
      onOk: async () => {
        closeConfirmModal()
        setInfoModal({
          visible: true,
          title: 'Cập nhật thông tin dự án',
          message: 'Vui lòng chờ giây lát...',
          icon: {
            isLoading: true,
          },
          onCancel: () => closeInfoModal(),
        })

        const projectInfo = {
          name: form?.elements.name.value.trim(),
          description: form?.elements.description.value.trim(),
          userId,
        }
        updateProjectInfo(projectId, projectInfo)
        try {
          await ProjectService.updateProjectInfo(projectId, projectInfo)
          const unsubscribe$ = invokeCheckSubject.ProjectUpdated.subscribe(data => {
            if (data.error != null) {
              updateProjectInfoFailure(data.errorObj)
            } else {
              updateProjectInfoSuccess()
            }
            unsubscribe$.unsubscribe()
            unsubscribe$.complete()
          })
        } catch (err) {
          updateProjectInfoFailure({ message: err.message })
        }
      },
    })
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">{getProjectInfoObj.project.name}</h4>
            <a href="#!" onClick={history.goBack} className="btn btn-auto btn-primary d-sm-block d-none">
              <em className="fas fa-arrow-left" style={{ marginRight: '10px' }} />
              Trở lại
            </a>
            <a href="#!" onClick={history.goBack} className="btn btn-icon btn-primary d-sm-none">
              <em className="fas fa-arrow-left" />
            </a>
          </div>
          <div className="card-content">
            <form onSubmit={onSubmit}>
              <div className="data-details" style={{ flexDirection: 'column' }}>
                <div className="row d-md-flex" style={{ margin: '0px 0px' }}>
                  <div className="fake-class" style={{ paddingRight: '10px' }}>
                    <span className="data-details-title">Tên dự án</span>
                    <span className="data-details-info">
                      <div className="form-group label-floating is-empty" style={{ padding: '0px', margin: '0px' }}>
                        <label className="control-label" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tên dự án"
                          name="name"
                          defaultValue={getProjectInfoObj.project.name}
                        />
                      </div>
                    </span>
                  </div>
                  <div className="fake-class" style={{ paddingRight: '10px' }}>
                    <span className="data-details-title">Mô tả</span>
                    <span className="data-details-info">
                      <div className="form-group label-floating is-empty" style={{ padding: '0px', margin: '0px' }}>
                        <label className="control-label" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mô tả"
                          name="description"
                          defaultValue={getProjectInfoObj.project.description}
                        />
                      </div>
                    </span>
                  </div>
                  <div className="fake-class">
                    <span className="data-details-title">Thời gian tạo</span>
                    <span className="data-details-info">
                      {moment(getProjectInfoObj.project.createdDate).format('DD/MM/YYYY hh:mm:ss')}
                    </span>
                  </div>
                  <div className="fake-class">
                    <span className="data-details-title">Thời gian cập nhật</span>
                    <span className="data-details-info">
                      {moment(getProjectInfoObj.project.updatedDate).format('DD/MM/YYYY hh:mm:ss')}
                    </span>
                  </div>
                </div>

                <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px 0px' }}>
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                </div>
              </div>
            </form>
            <div className="gaps-5x" />
            <div style={{ fontSize: '18px', marginBottom: '22px' }}>Danh sách API key</div>
            <div className="material-datatables">
              <TokensTable projectId={id} projectOwnerId={getProjectInfoObj.project?.userId} />
            </div>
            <div className="gaps-5x" />
            <div style={{ fontSize: '18px', marginBottom: '22px' }}>Danh sách thành viên</div>
            <div className="material-datatables">
              <AssigneesTable projectId={id} />
            </div>
          </div>
        </div>
      </div>
      {infoModal.visible && <InfoModal infoModal={infoModal} />}
      {confirmModal.visible && <ConfirmModal confirmModal={confirmModal} />}
    </div>
  )
}

export default ProjectDetailsPage
