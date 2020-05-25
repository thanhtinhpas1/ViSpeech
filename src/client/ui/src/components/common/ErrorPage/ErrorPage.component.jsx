// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Result, Button } from 'antd'
// import './ErrorPage.style.scss'

// const ErrorPage = props => {
//   // console.log("my props: ", props);
//   const { location, message } = props
//   let myMessage = message
//   if (!myMessage) {
//     if (location.state.message) {
//       myMessage = location.state.message
//     } else {
//       myMessage = 'Có lỗi xảy ra'
//     }
//   }
//   // console.log('my props: ', props)
//   return (
//     <Result
//       status="500"
//       title="500"
//       subTitle={myMessage}
//       extra={
//         <Link to="/">
//           <Button type="primary">Về trang chủ</Button>
//         </Link>
//       }
//     />
//   )
// }

// export default ErrorPage
