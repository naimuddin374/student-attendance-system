const router = require('express').Router();
const authenticate = require('../middleware/authenticate')
const authorization = require('../middleware/authorization')


const userController = require('../controllers/user')

/**
 * Get all users
 * @method GET
 * @return {users}
 * filter
 * select
 * pagination
 */
router.get('/', authenticate, authorization(['ADMIN']), userController.findUsers)


/**
 * Get user by user id
 * @method GET
 * @param {string} userId
 * @return {user}
 */
router.get('/:userId', authenticate, authorization(['ADMIN']), userController.findUserById)


/**
 * Create new user
 * @method POST
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {array} roles
 * @param {string} accountStatus 
 * @return {user}
 */
router.post('/', authenticate, authorization(['ADMIN']), userController.createUser)



/**
 * This route update if have or create user info 
 * @method PUT
 * @param {string} userId
 * @param {string} name
 * @param {string} email
 * @param {array} roles
 * @param {string} accountStatus
 * @return {user}
 */
router.put('/:userId', authenticate, authorization(['ADMIN']), userController.putUpdateUser)


/**
 * Update some user data
 * @method PATCH
 * @param {string} userId
 * @param {string} name
 * @param {array} roles
 * @param {string} accountStatus
 * @return {user}
 */
router.patch('/:userId', authenticate, authorization(['ADMIN']), userController.patchUserUpdate)


/**
 * @method DELETE
 * @param {string} userId
 * @return {}
 */
router.delete('/:userId', authenticate, authorization(['ADMIN']), userController.deleteUserById)


module.exports = router;