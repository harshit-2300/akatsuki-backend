const { validationResult } = require('express-validator');
const { sendEmailService } = require('../services/sendEmailService');
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
        console.log(err.message);
        return res.status(500).send('Server Error');
    }

};

module.exports = { sendEmail }