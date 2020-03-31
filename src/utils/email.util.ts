// using Twilio SendGrid's v3 Node.js Library

import { config } from "../../config";

// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);
console.log("SENDGRID_API_KEY ", config.SENDGRID_API_KEY)

const hostUrl = 'http://localhost:3000/customer';
const sendEmail = (to, subject, contentEmail) => {
    const msg = {
        to,
        from: 'vispeech2020@gmail.com',
        subject,
        text: contentEmail,
        html: contentEmail,
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

const getHtmlEmailContent = (user, content) => {
    const greeting = `Xin chào <strong>${user}</strong>,`;
    const closing = `Trân trọng,<br>ViSpeech.`
    return `${greeting}<br><br>${content}<br><br>${closing}` 
}

export const EmailUtils = {
    sendVerifyEmail: (name, to, token) => {
        const subject = 'Kích hoạt tài khoản';
        const content = `Mời bạn truy cập đường dẫn dưới đây để kích hoạt tài khoản:<br>${hostUrl}/verify-email/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(name, content));
    },
    sendResetPasswordEmail: (name, to, token) => {
        const subject = 'Lấy lại mật khẩu';
        const content = `Mời bạn truy cập đường dẫn dưới đây để thay đổi mật khẩu:<br>${hostUrl}/reset-password/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(name, content));
    },
    sendInviteToJoinProjectEmail: (assigner, assignee, project, to, token) => {
        const subject = 'Lời mời tham gia project';
        const content = `Người dùng có username <strong>${assigner}</strong> mời bạn tham gia dự án "${project}". Truy cập đường dẫn dưới đây để phản hồi:<br>${hostUrl}/reply-permission-assign/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(assignee, content));
    },
};