const router = require('express').Router();
const authRouter = require('./auth');

router.use('/api/v1/auth', authRouter);

router.get('*', (req, res) => {
    res.send(`Welcome to app`);
})


module.exports = router;

