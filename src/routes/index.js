const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const authorization = require('../middleware/authorization');

const authRouter = require('./auth');
const userRouter = require('./user')

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', userRouter);

router.get('/api/v1/protected', authenticate, authorization(['STUDENT', 'ADMIN']), (req, res) => {
    return res.status(200).json({ message: 'This is protected route!' })
})

router.get('*', (req, res) => {
    res.send(`Welcome to app`);
})


module.exports = router;

