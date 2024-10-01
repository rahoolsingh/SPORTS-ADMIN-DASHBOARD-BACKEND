import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AtheleteEnrollment = new Schema({
    enrollmentNumber: {
        type: String,
        require: true,
        index: true,
        unique: true,
    },
    regNo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Athlete",
    },
});

export default mongoose.model("AtheleteEnrollment", AtheleteEnrollment);
