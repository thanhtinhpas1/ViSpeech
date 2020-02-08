/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import * as moment from 'moment'

const PersonalDataTab = ({ personalData }) => {
  return (
    <div className="tab-pane fade show active" id="personal-data">
      <form action="#">
        <div className="row">
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="full-name" className="input-item-label">
                Họ và tên
              </label>
              <input
                className="input-bordered"
                type="text"
                id="full-name"
                name="full-name"
                defaultValue={personalData.fullName ? personalData.fullName : ''}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="email-address" className="input-item-label">
                Email
              </label>
              <input
                className="input-bordered"
                type="text"
                id="email-address"
                name="email-address"
                defaultValue={personalData.email ? personalData.email : ''}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="mobile-number" className="input-item-label">
                Số điện thoại
              </label>
              <input
                className="input-bordered"
                type="text"
                id="mobile-number"
                name="mobile-number"
                defaultValue={personalData.phoneNumber ? personalData.phoneNumber : ''}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="date-of-birth" className="input-item-label">
                Ngày sinh
              </label>
              <input
                className="input-bordered date-picker-dob"
                type="text"
                id="date-of-birth"
                name="date-of-birth"
                defaultValue={
                  personalData.dateOfBirth
                    ? personalData.dateOfBirth
                    : moment(new Date(1990, 11, 31)).format('DD/MM/YYYY')
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-with-label">
              <label htmlFor="nationality" className="input-item-label">
                Quốc tịch
              </label>
              <select className="select-bordered select-block" name="nationality" id="nationality">
                <option value="vn">Việt Nam</option>
                <option value="uk">United KingDom</option>
                <option value="fr">France</option>
                <option value="ch">China</option>
                <option value="cr">Czech Republic</option>
                <option value="cb">Colombia</option>
              </select>
            </div>
          </div>
        </div>
        <div className="gaps-1x" />
        <div className="d-sm-flex justify-content-between align-items-center">
          <button type="button" className="btn btn-primary">
            Cập nhật
          </button>
          <div className="gaps-2x d-sm-none" />
          <span className="text-success">
            <em className="ti ti-check-box" /> Thay đổi đã được lưu
          </span>
        </div>
      </form>
    </div>
  )
}

export default PersonalDataTab
