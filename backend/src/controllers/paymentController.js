const Transaction = require('../models/Transaction');
const { processPayment } = require('../../../services/paymentService');
const stripe = require('../config/stripe');

exports.createPayment = async (req, res) => {
    const { amount, purpose } = req.body;
    try {
        const transaction = await Transaction.create({
        userId: req.user._id,
        amount,
        purpose,
        status: 'Initiated',
        });

        const clientSecret = await processPayment(transaction);
        res.status(201).json({ clientSecret });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const transaction = await Transaction.findOne({ paymentIntentId: paymentIntent.id });
        if (transaction) {
        transaction.status = 'Completed';
        await transaction.save();
        }
    }

    res.status(200).json({ received: true });
    };

    exports.getPaymentHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};