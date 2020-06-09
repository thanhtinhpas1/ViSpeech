/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { LOADING_LARGE_SIZE } from 'utils/constant'

const Loading = () => {
  return (
    <div id="loading">
      <div className="load-circle">
        {/* <span className="one" /> */}
        <Spin indicator={<LoadingOutlined style={{ fontSize: LOADING_LARGE_SIZE }} spin />} />
      </div>
    </div>
  )
}

export default Loading
