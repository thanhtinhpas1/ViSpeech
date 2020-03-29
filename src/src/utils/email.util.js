"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const hostUrl = 'http://localhost:3000/customer';
const sendEmail = (to, subject, contentEmail) => {
    const msg = {
        to,
        from: 'vispeech2020@gmail.com',
        subject,
        text: contentEmail,
    };
    console.log('msg ', msg);
    return sgMail.send(msg);
};
exports.EmailUtils = {
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
//# sourceMappingURL=email.util.js.map