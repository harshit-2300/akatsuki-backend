const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../models/User');

// eslint-disable-next-line consistent-return
const userSignup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        // If User already Exists
        if (user) {
            return res.status(400).json({ msg: 'User Already exits' });
        }


        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        await user.save();

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
                return res.json({ token });
            },
        );
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = { userSignup };