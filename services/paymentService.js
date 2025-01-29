const stripe = require('../backend/src/config/stripe');

const processPayment = async (transaction) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
        amount: transaction.amount * 100, // amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: { transaction_id: transaction._id.toString() },
        });

        transaction.status = 'Pending';
        transaction.paymentIntentId = paymentIntent.id;
        await transaction.save();

        return paymentIntent.client_secret;
    } catch (error) {
        console.error('Error processing payment:', error);
        throw new Error('Payment processing failed');
    }
    };

    module.exports = {
    processPayment,
};