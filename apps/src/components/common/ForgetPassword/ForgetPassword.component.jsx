// /* eslint react/prop-types: 0 */
// import React, { useEffect } from 'react'
// import { Form, Icon, Input, Button } from 'antd'
// import { Link } from 'react-router-dom'
// import './ForgetPassword.style.scss'

// const ForgetPasswordComponent = ({
//   onClearUserState,
//   form,
//   sendEmailResetPassword,
//   resetPassword: { isLoading, isSuccess, message },
// }) => {
//   useEffect(() => {
//     onClearUserState()
//   }, [onClearUserState])

//   const handleSubmit = e => {
//     e.preventDefault()
//     form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values)
//         const { email } = values
//         sendEmailResetPassword(email)
//       }
//     })
//   }

//   const { getFieldDecorator } = form
//   return (
//     <div className="forget-password-page">
//       <h1 className="forget-password-page__title">Quên mật khẩu</h1>
//       {!isSuccess && (
//         <>
//           <Form onSubmit={handleSubmit} className="forget-password-form">
//             <Form.Item hasFeedback>
//               {getFieldDecorator('email', {
//                 rules: [
//                   { type: 'email', message: 'Email không hợp lệ!' },
//                   { required: true, message: 'Vui lòng nhập email!' },
//                 ],
//               })(
//                 <Input
//                   prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                   placeholder="Email"
//                 />
//               )}
//             </Form.Item>
//             <div className="forget-password-form__bottom">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="forget-password-form-button btn-login"
//                 loading={isLoading}
//               >
//                 Gửi mã xác nhận
//               </Button>
//             </div>
//           </Form>
//           <div className="message--error">{!isLoading && message ? message : ''}</div>
//         </>
//       )}
//       {isSuccess && (
//         <div className="message--success">
//           Mã xác nhận đã được gửi qua email.
//           <br />
//           Vui lòng kiểm tra email với người gửi là web.reactjs.group@gmail.com
//           <div>
//             <Link to="/" className="btn-back-home">
//               <Button type="primary" typeHtml="button">
//                 Về trang chủ
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Form.create({ name: 'FogetPasswordForm' })(ForgetPasswordComponent)
