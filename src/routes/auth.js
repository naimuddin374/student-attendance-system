const router = require('express').Router();
const authRouter = require('../controllers/auth');


router.post('/register', authRouter.register)
router.post('/login', authRouter.login)


module.exports = router;