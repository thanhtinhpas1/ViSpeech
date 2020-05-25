// /* eslint react/prop-types: 0 */
// import React, { useEffect } from 'react'
// import { Form, Spin, Icon, Input, Button } from 'antd'
// import { Link } from 'react-router-dom'
// import './ResetPassword.style.scss'

// const ResetPasswordComponent = ({
//   match,
//   form,
//   resetPassword: { isLoading, isSuccess, message, isTokenTrue, userId },
//   onClearUserState,
//   resetPasswordStart,
//   verifyTokenResetPassword,
// }) => {
//   useEffect(() => {
//     onClearUserState()
//     const {
//       params: { token },
//     } = match
//     verifyTokenResetPassword(token)
//   }, [match, onClearUserState, verifyTokenResetPassword])

//   const handleSubmit = e => {
//     e.preventDefault()
//     form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values)
//         const { password } = values
//         resetPasswordStart(password, userId)
//       }
//     })
//   }

//   const compareToFirstPassword = (_rule, value, callback) => {
//     if (value && value !== form.getFieldValue('password')) {
//       callback('Mật khẩu không khớp. Vui lòng nhập lại.')
//     } else {
//       callback()
//     }
//   }

//   const { getFieldDecorator } = form
//   if (isLoading && isTokenTrue === null) {
//     return (
//       <div className="reset-password-page">
//         <Spin indicator={<Icon type="loading" spin />} />
//       </div>
//     )
//   }
//   if (!isLoading && isTokenTrue === false) {
//     return (
//       <div className="reset-password-page">
//         <h1 className="reset-password-page__title">Lấy lại mật khẩu</h1>
//         <div className="message--error">Link xác nhận đã hết hạn hoặc không hợp lệ</div>
//         <div>
//           <Link to="/" className="btn-back-home">
//             <Button type="primary" typeHtml="button">
//               Về trang chủ
//             </Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }
//   if (!isLoading && isSuccess) {
//     return (
//       <div className="reset-password-page">
//         <h1 className="reset-password-page__title">Lấy lại mật khẩu</h1>
//         <div className="message--success">
//           Lấy lại mật khẩu thành công. Vui lòng đăng nhập lại với mật khẩu mới.
//           <div>
//             <Link to="/" className="btn-back-home">
//               <Button type="primary" typeHtml="button">
//                 Về trang chủ
//               </Button>
//             </Link>
//           </div>
//         </div>
//         <div className="reset-password-page__btns">
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
//     <div className="reset-password-page">
//       <h1 className="reset-password-page__title">Lấy lại mật khẩu</h1>
//       <Form onSubmit={handleSubmit} className="reset-password-form">
//         <Form.Item hasFeedback>
//           {getFieldDecorator('password', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Vui lòng nhập mật khẩu!',
//               },
//             ],
//           })(
//             <Input.Password
//               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               type="password"
//               placeholder="Mật khẩu"
//             />
//           )}
//         </Form.Item>
//         <Form.Item hasFeedback>
//           {getFieldDecorator('confirm-password', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Vui lòng nhập lại mật khẩu!',
//               },
//               {
//                 validator: compareToFirstPassword,
//               },
//             ],
//           })(
//             <Input.Password
//               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               type="password"
//               placeholder="Nhập lại mật khẩu"
//             />
//           )}
//         </Form.Item>
//         <div className="reset-password-form__bottom">
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="reset-password-form-button"
//             loading={isLoading}
//           >
//             Tạo mật khẩu mới
//           </Button>
//         </div>
//       </Form>
//       {!isLoading && isSuccess === false && <div className="message--error">{message}</div>}
//     </div>
//   )
// }

// export default Form.create({ name: 'ResetPasswordComponent' })(ResetPasswordComponent)
