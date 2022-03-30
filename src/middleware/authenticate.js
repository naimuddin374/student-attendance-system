const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function authenticate(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'SECRET');

        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = authenticate;