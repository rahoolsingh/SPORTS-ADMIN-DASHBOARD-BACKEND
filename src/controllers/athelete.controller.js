import Athelete from "../models/athelete.model.js";

const listAtheletes = async (req, res) => {
    try {
        const atheletes = await Athelete.find({
            payment: true,
        });
        res.json(atheletes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

const pendingAtheletes = async (req, res) => {
    try {
        const atheletes = await Athelete.find({
            status: "pending",
        });
        res.json(atheletes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

const pendingAtheletesCount = async (req, res) => {
    try {
        const count = await Athelete.countDocuments({
            status: "pending",
        });
        res.json({ count });
    } catch (error) {
        res.json({ message: error.message });
    }
};

const allAtheletesCount = async (req, res) => {
    try {
        const count = await Athelete.countDocuments({
            payment: true,
        });
        res.json({ count });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export {
    listAtheletes,
    pendingAtheletes,
    pendingAtheletesCount,
    allAtheletesCount,
};
