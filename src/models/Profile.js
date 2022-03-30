const { Schema, model } = require(`mongoose`);

const ProfileSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        require: true
    },
    lastName: {
        type: String,
        trim: true,
        require: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        require: true
    },
    avatar: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
}, { timestamps: true })
const Profile = model('Profile', ProfileSchema);
module.exports = Profile;