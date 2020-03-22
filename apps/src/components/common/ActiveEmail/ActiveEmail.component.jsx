// /* eslint react/prop-types: 0 */
// import React, { useEffect } from 'react'
// import { Button, Spin, Icon } from 'antd'
// import { Link } from 'react-router-dom'
// import './ActiveEmail.style.scss'

// /**
//  * When user click on link active email, this component will be render
//  */

// const ActiveEmailComponent = ({
//   match,
//   activeEmailStart,
//   activeEmail: { isLoading, isSuccess },
// }) => {
//   useEffect(() => {
//     // console.log('match: ', match)
//     const {
//       params: { token },
//     } = match
//     activeEmailStart(token)
//   }, [match, activeEmailStart])

//   if (isLoading) {
//     return (
//       <div className="active-email-page">
//         <Spin indicator={<Icon type="loading" spin />} />
//       </div>
//     )
//   }
//   if (isSuccess) {
//     return (
//       <div className="active-email-page">
//         <div className="message--success">Kích hoạt email thành công</div>

//         <div className="active-email-page__btns">
//           <div>
//             <Link to="/student/login">
//               <Button type="primary" htmlType="button">
//                 Đăng nhập
//               </Button>
//             </Link>
//           </div>
//           <div>
//             <Link to="/teacher/login">
//               <Button type="primary" htmlType="button">
//                 Đăng nhập bằng tài khoản giáo viên
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }
//   return (
//     <div className="active-email-page">
//       <div className="active-email-page__title">Kích hoạt tài khoản</div>
//       <div className="message--error">
//         Kích hoạt tài khoản thất bại. <br /> Vui lòng thử lại.
//       </div>
//     </div>
//   )
// }

// export default ActiveEmailComponent
