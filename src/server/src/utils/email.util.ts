import { Logger } from '@nestjs/common';
import { CONSTANTS } from 'common/constant';
import nodemailer from 'nodemailer';
import { config } from '../../config';

const hostUrl = `${config.SMTP.SEND_FROM}`;
const hostCustomerUrl = `${hostUrl}/customer`;
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

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: config.NODEMAILER.userEmail,
        clientId: config.NODEMAILER.clientId,
        clientSecret: config.NODEMAILER.clientSecret,
        accessToken: config.NODEMAILER.accessToken,
        refreshToken: config.NODEMAILER.refreshToken,
        expires: 1484314697598
    }
});

transporter.on('token', token => {
    Logger.log('A new access token was generated');
    Logger.log(`User: ${token.user}`);
    Logger.log(`Access Token: ${token.accessToken}`);
    Logger.log(`Expires: ${new Date(token.expires)}`);
});

const getHtmlEmailContent = (user, content, expireText, expiresIn) => {
    const greeting = `Xin chào <strong>${user}</strong>,`;
    const tokenExpire = `Lưu ý, ${expireText} sẽ hết hiệu lực trong vòng ${expiresIn}
    ngày kể từ lúc nhận được mail này.`;
    const closing = `Trân trọng,<br>Viet Speech.`;
    return `${greeting}<br><br>${content}<br><br>${tokenExpire}<br><br>${closing}`;
};

const sendEmail = (to, subject, contentEmail) => {
    const mailOptions = {
        from: '"VietSpeech Team" <vispeech2020@gmail.com>',
        to,
        subject,
        html: contentEmail
    };
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return Logger.log(error, 'Error sending email');
        }
        Logger.log(`Message sent: ${info.messageId}`);
    });
};

export const EmailUtils = {
    sendVerifyEmail: (name, to, token) => {
        const subject = 'Kích hoạt tài khoản';
        const content = `Mời bạn truy cập đường dẫn dưới đây để kích hoạt tài khoản:<br>
${hostCustomerUrl}/verify-email/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(name, content, 'yêu cầu kích hoạt tài khoản',
            CONSTANTS.TOKEN_EXPIRATION.VERIFY_EMAIL));
    },
    sendResetPasswordEmail: (name, to, token) => {
        const subject = 'Lấy lại mật khẩu';
        const content = `Mời bạn truy cập đường dẫn dưới đây để lấy lại mật khẩu:<br>
${hostUrl}/reset-password/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(name, content, 'yêu cầu lấy lại mật khẩu',
            CONSTANTS.TOKEN_EXPIRATION.RESET_PASSWORD));
    },
    sendInviteToJoinProjectEmail: (assigner, assignee, project, to, token) => {
        const subject = 'Lời mời tham gia dự án';
        const content = `Người dùng có username <strong>${assigner}</strong>
 mời bạn tham gia dự án "${project}". Truy cập đường dẫn dưới đây để phản hồi:<br>${hostCustomerUrl}/reply-permission-assign/${token}`;
        return sendEmail(to, subject, getHtmlEmailContent(assignee, content,
            'lời mời tham gia dự án', CONSTANTS.TOKEN_EXPIRATION.REPLY_PERMISSION_ASSIGN));
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