const error = require('../util/error')
const userService = require('../service/user')
const authService = require('../service/auth')


const findUsers = async (_req, res, next) => {
    try {
        const users = await userService.findUsers();
        return res.status(200).json(users);
    } catch (e) {
        next(e)
    }
}

const findUserById = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await userService.findUserByProperty('_id', userId)
        if (!user) {
            throw error('User not found!', 404)
        }
        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}

const createUser = async (req, res, next) => {
    try {
        const { name, email, password, roles, accountStatus } = req.body

        if (!name || !email || !password || !roles || !accountStatus) {
            throw error('Validation Error', 400)
        }

        const user = await authService.register({ name, email, password, roles, accountStatus })
        return res.status(201).json({ message: 'User created successfully!', user })
    } catch (e) {
        next(e)
    }
}


const putUpdateUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const { name, email, roles, accountStatus } = req.body

        const user = await userService.updateUser(userId, { name, email, roles, accountStatus })
        return res.status(201).json(user)
    } catch (e) {
        next(e)
    }
}



const patchUserUpdate = async (req, res, next) => {
    try {
        const { userId } = req.params
        const { name, email, roles, accountStatus } = req.body

        const user = await userService.findUserByProperty('_id', userId)
        if (!user) {
            throw error('User not found!', 404)
        }

        user.name = name ? name : user.name
        user.email = email ? email : user.email
        user.roles = roles ? roles : user.roles
        user.accountStatus = accountStatus ? accountStatus : user.accountStatus

        await user.save()
        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}



const deleteUserById = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await userService.findUserByProperty('_id', userId)

        if (!user) {
            throw error('User not found!', 404);
        }

        await user.remove()
        return res.status(200).send()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    findUsers,
    findUserById,
    createUser,
    putUpdateUser,
    patchUserUpdate,
    deleteUserById
}