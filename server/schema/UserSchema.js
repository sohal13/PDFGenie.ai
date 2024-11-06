import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.isOAuthUser;
        },
    },
    isOAuthUser: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    profilePicture: {
        type: String,
    },
    settings: {
        notifications: {
            type: Boolean,
            default: true,
        },
        darkMode: {
            type: Boolean,
            default: false,
        },
    },
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
