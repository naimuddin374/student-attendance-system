const StudentAttendance = require('../models/StudentAttendance');
const AdminAttendance = require('../models/AdminAttendance');

const error = require('../util/error');


const checkAdminAttendanceStatusById = async (id) => {
    const attendance = await AdminAttendance.findById(id)
    if (!attendance) {
        throw error('Invalid ID!', 400)
    } else if (attendance.status === 'COMPLETED') {
        throw error('Attendance time already expired!', 400)
    }
    return attendance;
}


const createStudentAttendance = async (userId, attendanceId) => {
    let adminAttendance = await checkAdminAttendanceStatusById(attendanceId)
    if (!adminAttendance) {
        throw error('Invalid ID!', 400)
    }


    let attendance = await StudentAttendance.findOne({ user: userId, adminAttendance: attendanceId })
    if (attendance) {
        throw error('Already Attended!')
    }

    attendance = new StudentAttendance({
        user: userId,
        adminAttendance: attendanceId
    })

    return attendance.save()
}

module.exports = {
    checkAdminAttendanceStatusById,
    createStudentAttendance
}