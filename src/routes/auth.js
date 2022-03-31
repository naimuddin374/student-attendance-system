const router = require('express').Router();
const authRouter = require('../controllers/auth');

/**
 * This register router for public user to register own account
 * @method POST
 * @param {name:String, email:String, password:String} 
 */
router.post('/register', authRouter.register)

/**
 * It's login route
 * @method POST
 * @param {email:String, password:String}
 */
router.post('/login', authRouter.login)




module.exports = router;