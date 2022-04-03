const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const authorization = require('../middleware/authorization');

const authRouters = require('./auth');
const userRouters = require('./user');
const adminAttendance = require('./admin-attendance');
const studentAttendance = require('./student-attendance')


router.use('/api/v1/auth', authRouters);
router.use('/api/v1/users', userRouters);
router.use('/api/v1/admin/attendance', authenticate, authorization(['ADMIN']), adminAttendance);
router.use('/api/v1/student/attendance', authenticate, authorization(['STUDENT']), studentAttendance);

router.get('/api/v1/protected', authenticate, authorization(['STUDENT', 'ADMIN']), (req, res) => {
    return res.status(200).json({ message: 'This is protected route!' })
})

router.get('*', (req, res) => {
    res.send(`Welcome to app`);
})


module.exports = router;

