/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const ChangePasswordTab = () => {
  return (
    <div role="tabpanel" className="tab-pane" id="change-password-tab">
      <div className="widget p-25">
        <div className="widget-body">
          <div className="select">
            <select className="form-control">
              <option>Select an Option</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </div>
          <div className="select m-t-15">
            <select className="form-control">
              <option>Select an Option</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </div>
          <div className="togglebutton m-t-30">
            <label>
              <input type="checkbox" /> Toggle Setting 1
            </label>
          </div>
          <div className="togglebutton m-t-15">
            <label>
              <input type="checkbox" defaultChecked /> Toggle Setting 2
            </label>
          </div>
          <div className="checkbox m-b-15 m-t-30">
            <label>
              <input type="checkbox" defaultValue />
              <i className="input-helper f-10" />
              Settings option 1
            </label>
          </div>
          <div className="checkbox m-b-15 m-t-10">
            <label>
              <input type="checkbox" defaultValue />
              <i className="input-helper f-10" />
              Settings option 2
            </label>
          </div>
          <div className="m-t-30">
            <div className="radio">
              <label>
                <input type="radio" name="optionsRadios" defaultChecked="true" /> Option 1
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" name="optionsRadios" /> Option 2
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordTab
