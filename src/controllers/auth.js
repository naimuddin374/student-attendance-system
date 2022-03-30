const authService = require('../service/auth');


const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Validation Failed!' })
    }
    try {
        const result = await authService.register({ name, email, password });
        return res.status(201).json({ message: 'Registration Successful!', result })
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const result = await authService.login({ email, password });
        return res.status(200).json({ message: 'Login Successful!', result })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login
}