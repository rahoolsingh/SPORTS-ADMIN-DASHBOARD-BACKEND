import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CoachEnrollment = new Schema({
    enrollmentNumber: {
        type: String,
        require: true,
        index: true,
        unique: true,
    },
    regNo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coach",
    },
});

export default mongoose.model("CoachEnrollment", CoachEnrollment);
