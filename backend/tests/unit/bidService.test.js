const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const { registerAndLoginUser } = require('../testUtils');
const Report = require('../../src/models/Report');
const Bid = require('../../src/models/Bid');

describe('Bid Service', () => {
    let token;
    let reportId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

        // Get the token by registering and logging in a user
        token = await registerAndLoginUser();

        // Create a report and get the reportId
        const reportRes = await request(app)
        .post('/api/issues')
        .set('Authorization', `Bearer ${token}`)
        .send({
            issueType: 'Pothole',
            description: 'A large pothole on Main Street',
            location: {
            type: 'Point',
            coordinates: [-73.935242, 40.730610],
            },
        });
        reportId = reportRes.body._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Bid.deleteMany({});
    });

    it('should create a new bid', async () => {
        const res = await request(app)
        .post('/api/bids')
        .set('Authorization', `Bearer ${token}`)
        .send({
            reportId: reportId,
            bidAmount: 100,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get bids for a report', async () => {
        // First, create a bid
        await request(app)
        .post('/api/bids')
        .set('Authorization', `Bearer ${token}`)
        .send({
            reportId: reportId,
            bidAmount: 100,
        });

        // Then, get bids for the report
        const res = await request(app)
        .get(`/api/bids/${reportId}`)
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});