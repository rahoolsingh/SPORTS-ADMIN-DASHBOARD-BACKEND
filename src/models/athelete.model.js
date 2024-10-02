import mongoose from "mongoose";
const Schema = mongoose.Schema;

const atheleteSchema = new Schema(
    {
        regNo: String,
        athleteName: String,
        fatherName: String,
        motherName: String,
        dob: Date,
        gender: String,
        district: String,
        mob: String,
        email: String,
        adharNumber: String,
        address: String,
        pin: String,
        panNumber: String,
        academyName: String,
        coachName: String,
        photo: String,
        certificate: String,
        residentCertificate: String,
        adharFrontPhoto: String,
        adharBackPhoto: String,
        status: {
            enum: ["pending", "approved", "rejected"],
            type: String,
            default: "pending",
        },
        payment: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Athlete", atheleteSchema);
