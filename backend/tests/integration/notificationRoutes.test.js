const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const { registerAndLoginUser } = require('../testUtils');
const Notification = require('../../src/models/Notification');

describe('Notification Routes', () => {
    let token;
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

        // Dynamically fetch the token by registering and logging in a user
        token = await registerAndLoginUser();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Notification.deleteMany({});
    });

    it('should create a new notification', async () => {
        const res = await request(app)
        .post('/api/notifications')
        .set('Authorization', `Bearer ${token}`)
        .send({
            userId: 'user_id',
            message: 'This is a test notification',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get notifications', async () => {
        // First, create a notification
        await request(app)
        .post('/api/notifications')
        .set('Authorization', `Bearer ${token}`)
        .send({
            userId: 'user_id',
            message: 'This is a test notification',
        });

        // Then, get notifications
        const res = await request(app)
        .get('/api/notifications')
        .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should mark a notification as read', async () => {
        // First, create a notification
        const notificationRes = await request(app)
        .post('/api/notifications')
        .set('Authorization', `Bearer ${token}`)
        .send({
            userId: 'user_id',
            message: 'This is a test notification',
        });

        // Then, mark the notification as read
        const res = await request(app)
        .patch(`/api/notifications/${notificationRes.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            read: true,
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.read).toEqual(true);
    });
});
