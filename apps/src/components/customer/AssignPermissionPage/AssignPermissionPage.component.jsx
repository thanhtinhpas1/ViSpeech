/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { PERMISSIONS } from 'utils/constant'
import Utils from 'utils'

const AssignPermissionPage = ({
  currentUser,
  getMyProjectListObj,
  assignPermissionObj,
  getMyProjects,
  assignPermission,
}) => {
  const query = Utils.useQuery()

  const emptyAllInputField = () => {
    window.$('#assign-permission-form')[0].reset()
  }

  useEffect(() => {
    if (assignPermissionObj.isLoading === false && assignPermissionObj.isSuccess === true) {
      emptyAllInputField()
    }
  }, [assignPermissionObj])

  useEffect(() => {
    if (currentUser._id) {
      getMyProjects({ userId: currentUser._id })
    }
  }, [currentUser._id, getMyProjects])

  const onSubmit = event => {
    event.preventDefault()

    if (!currentUser._id) return

    const form = event.target
    const permission = {
      assigneeUsername: form.elements.username.value.trim(),
      projectId: form.elements.projectId.value,
      permissions: [PERMISSIONS.CSR_USER],
      assignerId: currentUser._id,
    }
    assignPermission(permission)
  }

  return (
    <div className="page-content">
      <div className="container">
        <div className="content-area card">
          <div className="card-innr card-innr-fix">
            <div className="card-head">
              <h4 className="card-title mb-0">Mời tham gia project</h4>
            </div>
            <div className="gaps-1x" />
            <form onSubmit={onSubmit} id="assign-permission-form" style={{ overflow: 'auto' }}>
              <div className="input-item input-with-label">
                <label className="input-item-label text-exlight">Username *</label>
                <input className="input-bordered" type="text" name="username" required />
              </div>
              <div className="input-item input-with-label">
                <label className="input-item-label text-exlight">Tên project *</label>
                <select
                  className="custom-select input-item__select-project"
                  name="projectId"
                  required
                  id="selected-project"
                >
                  {getMyProjectListObj.myProjectList.map(project => {
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
    </div>
  )
}

export default AssignPermissionPage
