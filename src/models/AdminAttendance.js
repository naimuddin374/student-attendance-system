const { Schema, model } = require(`mongoose`);

const AdminAttendanceSchema = new Schema({
    status: {
        type: String,
        trim: true,
        require: true
    },
    timeLimit: {
        type: Number,
        require: true
    },
}, { timestamps: true })
const AdminAttendance = model('AdminAttendance', AdminAttendanceSchema);
module.exports = AdminAttendance;