const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const { registerAndLoginUser } = require('../testUtils');
const Transaction = require('../../src/models/Transaction');

describe('Payment Routes', () => {
    let token;
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
        token = await registerAndLoginUser(); // Dynamically fetch login token
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Transaction.deleteMany({});
    });

    it('should create a new payment', async () => {
        const res = await request(app)
        .post('/api/payments')
        .set('Authorization', `Bearer ${token}`)
        .send({
            userId: 'user_id',
            amount: 100,
            purpose: 'Payment',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get payment history', async () => {
        await request(app)
        .post('/api/payments')
        .set('Authorization', `Bearer ${token}`)
        .send({
            userId: 'user_id',
            amount: 100,
            purpose: 'Payment',
        });

        const res = await request(app)
        .get('/api/payments/history')
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
