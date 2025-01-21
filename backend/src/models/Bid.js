// filepath: backend/src/models/Bid.js
const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
    solverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bidAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Accepted'], default: 'Pending' },
});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;