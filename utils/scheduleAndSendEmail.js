const schedule = require('node-schedule');
const Mail = require('../models/Mail');
const { sendEmailService } = require('../services/sendEmailService');

const scheduleAndSendEmail = async () => {
    try {
        const mail = await Mail.findOne({ isSent: false }).sort({ scheduledAt: -1 }).limit(1);
        if (mail) {
            mail.isSent = true;
            await mail.save();
            schedule.scheduleJob(mail.scheduledAt, async () => {
                sendEmailService(mail.to, mail.cc, mail.subject, mail.text);
                console.log('Mail Sent');
            });
        }
    } catch (error) {

    }

}

module.exports = { scheduleAndSendEmail };