const userService = require('./user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const error = require('../util/error')




/**
 * 
 * @param {{name: string, email: string, password: string}} object 
 * @returns {user}
 */
const register = async ({ name, email, password, roles, accountStatus }) => {
    let user = await userService.findUserByProperty('email', email);
    if (user) throw error('User already exist!', 400);

    const slot = await bcrypt.genSalt(11)
    const hash = await bcrypt.hash(password, slot);

    return userService.createNewUser({ name, email, password: hash, roles, accountStatus });
}



const login = async ({ email, password }) => {
    let user = await userService.findUserByProperty('email', email);
    if (!user) throw error('Invalid credential!', 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw error('Invalid credential!', 400);

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,
    }

    return await jwt.sign(payload, 'SECRET', { expiresIn: '2d' })
}

module.exports = {
    register,
    login
}