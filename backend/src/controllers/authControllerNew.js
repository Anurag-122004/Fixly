const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const transporter = require('../config/nodemailer');
const { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } = require('../config/emailTemplates');

const register = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.json({ success : false,message: 'Please fill all fields'});
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success : false, message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({id : user._id}, 
            process.env.JWT_SECRET, { expiresIn: '15d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 15 * 24 * 60 * 60 * 1000 
        });

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : 'Welcome to Fixly',
            text : `Hello ${name}, welcome to Fixly. We are glad to have you with us.`
        }

        await transporter.sendMail(mailOptions);

        return res.json({ success : true});

    } catch(error) {
        res.json({ success : false, message: error.message});
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 15 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ success: true, message: 'Logged in' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const logout = async(req, res) => {
    try {
        res.clearCookie('token', 
            {
            httpOnly: true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            }
        )
        return res.json({ success : true, message: 'Logged out'});
    }
    catch(error) {
        res.json({ success : false, message: error.message});
    }
}

const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}, it will expire in 24 hours`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if (!userId || !otp) {
        return res.json({ success : false, message: 'Missing Details'});
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success : false, message: 'User not found'});
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success : false, message: 'Invalid OTP'});
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success : false, message: 'OTP expired'});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        res.json({ success : true, message: 'Email verified successfully'});

    } catch (error) {
        res.json({ success : false, message: error.message});
    }
}

const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, message: 'Authenticated' });
    } catch (error) {
        res.json({ success : false, message: error.message});
    }
}

const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "email is required" });
    }

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${otp}, it will expire in 15 minutes`,
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Reset OTP sent to email" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success : false, message: 'Missing Details (email, otp, newPassword)'});
    }

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success : false, message: 'User not found'});
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success : false, message: 'Invalid OTP'});
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success : false, message: 'OTP expired'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success : true, message: 'Password reset successfully'});

    } catch (error) {
        res.json({ success : false, message: error.message});
    }
}

module.exports = { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword };