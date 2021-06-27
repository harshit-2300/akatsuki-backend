const { validationResult } = require('express-validator');
const { scheduleAndSendEmail } = require('../utils/scheduleAndSendEmail');
const Mail = require('../models/Mail');
const sendEmail = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { to, cc, subject, text, scheduledAt } = req.body;
        const newMail = new Mail({ from: req.user.id, to, cc, subject, text, scheduledAt, isSent: false });
        await newMail.save();
        scheduleAndSendEmail();
        res.status(200).json({ msg: 'Email Sent ' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
    }

};

const getScheduledMails = async (req, res) => {
    try {
        const mails = await Mail.find({ from: req.user.id, isSent: false }).sort({ scheduledAt: -1 });
        res.status(200).json(mails);

    } catch (error) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
}

const getSentMails = async (req, res) => {
    try {
        const mails = await Mail.find({ from: req.user.id, isSent: true }).sort({ scheduledAt: -1 });
        res.status(200).json(mails);

    } catch (error) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
}
module.exports = { sendEmail, getScheduledMails, getSentMails };