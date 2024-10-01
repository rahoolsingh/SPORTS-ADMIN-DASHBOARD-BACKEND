import mongoose from "mongoose";

const authUsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    tokenExpires: {
        type: Date,
    },
});

const AuthUsers = mongoose.model("AuthUsers", authUsersSchema);

export default AuthUsers;
