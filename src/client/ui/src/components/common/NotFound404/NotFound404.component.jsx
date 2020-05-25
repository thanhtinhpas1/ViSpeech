import React from 'react'
import { Result, Button } from 'antd'

const NotFound404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, không tìm thấy trang"
      extra={
        <a href="/">
          <Button type="primary">Về trang chủ</Button>
        </a>
      }
    />
  )
}

export default NotFound404
