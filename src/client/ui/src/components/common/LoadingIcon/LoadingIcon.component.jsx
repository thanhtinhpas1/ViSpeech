import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { LOADING_SMALL_SIZE } from 'utils/constant'

const antIcon = size => <LoadingOutlined style={{ fontSize: size || LOADING_SMALL_SIZE }} spin />

function LoadingIcon({ size }) {
  return (
    <Spin indicator={antIcon(size)} />
    // <div className="loading-icon">
    //   <div />
    //   <div />
    //   <div />
    //   <div />
    // </div>
  )
}

export default LoadingIcon
