/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const PasswordTab = () => {
  return (
    <div className="tab-pane fade" id="password">
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-with-label">
            <label htmlFor="old-pass" className="input-item-label">
              Mật khẩu hiện tại
            </label>
            <input className="input-bordered" type="password" id="old-pass" name="old-pass" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-with-label">
            <label htmlFor="new-pass" className="input-item-label">
              Mật khẩu mới
            </label>
            <input className="input-bordered" type="password" id="new-pass" name="new-pass" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-with-label">
            <label htmlFor="confirm-pass" className="input-item-label">
              Xác nhận mật khẩu mới
            </label>
            <input
              className="input-bordered"
              type="password"
              id="confirm-pass"
              name="confirm-pass"
            />
          </div>
        </div>
      </div>
      <div className="note note-plane note-info pdb-1x">
        <em className="fas fa-info-circle" />
        <p>Mật khẩu phải bao gồm 8 kí tự, trong đó bao gồm kí tự thường và hoa.</p>
      </div>
      <div className="gaps-1x" />
      <div className="d-sm-flex justify-content-between align-items-center">
        <button type="button" className="btn btn-primary">
          Cập nhật
        </button>
        <div className="gaps-2x d-sm-none" />
        <span className="text-success">
          <em className="ti ti-check-box" /> Mật khẩu đã được thay đổi
        </span>
      </div>
    </div>
  )
}

export default PasswordTab
