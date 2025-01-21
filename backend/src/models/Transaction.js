const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Initiated', 'Pending', 'Completed', 'Failed'],
        default: 'Initiated',
    },
    paymentIntentId: {
        type: String,
    },
    }, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;