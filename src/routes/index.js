const router = require('express').Router();
const authRouter = require('./auth');
const authenticate = require('../middleware/authenticate');
const authorization = require('../middleware/authorization');


router.use('/api/v1/auth', authRouter);

router.get('/api/v1/protected', authenticate, authorization(['STUDENT', 'ADMIN']), (req, res) => {
    return res.status(200).json({ message: 'This is protected route!' })
})

router.get('*', (req, res) => {
    res.send(`Welcome to app`);
})


module.exports = router;

