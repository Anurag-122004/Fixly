const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
    const { userId, message } = req.body;
    try {
        const notification = await Notification.create({
        userId,
        message,
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user._id });
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    exports.markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        res.json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};