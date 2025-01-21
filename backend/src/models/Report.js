// filepath: backend/src/models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
issueType: { type: String, required: true },
description: { type: String, required: true },
location: { type: { type: String }, coordinates: [Number] },
status: { type: String, enum: ['Open', 'Resolved'], default: 'Open' },
});

reportSchema.index({ location: '2dsphere' });

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;