const mongoose = require('mongoose');

const Mail = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        receivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        cc: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        subject: {
            type: String,
            default: '',
        },
        body: {
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
        }
    },
    { timestamps: true },
);
module.exports = mongoose.model('mail', Mail);
