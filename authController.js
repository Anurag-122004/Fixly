const { registerUser, loginUser, forgotPassword, resetPassword } = require('./services/authService');

const registerUserController = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const response = await registerUser(name, email, password, role);
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    };

    const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await loginUser(email, password);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    };

    const forgotPasswordController = async (req, res) => {
    const { email } = req.body;

    try {
        const response = await forgotPassword(email);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    };

    const resetPasswordController = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const response = await resetPassword(token, password);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    };

    module.exports = {
    registerUserController,
    loginUserController,
    forgotPasswordController,
    resetPasswordController,
};