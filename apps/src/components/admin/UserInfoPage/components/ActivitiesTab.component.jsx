/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const ActivitiesTab = () => {
  return (
    <div role="tabpanel" className="tab-pane" id="activities-tab">
      <div className="widget p-25">
        <div className="widget-body">
          <div className="streamline sl-style-2">
            <div className="sl-item sl-primary">
              <div className="sl-content">
                <small className="text-muted">5 mins ago</small>
                <p>Williams has just joined Project X</p>
              </div>
            </div>
            <div className="sl-item sl-danger">
              <div className="sl-content">
                <small className="text-muted">25 mins ago</small>
                <p>Jane sent you a request to grant access to the project folder</p>
              </div>
            </div>
            <div className="sl-item sl-success">
              <div className="sl-content">
                <small className="text-muted">40 mins ago</small>
                <p>Kate added you to her team</p>
              </div>
            </div>
            <div className="sl-item">
              <div className="sl-content">
                <small className="text-muted">55</small>
                <p>John has finished his task</p>
              </div>
            </div>
            <div className="sl-item sl-warning">
              <div className="sl-content">
                <small className="text-muted">60 mins ago</small>
                <p>Jim shared a folder with you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivitiesTab
