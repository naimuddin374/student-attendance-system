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
        require: true
    },
    roles: [String],
    accountStatus: String
}, { timestamps: true })
const User = model('User', UserSchema);
module.exports = User;