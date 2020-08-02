import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { LOADING_SMALL_SIZE } from '../../../utils/constant'

const antIcon = (size, color) => <LoadingOutlined style={{ fontSize: size || LOADING_SMALL_SIZE, color }} spin />

function LoadingIcon({ size, color }) {
  return (
    <Spin indicator={antIcon(size, color)} />
  )
}

export default LoadingIcon
