const AdminAttendance = require('../models/AdminAttendance')
const error = require('../util/error');
const { addMinutes, isAfter } = require('date-fns');



const getIsRunning = async () => {
    const attendance = await AdminAttendance.findOne({ status: 'RUNNING' });
    if (!attendance) {
        return false;
    }

    const stated = addMinutes(new Date(attendance.createdAt), attendance.timeLimit)

    if (isAfter(new Date(), stated)) {
        attendance.status = 'COMPLETED';
        attendance.save();
        return false;
    }
    return attendance;
}



const getRunningAttendance = async () => {
    const attendance = await getIsRunning()
    if (!attendance) {
        throw error('Not Running!', 400)
    }

    if (attendance.status === 'COMPLETED') {
        throw error('Attendance time is expired!', 400)
    }

    return attendance;
}



const enableAttendance = async () => {
    let attendance = await getIsRunning({});
    if (attendance) {
        throw error('Attendance is already', 400)
    }

    attendance = new AdminAttendance({})
    return attendance.save();
}



const disableAttendance = async () => {
    const attendance = await getIsRunning();
    if (!attendance) {
        throw error('Attendance is not enabled!', 400)
    }
    attendance.status = 'COMPLETED';
    return attendance.save();
}



module.exports = {
    getRunningAttendance,
    enableAttendance,
    disableAttendance
}