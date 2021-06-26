const mongoose = require('mongoose');

const Mail = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        to: { type: [String] },
        cc: { type: [String] },
        subject: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
        scheduledAt: {
            type: Date,
            default: Date.now,
        },
        isSent: {
            type: Boolean,
            defualt: false,
        }
    },
    { timestamps: true },
);
module.exports = mongoose.model('mail', Mail);
