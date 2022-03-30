
function authorization(roles) {
    return (req, res, next) => {
        let isAuth;
        req.user.roles.map(r => {
            if (roles.includes(r)) {
                isAuth = true
            }
        })
        if (isAuth) {
            return next()
        }

        return res.status(401).json({ message: 'Permission Denied!' })
    }
}
module.exports = authorization;