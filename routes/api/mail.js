const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const upload = require('../../middleware/multerMiddleware');
const auth = require('../../middleware/auth');
const {
    sendEmail,
} = require('../../controllers/mails.controller');

router.post('/', [auth, check('to', 'Please Send a receiver')], sendEmail);

module.exports = router;