const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const { scheduleAndSendEmail } = require('../utils/scheduleAndSendEmail');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

const sendEmailService = (to, cc, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        cc,
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    scheduleAndSendEmail();
}

module.exports = { sendEmailService }