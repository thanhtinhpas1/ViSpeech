/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const SettingsTab = ({ settings }) => {
  return (
    <div className="tab-pane fade" id="settings">
      <div className="pdb-1-5x">
        <h5 className="card-title card-title-sm text-dark">Bảo mật</h5>
      </div>
      {settings.security.map(item => {
        return (
          <div className="input-item" key={item.id}>
            <input
              type="checkbox"
              className="input-switch input-switch-sm"
              id={item.id}
              defaultChecked
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        )
      })}
      <div className="pdb-1-5x">
        <h5 className="card-title card-title-sm text-dark">Quản lý thông báo</h5>
      </div>
      {settings.notifications.map(item => {
        return (
          <div className="input-item" key={item.id}>
            <input
              type="checkbox"
              className="input-switch input-switch-sm"
              id={item.id}
              defaultChecked
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        )
      })}
      <div className="gaps-1x" />
      <div className="d-flex justify-content-between align-items-center">
        <span />
        <span className="text-success">
          <em className="ti ti-check-box" /> Cài đặt đã được cập nhật
        </span>
      </div>
    </div>
  )
}

export default SettingsTab
