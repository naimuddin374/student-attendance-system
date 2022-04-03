const attendanceService = require('../service/admin-attendance')


const enableAttendance = async (_req, res, next) => {
    try {
        const attendance = await attendanceService.enableAttendance()
        return res.status(201).json({ message: 'Attendance time enabled', attendance })
    } catch (err) {
        next(err)
    }
}

const attendanceStatus = async (_req, res, next) => {
    try {
        const attendance = await attendanceService.getRunningAttendance()
        return res.status(200).json(attendance)
    } catch (err) {
        next(err)
    }
}

const disableAttendance = async (_req, res, next) => {
    try {
        const attendance = await attendanceService.disableAttendance()
        return res.status(200).json({ message: 'Attendance is disabled', attendance })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    enableAttendance,
    attendanceStatus,
    disableAttendance
}