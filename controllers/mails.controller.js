const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
});
const sendEmail = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    } catch (error) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }

}

const scheduleMail = async (req, res) => {
    
}
module.exports = { sendEmail }