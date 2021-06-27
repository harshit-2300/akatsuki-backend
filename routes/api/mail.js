const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const upload = require('../../middleware/multerMiddleware');
const auth = require('../../middleware/auth');
const {
    sendEmail,
    getScheduledMails,
    getSentMails,
} = require('../../controllers/mails.controller');

router.post('/', [auth, check('to', 'Please Send a receiver')], sendEmail);

router.get('/scheduled', [auth], getScheduledMails);
router.get('/send', [auth], getSentMails);

module.exports = router;