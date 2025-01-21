const { registerUser, loginUser } = require('../services/authService');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await registerUser(name, email, password, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};