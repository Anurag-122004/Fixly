const Transaction = require('../models/Transaction');
const { processPayment } = require('../services/paymentService');

exports.createPayment = async (req, res) => {
    const { userId, amount, purpose } = req.body;
    try {
        const transaction = await Transaction.create({
        userId,
        amount,
        purpose,
        });
        await processPayment(transaction);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    exports.getPaymentHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};