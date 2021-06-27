const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const {
    userSignup,
} = require('../../controllers/users.controller');



// POST api/users/signup
router.post(
    '/signup',
    [
        check('name', 'Please Enter Name').not().isEmpty(),
        check('email', 'Please Enter a valid email').isEmail(),
    ],
    userSignup,
);

module.exports = router;
