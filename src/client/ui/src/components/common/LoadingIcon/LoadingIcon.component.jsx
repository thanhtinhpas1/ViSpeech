import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
// import './LoadingIcon.style.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function LoadingIcon() {
  return (
    <Spin indicator={antIcon} />
    // <div className="loading-icon">
    //   <div />
    //   <div />
    //   <div />
    //   <div />
    // </div>
  )
}

export default LoadingIcon
