import nodemailer from 'nodemailer'
import { CONSTANTS } from 'common/constant';
import { config } from "../../config";

const hostUrl = `${config.ASR.PROTOCOL}://${config.ASR.HOST}:3200/customer`;
// const transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // upgrade later with STARTTLS
//     // ignoreTLS: false,
//     auth: {
//         user: "vispeech2020@gmail.com",
//         pass: "vispeech"
//     }
// });
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: config.NODEMAILER.userEmail,
        clientId: config.NODEMAILER.clientId,
        clientSecret: config.NODEMAILER.clientSecret,
        accessToken: config.NODEMAILER.accessToken,
        refreshToken: config.NODEMAILER.refreshToken,
    }
});

const getHtmlEmailContent = (user, content, expireText, expiresIn) => {
    const greeting = `Xin chào <strong>${user}</strong>,`
    const tokenExpire = `Lưu ý, ${expireText} sẽ hết hiệu lực trong vòng ${expiresIn} ngày kể từ lúc nhận được mail này.`
    const closing = `Trân trọng,<br>ViSpeech.`
    return `${greeting}<br><br>${content}<br><br>${tokenExpire}<br><br>${closing}`
}

const sendEmail = (to, subject, contentEmail) => {
    var mailOptions = {
        from: '"ViSpeech Team" <vispeech2020@gmail.com>',
        to,
        subject,
        html: contentEmail
    };
    return transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};


export const EmailUtils = {
    sendVerifyEmail: (name, to, token) => {
        const subject = 'Kích hoạt tài khoản';
        const content = `Mời bạn truy cập đường dẫn dưới đây để kích hoạt tài khoản:<br>${hostUrl}/verify-email/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(name, content, 'yêu cầu kích hoạt tài khoản', CONSTANTS.TOKEN_EXPIRATION.VERIFY_EMAIL));
    },
    sendResetPasswordEmail: (name, to, token) => {
        const subject = 'Lấy lại mật khẩu';
        const content = `Mời bạn truy cập đường dẫn dưới đây để thay đổi mật khẩu:<br>${hostUrl}/reset-password/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(name, content, 'yêu cầu lấy lại mật khẩu', CONSTANTS.TOKEN_EXPIRATION.RESET_PASSWORD));
    },
    sendInviteToJoinProjectEmail: (assigner, assignee, project, to, token) => {
        const subject = 'Lời mời tham gia project';
        const content = `Người dùng có username <strong>${assigner}</strong> mời bạn tham gia dự án "${project}". Truy cập đường dẫn dưới đây để phản hồi:<br>${hostUrl}/reply-permission-assign/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(assignee, content, 'lời mời tham gia dự án', CONSTANTS.TOKEN_EXPIRATION.REPLY_PERMISSION_ASSIGN));
    },
};

// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(config.SEND_GRID_API_KEY);

// const sendEmail = (to, subject, contentEmail) => {
//     const msg = {
//         to,
//         from: 'vispeech2020@gmail.com',
//         subject,
//         text: contentEmail,
//         html: contentEmail,
//     };
//     console.log('Message sent: %s', msg);
//     return sgMail.send(msg);
// };