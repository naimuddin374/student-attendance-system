const { Schema, model } = require(`mongoose`);

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    password: {
        type: String,
        trim: true,
        require: true,
        minLength: [6, 'password to short']
    },
    roles: {
        type: [String],
        require: true,
        default: ['STUDENT']
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING'
    }
}, { timestamps: true })
const User = model('User', UserSchema);
module.exports = User;