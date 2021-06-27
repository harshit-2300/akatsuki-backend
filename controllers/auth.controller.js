const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const Otp = require('../models/Otp');
const User = require('../models/User');
const dayjs = require('dayjs');

const getLoggeduser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        return res.json(user);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
        return res.status(500).send('server error');
    }
};

// eslint-disable-next-line consistent-return
const userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User Does Not Exist' });
        }
        if (user.password !== password)
        {
            return res.status(400).json({ msg: 'Invalid PAssword' });
           }

        const payload = {
            user: {
                id: user.id,
                user_type: user.user_type,
            },
        };

        jwt.sign(
            payload,
            config.get('secret'),
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
                // eslint-disable-next-line comma-dangle
            }
        );
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(500).send('Server Error');
    }
};

module.exports = { getLoggeduser, userLogin };
