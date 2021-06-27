const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            default: '',
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('user', UserSchema);
