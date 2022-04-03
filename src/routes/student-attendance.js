const router = require('express').Router();

const controller = require('../controllers/student-attendance');

router.get('/attend/:id', controller.attend)
router.get('/status', controller.attendanceStatus)


module.exports = router;