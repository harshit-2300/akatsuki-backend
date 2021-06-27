const express = require('express');

const router = express.Router();

const { check } = require('express-validator');
const auth = require('../../middleware/auth');

const {
    getLoggeduser,
    userLogin,
} = require('../../controllers/auth.controller');

// get api/auth
router.get('/', auth, getLoggeduser);

// post api/auth
// authenticate and get token
// here also pass the type of login that is using email or phone
router.post(
    '/login',
    [check('email', 'Please Enter Eail').not().isEmpty()],
    userLogin,
);

module.exports = router;
