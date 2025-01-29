const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ success : false, message: 'User not authenticated, Login again'});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success : false, message: 'User not authenticated, Login again'});
        }
        next();

    } catch(error) {
        res.json({ success : false, message: error.message});
    }
}

module.exports = userAuth;
