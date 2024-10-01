import Athelete from "../models/athelete.model.js";

const listAtheletes = async (req, res) => {
    try {
        const atheletes = await Athelete.find();
        res.json(atheletes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export { listAtheletes };
