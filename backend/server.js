// filepath: backend/src/server.js
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the backend!" });
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
