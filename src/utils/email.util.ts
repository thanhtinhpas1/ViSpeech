// const sendGrid = require('sendgrid').mail;
//TODO: setup env to save SendGridApiKey
// const sg = require('sendgrid')(process.env.SendGridApiKey);
// const sg = require('sendgrid')('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');
// const hostUrl = 'http://localhost:3000';
const hostUrl = 'https://tutor-front-end-user.herokuapp.com';
const sendEmail = (to, subject, contentEmail) => {
    // TODO: set up env to save host frontend
    // const hostUrl = process.env.frontendHostURL;
    // const request = sg.emptyRequest({
    //     method: "POST",
    //     path: "/v3/mail/send",
    //     body: {
    //         personalizations: [
    //             {
    //                 to: [
    //                     {
    //                         email: to
    //                     }
    //                 ],
    //                 subject
    //             }
    //         ],
    //         from: {
    //             email: "web.reactjs.group@gmail.com"
    //         },
    //         content: [
    //             {
    //                 type: 'text/plain',
    //                 value: contentEmail
    //             }
    //         ]
    //     }
    // });
    // return new Promise(function (resolve, reject) {
    //     sg.API(request, function (error, response) {
    //         if (error) {
    //             return reject(error);
    //         }
    //         else {
    //             return resolve(response);
    //         }
    //     });
    // });
};

export const EmailUtils = {
    sendVerifyEmail: (name, to, token) => {
        const subject = "Kích hoạt tài khoản";
        const content = `Chào ${name}, mời bạn click vào link dưới đây để kích hoạt tài khoản: ${hostUrl}/active-email/${token}/${to}`;
        return sendEmail(to, subject, content);
    },
    sendResetPasswordEmail: (name, to, token) => {
        const subject = "Lấy lại mật khẩu";
        const content = `Chào ${name}, mời bạn click vào link dưới đây để thay đổi mật khẩu: ${hostUrl}/reset-password/${token}/${to}`;
        return sendEmail(to, subject, content);
    },
    sendInviteToJoinProjectEmail: (assigner, assignee, project, to, token) => {
        const subject = "Lời mời tham gia project";
        const content = `Chào ${assignee}, người dùng ${assigner} mời bạn tham gia project "${project}". Click vào link dưới đây để chấp nhận lời mời: ${hostUrl}/accept-project/${token}/${to}`;
        return sendEmail(to, subject, content);
    },
}