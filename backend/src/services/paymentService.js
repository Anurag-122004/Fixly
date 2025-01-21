const processPayment = async (transaction) => {
    // Implement payment processing logic here
    // For example, integrate with a payment gateway like Stripe or PayPal
    transaction.status = 'Completed';
    await transaction.save();
    };

    module.exports = {
    processPayment,
    };