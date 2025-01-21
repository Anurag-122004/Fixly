// filepath: backend/src/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    purpose: { type: String, enum: ['Reward', 'Payment'], required: true },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;