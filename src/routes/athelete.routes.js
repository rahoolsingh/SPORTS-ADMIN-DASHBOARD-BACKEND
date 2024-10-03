import { Router } from "express";
import {
    allAtheletesCount,
    getAtheleteDetails,
    listAtheletes,
    markStatusApproved,
    markStatusRejected,
    pendingAtheletes,
    pendingAtheletesCount,
    updateAthelete,
} from "../controllers/athelete.controller.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Athelete API" });
});

router.get("/list-all", checkAuthentication, listAtheletes);

router.get("/pending-list", checkAuthentication, pendingAtheletes);

router.get("/pending-count", checkAuthentication, pendingAtheletesCount);

router.get("/all-count", checkAuthentication, allAtheletesCount);

router.put("/mark-approved/:regNo", checkAuthentication, markStatusApproved);

router.put("/mark-rejected/:regNo", checkAuthentication, markStatusRejected);

router.get("/details/:regNo", checkAuthentication, getAtheleteDetails);

router.put("/update/:regNo", checkAuthentication, updateAthelete);

export default router;
