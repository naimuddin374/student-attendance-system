const adminAttendanceService = require('../service/admin-attendance');
const studentAttendanceService = require('../service/student-attendance');



const attendanceStatus = async (_req, res, next) => {
    try {
        const attendance = await adminAttendanceService.getRunningAttendance()
        return res.status(200).json({ attendance })
    } catch (err) {
        next(err);
    }
}


const attend = async (req, res, next) => {
    try {
        const userId = req.user._id
        const id = req.params.id
        const attendance = await studentAttendanceService.createStudentAttendance(userId, id)

        return res.status(201).json({ message: 'Student Attended Successfully!', attendance })
    } catch (err) {
        next(err)
    }
}



module.exports = {
    attendanceStatus,
    attend
}