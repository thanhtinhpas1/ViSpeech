// using Twilio SendGrid's v3 Node.js Library

import { config } from "../../config";

// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);
// console.log("SENDGRID_API_KEY ", process.env.SENDGRID_API_KEY)

const hostUrl = 'http://localhost:3000/customer';
const sendEmail = (to, subject, contentEmail) => {
    const msg = {
        to,
        from: 'vispeech2020@gmail.com',
        subject,
        text: contentEmail,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    console.log('msg ', msg);
    // (async () => {
    //     try {
    //       await sgMail.send(msg);
    //       console.log("success")
    //     } catch (err) {
    //       console.error(err.toString());
    //     }
    //   })();
    return sgMail.send(msg);
};

export const EmailUtils = {
    sendVerifyEmail: (name, to, token) => {
        const subject = 'Kích hoạt tài khoản';
        const content = `Chào ${name}, mời bạn click vào link dưới đây để kích hoạt tài khoản: ${hostUrl}/verify-email/${token}`;
        return sendEmail(to, subject, content);
    },
    sendResetPasswordEmail: (name, to, token) => {
        const subject = 'Lấy lại mật khẩu';
        const content = `Chào ${name}, mời bạn click vào link dưới đây để thay đổi mật khẩu: ${hostUrl}/reset-password/${token}`;
        return sendEmail(to, subject, content);
    },
    sendInviteToJoinProjectEmail: (assigner, assignee, project, to, token) => {
        const subject = 'Lời mời tham gia project';
        const content = `Chào ${assignee}, người dùng ${assigner} mời bạn tham gia project "${project}". Click vào link dưới đây để chấp nhận lời mời: ${hostUrl}/accept-project/${token}`;
        return sendEmail(to, subject, content);
    },
};