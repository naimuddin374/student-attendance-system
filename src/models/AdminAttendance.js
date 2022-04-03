const { Schema, model } = require(`mongoose`);

const AdminAttendanceSchema = new Schema({
    status: {
        type: String,
        trim: true,
        require: true
    },
    timeLimit: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        enum: ['RUNNING', 'COMPLETED'],
        default: 'RUNNING'
    }
}, { timestamps: true })
const AdminAttendance = model('AdminAttendance', AdminAttendanceSchema);
module.exports = AdminAttendance;