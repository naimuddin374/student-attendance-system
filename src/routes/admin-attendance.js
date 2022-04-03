const router = require('express').Router();

const adminAttendanceController = require('../controllers/admin-attendance')

router.get('/enable', adminAttendanceController.enableAttendance)
router.get('/status', adminAttendanceController.attendanceStatus)
router.get('/disable', adminAttendanceController.disableAttendance)


module.exports = router;